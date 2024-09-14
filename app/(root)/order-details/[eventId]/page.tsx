"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EventProps, Tickets } from "@/lib/types"
import { useEffect, useState } from "react"

export default function OrderDetailsPage({
  params,
}: {
  params: { eventId: string }
}) {

  const [event, setEvent] = useState<EventProps | null>()
  const [tickets, setTickets] = useState<Tickets[] | null>([])

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${params.eventId}`, {
          method: "GET"
        })

        if (!response.ok) {
          throw new Error("Something went wrong ")
        }

        const data = await response.json();
        if (data.event) {
          setEvent(data.event);
          if (data.event.tickets && data.event.tickets.length > 0) {
            setTickets(data.event.tickets);
          } else {
            setTickets([]);
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchEventDetails();
  }, [params.eventId])

  return (<>
    <main>
      <div className="bg-[rgb(246,248,253)] w-full py-9 px-28">
        <p className="text-3xl font-bold">Orders</p>
      </div>

      <div className="w-full py-9 px-28">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order Id</TableHead>
              <TableHead>Event Title</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead >Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{event?.title}</TableCell>
                <TableCell>{item.buyerName}</TableCell>
                <TableCell>
                  {event?.price}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  </>)
}