"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import searchSvg from '@/public/icons/search.svg'
import { EventProps } from "@/lib/types";
import { formatEventDate } from "@/lib/dateFormat";

export default function Events() {

  const [events, setEvents] = useState<EventProps[]>([])
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          method: "GET",
        })

        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEvents()
  }, [])

  return (<>
    <main className="bg-white px-24 py-10 w-full">

      <div className="py-3">
        <h2 className="text-5xl font-bold my-5 ">Trust by <br /> Thousands of Events</h2>
      </div>

      <div className="grid grid-cols-2 gap-2  ">
        <div className=" flex items-center gap-2 rounded-3xl bg-[rgb(246,246,246)] " >
          <Image
            src={searchSvg}
            alt="search Icon"
            className="ml-4"
          />
          <input className=" p-3 rounded-3xl border-none outline-none bg-[rgb(246,246,246)] w-full" type="text" placeholder="Search Title" />
        </div>
        <div className=" flex items-center gap-2 rounded-3xl bg-[rgb(246,246,246)] " >
          <input className=" p-3 rounded-3xl border-none outline-none bg-[rgb(246,246,246)] w-full" type="text" placeholder="Category" />
        </div>
      </div>

      <div className="grid grid-cols-3 col-span-3 gap-10 mt-12 ">
        {events.length > 0 ? (
          events.map((item: EventProps) => (
            <div
              className="hover:cursor-pointer shadow-lg rounded-xl flex flex-col h-full"
              onClick={() => {
                router.push(`/events/event-details/${item.id}`);
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

                <div className="font-bold text-xl my-2">
                  {item.title}
                </div>

                <div className="flex justify-between mt-auto mb-4 mx-2">
                  <p className="text-gray-500 font-semibold">User</p>
                  <p className="text-blue-500">Order Details</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[rgb(246,246,246)] flex flex-col justify-center items-center my-7 rounded-xl py-20 col-span-3">
            <p className="font-bold text-2xl">No Events Found</p>
            <p>Come Back Later</p>
          </div>
        )}
      </div>
    </main >
  </>)
}