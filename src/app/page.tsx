import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Welcome to Shopping Cart",
};

export default function Home() {
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold">Halaman Product</h1>
      </div>
    </div>
  );
}
