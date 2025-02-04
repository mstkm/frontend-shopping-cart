"use client"
import Footer from "@/ui/Footer";
import Header from "@/ui/Header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Halaman Product</h1>
      </main>
      <Footer/>
    </div>
  );
}
