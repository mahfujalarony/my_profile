"use client";

import Image from "next/image";
import { Mind } from "./Components/Mind";
import { About } from "./Components/About";
import { Edu_SA_Beginner, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Loader from "./Components/ui/loader";
import type { Profile } from "./types/profileType";
import { getDeviceName } from "./utils/deviceDetector";

const eduFont = Edu_SA_Beginner({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
            timezone: Intl. DateTimeFormat().resolvedOptions().timeZone,
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
        const data = await res. json();

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto w-full max-w-2xl px-3 sm:px-4 py-4 sm:py-6">
        
        {/* Profile Header Card */}
        <header className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-lg border border-blue-100 dark:border-slate-700">
          
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-90" />

          {/* Profile Content */}
          <div className="relative flex flex-col items-center px-4 sm:px-6 pb-6 sm:pb-8">
            
            {/* Profile Image */}
            <div className="mt-12 sm:mt-16 mb-4">
              {profileData?. profileimage ?  (
                <div className="relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75" />
                  <img
                    src={profileData.profileimage}
                    alt="profile"
                    className="relative rounded-full border-4 border-white dark:border-slate-700 w-28 h-28 sm:w-36 sm:h-36 object-cover shadow-xl"
                  />
                  {/* Online Status Dot */}
                  <span className="absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white dark:border-slate-700 rounded-full" />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75" />
                  <div className="relative rounded-full border-4 border-white dark:border-slate-700 w-28 h-28 sm:w-36 sm:h-36 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shadow-xl">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
              )}
            </div>

            {/* Name */}
            <h1
              className={`${eduFont.className} text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white text-center`}
            >
              {profileData?.name || "No Name Added"}
            </h1>

            {/* Bio */}
            <p
              className={`${montserrat.className} mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 text-center leading-relaxed whitespace-pre-wrap max-w-md px-2`}
            >
              {profileData?. bio || "No bio available"}
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 sm:gap-8 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-700 w-full justify-center">
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  0
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Posts
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-600" />
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  0
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Followers
                </p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-600" />
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  0
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Following
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="mt-4 sm:mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-1. 5 sm:p-2 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex gap-2">
              <button
                onClick={() => setToggle("mind")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2. 5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                  toggle === "mind"
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span>💭</span>
                <span>Mind</span>
              </button>

              <button
                onClick={() => setToggle("about")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                  toggle === "about"
                    ?  "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span>👤</span>
                <span>About</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <main className="mt-4 sm:mt-6">
          {toggle === "mind" ?  <Mind /> : <About />}
        </main>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pb-6 text-center">
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
            Made with 💙 by {profileData?.name || "You"}
          </p>
        </footer>
      </div>
    </div>
  );
}