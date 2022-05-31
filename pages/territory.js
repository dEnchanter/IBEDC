import { format } from 'date-fns';
import { useState, useRef, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { SmartSelect, SubmitButton, TextInputUnit } from '../components/forms';
import { Header } from '../components/header';
import { clientHttpGet, clientHttpPost } from '../lib/httpHelper';

export default function Territory() {
  const [loading, setLoading] = useState(false);

  const { data: territories, error: territoriesFetchError } = useSWR(
    '/api/fetch-territories',
    async (url) => {
      const response = await clientHttpGet(url);
      const result = await response.json();
      if (result.responseCode !== 0) {
        throw new Error(result.message);
      }
      return result.payload;
    },
    { shouldRetryOnError: false }
  );

  const { data: businessUnits, error } = useSWR(['/api/fetch-business-units'], async (url) => {
    const response = await clientHttpGet(url);
    const result = await response.json();
    if (result.responseCode === 0) {
      return result.payload.map((bu) => ({ ...bu, label: bu.name, value: bu.id }));
    }
    throw new Error(result.message);
  });

  const { register, control, handleSubmit, setValue } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      const {
        feeder,
        businessUnit: { id: businessUnitId, name: businessUnitName },
      } = data;
      const response = await clientHttpPost('/api/add-territory', {
        feeder,
        businessUnitId,
        businessUnitName,
      });
      const payload = await response.json();
      if (payload.responseCode === 0) {
        alert('Territory successfully added');
        setValue('feeder', '');
      } else {
        throw new Error(payload.responseCode.message);
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
      <div className="flex justify-between mx-auto mt-10 w-fit">
        <div className="w-112 mr-9">
          <Territories territories={territories} error={territoriesFetchError} />
        </div>
        <div className="w-80">
          <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Add new</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <Controller
                name="businessUnit"
                control={control}
                render={({ field: { onChange }, fieldState, formState }) => (
                  <SmartSelect
                    options={businessUnits || []}
                    loading={!businessUnits}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <TextInputUnit label="Feeder Name" {...register('feeder')} />
            <div className="text-right mt-3">
              <SubmitButton label="Submit" loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Territories({ territories, territoriesFetchError }) {
  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'ID', accessor: 'id' },
      { Header: 'Feeder', accessor: 'feeder' },
      { Header: 'Business Unit', accessor: 'businessUnitName' },
      { Header: 'Business Unit ID', accessor: 'businessUnitId' },
      { Header: 'Date Added', accessor: 'createDate' },
    ],
    []
  );

  if (territoriesFetchError) {
    console.error(territoriesFetchError);
    alert(territoriesFetchError.message);
  }

  const data = territories || [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['id', 'businessUnitId'],
    },
  });

  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Territories</h1>
      <div className="w-full rounded border text-sm text-gray-700">
        <table
          {...getTableProps({
            className: 'table-fixed border-collapse w-full',
          })}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className:
                        'border-b border-x first:border-l-0 first:w-14 last:border-r-0 px-2 py-1 bg-gray-50 text-gray-600 text-left',
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
                    className: 'hover:bg-gray-50',
                  })}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: 'border-x border-t first:border-l-0 last:border-r-0 px-2 py-1',
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
    </>
  );
}

function resolveCellValue(row, cell) {
  switch (cell.column.id) {
    case '__serial':
      return row.index + 1; // Adding offset to the row index will suffice for client side serial
    case 'createDate':
      return format(new Date(cell.value), 'dd/MM/yyyy HH:mm');
    default:
      return cell.render('Cell');
  }
}
