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
    // const isAdmin = token.user?.role === "Admin";
    if (pathname === "/register" || pathname === "/login" || pathname === "/") {
        if (token) {
            if (token.user?.role === "Admin") {
                return NextResponse.redirect(new URL("/dashboard/product", request.url));
            } 
        } 
    } else {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    
    NextResponse.next();
}

export const config = {
    matcher: ["/", "/register/:path*", "/login/:path*", "/dashboard/:path*"],
}