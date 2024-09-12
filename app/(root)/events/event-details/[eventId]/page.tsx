"use client";

import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/dateFormat";
import { EventProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import searchSvg from "@/public/icons/search.svg";

export default function EventDetails({
  params,
}: {
  params: { eventId: string };
}) {
  const router = useRouter();

  const [event, setEvent] = useState<EventProps | null>(null);

  const [relatedEvents, setRelatedEvents] = useState<EventProps[] | null>([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${params.eventId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();

        setEvent(data.event);
        setRelatedEvents(data.relatedEvents);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [params.eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-[rgb(246,248,253)] px-24 py-10 w-full min-h-86 flex gap-7">
      <div className="w-1/2 flex items-center">
        <div className="w-full">
          <Image
            alt="image"
            src={event.imageUrl}
            layout="responsive"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-1/2">
          <div>
            <h1 className="text-4xl font-bold my-5 ">{event.title}</h1>
            <div className="flex my-3 gap-5 items-center">
              <div className="text-green-600 bg-green-100 rounded-xl font-semibold px-2 py-1 text-center">
                {`₹${event.price}`}
              </div>
              <div className="text-gray-500 font-semibold bg-gray-500/10 px-2 py-1 rounded-xl">
                {event.category.name}
              </div>
              <div className="text-blue-500 font-semibold">
                <span className="text-black">by</span> {event.user.name}
              </div>
            </div>

            <Button
              onClick={() => router.push(`/events/checkout-page/${event.id}`)}
              className="bg-[rgb(98,76,245)] px-7 py-6 font-medium rounded-3xl hover:bg-[#4732d1] ">
              Buy Ticket
            </Button>

            <div className="flex">
              <Image
                src="/icons/calendar.svg"
                alt="calender"
                width={20}
                height={20}
              />
              <div className="text-gray-500 font-semibold text-md my-4">
                {formatEventDate(event.startDateTime)}
              </div>
            </div>

            <div className="flex ">
              <Image
                src="/icons/location.svg"
                alt="calender"
                width={20}
                height={20}
              />
              <div>{event.location}</div>
            </div>

            <div className="my-4">
              <p className="text-gray-500 font-bold"> What You&#39;ll Learn:</p>
              <div className="mt-3">{event.description}</div>
            </div>

            <Link className="text-blue-500" href={event.url}>
              {event.url}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="px-24 py-10 w-full ">
          <h1 className="font-bold text-5xl">Related Events</h1>

          <div className="grid grid-cols-3 col-span-3 gap-10 mt-12 ">
            {relatedEvents && relatedEvents.length > 0 ? (
              relatedEvents.map((item: EventProps) => (
                <div
                  className="hover:cursor-pointer shadow-lg rounded-xl flex flex-col h-full"
                  onClick={() => {
                    router.push(`/relatedEvents/event-details/${item.id}`);
                  }}
                  key={item.id}
                >
                  <div className="relative h-48">
                    <Image
                      src={item.imageUrl}
                      layout="fill"
                      objectFit="cover"
                      alt={item.title}
                      className="rounded-t-xl"
                    />
                  </div>

                  <div className="mt-4 mx-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2">
                      <div className="text-green-600 bg-green-100 rounded-xl font-semibold px-2 py-1 text-center">
                        {`₹${item.price}`}
                      </div>
                      <div className="text-gray-500 font-semibold bg-gray-500/10 px-2 py-1 rounded-xl">
                        {item.category.name}
                      </div>
                    </div>

                    <div className="text-gray-500 font-semibold text-md my-4">
                      {formatEventDate(item.startDateTime)}
                    </div>

                    <div className="font-bold text-xl my-2">{item.title}</div>

                    <div className="flex justify-between mt-auto mb-4 mx-2">
                      <p className="text-gray-500 font-semibold">User</p>
                      <p className="text-blue-500">Order Details</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[rgb(246,246,246)] flex flex-col justify-center items-center my-7 rounded-xl py-20 col-span-3">
                <p className="font-bold text-2xl">No relatedEvents Found</p>
                <p>Come Back Later</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
