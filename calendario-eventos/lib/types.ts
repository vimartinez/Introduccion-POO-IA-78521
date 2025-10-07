export interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  time?: string // HH:MM
  notificationEmail?: string
}
