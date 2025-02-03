"use client"

import { ReactNode } from "react";
import "../globals.css";
import { Montserrat } from "next/font/google";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

interface PropTypes {
    children: ReactNode;
}

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const UserLayout = ({ children }: PropTypes) => {
    return (
        <div className={`${montserrat.className}`}>
            {children}
            <div>
                <Button onPress={() => signOut()}>Logout</Button>
            </div>
        </div>
    )
}

export default UserLayout;