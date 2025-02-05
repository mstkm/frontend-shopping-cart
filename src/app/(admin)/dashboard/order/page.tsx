import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Transaction",
  description: "Dashboard Transaction",
};

const DashboardProductPage = () => {
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2">
          <p>Dashboard</p>
          <p>/</p>
          <Link href="/dashboard/product" className="font-bold">
            History Order
          </Link>
        </div>
        <div>
          <Image src="/images/user.png" alt="User" width={30} height={30} />
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
    </div>
  );
};

export default DashboardProductPage;
