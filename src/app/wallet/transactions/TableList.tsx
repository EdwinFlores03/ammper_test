// Página de inicio de sesión
import React, { useEffect, useState } from 'react';
import { getTransactions } from "../../../utils/belvo";
import TablePaginate from './TablePaginate';
import moment from 'moment';
import FlatpickrComponent from '../../../components/Forms/DatePicker/FlatpickrComponent';

interface Transaction {
    description: string;
    reference: string;
    category: string;
    amount: number;
    currency: string;
    value_date: string;
    created_at: string;
    type: string;
    status: string;
}

interface TransactionData {
    count: number;
    results: Transaction[];
}

export default function TableList({linkId}){

    const rowsPerPage = 15;
    const [data, setData] = useState<TransactionData>({ count: 0, results: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [flagState, setFlagState] = useState(false);
    const [categorySelect, setCategorySelect] = useState("");
    //Fechas filtro
    const dateStart = moment().subtract(3, 'months').format('YYYY-MM-DD');
    const dateEnd = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const [defaultDateStart, setDefaultDateStart] = useState(dateStart);
    const [defaultDateEnd, setDefaultDateEnd] = useState(dateEnd);
    const defaultDate = moment().format('YYYY-MM-DD');

    const handleChangeStart = (dateSelected) => {
        setDefaultDateStart(dateSelected);
    };

    const handleChangeEnd = (dateSelected) => {
        setDefaultDateEnd(dateSelected);
    };

    useEffect(() => {
        setData({ count: 0, results: [] });        
        const fetchData = async () => {
            setFlagState(true);            
            const datas = await getTransactions(rowsPerPage, currentPage, linkId, defaultDateStart, defaultDateEnd,categorySelect);
            setData(datas);
            setFlagState(false);
        };
    
        fetchData();
        
      }, [currentPage,defaultDateStart,defaultDateEnd, categorySelect]);

    if (!data || !data.results) {
        return (
            <>
                <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mb-4">
                    <div>
                        <label htmlFor="date_start" className="font-semibold text-black dark:text-white">Fecha inicio</label>
                        <div className="flex items-center rounded-md px-3 py-2">
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </div> {/* Aquí agregamos el icono */}
                            
                            <FlatpickrComponent maxDate={defaultDate} minDate={''} defaultDate={defaultDateStart} modePick={'single'} handleChange={handleChangeStart} />
                    </div>
                        </div>
                    <div>
                        <label htmlFor="date_end" className="font-semibold text-black dark:text-white">Fecha final</label>
                        <div className="flex items-center rounded-md px-3 py-2">
                            <div className="mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </div> {/* Aquí agregamos el icono */}
                            <FlatpickrComponent maxDate={defaultDate} minDate={''} defaultDate={defaultDateEnd} modePick={'single'} handleChange={handleChangeEnd} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className="font-semibold text-black dark:text-white">Tipo</label>
                        <select
                            value={categorySelect}
                            onChange={(e) => {
                                setCategorySelect(e.target.value)
                            }}
                            className={`relative z-20 w-full rounded border border-black px-5 py-3 transition focus:border-primary active:border-primary text-black"}`}
                            >
                            <option value="" disabled className="text-body dark:text-black">Selecciona una opción</option>
                            <option value="INFLOW" className="text-body dark:text-black">INFLOW</option>
                            <option value="OUTFLOW" className="text-body dark:text-black">OUTFLOW</option>
                            {/* <option value="Transfers" className="text-body dark:text-black">Transferencias</option>
                            <option value="Fees & Charges" className="text-body dark:text-black">Tarifas y cargos</option>
                            <option value="Income & Payments" className="text-body dark:text-black">Ingresos y Pagos</option>
                            <option value="Credits & Loans" className="text-body dark:text-black">Créditos y Préstamos</option>
                            <option value="Investments & Savings" className="text-body dark:text-black">Inversiones y Ahorros</option>
                            <option value="Home & Life" className="text-body dark:text-black">Hogar y Vida</option>
                            <option value="Bills & Utilities" className="text-body dark:text-black">Facturas y servicios públicos</option>
                            <option value="Personal Shopping" className="text-body dark:text-black">Compras personales</option>
                            <option value="Withdrawals & ATM" className="text-body dark:text-black">Retiros y cajero automático</option>
                            <option value="Food & Groceries" className="text-body dark:text-black">Alimentos y Abarrotes</option>
                            <option value="Deposits" className="text-body dark:text-black">Depósitos</option>
                            <option value="Online Platforms & Leisure" className="text-body dark:text-black">Plataformas online y ocio</option>
                            <option value="Taxes" className="text-body dark:text-black">Impuestos</option>
                            <option value="Transport & Travel" className="text-body dark:text-black">Transporte y viajes</option> */}
                        </select>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-primary text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Concepto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Referencia
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoría
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Monto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white text-center">
                                {((flagState)?'Cargando...':'Sin registros')}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    const maxPages = Math.ceil(((data.count)?data.count:0) / rowsPerPage);
    const handleClickNext = () => {
        if ((currentPage + 1) <= maxPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrevious = () => {
        if ((currentPage - 1) > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mb-4">
                <div>
                    <label htmlFor="date_start" className="font-semibold text-black dark:text-white">Fecha inicio</label>
                    <div className="flex items-center rounded-md px-3 py-2">
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                        </div> {/* Aquí agregamos el icono */}
                        
                        <FlatpickrComponent maxDate={defaultDate} minDate={''} defaultDate={defaultDateStart} modePick={'single'} handleChange={handleChangeStart} />
                </div>
                    </div>
                <div>
                    <label htmlFor="date_end" className="font-semibold text-black dark:text-white">Fecha final</label>
                    <div className="flex items-center rounded-md px-3 py-2">
                        <div className="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                        </div> {/* Aquí agregamos el icono */}
                        <FlatpickrComponent maxDate={defaultDate} minDate={''} defaultDate={defaultDateEnd} modePick={'single'} handleChange={handleChangeEnd} />
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="font-semibold text-black dark:text-white">Tipo</label>
                    <select
                        value={categorySelect}
                        onChange={(e) => {
                            setCategorySelect(e.target.value)
                        }}
                        className={`relative z-20 w-full rounded border border-black px-5 py-3 transition focus:border-primary active:border-primary text-black"}`}
                        >
                        <option value="" disabled className="text-body dark:text-black">Selecciona una opción</option>
                        <option value="INFLOW" className="text-body dark:text-black">INFLOW</option>
                        <option value="OUTFLOW" className="text-body dark:text-black">OUTFLOW</option>
                        {/* <option value="Transfers" className="text-body dark:text-black">Transferencias</option>
                        <option value="Fees & Charges" className="text-body dark:text-black">Tarifas y cargos</option>
                        <option value="Income & Payments" className="text-body dark:text-black">Ingresos y Pagos</option>
                        <option value="Credits & Loans" className="text-body dark:text-black">Créditos y Préstamos</option>
                        <option value="Investments & Savings" className="text-body dark:text-black">Inversiones y Ahorros</option>
                        <option value="Home & Life" className="text-body dark:text-black">Hogar y Vida</option>
                        <option value="Bills & Utilities" className="text-body dark:text-black">Facturas y servicios públicos</option>
                        <option value="Personal Shopping" className="text-body dark:text-black">Compras personales</option>
                        <option value="Withdrawals & ATM" className="text-body dark:text-black">Retiros y cajero automático</option>
                        <option value="Food & Groceries" className="text-body dark:text-black">Alimentos y Abarrotes</option>
                        <option value="Deposits" className="text-body dark:text-black">Depósitos</option>
                        <option value="Online Platforms & Leisure" className="text-body dark:text-black">Plataformas online y ocio</option>
                        <option value="Taxes" className="text-body dark:text-black">Impuestos</option>
                        <option value="Transport & Travel" className="text-body dark:text-black">Transporte y viajes</option> */}
                    </select>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="bg-primary text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Concepto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Referencia
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Monto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(data.count == 0)?
                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white text-center">
                            {((flagState)?'Cargando...':'Sin registros')}
                        </th>
                    </tr>
                    :''}

                    {data.results?.map((item, index) => (
                        <tr key={index} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.description}
                            </th>
                            <td className="px-6 py-4">
                                {item.reference}
                            </td>
                            <td className="px-6 py-4">
                                {item.category}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.amount} {item.currency}
                            </td>
                            <td className="px-6 py-4">
                                {moment(item.value_date).format('DD-MM-YYYY')}
                            </td>
                            <td className="px-6 py-4">
                                {item.type}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex rounded-full bg-${(item.status == 'PENDING' || item.status == 'pending')?'warning':"success"} px-3 py-1 text-sm font-medium text-white hover:bg-opacity-90 rounded`}>{item.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePaginate data={data} itemsPerPage={rowsPerPage} currentPage={currentPage} handleClickNext={handleClickNext} handleClickPrevious={handleClickPrevious} />
        </>
    );
}