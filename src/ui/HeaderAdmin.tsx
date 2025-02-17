"use client"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
const HeaderAdmin = () => {
    const { data: session } = useSession();
    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex gap-2">
                    <p>Dashboard</p>
                    <p>/</p>
                    <Link href="/dashboard/product" className="font-bold">Product</Link>
                </div>
                <div className="flex gap-2">
                    <h2 className="p-1">{session?.user?.name ?? "Guest"}</h2>
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
                            <DropdownItem key="logout" onPress={() => signOut({ callbackUrl: "http://localhost:3001" })}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default HeaderAdmin;