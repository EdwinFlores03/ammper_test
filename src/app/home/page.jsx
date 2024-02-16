import { Metadata } from "next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

export default function HomePage() {

    return (
      <>
          <Breadcrumb pagePrevius="" pageName="Inicio" />

          <div className="flex flex-col gap-10">
            Hola inicio
          </div>
      </>
    );
}