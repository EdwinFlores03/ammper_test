'use client';
import { Metadata } from "next";
import TableList from "./TableList";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
    const [linkId, setLinkId] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userDataStorage = JSON.parse(window.localStorage.getItem('userData'));
            setLinkId(userDataStorage.link_id);
        }
      }, []);

    return (
        <>
            <Breadcrumb pagePrevius="Estado de cuenta" pageName="Transacciones" />

            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <TableList linkId={linkId} />
            </div>
        </>
    );
}