export default function EventDetails({ params }: { params: { id: string } }) {
  return (<>
    <div>
      hello
      {params.id}
    </div>
  </>)
}