import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";
import TableThree from "@/components/Tables/TableThree";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title:
    "Transacciones",
  description: "",
};

export default function TransactionsPage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pagePrevius="Estado de cuenta" pageName="Transacciones" />

        <div className="flex flex-col gap-10">
          <TableOne />
          <TableTwo />
          <TableThree />
        </div>
      </DefaultLayout>
    </>
  );
}