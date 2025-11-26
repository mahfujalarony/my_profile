"use client";

import Image from "next/image";
import { Mind } from "./Components/Mind";
import { About } from "./Components/About";
import { Edu_SA_Beginner, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Loader from "./Components/ui/loader";
import type {Profile}  from "./types/profileType";
import { getDeviceName } from "./utils/deviceDetector";

const buttonStyle = {
  color: "blue",
  fontSize: "1rem",
  padding: "1.5rem",
};

const eduFont = Edu_SA_Beginner({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Home() {
  const [toggle, setToggle] = useState<string>("mind");
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendVisitorInfo = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            device: getDeviceName(),       
          }),
        });
      } catch (e) {
        console.error("Error tracking visitor", e);
      }
    };

    sendVisitorInfo();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/editprofile");
        const data = await res.json();

        if (data) {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto w-full lg:w-xl">
      <header className="border border-blue-700 m-2 rounded-2xl">
        <div className="flex flex-col items-center px-5">
          {profileData?.profileimage ? (
            <img
              src={profileData.profileimage}
              alt="profile"
              className="rounded-full border-blue-400 border-3 mt-8 w-[150px] h-[150px] object-cover"
            />
          ) : (
            <div className="rounded-full border-blue-400 border-3 mt-8 w-[150px] h-[150px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          <h1 className={`${eduFont.className} text-2xl mt-5`}>
            {profileData?.name || "No Name Add"}
          </h1>

            <p className={`${montserrat.className} mt-7 mb-10 whitespace-pre-wrap `}>
              {profileData?.bio || "No bio available"}
            </p>

        </div>
      </header>

      <main>
        <div className="mt-10 items-center flex px-4 gap-3">
          <a
            className={`px-5 cursor-pointer py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm 
                ${toggle === "mind" ? "border border-blue-500" : ""}`}
            onClick={() => setToggle("mind")}
          >
            Mind
          </a>

          <a
            className={`px-5 cursor-pointer py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm 
                ${toggle === "about" ? "border border-blue-500" : ""}`}
            onClick={() => setToggle("about")}
          >
            About
          </a>
        </div>

        <div className="mt-8">{toggle === "mind" ? <Mind /> : <About />}</div>
      </main>
    </div>
  );
}