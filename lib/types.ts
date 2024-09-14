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
  tickets: Tickets[],
}

export type FormPropsTypes = {
  eventId: string | null,
  eventType: string,
}

export type CheckoutProps = {
  amount: number,
  eventId: string,
  userId: string,
}

export type Tickets = {
  id: string,
  createdAt: string,
  userId: string,
  eventId: string,
  buyerName:string,
}