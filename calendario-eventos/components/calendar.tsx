"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { CalendarGrid } from "@/components/calendar-grid"
import { EventDialog } from "@/components/event-dialog"
import { EventList } from "@/components/event-list"
import { ViewToggle } from "@/components/view-toggle"
import type { CalendarEvent } from "@/lib/types"

// Días no laborables predefinidos (ejemplo para 2025)
const HOLIDAYS_2025 = [
  { date: "2025-01-01", name: "Año Nuevo" },
  { date: "2025-05-01", name: "Día del Trabajo" },
  { date: "2025-12-25", name: "Navidad" },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "year">("month")
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [customNonWorkingDays, setCustomNonWorkingDays] = useState<string[]>([])

  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("customNonWorkingDays")
    if (saved) {
      setCustomNonWorkingDays(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem("customNonWorkingDays", JSON.stringify(customNonWorkingDays))
  }, [customNonWorkingDays])

  useEffect(() => {
    const checkNotifications = async () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowStr = tomorrow.toISOString().split("T")[0]

      for (const event of events) {
        if (event.date === tomorrowStr && event.notificationEmail) {
          try {
            await fetch("/api/send-notification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: event.notificationEmail,
                eventTitle: event.title,
                eventDate: event.date,
                eventTime: event.time,
                eventDescription: event.description,
              }),
            })
          } catch (error) {
            console.error("[v0] Error enviando notificación:", error)
          }
        }
      }
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 1000 * 60 * 60) // Verificar cada hora
    return () => clearInterval(interval)
  }, [events])

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents([...events, { ...event, id: Date.now().toString() }])
    setIsDialogOpen(false)
    setSelectedDate(null)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleMonthClick = (date: Date) => {
    setCurrentDate(date)
    setView("month")
  }

  const getTitle = () => {
    if (view === "month") {
      return currentDate.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      })
    }
    return currentDate.getFullYear().toString()
  }

  const handleToggleNonWorkingDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    setCustomNonWorkingDays((prev) => {
      if (prev.includes(dateStr)) {
        return prev.filter((d) => d !== dateStr)
      } else {
        return [...prev, dateStr]
      }
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Anterior">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext} aria-label="Siguiente">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-2xl font-semibold capitalize text-foreground">{getTitle()}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleToday}>
              Hoy
            </Button>
            <ViewToggle view={view} onViewChange={setView} />
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Evento
            </Button>
          </div>
        </div>

        <CalendarGrid
          currentDate={currentDate}
          view={view}
          events={events}
          holidays={HOLIDAYS_2025}
          customNonWorkingDays={customNonWorkingDays}
          onDayClick={handleDayClick}
          onMonthClick={handleMonthClick}
          onToggleNonWorkingDay={handleToggleNonWorkingDay}
        />
      </Card>

      <EventList events={events} onDeleteEvent={handleDeleteEvent} />

      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  )
}
