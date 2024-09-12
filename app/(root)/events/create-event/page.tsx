import CreateEventForm from "@/components/CreateEventForm";

export default function CreateEventPage() {

  return (
<main>
      <div className="bg-[rgb(246,248,253)] w-full py-9 px-28">
        <p className="text-3xl font-bold">Create Event</p>
      </div>

      <CreateEventForm
        eventId={""}
        eventType="Create"
      />
    </main>
  );
}
