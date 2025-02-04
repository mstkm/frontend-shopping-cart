import { Button } from "@heroui/react";
import { Search, ShoppingCart, ClipboardList, User, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md p-4 flex gap-3 justify-between items-center">
            {/* Logo */}
            <div className="text-xl text-blue-500 font-bold">APPLAP</div>

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
                    <ClipboardList size={24} />
                </button>

                <button className="flex items-center space-x-2 hover:text-blue-600">
                    <ShoppingCart size={24} />
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
    )
}

export default Header;