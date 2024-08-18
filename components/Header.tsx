import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (<>
    <header className="w-full  flex text-center justify-between px-28 py-5">
      <div className="flex w-full justify-between items-center ">
        <Link href="/" >
          <Image
            src="/logo.svg" width={128} height={38}
            alt="Evently logo"
          />
        </Link>
        <div className="p-2 font-[600] flex  gap-4 ">
          <Link href='/' className="hover:text-[#4732d1]">Home</Link>
          <Link href='/create-event' className="hover:text-[#4732d1]">Create Event</Link>
          <Link href='my-profile' className="hover:text-[#4732d1]">My Profile</Link>
        </div>
        <Button className="bg-[rgb(98,76,245)] px-7 py-6 font-medium rounded-3xl hover:bg-[#4732d1]  ">Login</Button>
      </div>
    </header>
    <hr />
  </>)
}