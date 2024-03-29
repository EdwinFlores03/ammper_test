
import { Metadata } from "next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableOne from "../../components/Tables/TableOne";
import TableTwo from "../../components/Tables/TableTwo";
import TableThree from "../../components/Tables/TableThree";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Bienvenido",
  description: "",
};

export default function DashboardPage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pagePrevius="" pageName="Tables" />

        <div className="flex flex-col gap-10">
          <TableOne />
          <TableTwo />
          <TableThree />
        </div>
      </DefaultLayout>
    </>
  );
}
