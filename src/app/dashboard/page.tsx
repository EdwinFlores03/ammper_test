
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Bienvenido",
  description: "",
};

export default function HomePage() {
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
