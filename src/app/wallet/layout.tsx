import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section>
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </section>
  );
}
