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
            <div className="flex-1 flex justify-start items-center">
                <Image 
                    src="/images/shopping.png"
                    alt="ilustrasi-shopping"
                    width={607}
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