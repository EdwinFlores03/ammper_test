'use client';
import { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import TableList from "../transactions/TableList";

export default function TransactionsPage() {
    const [dataLinkId, setDataLinkId] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const link_id = window.localStorage.getItem('link_id');
        setDataLinkId(link_id);
        setLoader(false);
    }, []);

    return (
        <>
            <Breadcrumb pagePrevius="Estado de cuenta" pageName="Graficas" />

            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                {loader ? <Loader /> : 'CHARTS'}
            </div>
        </>
    );
}