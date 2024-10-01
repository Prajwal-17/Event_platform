"use client"

import { registerAction } from "@/actions/register"
import warning from "@/public/warning-icon.png"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useState } from "react";
import success from "@/public/success-icon.png"
import Link from "next/link";

export default function Register() {

  const router = useRouter();

  const [successMsg, setSuccessMsg] = useState<string | undefined>("")
  const [errorMsg, setErrorMsg] = useState<string | undefined>("")

  const handleForm = async (formData: FormData) => {
    setSuccessMsg("")
    setErrorMsg("")

    try {
      const result = await registerAction(formData)

      if (result.success) {
        setSuccessMsg(result.success)
        router.push("/auth/login")
      }

      if (result.error) {
        setErrorMsg(result.error)
      }
    } catch (err: any) {
      console.log(err)

    }
  }

  return (<>
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" action={handleForm}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-flowbite-600 focus:border-flowbite-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Cena" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-flowbite-600 focus:border-flowbite-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ucantseeme@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-flowbite-600 focus:border-flowbite-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-flowbite-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-flowbite-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium line-through text-flowbite-600 hover:underline dark:text-flowbite-500 ">Forgot password?</a>
                </div>
                <div>
                  {successMsg && (
                    <div className="flex gap-2 justify-start items-center w-full shadow-lg border-2 border-green-500 bg-red-50 px-4 py-3 text-sm rounded-lg text-green-600">
                      <Image
                        src={success}
                        alt="success"
                        height={25}
                        width={25}
                        className="object-contain"
                      />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {!successMsg && errorMsg && (
                    <div className="flex gap-2 justify-start items-center w-full shadow-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-sm rounded-lg text-red-600">
                      <Image
                        src={warning}
                        alt="error"
                        height={25}
                        width={25}
                        className="object-contain"
                      />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>
                <button type="submit" className="w-full  text-white bg-flowbite-600 hover:bg-flowbite-700 focus:ring-4 focus:outline-none focus:ring-flowbite-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-0 text-center dark:bg-flowbite-600 dark:hover:bg-flowbite-700 dark:focus:ring-flowbite-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link href="/auth/login" className="font-medium text-flowbite-600 hover:underline dark:text-flowbite-500" >Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>)
}
