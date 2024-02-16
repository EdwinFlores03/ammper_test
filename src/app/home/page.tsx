import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bienvenido",
    description: "",
};

export default function HomePage() {
    return (
        <>
            <Breadcrumb pagePrevius="" pageName="Inicio" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 pb-6">
                Bienvenido a tu cuenta
            </div>
        </>
    );
}
