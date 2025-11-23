"use client";

import Image from "next/image";
import rony from "../public/profile.jpg"
import { Mind } from "./Components/Mind";
import { About } from "./Components/About";
import ReadMoreArea from "@foxeian/react-read-more";
import { Edu_SA_Beginner, Montserrat  } from "next/font/google";
import { useState } from "react";

interface toggle {
  toggleitem: 'mind' | 'about';
}

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
  const [toggle, setToggle] = useState<string>('mind');

  const bio = "Ami Akta Jinda Las, katis na re jonlas bas";
  const name = "Mahfuj Alam Rony";
  // const details = "একটা সময় ছিল, যখন আমার কোনো অস্তিত্বই ছিল না। তারপর একসময় পৃথিবীতে আমার আগমন হলো, এখন আমি আছি—শ্বাস নেই, বাঁচি, অনুভব করি। আবার একদিন এমন সময়ও আসবে, যখন আমি ছিলাম—এ কথা কেউই মনে রাখবে না। জীবন ঠিক এমনই একটি ক্ষণস্থায়ী যাত্রা। আমি শুধু চাই, আমার কারণে যেন কারও মনে কোনো কষ্ট না থাকে।";
  const details = "";
  return (
    <div>
      <header className="border border-blue-700 m-2 rounded-2xl">
        <div className="flex flex-col items-center">
          <Image src={rony} alt="profile" height={150} width={150}
          className="rounded-full border-blue-400 border-3 mt-8"
          />
          <h1 className={` ${eduFont.className} text-2xl mt-5`}>{name}</h1>

          <p className={`${montserrat.className} mt-7`}>{bio}</p>

          <ReadMoreArea
              className={` ${montserrat.className} flex flex-col mt-10 px-6`} 
              style={{ display: 'flex', flexDirection: 'column' }}
              expandLabel="Read more" 
              collapseLabel="Read less" 
              textClassName="text-lg text-black" 
              textStyle={{ fontSize: '1rem', color: 'black' }} 
              buttonClassName="text-base text-green-700 p-6" 
              buttonStyle={buttonStyle} n
              lettersLimit={100} 
    >
          
            {details}
          </ReadMoreArea>
        </div>
      </header>

      <body>
        <div className="mt-10 items-center flex px-4 gap-3">
            <a
              className={`px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm 
                ${toggle === "mind" ? "border border-blue-500" : ""}`}

                onClick={() => setToggle('mind')}
            >
              Mind
            </a>

            <a
              className={`px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm 
                ${toggle === "about" ? "border border-blue-500" : ""}`}
                onClick={() => setToggle('about')}
            >
              About
            </a>


        </div>

        <div className="px-4 mt-8">
          {toggle === 'mind' ? <Mind /> : <About />}
        </div>
      </body>
    </div>
  );
}
