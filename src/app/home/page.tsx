import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title:
    "Bienvenido",
  description: "",
};

export default function HomePage() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pagePrevius="" pageName="Inicio" />

        <div className="flex flex-col gap-10">
          Hola inicio
          
        </div>
      </DefaultLayout>
    </>
  );
}