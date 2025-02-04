"use client"
import Footer from "@/ui/Footer";
import Header from "@/ui/Header";

export default function Home() {
  return (
    <div className="h-min-screen h-screen flex flex-col">
      <Header />
      <main className="p-8 flex-1">
        <h1 className="text-3xl font-bold">Halaman Product</h1>
      </main>
      <Footer/>
    </div>
  );
}
