"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEventPage() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleform = (formData: FormData) => {
  }

  return (
    <>
      <section>
        <div className="bg-[rgb(246,248,253)] w-full py-9 px-28">
          <p className="text-3xl font-bold">Create Event</p>
        </div>

        <form action={handleform}>
          <div className="grid grid-cols-2 gap-5 mx-28 my-10">

            <Input className="bg-gray-50 rounded-2xl" type="text" name="eventName" placeholder="Event Name" />
            <Input className="bg-gray-50" type="text" name="category" placeholder="Category" />
            <Textarea className="bg-gray-50" name="description" placeholder="Description" />
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                // alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                console.log(`ERROR! ${error.message}`);
                // alert(`ERROR! ${error.message}`);
              }}
            />
            <Input className="col-span-2 bg-gray-50" type="text" placeholder="Event Location or Online" />
            <div className="p-3 flex bg-gray-50 ">
              <Image
                src="/icons/calendar.svg"
                alt="calender"
                width={20}
                height={20}
              />
              <p className="text-gray-600	"> Start Date: </p>
              <DatePicker
                className="outline-none bg-gray-50"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                wrapperClassName="datePicker"
              />
            </div>
            <div className="p-3 flex bg-gray-50 ">
              <Image
                src="/icons/calendar.svg"
                alt="calender"
                width={20}
                height={20}
              />
              <p className="text-gray-600	"> End Date: </p>
              <DatePicker
                className="outline-none bg-gray-50"
                selected={endDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                wrapperClassName="datePicker"
              />
            </div>
            <div>
              <Input className="bg-gray-50 rounded-2xl" type="number" placeholder="Price" />
            </div>
            <Input className="bg-gray-50" type="url" placeholder="URL" />
            <Button className="col-span-2">Create Event</Button>
          </div>
        </form>
      </section>
    </>
  );
}
