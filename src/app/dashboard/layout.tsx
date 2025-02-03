"use client";

import { ReactNode } from "react";
import "../globals.css";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

interface PropTypes {
    children: ReactNode;
}

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const AdminLayout = ({ children }: PropTypes) => {
    const pathname = usePathname();

    return (
        <div className={`${montserrat.className}`}>
            <div className="flex">
                <div className="flex flex-col px-8 pt-4 pb-12 justify-between gap-4 h-screen min-w-fit w-[16rem] border-r-1 shadow-md bg-[#188cef] text-white">
                    <div>
                        <div className="flex items-center justify-start mb-8">
                        <h1 className="font-bold text-2xl">AppShop</h1>
                        </div>
                        <p className="mb-3">Menu</p>
                        <div>
                            <Link href="/dashboard/product">
                                <div className={`w-full p-3 cursor-pointer font-bold ${pathname === "/dashboard/product" ? "rounded bg-[#006aca]" : ""}`}>Produk</div>
                            </Link>
                        </div>
                        <div>
                            <Link href="/dashboard/transaction">
                                <div className={`w-full p-3 cursor-pointer font-bold ${pathname === "/dashboard/transaction" ? "rounded bg-[#006aca]" : ""}`}>Penjualan</div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button 
                            className="bg-[#006aca] font-bold text-white"
                            onPress={() => signOut()}
                        >
                            <FiLogOut />
                            Logout
                        </Button>
                    </div>
                </div>
                <div>
                    {/* <div className="flex justify-end w-full">
                        <Image 
                            src="/images/user.png"
                            alt="user"
                            width={50}
                            height={50}
                        />
                    </div> */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;