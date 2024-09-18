import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (<>
    <hr />
    <header className="w-full  flex text-center justify-between px-6 md:px-12 py-6">
      <div className="flex w-full justify-between items-center ">
        <Link href="/" >
          <Image
            src="/logo.svg" width={128} height={38}
            alt="Evently logo"
          />
        </Link>
        <p className="text-md">
          2024 Evently. All Rights reserved.
        </p>
      </div>
    </header>
  </>)
}