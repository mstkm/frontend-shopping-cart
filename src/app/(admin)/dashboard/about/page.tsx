import { Metadata } from "next";
import Image from "next/image";
// import Link from "next/link";
import HeaderAdmin from "@/ui/HeaderAdmin";

export const metadata: Metadata = {
  title: "Dashboard | About",
  description: "Dashboard About",
};

const DashboardAboutPage = () => {
  const teamMembers = [
    {
      name: "Rahmat",
      role: "Backend Developer",
      image: "/images/rahmat.jpg",
      bio: "Rahmat is a backend developer with extensive experience in developing scalable and efficient systems.",
    },
    {
      name: "Mugi",
      role: "Frontend Developer",
      image: "/images/mugi.jpg",
      bio: "Mugi is a frontend developer specializing in building interactive and responsive web interfaces.",
    },
    {
      name: "Ilham",
      role: "UI/UX Designer",
      image: "/images/ilham.jpg",
      bio: "Ilham is a UI/UX designer committed to creating aesthetic and user-friendly designs.",
    },
  ];

  return (
    <div>
      <HeaderAdmin />
      <div>
        <div className="flex flex-col items-center w-full my-8">
          <h1 className="text-3xl font-bold text-center">About Member</h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl mt-2">
            Meet our dedicated team that makes everything possible.
          </p>

          <div className="flex item-center justify-center gap-5 mt-5">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-300 w-fit max-w-xs mx-auto shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="h-40 w-40 object-cover rounded-full mx-auto"
                />
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-gray-500">{member.role}</p>
                  <p className="text-gray-700 mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAboutPage;
