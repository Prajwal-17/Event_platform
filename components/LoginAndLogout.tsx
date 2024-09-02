"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link";

export default function LoginAndLogout() {

  const { data: session } = useSession();

  return (<>
    <div className="flex items-center gap-2">

      <div>
        {session ? <p>{session?.user.email}</p> : ""}
      </div>

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
