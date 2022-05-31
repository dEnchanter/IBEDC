import { parse, parseISO } from 'date-fns';
import { format } from 'date-fns';
import { useState, useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import Image from 'next/image';
import { Input, SmartSelect, SubmitButton, TextInput, TextInputUnit } from '../components/forms';
import { Header } from '../components/header';
import { PlusIcon } from '../components/icons';
import Modal, { RightModal } from '../components/modal';

export default function BusinessUnit() {
  const [loading, setLoading] = useState(false);
  const buNameRef = useRef();

  async function handleSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const buName = e.target.elements.buName.value;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ buName }),
      }
    
      const response = await fetch(`http://45.33.3.35:5000/api/core/bunit/create`, requestOptions);

      const data = await response.json();
     // console.log(data);

      if (data.code === 200) {
        buNameRef.current.value = '';
        alert('Business Unit successfully saved');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      buNameRef.current.focus();
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10 p-10 max-w-6xl mx-auto">
        <div className="order-2 md:order-1 md:col-span-4">
          <BusinessUnits />
        </div>
        <div className="order-1 md:order-2 md:col-span-2">
          <h1 className="font-bold text-gray-600 pb-2 capitalize">Add new business unit</h1>
          <form onSubmit={handleSubmit}>
            <TextInputUnit label="Business Name" name="buName" ref={buNameRef} />
            <div className="text-right mt-3">
              <SubmitButton label="Submit" loading={loading} />
            </div>
          </form>
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

function BusinessUnits(props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBu, setSelectedBu] = useState(null);

  function handleAddBusinessAccount(e, businessUnit) {
    e.preventDefault();
    setOpenModal(true);
    setSelectedBu(businessUnit);
  }

  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'buName' },
      { Header: 'Date Added', accessor: 'createdAt' },
      {
        id: 'action',
        accessor: (row) => (
          <a
            href="#"
            onClick={(e) => handleAddBusinessAccount(e, { id: row._id, name: row.buName })}
            className="text-ibedc-brand-orange"
          >
            <PlusIcon />
          </a>
        ),
      },
    ],
    []
  );

  const { data: businessUnits, error } = useSWR(
    'http://45.33.3.35:5000/api/core/bunit/fetch/all',
      async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token'),
            }
        });;
      const result = await response.json();
      // console.log(result);
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
        <CreateBusinessAccount businessUnit={selectedBu} done={() => setOpenModal(false)} />
      </RightModal>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Business Units</h1>
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
                                  'whitespace-nowrap py-4 text-xs font-medium text-gray-700 sm:pl-6',
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

function CreateBusinessAccount({ businessUnit, done }) {
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

  const { data: businessUnits, buFetchError } = useSWR(
    'http://45.33.3.35:5000/api/core/transaction-type/fetch',
    async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        console.log(result);
        return result.data.map((tType) => ({
          ...tType,
          label: tType.typeName,
          value: tType._id,
        }));
      }
      throw new Error(result.message);
    }
  );

  async function onSubmit(data) {
    // console.log(data);
    try {
      setLoading(true);
      const { tranType, ...rest } = data;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          tranTypeId: tranType.value,
          businessUnitId: businessUnit.id,
          ...rest,
        })
      }

      const response = await fetch('http://45.33.3.35:5000/api/core/bunit/account/create', requestOptions);
      const payload = await response.json();
      // console.log(payload);
      if (payload.code === 200) {
        alert('Business unit account successfully created');
        reset();
      } else {
        throw new Error(payload.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
      done();
    }
  }
  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">
        Create new business unit account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="py-2 font-bold text-gray-600">{businessUnit.name}</p>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Transaction Type
          </label>
          <Controller
            name="tranType"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState, formState }) => (
              <SmartSelect options={businessUnits || []} loading={!businessUnits} {...field} />
            )}
          />
          {errors?.tranType && (
            <p className="text-xs text-red-500 italic">Please select transaction type</p>
          )}
        </div>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Account Name
          </label>
          <Input small {...register('accountName', { required: true })} />
          {errors?.accountName && (
            <p className="text-xs text-red-500 italic">Account name is required</p>
          )}
        </div>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Account Number
          </label>
          <Input small {...register('accountNumber', { required: true })} />
          {errors?.accountNumber && (
            <p className="text-xs text-red-500 italic">Account number is required</p>
          )}
        </div>
        <div className="text-right mt-3">
          <SubmitButton label="Submit" loading={loading} />
        </div>
      </form>
    </>
  );
}
