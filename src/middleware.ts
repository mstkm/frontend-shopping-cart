import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { IToken } from "./types/Types";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    }) as IToken;

    const { pathname }  = request.nextUrl;
    const isAdmin = token?.user?.role === "admin";
    
    if (pathname === "/register" || pathname === "/login") {
        if (token) {
            if (isAdmin) {
                return NextResponse.redirect(new URL("/dashboard/product", request.url));
            } 
        } 
    } else {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (pathname === "/") {
        if (isAdmin) {
            return NextResponse.redirect(new URL("/dashboard/product", request.url));
        } else {
            return NextResponse.redirect(new URL("/product", request.url));
        }
    }

    if (pathname.startsWith("/dashboard")) {
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/product", request.url));
        }
    }
    
    NextResponse.next();
}

export const config = {
    matcher: ["/", "/register/:path*", "/login/:path*", "/dashboard/:path*"],
}