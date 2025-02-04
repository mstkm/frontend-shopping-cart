"use client";

import { ReactNode } from "react";
import "../globals.css";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { TbBrandDatabricks } from "react-icons/tb";
import { LuShoppingBag } from "react-icons/lu";
import { BsFillPeopleFill } from "react-icons/bs";

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
                                <div className={`flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-blue-600 ${pathname === "/dashboard/product" ? "rounded bg-blue-700" : ""}`}>
                                    <span className="flex items-center gap-2">
                                        <TbBrandDatabricks size={20} />
                                        Product
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="/dashboard/order">
                                <div className={`flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-blue-600 ${pathname === "/dashboard/order" ? "rounded bg-blue-700" : ""}`}>
                                    <span className="flex items-center gap-2">
                                        <LuShoppingBag size={20} />
                                        Order
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="/dashboard/about">
                                <div className={`flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-blue-600 ${pathname === "/dashboard/about" ? "rounded bg-blue-700" : ""}`}>
                                    <span className="flex items-center gap-2">
                                        <BsFillPeopleFill size={20} />
                                        About
                                    </span>
                                </div>
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
                <div className="h-screen w-full px-8 py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;