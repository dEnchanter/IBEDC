import { format } from 'date-fns';
import { useState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { Input, SmartSelect, AddAccount } from '../components/forms';
import { Header } from '../components/header';
import Image from 'next/image';

export default function SubStation() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedTransformer, setSelectedTransformer] = useState(null);
  // const [selectedCro, setSelectedCro] = useState(null);
  // const [mappingInProgress, setMappingInProgress] = useState(false);

  const { data: transformers, error: transformersFetchError } = useSWR(
    'http://45.33.3.35:5000/api/core/dss/fetch/all',
    async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      });
      const result = await response.json();
      console.log(result);
      if (result.code !== 200) {
        throw new Error(result.message);
      }
      return result.data;
    },
    { shouldRetryOnError: false }
  );

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10 p-10 max-w-6xl mx-auto">
        <div className="order-2 md:order-1 md:col-span-4">
          <SubStations
            transformers={transformers}
            transformersFetchError={transformersFetchError}
          />
        </div>
        <div className="order-1 md:order-2 md:col-span-2">
          <CreateDss
            // onSave={() => {
            //   // noop. TODO To be implemented in another task
            // }}
          />
        </div>
      </div>
    </div>
  );
}

function CreateDss() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    resetField,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessUnit: null,
    },
  });

  const selectedBusinessUnit = watch('businessUnit');

  const { data: businessUnits, buFetchError } = useSWR('http://45.33.3.35:5000/api/core/bunit/fetch/all', 
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
      // console.log(result);
      return result.data.map((bu) => ({ ...bu, label: bu.buName, value: bu._id }));
    }
    throw new Error(result.message);
  });

  const { data: transactionType, error } = useSWR('http://45.33.3.35:5000/api/core/transaction-type/fetch', 
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
      // console.log(result);
      return result.data.map((tType) => ({ ...tType, label: tType.typeName, value: tType._id }));
    }
    throw new Error(result.message);
  });

  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      const { businessUnit, ...rest } = data;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          businessUnitId: businessUnit.value,
          ...rest,
        })
      }

      const response = await fetch('http://45.33.3.35:5000/api/core/dss/create', requestOptions);
      const payload = await response.json();
      if (payload.code === 200) {
        alert('District sub station succcessfully added');
        reset();
      } else {
        throw new Error(payload.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">
        Map Account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Transaction Type
          </label>
          <Controller
            name="transactionType"
            rules={{ required: true }}
            control={control}
            render={({ field, fieldState, formState }) => (
              <SmartSelect options={transactionType || []} loading={!transactionType} {...field} />
            )}
          />
          {errors?.transactionType && (
            <p className="text-xs text-red-500 italic">Please select a transaction type</p>
          )}
        </div>
        
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Account Number
          </label>

          <div className='relative flex'>
            <Input small {...register('accountNo', { required: true })} placeholder="Enter account number" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 self-center absolute right-1" viewBox="0 0 20 20" fill="orange">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
          </div>
          
          {errors?.accountNo && <p className="text-xs text-red-500 italic">Account Number is required</p>}
        </div>
        <div className="text-right mt-3">
          <AddAccount label="Add Account" loading={loading} />
        </div>
      </form>
      <div className="absolute top-1 left-3">
        <Image 
         src="/ellipse1.png"
         width={500} 
         height={500}
         className="-z-10 !hidden sm:!inline "
         objectFit="cover" 
        />
      </div>
    </>
  );
}

function SubStations({ transformers, transformersFetchError, onClickMap }) {
  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'ID', accessor: 'id' },
      { Header: 'DSS', accessor: 'dssName' },
      { Header: 'Location', accessor: 'location' },
      { Header: 'Business Unit ID', accessor: 'businessUnitId' },
      { Header: 'Date Added', accessor: 'createdAt' },
    ],
    []
  );

  if (transformersFetchError) {
    console.error(transformersFetchError);
    alert(transformersFetchError.message);
  }

  const data = transformers || [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['id', 'territoryId', 'croId'],
    },
  });

  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Account Mapping</h1>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                {...getTableProps({
                  className: 'min-w-full divide-gray-300',
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
                                  'whitespace-nowrap py-6 text-xs font-medium text-gray-700 sm:pl-6',
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
