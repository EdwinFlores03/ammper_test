import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getInstitutions } from "@/utils/belvo";
import PaginatedTable from "../../../components/Tables/PaginatedTable"

export const metadata: Metadata = {
    title: "Transacciones",
    description: "",
};

const institutions = await getInstitutions();

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Edad',
        accessor: 'age',
    },
];

const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Doe', age: 40 },
    // Agrega más datos según sea necesario
];

export default function TransactionsPage() {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pagePrevius="Estado de cuenta" pageName="Transacciones" />
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="px-6 py-4">
                    <ul>
                        <PaginatedTable columns={columns} data={data} />
                        {institutions.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Tag1</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Tag2</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#Tag3</span>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}