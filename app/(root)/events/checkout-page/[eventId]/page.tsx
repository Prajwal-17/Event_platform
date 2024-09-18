"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EventProps } from "@/lib/types";
import CheckoutPage from "@/components/CheckoutPage";

export default function CheckoutPageContainer({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;

  const [event, setEvent] = useState<EventProps | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setEvent(data.event);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("Stripe Public Key not defined");
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  const price = convertToSubcurrency(Number(event?.price));

  if (!event) {
    return <div>loading....</div>;
  }

  return (
    <>
      <main className="w-full flex flex-col lg:flex-row justify-center items-start py-9 px-5 sm:px-10 md:px-20 lg:px-28">
        <div className="w-full lg:w-1/2 h-full py-10 px-5 sm:px-10 md:px-16 border-b lg:border-r lg:border-b-0">
          <div className="mb-4">
            <Image src={"/logo.svg"} alt="evently logo" width={100} height={100} />
          </div>
          <div className="mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">{event?.title}</h2>
          </div>
          <div className="text-gray-600 mb-4">TEST MODE</div>
          <div className="text-3xl md:text-4xl font-bold mb-2">{price}</div>
        </div>

        <div className="w-full lg:w-1/2 py-10 px-5 sm:px-10 md:px-16">
          <Elements
            stripe={stripePromise}
            options={{
              amount: price,
              currency: "usd",
              mode: "payment",
            }}
          >
            <CheckoutPage
              amount={price}
              eventId={event.id}
              userId={event.user.id}
            />
          </Elements>
        </div>
      </main>
    </>
  );
}
