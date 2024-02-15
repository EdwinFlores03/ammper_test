"use client"
import React from 'react';
import { useTable, usePagination } from 'react-table';

const PaginatedTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className='px-4 py-4 font-medium text-black dark:text-white xl:pl-11'>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}         
          </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageCount}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
      </div>
    </div>
  );
};

export default PaginatedTable;
