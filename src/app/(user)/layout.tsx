"use client";

import { ReactNode } from "react";
import "../globals.css";
import { Montserrat } from "next/font/google";
import { Button } from "@heroui/react";
import { Search, ShoppingCart, ClipboardList, User, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

interface PropTypes {
    children: ReactNode;
}

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const UserLayout = ({ children }: PropTypes) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${montserrat.className}`}>
            <div className="flex flex-col">
                <nav className="bg-white shadow-md p-4 flex gap-3 justify-between items-center">
                    {/* Logo */}
                    <div className="text-xl text-blue-500 font-bold">
                        <Link href="/product">AppLap</Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-2 ps-5 top-2 text-gray-400" size={20} />
                    </div>

                    {/* Menu */}
                    <div className="flex gap-3 items-center">
                        <button className="flex items-center space-x-2 hover:text-blue-600">
                            <Link href="history"><ClipboardList size={24} /></Link>
                        </button>

                        <button className="flex items-center space-x-2 hover:text-blue-600">
                            <Link href="cart"><ShoppingCart size={24} /></Link>
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 hover:text-blue-600"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <User size={24} />
                                <span className="font-medium">John Cena</span>
                                <ChevronDown size={20} />
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                                    <a href="#" className="block px-4 py-2 hover:bg-blue-400">Profile</a>
                                    {/* <a href="#" className="block px-4 py-2 hover:bg-blue-400">Logout</a> */}
                                    <Button onPress={() => signOut()}>Logout</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                <div className="h-screen w-full px-8 py-4">
                    {children}
                </div>
                <footer className="bg-blue-500 text-white p-6 mt-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
                        {/* Logo */}
                        <div className="text-xl font-bold">APPLAP</div>

                        {/* Product Menu */}
                        <div>
                            <h3 className="font-semibold mb-2">Product</h3>
                            <ul>
                                <li><a href="#">Laptop</a></li>
                                <li><a href="#">Smartphone</a></li>
                                <li><a href="#">Tablet</a></li>
                            </ul>
                        </div>

                        {/* Support Menu */}
                        <div>
                            <h3 className="font-semibold mb-2">Support</h3>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        {/* Company Menu */}
                        <div>
                            <h3 className="font-semibold mb-2">Company</h3>
                            <ul>
                                <li><a href="#">About</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Hairline */}
                    <div className="border-t border-white mt-6 pt-4 flex justify-between text-sm opacity-70">
                        <span>APPLAP Inc. 2025</span>
                        <div className="space-x-4">
                            <a href="#">Terms</a>
                            <a href="#">Privacy</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default UserLayout;