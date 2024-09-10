export const formatEventDate = (date: Date) => {
  return Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date))
}
