import Image from "next/image";
import rony from "../public/profile.jpg"
import ReadMoreArea from "@foxeian/react-read-more";
import { Edu_SA_Beginner, Montserrat  } from "next/font/google";


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
  const bio = "Ami Akta Jinda Las, katis na re jonlas bas";
  const name = "Mahfuj Alam Rony";
  const details = "The OPPO A12 is a budget-friendly smartphone featuring a 6.22-inch HD+ display, a MediaTek Helio P35 processor, and a 4230mAh battery. It includes a dual rear camera (13MP + 2MP) and a 5MP front camera, along with security features like a rear-mounted fingerprint sensor and AI face unlock. Available in Black and Blue, it runs on Android 9 with ColorOS 6.1 and offer     expand";
  return (
    <div>
      <header className="border border-blue-700 m-2 rounded-2xl">
        <div className="flex flex-col items-center">
          <Image src={rony} alt="profile" height={150} width={150}
          className="rounded-full border-blue-400 border-3 mt-8"
          />
          <h1 className={` ${eduFont.className} text-2xl mt-5`}>{name}</h1>

          <p className={`${montserrat.className} mt-3`}>{bio}</p>

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
    </div>
  );
}
