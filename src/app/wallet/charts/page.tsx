'use client';

import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";


export default function TransactionsPage() {
    const linkId = localStorage.getItem('link_id');

    return (
        <>
            <Breadcrumb pagePrevius="Estado de cuenta" pageName="Graficas" />
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                Charts space
            </div>
        </>
    );
}