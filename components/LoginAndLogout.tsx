"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link";

export default function LoginAndLogout() {

  const { data: session } = useSession();

  return (<>
    <div className="flex flex-col items-start md:flex-row gap-2">

      {session ? (
        <div>
          <div className="bg-black text-white font-semibold rounded-full py-2 px-4 border-2 border-slate-600 hidden md:flex">
            {session ? session.user.name?.slice(0, 1).toUpperCase() : ""}
          </div>
          <div className="bg-black text-white font-semibold rounded-2xl border-2 border-slate-600 py-1 px-4 md:hidden ">
            {session ? session.user.email : ""}
          </div>
        </div>
      ) : ""}

      <div>
        {session ? (
          <Button
            onClick={() => signOut()}
            className="bg-[#E63946] px-6 py-6 font-medium rounded-3xl hover:bg-[#D62828]  "
          >
            Logout
          </Button>
        ) : (
          <Button
            className="bg-[rgb(98,76,245)] px-7 py-6 font-medium rounded-3xl hover:bg-[#4732d1]"
          >
            <Link href="/auth/login" >Login</Link>
          </Button>
        )}
      </div>

    </div>
  </>)
}
