import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTable } from 'react-table';
import useSWR from 'swr';
import { Input, SmartSelect, SubmitButton, TextInputUnit } from '../components/forms';
import { Header } from '../components/header';
import { RightModal } from '../components/modal';
import Image from 'next/image';
import { clientHttpGet, clientHttpPost } from '../lib/httpHelper';

export default function SubStation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransformer, setSelectedTransformer] = useState(null);
  const [selectedCro, setSelectedCro] = useState(null);
  const [mappingInProgress, setMappingInProgress] = useState(false);

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

  // const { data: crUsers, error } = useSWR(
  //   'api/cr',
  //   async (url) => {
  //     const response = await fetch(url, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'token': localStorage.getItem('token'),
  //       }
  //     });
  //     const result = await response.json();
  //     if (result.code !== 200) {
  //       throw new Error(result.message);
  //     }
  //     return result.data.map((cr) => ({ ...cr, label: cr.name, value: cr.token }));
  //   },
  //   { shouldRetryOnError: false }
  // );

  // if (error) {
  //   console.error(error);
  //   alert(error.message);
  // }

  function handleMapCRRequest(transformer) {
    setSelectedTransformer(transformer);
    setIsModalOpen(true);
  }

  // async function handleMapBtnClick() {
  //   setMappingInProgress(true);
  //   const { id: transformerId } = selectedTransformer;
  //   const { token: croId, name: croName } = selectedCro;

  //   try {
  //     const response = await fetch('/api/transformer-map-cro', {
  //       transformerId,
  //       croId,
  //       croName,
  //     });
  //     const result = await response.json();
  //     if (result.responseCode !== 0) {
  //       alert('Encountered error mapping Transformer to CRO');
  //     } else {
  //       setIsModalOpen(false);
  //       alert(
  //         `Successfully assigned ${selectedTransformer.transformerName} to ${selectedCro.name}`
  //       );
  //       // TODO update transformer table to reflect mapping
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setMappingInProgress(false);
  //   }
  // }

  return (
    <div>
      <RightModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        {/* Mapping transformer happens here */}
        <h1 className="font-semibold text-gray-700 px-5 py-4">Map Transformer to CRO</h1>
        <hr />
        <div className="py-2 px-5 text-gray-700 text-sm">
          <div className="grid gap-2 grid-cols-[min-content_auto] py-3 italic">
            <div className="font-bold whitespace-nowrap">Business Unit</div>
            <div>{selectedTransformer?.businessUnitName}</div>
            <div className="font-bold whitespace-nowrap">Territory</div>
            <div>{selectedTransformer?.feeder}</div>
            <div className="font-bold whitespace-nowrap">Transformer</div>
            <div>{selectedTransformer?.transformerName}</div>
          </div>
          <div className="py-3">
            {/* <SmartSelect
              placeholder="Select CRO"
              options={crUsers}
              loading={!crUsers}
              isClearable={true}
              onChange={(cro) => setSelectedCro(cro)}
            /> */}
          </div>
          {/* <div className="flex justify-end">
            <SubmitButton
              label="Map"
              disabled={!Boolean(selectedCro)}
              onClick={handleMapBtnClick}
              loading={mappingInProgress}
            />
          </div> */}
        </div>
      </RightModal>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-10 p-10 max-w-6xl mx-auto">
        <div className="order-2 md:order-1 md:col-span-4">
          <SubStations
            transformers={transformers}
            transformersFetchError={transformersFetchError}
            onClickMap={handleMapCRRequest}
          />
        </div>
        <div className="order-1 md:order-2 md:col-span-2">
          <CreateDss
            onSave={() => {
              // noop. TODO To be implemented in another task
            }}
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
      console.log(result);
      return result.data.map((bu) => ({ ...bu, label: bu.buName, value: bu._id }));
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
        Add new district sub-station
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
            District Sub-station name
          </label>
          <Input small {...register('dssName', { required: true })} />
          {errors?.dssName && (
            <p className="text-xs text-red-500 italic">Sub station name is required</p>
          )}
        </div>
        <div className="pb-4">
          <label htmlFor="" className="text-gray-600 text-sm">
            Location
          </label>
          <Input small {...register('location', { required: true })} />
          {errors?.location && <p className="text-xs text-red-500 italic">Location is required</p>}
        </div>
        <div className="text-right mt-3">
          <SubmitButton label="Submit" loading={loading} />
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
      // {
      //   Header: 'CRO',
      //   id: 'croName',
      //   accessor: (row) =>
      //     row.croName ? (
      //       <>
      //         <span className="mr-1">{row.croName}</span>
      //         <button className="text-xs" onClick={() => onClickMap(row)}>
      //           (<span className="text-xs text-orange-600">change</span>)
      //         </button>
      //       </>
      //     ) : (
      //       <button className="text-xs text-orange-600" onClick={() => onClickMap(row)}>
      //         assign
      //       </button>
      //     ),
      // },
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
      <h1 className="text-l font-bold text-gray-600 pb-2 capitalize">District Sub stations</h1>
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
      {/* <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
            <table
              {...getTableProps({
                className: 'min-w-full divide-y divide-gray-300',
              })}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps({
                          className:
                            'py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6',
                        })}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps({ className: 'divide-y divide-gray-200 bg-white' })}>
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
                              className:
                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6',
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
      </div> */}
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
