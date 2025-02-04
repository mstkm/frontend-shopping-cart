"use client";

import { Button } from "@heroui/react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const SuccessOrderPage = () => {
    return (
        <main className="flex flex-col gap-2 justify-center items-center h-screen w-screen">
            <IoCheckmarkDoneOutline className="text-[10rem] text-green-500" />
            <h1 className="text-3xl font-bold">Success Order</h1>
            <Button variant="bordered" color="success" href="/history">Go To Order History Page</Button>
        </main>
    )
}

export default SuccessOrderPage;