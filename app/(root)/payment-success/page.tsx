"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {

  const searchParams = useSearchParams();

  const amount = searchParams.get("amount")
  const eventId = searchParams.get("eventId")
  const userId = searchParams.get("userId")

  useEffect(() => {
    const createTicket = async () => {
      try {
        const response = await fetch(`/api/create-ticket?amount=${amount}&eventId=${eventId}&userId=${userId}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
        })

        const data = response.json();
      } catch (error) {
        console.log(error)
      }
    }

    createTicket();
  }, [])

  return (

    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">Payment is Successfull</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>

        <div>
          <Link href={"/"}>Back To Home</Link>
        </div>
      </div>
    </main>
  );
}