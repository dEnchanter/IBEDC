import { format, parseISO } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFilters, usePagination, useTable } from "react-table";
import useSWR from "swr";
import { useUser } from "../hooks/auth";
import { Button } from "./buttons";
import { MoreInfo, Paginator } from "./containers";
import { TextInput } from "./forms";
import { Exclamation, InformationIcon, FilterIcon, Loading } from "./icons";

export default function TransactionHistoryTable({
  data,
  dispatch,
  fetchData,
  pageCount: configuredPageCount,
  loading,
}) {
  const columns = useMemo(
    () => [
      { Header: "S/N", id: "_serial" },
      { Header: "Id", accessor: "_id" },
      { Header: "Client Ref", accessor: "clientReference", quickSearch: true },
      { Header: "STAN", accessor: "STAN", quickSearch: true },
      { Header: "FIIC", accessor: "FIIC" },
      { Header: "MTI", accessor: "MTI" },
      { Header: "Merchant ID", accessor: "merchantId", quickSearch: true },
      { Header: "Merchant Name", accessor: "merchantName" },
      { Header: "Merchant Address", accessor: "merchantAddress" },
      { Header: "RRN", accessor: "rrn", id: "rrn", quickSearch: true },
      { Header: "Terminal ID", accessor: "terminalId" },
      { Header: "Start Date", accessor: "startDate", Cell: () => "N/A" },
      { Header: "End Date", accessor: "endDate", Cell: () => "N/A" },
      { Header: "Amount", accessor: "amount", quickSearch: true },
      { Header: "Auth Code", accessor: "authCode" },
      { Header: "Handler Used", accessor: "handlerUsed" },
      { Header: "Card Name", accessor: "cardName" },
      { Header: "Masked Pan", accessor: "maskedPan" },
      { Header: "Card Scheme", accessor: "cardScheme" },
      { Header: "Bank Name", accessor: "bankName" },
      { Header: "Settlement Status", accessor: "settlementStatus" },
      { Header: "Tran Type", accessor: "tranType" },
      { Header: "Currency Code", accessor: "currencyCode" },
      { Header: "Flagged", accessor: "flagged" },
      { Header: "Notified", accessor: "notified" },
      { Header: "Online Pin", accessor: "onlinePin" },
      {
        Header: "Process Time",
        accessor: "processTime",
        Cell: (first, second) => {
          return "N/A";
        },
      },
      { Header: "Response Code", accessor: "responseCode" },
      { Header: "Response Message", accessor: "responseMessage" },
      {
        Header: "Create Date",
        accessor: "createdAt",
        Cell: ({ value }) => format(parseISO(value), "dd-MM-yyyy hh:mm a"),
      },
      { Header: "Update Date", accessor: "updatedAt" },
      { Header: "Write2POS", accessor: "write2pos" },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    columns: { ..._cols },
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    setAllFilters,
    state: { pageIndex, pageSize, filters },
    ...rest
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 1,
        hiddenColumns: ["_id", "updatedAt"],
      },
      manualPagination: true,
      manualFilters: true,
      // disableFilters: true,
      pageCount: configuredPageCount,
    },
    useFilters,
    usePagination
  );

  useEffect(() => {
    dispatch({
      type: "updateTableState",
      payload: { pageIndex, pageSize, filters },
    });
  }, [pageIndex, pageSize, filters]);

  const [quickSearchKey, setQuickSearchKey] = useState(
    columns.find((col) => col.quickSearch == true)?.accessor
  );
  const [quickSearchValue, setQuickSearchValue] = useState("");

  useEffect(() => {
    setAllFilters([{ id: quickSearchKey, value: quickSearchValue }]);
  }, [quickSearchValue]);

  useEffect(() => {
    if (quickSearchValue?.trim()) {
      setAllFilters([{ id: quickSearchKey, value: quickSearchValue }]);
    }
  }, [quickSearchKey]);

  function extractCellValue(cell, index) {
    switch (cell.column.id) {
      case "_serial":
        return index + 1 + pageIndex * pageSize;
      default:
        return typeof cell.value === "boolean"
          ? cell.value.toString()
          : cell.render("Cell");
    }
  }

  function handleQuickSearchKeyChange(ev) {
    setQuickSearchKey(ev.target.value);
  }

  function handleQuickSearchValueChange(ev) {
    setQuickSearchValue(ev.target.value);
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <select
            value={quickSearchKey}
            onChange={handleQuickSearchKeyChange}
            className="border px-2 py-1 text-gray-600 w-36 text-sm focus:outline-none "
          >
            {columns.map(
              (column) =>
                column.accessor &&
                column.quickSearch && (
                  <option key={column.accessor} value={column.accessor}>
                    {column.Header}
                  </option>
                )
            )}
          </select>
          <TextInput
            width="w-40"
            padding="px-1 py-1"
            margin="mb-5"
            placeholder="Quick Search"
            onChange={handleQuickSearchValueChange}
          />
          <div className="inline ml-2 text-gray-500">
            <InformationIcon strokeWidth={2} h="w-5" />
          </div>
        </div>
        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <a className="font-semibold text-sm " href="#">
            Filter
          </a>
          <div className="inline ml-2">
            <FilterIcon strokeWidth={2} h="w-4" />
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto">
        {!data.length && loading && (
          <div className="text-center p-4 text-gray-700 text-sm h-14">
            <span>
              Loading page {pageIndex + 1}
              <span className="tracking-widest">...</span>
            </span>
            <div className="inline-block ml-2">
              <Loading h="w-4" />
            </div>
          </div>
        )}
        {!data.length && !loading && (
          <div className="text-center p-4 text-gray-700 text-sm h-14">
            <span>No data found</span>
          </div>
        )}
        {!!data.length && (
          <table
            className="text-gray-700 w- opacity-85 bg-white text-sm border-collapse table-fixed w-full"
            {...getTableProps()}
          >
            <thead className="border-b-2 border-gray-200 border-separate text-center text-sm">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className={`py-1 px-2 font-semibold w-32`}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-center" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="px-2 py-2 truncate"
                          {...cell.getCellProps()}
                        >
                          {extractCellValue(cell, row.index)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Paginator
        // Show loading only when revalidating the data on the page
        loading={!!data.length && loading}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageCount={pageOptions.length}
        pageIndex={pageIndex}
        setPageSize={setPageSize}
      />
    </>
  );
}
