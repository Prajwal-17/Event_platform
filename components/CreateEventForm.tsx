"use client"

import { categoryAction, getAllCategories } from "@/actions/categoryAction";
import { createEvent } from "@/actions/event.actions";
import { CategoryDropDown } from "@/components/CategoryDropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormPropsTypes } from "@/lib/types";
import { UploadDropzone } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEventForm({  eventType }: FormPropsTypes) {
  const router = useRouter();
  const { data: session } = useSession();

  const [categories, setCategory] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    setUserId(session?.user?.id ?? "");
  }, [session]);

  const handleform = async (formData: FormData) => {

    const formattedStartDateTime = startDateTime ? startDateTime.toISOString() : "";
    const formattedEndDateTime = endDateTime ? endDateTime.toISOString() : "";

    try {
      const result = await createEvent(formData, selectedCategory, imageUrl, formattedStartDateTime, formattedEndDateTime, userId);

      if (result.success) {
        router.push("/")
      }

      setImageUrl("")
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        const categoryNames = response?.categories?.map((category) => category.name) || [];
        setCategory(categoryNames)
      } catch (err: any) {
        console.log(err)
      }
    }

    fetchCategories();

  }, [])


  const addNewCategory = async (newCategory: string) => {
    try {
      const result = await categoryAction(newCategory);

      if (result?.category) {
        setCategory([...categories, newCategory])
      }

    } catch (err: any) {
      console.log(err)
    }
  }

  return (<>
    <section>

      <form action={handleform}>
        <div className="grid grid-cols-2 gap-5 mx-28 my-10">

          <Input
            className="bg-gray-50 rounded-2xl"
            type="text"
            name="title"
            placeholder="Event Name"
            required
          />
          <div>
            <CategoryDropDown
              categories={categories}
              addNewCategory={addNewCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <Textarea
            className="bg-gray-50"
            name="description"
            placeholder="Description"
            required
          />
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url)
            }}
            onUploadError={(error: Error) => {
              console.log(`ERROR! ${error.message}`);
              // alert(`ERROR! ${error.message}`);
            }}
          />
          <Input
            className="col-span-2 bg-gray-50"
            type="text"
            name="location"
            placeholder="Event Location or Online"
            required
          />
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
              selected={startDateTime}
              onChange={(date: Date | null) => setStartDateTime(date)}
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
              selected={endDateTime}
              onChange={(date: Date | null) => setEndDateTime(date)}
              showTimeSelect
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              wrapperClassName="datePicker"
            />
          </div>
          <div>
            <Input 
            className="bg-gray-50 rounded-2xl" 
            name="price"
            type="text" 
            placeholder="Price" 
            required
            />
          </div>
          <Input 
          className="bg-gray-50"
          type="url" 
          name="url" 
          placeholder="URL" 
          required 
          />
          <Button type="submit" className="col-span-2">{eventType} Event</Button>
        </div>
      </form>
    </section>
  </>)
}