import { ReactNode } from "react";
import Image from "next/image";
import "../globals.css";
import { Montserrat } from "next/font/google";

interface PropTypes {
    children: ReactNode;
}

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const AuthLayout = ({ children }: PropTypes) => {
    return (
        <div className={`${montserrat.className} h-screen flex gap-20`}>
            <div className="flex-1 flex justify-end items-center">
                <Image 
                    src="/images/ilustrasi-online-shop.png"
                    alt="ilustrasi-online-shop"
                    width={500}
                    height={500}
                />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;