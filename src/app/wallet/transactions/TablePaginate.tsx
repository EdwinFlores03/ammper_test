import React, { useState } from 'react';

export default function TablePaginate({ data, currentPage=1, itemsPerPage=10, handleClickNext, handleClickPrevious }){

    const currentPageNum = Number(currentPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const maxPages = Math.ceil(data.count / itemsPerPage);    
    const endIndex = Math.min(startIndex + itemsPerPage, data.count);

    return (
        <>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrar <span className="font-semibold text-gray-900 dark:text-white">{startIndex+1}-{(currentPageNum >= maxPages)?(data.count):(startIndex+itemsPerPage)}</span> de <span className="font-semibold text-gray-900 dark:text-white">{data.count}</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button onClick={handleClickPrevious} disabled={!(currentPageNum > 1)} className={`px-8 py-3 text-white ${(!(currentPageNum > 1) || maxPages == 0)?'bg-blue-300':'bg-blue-600'} focus:outline-none flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Anterior</button>
                    </li>
                    {/* <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li> */}
                    <li>
                        <button onClick={handleClickNext} disabled={(currentPageNum >= maxPages)} className={`px-8 py-3 text-white ${(currentPageNum >= maxPages)?'bg-blue-300':'bg-blue-600'} focus:outline-none flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}> Siguiente </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}