import UpdateEventForm from "@/components/UpdateEventForm";

export default function UpdateEventPage({
  params,
}: {
  params: { eventId: string }
}) {

  const eventId = params.eventId;

  return (
    <main>
      <div className="bg-[rgb(246,248,253)] w-full py-9 px-28">
        <p className="text-3xl font-bold">Update Event</p>
      </div>

      <UpdateEventForm
        eventId={eventId}
        eventType="Update"
      />
    </main>
  );
}
