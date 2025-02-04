"use client"
// import Footer from "@/ui/Footer";
// import Header from "@/ui/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center mt-10">You not login.</p>;
  }

  return (
    <div className="h-min-screen h-screen flex flex-col">
      {/* <Header /> */}
        <main className="p-8 flex-1">
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
              <Image
                src="/images/user.png"
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <h2 className="text-xl font-semibold mt-4">{session.user?.name}</h2>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>
        </main>
      {/* <Footer/> */}
    </div>
  );
}
