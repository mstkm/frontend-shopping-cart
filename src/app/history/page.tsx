"use client";
// import Footer from "@/ui/Footer";
// import Header from "@/ui/Header";
import Link from "next/link";

export default function History() {
  return (
    <div className="h-min-screen h-screen flex flex-col">
      {/* <Header /> */}
      <main className="p-8 flex-1">
        <div className="flex justify-between mb-5">
          <div className="flex gap-2">
            <p>Dashboard</p>
            <p>/</p>
            <Link href="/dashboard/product" className="font-bold">
              History Order
            </Link>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="border bg-gray-100 rounded-lg shadow-md p-4 flex items-center space-x-4 w-full">
            <div className="w-20 h-20 bg-gray-500 rounded-md" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Lenovo V15 G3</h2>
              <p className="text-sm text-gray-600">Quantity : 2</p>
              <p className="text-sm text-gray-600">
                Alamat : Jalan Sudirman No. 25, Kel. Karet, Kec. Setiabudi,
                Jakarta Selatan, DKI Jakarta (12920)
              </p>
              <p className="text-lg font-bold mt-2">Total : Rp17.558.000</p>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
