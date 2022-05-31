import { parse, parseISO } from 'date-fns';
import { format } from 'date-fns';
import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { Input, SubmitButton, TextInput, TextInputUnit } from '../components/forms';
import { Header } from '../components/header';
import Image from 'next/image';
import { clientHttpGet, clientHttpPost } from '../lib/httpHelper';

export default function TransactionType() {
  const [loading, setLoading] = useState(false);
  const buNameRef = useRef();

  const {
    register,
    resetField,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ typeName: '' });

  async function onSubmit(data) {
    // console.log(data);
    try {
      setLoading(true);
      const { typeName } = data;

      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
         },
        body: JSON.stringify({ typeName }),
      }

      const response = await fetch('http://45.33.3.35:5000/api/core/transaction-type/create', requestOptions);
      const result = await response.json();
      // console.log(result);
      if (result.code === 200) {
        alert('Transaction type created successfully');
        reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10 p-10 max-w-6xl mx-auto">
        <div className="order-2 md:order-1 md:col-span-4">
          <TransactionTypeUnit />
        </div>
        <div className="order-1 md:order-2 md:col-span-2">
          <h1 className="font-bold text-gray-600 pb-2 capitalize">Add new transaction type</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <label htmlFor="" className="text-gray-600 text-sm">
                Name
              </label>
              <Input small {...register('typeName', { required: true })} />
              {errors?.typeName && <p className="text-xs text-red-500 italic">Name is required</p>}
            </div>
            <div className="text-right mt-3">
              <SubmitButton label="Submit" loading={loading} />
            </div>
          </form>
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
      </div>
    </div>
  );
}

function TransactionTypeUnit(props) {
  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'ID', accessor: 'typeId' },
      { Header: 'Name', accessor: 'typeName' },
      // { Header: 'Date Added', accessor: 'createdAt' },
    ],
    []
  );

  const { data: transTypeUnits, error } = useSWR(
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

  const data = transTypeUnits || [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['id'],
    },
  });

  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Transaction Type</h1>
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
