"use client";

import { ReactNode } from "react";
import "../globals.css";
import { Montserrat } from "next/font/google";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { ShoppingCart, ClipboardList } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
    children: ReactNode;
}

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


const UserLayout = ({ children }: PropTypes) => {
    const { data: session } = useSession();
    return (
        <div className={`${montserrat.className}`}>
            <div>
                <nav className="bg-white shadow-md h-[4rem] px-8 flex gap-3 justify-between items-center sticky top-0 z-10">
                    {/* Logo */}
                    <div className="text-xl text-blue-500 font-bold">
                        <Link href="/product">AppLap</Link>
                    </div>

                    {/* Search Bar */}
                    {/* <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleSearch?.(e.target.value)}
                        />
                        <Search className="absolute left-2 ps-5 top-2 text-gray-400" size={20} />
                    </div> */}

                    {/* Menu */}
                    <div className="flex gap-8 items-center">
                        <button className="flex items-center space-x-2 hover:text-blue-600">
                            <Link href="history"><ClipboardList size={24} /></Link>
                        </button>

                        <button className="flex items-center space-x-2 hover:text-blue-600">
                            <Link href="cart"><ShoppingCart size={24} /></Link>
                        </button>

                        <h2>{session?.user?.name ?? "Guest"}</h2>

                        {/* Profile */}
                        <Dropdown>
                            <DropdownTrigger className="cursor-pointer">
                                <Image 
                                    src="/images/user.png"
                                    alt="User"
                                    width={30}
                                    height={30}
                                />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="profile" onPress={() => (window.location.href = "/profile")}>
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="logout" onPress={() => signOut({ callbackUrl: "http://localhost:3001" })}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </nav>
                <div className="w-full px-8 py-4">
                    {children}
                </div>
                {/* <footer className="bg-blue-500 text-white p-6 mt-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
                        <div className="text-xl font-bold">APPLAP</div>

                        <div>
                            <h3 className="font-semibold mb-2">Product</h3>
                            <ul>
                                <li><a href="#">Laptop</a></li>
                                <li><a href="#">Smartphone</a></li>
                                <li><a href="#">Tablet</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Support</h3>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Company</h3>
                            <ul>
                                <li><a href="#">About</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white mt-6 pt-4 flex justify-between text-sm opacity-70">
                        <span>APPLAP Inc. 2025</span>
                        <div className="space-x-4">
                            <a href="#">Terms</a>
                            <a href="#">Privacy</a>
                        </div>
                    </div>
                </footer> */}
            </div>
        </div>
    )
}

export default UserLayout;