import { parse, parseISO } from 'date-fns';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState, useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { Button } from '../components/buttons';
import { Input, SmartSelect, SubmitButton, TextInput, TextInputUnit } from '../components/forms';
import { Header } from '../components/header';
import { PlusIcon } from '../components/icons';
import Modal, { RightModal } from '../components/modal';
import { clientHttpGet, clientHttpPost } from '../lib/httpHelper';

// import ellipse1 from '../public/ellipse1.png';

export default function Users() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 gap-5 md:gap-10 p-10 max-w-6xl mx-auto">
        <div className="order-2 md:order-1 md:col-span-4">
          <UsersTable />
        </div>
      </div>
      <div className="absolute top-1 left-1">
        <Image 
         src="/ellipse1.png"
         width={500} 
         height={500}
         className="-z-10 !hidden sm:!inline "
         objectFit="cover" 
        />
      </div>
    </div>
  );
}

function UsersTable(props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function showMapCroPopup(e, selectedUser) {
    e.preventDefault();
    setOpenModal(true);
    setSelectedUser(selectedUser);
  }

  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'ID', accessor: '_id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Date Added', accessor: 'createdAt' },
      {
        id: 'action',
        accessor: (row) => (
          <a href="#" onClick={(e) => showMapCroPopup(e, row)} className="text-ibedc-brand-orange">
            <PlusIcon />
          </a>
        ),
      },
    ],
    []
  );

  const { data: businessUnits, error } = useSWR(
    'http://45.33.3.35:5000/api/core/users/get-all',
    async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      });
      const result = await response.json();

      if (result.code !== 200) {
        throw new Error(result.message);
      }
      return result.data;
    },
    { shouldRetryOnError: false }
  );

  if (error) {
    console.error(error);
    alert(error.message);
  }

  const data = businessUnits || [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['id'],
    },
  });

  return (
    <>
      <RightModal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        <MapCro user={selectedUser} done={() => setOpenModal(false)} />
      </RightModal>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Users</h1>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                {...getTableProps({
                  className: 'min-w-full divide-gray-500',
                })}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps({
                            className:
                              'py-5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6',
                          })}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps({
                         // className: 'hover:bg-gray-50',
                         className: row.index % 2 ? "bg-white" : "bg-gray-100",
                        })}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps({
                                className:
                                  'whitespace-nowrap py-6 text-sm font-medium text-gray-900 sm:pl-6',
                              })}
                            >
                              {resolveCellValue(row, cell)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function resolveCellValue(row, cell) {
  switch (cell.column.id) {
    case '__serial':
      return row.index + 1; // Adding offset to the row index will suffice for client side serial
    case 'createdAt':
      return format(new Date(cell.value), 'dd/MM/yyyy HH:mm a');
    default:
      return cell.render('Cell');
  }
}

function MapCro({ user, done }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    resetField,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { data: businessUnits, buFetchError } = useSWR('http://45.33.3.35:5000/api/core/bunit/fetch/all', async (url) => {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
    });
    const result = await response.json();
    if (result.code === 200) {
      return result.data.map((bu) => ({ ...bu, label: bu.buName, value: bu._id }));
    }
    throw new Error(result.message);
  });

  const { data: dss, dssFetchError } = useSWR('http://45.33.3.35:5000/api/core/dss/fetch/all', async (url) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      }
    });
    const result = await response.json();
    if (result.code === 200) {
      return result.data.map((dss) => ({
        ...dss,
        label: `${dss.dssName} (${dss.location})`,
        value: dss._id,
      }));
    }
    throw new Error(result.message);
  });

  async function onSubmit(data) {
    try {
      setLoading(true);
      const commaSeperatedDssList = data.dss.map((dss) => dss._id);
      // console.log(commaSeperatedDssList);
      // console.log(data.businessUnit._id);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          businessUnitId: data.businessUnit._id,
          commaSeperatedDssList,
        })
      }

      const response = await fetch('http://45.33.3.35:5000/api/core/mapping/cro', requestOptions);
      const payload = await response.json();
      // console.log(payload)
      
      if (payload.code === 200) {
        alert('Business unit account successfully created');
        reset();
      } else {
        throw new Error(payload.message);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
      done();
    }
  }
  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Map CRO</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="py-5 font-bold text-gray-600">Mapping {user.name}</p>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Business unit
          </label>
          <Controller
            name="businessUnit"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState, formState }) => (
              <SmartSelect options={businessUnits || []} loading={!businessUnits} {...field} />
            )}
          />
          {errors?.businessUnit && (
            <p className="text-xs text-red-500 italic">Please select business unit</p>
          )}
        </div>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            District Sub-station
          </label>
          <Controller
            name="dss"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState, formState }) => (
              <SmartSelect isMulti options={dss || []} loading={!dss} {...field} />
            )}
          />
          {errors?.dss && (
            <p className="text-xs text-red-500 italic">Please select district sub station</p>
          )}
        </div>
        <div className="text-right mt-3">
          <SubmitButton label="Submit" loading={loading} />
        </div>
      </form>
    </>
  );
}
