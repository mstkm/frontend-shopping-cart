import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Welcome to Shopping Cart",
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-5 items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Shopping Cart</h1>
      </div>
      <div>
        <Link href="/register" className="p-2 bg-blue-500 rounded text-white">Register</Link>
      </div>
    </div>
  );
}
