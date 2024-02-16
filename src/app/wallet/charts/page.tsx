'use client';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import LineChart from './LineChart';
import PieChart from './PieChart';
import HistogramChart from './HistogramChart';
import ScatterChart from './ScatterChart';
import FlatpickrComponent from "../../../components/Forms/DatePicker/FlatpickrComponent";
import moment from "moment";
import { getAllTransactions, postAllTransactions } from "../../../utils/belvo";

export default function TransactionsPage() {    
    const [dataLinkId, setDataLinkId] = useState(null);
    const [loader, setLoader] = useState(true);
    const rowsPerPage = 1000;
    const [typeSelect, setTypeSelect] = useState('');

    const dateStart = moment().subtract(3, 'months').format('YYYY-MM-DD');
    const dateEnd = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const [defaultDateStart, setDefaultDateStart] = useState(dateStart);
    const [defaultDateEnd, setDefaultDateEnd] = useState(dateEnd);
    const defaultDate = moment().format('YYYY-MM-DD');

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({date_from: dateStart, date_to:dateEnd, type_select: dateEnd});

    const handleChangeStart = (dateSelected) => {
        setDefaultDateStart(dateSelected);
        setFilter(prevState => ({
            ...prevState,
            date_from: dateSelected
        }));
    };

    const handleChangeEnd = (dateSelected) => {
        setDefaultDateEnd(dateSelected);
        setFilter(prevState => ({
            ...prevState,
            date_to: dateSelected
        }));
    };

    useEffect(() => {
        const link_id = window.localStorage.getItem('link_id');
        setDataLinkId(link_id);
        setLoader(false);
        fetchData(link_id);
    }, []);

    const fetchData = async (link_id) => {
        setLoader(true);
        try {
            // const responseData = await getAllTransactions(rowsPerPage, link_id, defaultDateStart, defaultDateEnd, typeSelect);
            // console.log("RESPUESTA: "+responseData.count);
            // setData(responseData);

            const responseData = await postAllTransactions(link_id, defaultDateStart, defaultDateEnd);
            setData(responseData);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        if (dataLinkId) {
            fetchData(dataLinkId);
        }
    }, [defaultDateStart,defaultDateEnd]);

    return (
        <>
            <Breadcrumb pagePrevius="Estado de cuenta" pageName="Graficas" />
            <div className="mb-4 rounded border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
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
                </div>
            </div>
                {
                    loader 
                    ?
                    <div>
                        <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <h3>Cargando...</h3>
                            </div>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <h3>Cargando...</h3>
                            </div>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <h3>Cargando...</h3>
                            </div>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <h3>Cargando...</h3>
                            </div>
                        </div>
                    </div>

                    :

                    <div>
                        <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <LineChart data={data} filter={filter} />
                            </div>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <PieChart data={data} filter={filter} />
                            </div>
                            <div className="w-max-full rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <HistogramChart data={data} filter={filter} />
                            </div>
                            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                {/* <ScatterChart data={data} filter={filter} /> */}
                            </div>
                        </div>
                    </div>
                }
        </>
    );
}