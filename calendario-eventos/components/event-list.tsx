"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Trash2 } from "lucide-react"
import type { CalendarEvent } from "@/lib/types"

interface EventListProps {
  events: CalendarEvent[]
  onDeleteEvent: (id: string) => void
}

export function EventList({ events, onDeleteEvent }: EventListProps) {
  if (events.length === 0) {
    return null
  }

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date + (a.time ? `T${a.time}` : ""))
    const dateB = new Date(b.date + (b.time ? `T${b.time}` : ""))
    return dateA.getTime() - dateB.getTime()
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Próximos Eventos</h3>
      <div className="space-y-3">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
          >
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-foreground">{event.title}</h4>
              {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="capitalize">{formatDate(event.date)}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{event.time}</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteEvent(event.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
