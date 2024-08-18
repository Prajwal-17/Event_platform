import Image from "next/image";
import { Button } from "./ui/button";

export default function Home() {
  return (<>
    <main>

      <div className="bg-[rgb(246,248,253)] px-24 py-10 w-full min-h-96">
        <div className="grid grid-cols-2 content-between gap-8">
          <div className="flex flex-col justify-center gap-7">
            <div className="flex-wrap font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
              Host,Connect,
              Celebrate:Your
              Events,Our Platform!
            </div>

            <div className="text-[23px]">
              Book and learn helpful tips from 3,168+ mentors in
              world-class companies with our global community.
            </div>

            <div>
              <Button className="bg-[rgb(98,76,245)] px-7 py-6 font-medium rounded-3xl hover:bg-[#4732d1] ">Explore Now</Button>
            </div>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={"/hero.png"}
              alt="Hero Image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

    </main>
  </>)
} 