import { format } from 'date-fns';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { Header } from '../../components/header';
import { clientHttpGet } from '../../lib/httpHelper';

export default function Cr() {
  return (
    <div>
      <Header />
      <div className="flex justify-between mx-auto mt-10 w-fit">
        <div className="w-208">
          <CrList />
        </div>
      </div>
    </div>
  );
}

function CrList() {
  const columns = useMemo(
    () => [
      { Header: 'S/N', id: '__serial' },
      { Header: 'Token', accessor: 'token' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Phone No', accessor: 'phoneNumber' },
      { Header: 'Email', accessor: 'email' },
      {
        id: 'action',
        accessor: (row) => (
          <Link href={`/cr/${row.token}`}>
            <a className="text-yellow-600 text-xs font-semibold">open</a>
          </Link>
        ),
      },
    ],
    []
  );

  const { data: businessUnits, error } = useSWR(
    '/api/cr',
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

  if (error) {
    console.error(error);
    alert(error.message);
  }

  const data = businessUnits || [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: ['token'],
    },
  });

  return (
    <>
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">
        Customer Relationship Officers
      </h1>
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
                        'border-b border-x first:border-l-0 first:w-14 last:border-r-0 last:w-16 px-2 py-1 bg-gray-50 text-gray-600 text-left',
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
