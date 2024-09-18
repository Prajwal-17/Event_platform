"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import searchSvg from "@/public/icons/search.svg";
import { EventProps } from "@/lib/types";
import { formatEventDate } from "@/lib/dateFormat";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventProps[]>([]);
  const router = useRouter();

  const eventsRef = useRef<HTMLDivElement | null>(null);

  const handleExploreClick = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          method: "GET",
        });

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents((events) => events.filter((event) => event.id !== id));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <main>

        <div className="bg-[rgb(246,248,253)] px-6 py-10 w-full min-h-96 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col justify-center gap-5 md:gap-7">
              <div className="font-bold text-[40px] leading-[48px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]">
                Host, Connect, Celebrate: Your Events, Our Platform!
              </div>

              <div className="text-[18px] md:text-[21px] lg:text-[23px]">
                Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
              </div>

              <div>
                <Button
                  onClick={handleExploreClick}
                  className="bg-[rgb(98,76,245)] w-full md:w-auto px-6 py-4 md:px-7 md:py-6 font-medium rounded-3xl hover:bg-[#4732d1]"
                >
                  Explore Now
                </Button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="relative w-full h-64 md:h-auto grid-span-1">
              <Image
                src="/hero.png"
                alt="Hero Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>


      </main>
      <main className="bg-white  px-6 md:px-12 py-10 w-full">
        <div ref={eventsRef} id="events-section" className="py-3">
          <h2 className="text-5xl font-bold my-5 ">
            Trust by <br /> Thousands of Events
          </h2>
        </div>

        {/* <div className="grid grid-cols-2 gap-2  ">
          <div className=" flex items-center gap-2 rounded-3xl bg-[rgb(246,246,246)] ">
            <Image src={searchSvg} alt="search Icon" className="ml-4" />
            <input
              className=" p-3 rounded-3xl border-none outline-none bg-[rgb(246,246,246)] w-full"
              type="text"
              placeholder="Search Title"
            />
          </div>
          <div className=" flex items-center gap-2 rounded-3xl bg-[rgb(246,246,246)] ">
            <input
              className=" p-3 rounded-3xl border-none outline-none bg-[rgb(246,246,246)] w-full"
              type="text"
              placeholder="Category"
            />
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-10 mt-12 bsm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((item: EventProps) => (
              <div
                className="shadow-lg rounded-xl flex flex-col h-full"
                key={item.id}
              >
                {session?.user.id === item.user.id ? (
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10 bg-white p-2 rounded-xl shadow-md">
                      <Image
                        src="/icons/edit.svg"
                        alt="update"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(`/events/update-event/${item.id}`);
                        }}
                      />
                      <Image
                        src="/icons/delete.svg"
                        alt="delete"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => {
                          deleteEvent(item.id);
                        }}
                      />
                    </div>
                  </div>
                ) : null}

                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    fill
                    style={{ objectFit: "cover" }}
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

                  <div
                    onClick={() => {
                      router.push(`/events/event-details/${item.id}`);
                    }}
                    className="font-bold cursor-pointer text-xl my-2"
                  >
                    {item.title}
                  </div>

                  <div className="flex justify-between mt-auto mb-4">
                    <p className="text-gray-500 font-semibold">
                      {session?.user?.name === item.user.name ? "You" : `${item.user.name}`}
                    </p>
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        router.push(`/order-details/${item.id}`);
                      }}
                    >
                      Order Details
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[rgb(246,246,246)] flex flex-col justify-center items-center my-7 rounded-xl py-20 col-span-1 md:col-span-2 lg:col-span-3">
              <p className="font-bold text-2xl">No Events Found</p>
              <p>Come Back Later</p>
            </div>
          )}
        </div>

      </main>
    </>
  );
}