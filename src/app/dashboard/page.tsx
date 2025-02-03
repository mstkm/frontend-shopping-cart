import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

const DashboardPage = () => {
    return (
        <div className="p-8">
            <h1>Ini halaman Dashboard</h1>
        </div>
    )
}

export default DashboardPage;