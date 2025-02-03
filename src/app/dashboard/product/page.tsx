import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Product",
    description: "Dashboard Product",
};

const DashboardProductPage = () => {
    return (
        <div className="p-8">
            <h1>Ini halaman Dashboard Produk</h1>
        </div>
    )
}

export default DashboardProductPage;