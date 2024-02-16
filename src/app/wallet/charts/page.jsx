'use client'
import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

export default function ChartsPage() {
    const [linkId, setLinkId] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userDataStorage = JSON.parse(window.localStorage.getItem('userData'));
            setLinkId(userDataStorage.link_id);
        }
    }, []);

    return (
        <>
            <Breadcrumb pagePrevius="Estado de cuenta" pageName="Graficas" />
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                Charts space
            </div>
        </>
    );
}