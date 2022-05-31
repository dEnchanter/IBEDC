// import { parse, parseISO } from 'date-fns';
// import { format } from 'date-fns';
// import { useState, useRef, useMemo } from 'react';
// import { useTable } from 'react-table';
// import useSWR from 'swr';
// import { SubmitButton, TextInput, TextInputUnit } from '../components/forms';
// import { Header } from '../components/header';
// import { clientHttpGet, clientHttpPost } from '../lib/httpHelper';

// export default function Dashboard() {
//   const [loading, setLoading] = useState(false);
//   const buNameRef = useRef();

//   async function handleSubmit(e) {
//     try {
//       setLoading(true);
//       e.preventDefault();
//       const buName = e.target.elements.buName.value;
  

//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'token': localStorage.getItem('token'),
//         },
//         body: JSON.stringify({ buName }),
//       }

//       // const response = await clientHttpPost('/api/create-business-unit', { businessName });
//       const response = await fetch(`http://45.33.3.35:5000/api/core/bunit/create`, requestOptions);

//       const data = await response.json();
//       console.log(data);

//       if (data.code === 200) {
//         buNameRef.current.value = '';
//         alert('Business Unit successfully saved');
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       buNameRef.current.focus();
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <div>
//       <Header />
//       <div className="gap-5 md:gap-10 p-10 max-w-7xl mx-auto">
//         <div className="">
//           <Transactions />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Transactions(props) {
//   const columns = useMemo(
//     () => [
//       { Header: 'S/N', id: '__serial' },
//       { Header: 'ID', accessor: 'id' },
//       { Header: 'Name', accessor: 'buName' },
//       { Header: 'Date Added', accessor: 'createdAt' },
//     ],
//     []
//   );

//   const { data: businessUnits, error } = useSWR(
//     'http://45.33.3.35:5000/api/core/bunit/fetch/all',
//     async (url) => {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'token': localStorage.getItem('token'),
//         }
//       });

//       const result = await response.json();
//       // console.log(result);

//       if (result.code !== 200) {
//         throw new Error(result.message);
//       }
//       return result.data;
//     },
//     { shouldRetryOnError: false }
//   );

//   if (error) {
//     console.error(error);
//     alert(error.message);
//   }

//   const data = businessUnits || [];
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//     initialState: {
//       hiddenColumns: ['id'],
//     },
//   });

//   return (
//     <>
//       <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">Transaction</h1>
//       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="flex flex-col">
//           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//               <table
//                 {...getTableProps({
//                   className: 'min-w-full divide-y divide-gray-300',
//                 })}
//               >
//                 <thead className="bg-gray-50">
//                   {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         <th
//                           {...column.getHeaderProps({
//                             className:
//                               'py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6',
//                           })}
//                         >
//                           {column.render('Header')}
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody {...getTableBodyProps({ className: 'divide-y divide-gray-200 bg-white' })}>
//                   {rows.map((row) => {
//                     prepareRow(row);
//                     return (
//                       <tr
//                         {...row.getRowProps({
//                           className: 'hover:bg-gray-50',
//                         })}
//                       >
//                         {row.cells.map((cell) => {
//                           return (
//                             <td
//                               {...cell.getCellProps({
//                                 className:
//                                   'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6',
//                               })}
//                             >
//                               {resolveCellValue(row, cell)}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function resolveCellValue(row, cell) {
//   switch (cell.column.id) {
//     case '__serial':
//       return row.index + 1; // Adding offset to the row index will suffice for client side serial
//     case 'createdAt':
//       return format(new Date(cell.value), 'dd/MM/yyyy HH:mm a');
//     default:
//       return cell.render('Cell');
//   }
// }
