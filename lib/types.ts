export type Category = {
  id: string,
  name: string
}

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
}

export type EventProps = {
  id: string,
  title: string,
  category: Category,
  description: string,
  imageUrl: string,
  location: string,
  startDateTime: Date,
  endDateTime: Date,
  price: string,
  url: string,
  user: User,
}

export type FormPropsTypes ={
  eventId:string | null,
  eventType:string,
}