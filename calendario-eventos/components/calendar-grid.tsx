"use client"

import { cn } from "@/lib/utils"
import type { CalendarEvent } from "@/lib/types"

interface Holiday {
  date: string
  name: string
}

interface CalendarGridProps {
  currentDate: Date
  view: "month" | "year"
  events: CalendarEvent[]
  holidays: Holiday[]
  customNonWorkingDays: string[]
  onDayClick: (date: Date) => void
  onMonthClick?: (date: Date) => void
  onToggleNonWorkingDay: (date: Date) => void
}

export function CalendarGrid({
  currentDate,
  view,
  events,
  holidays,
  customNonWorkingDays,
  onDayClick,
  onMonthClick,
  onToggleNonWorkingDay,
}: CalendarGridProps) {
  if (view === "year") {
    return (
      <YearView
        currentDate={currentDate}
        events={events}
        holidays={holidays}
        customNonWorkingDays={customNonWorkingDays}
        onDayClick={onDayClick}
        onMonthClick={onMonthClick}
        onToggleNonWorkingDay={onToggleNonWorkingDay}
      />
    )
  }

  return (
    <MonthView
      currentDate={currentDate}
      events={events}
      holidays={holidays}
      customNonWorkingDays={customNonWorkingDays}
      onDayClick={onDayClick}
      onToggleNonWorkingDay={onToggleNonWorkingDay}
    />
  )
}

function MonthView({
  currentDate,
  events,
  holidays,
  customNonWorkingDays,
  onDayClick,
  onToggleNonWorkingDay,
}: Omit<CalendarGridProps, "view" | "onMonthClick">) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []
  const prevMonthDays = startingDayOfWeek
  const prevMonth = new Date(year, month, 0)
  const prevMonthLastDay = prevMonth.getDate()

  // Días del mes anterior
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthLastDay - i),
    })
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    })
  }

  // Días del mes siguiente
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i),
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isHoliday = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()
    // Sábado (6) o Domingo (0) o festivo predefinido
    return dayOfWeek === 0 || dayOfWeek === 6 || holidays.some((h) => h.date === dateStr)
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((e) => e.date === dateStr)
  }

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const isNonWorkingDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()
    return (
      dayOfWeek === 0 ||
      dayOfWeek === 6 ||
      holidays.some((h) => h.date === dateStr) ||
      customNonWorkingDays.includes(dateStr)
    )
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} />
          }

          const dayEvents = getEventsForDate(day.date)
          const nonWorkingDay = isNonWorkingDay(day.date)
          const today = isToday(day.date)

          return (
            <button
              key={index}
              onClick={() => onDayClick(day.date)}
              onContextMenu={(e) => {
                e.preventDefault()
                onToggleNonWorkingDay(day.date)
              }}
              className={cn(
                "min-h-[80px] p-2 rounded-lg border transition-all hover:border-primary hover:shadow-sm",
                "flex flex-col items-start justify-start",
                !day.isCurrentMonth && "opacity-40",
                today && "ring-2 ring-primary",
                nonWorkingDay && "bg-holiday text-holiday-foreground",
                !nonWorkingDay && "bg-card hover:bg-accent",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium mb-1",
                  today && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center",
                )}
              >
                {day.day}
              </span>
              <div className="w-full space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="text-xs truncate bg-event text-event-foreground px-1.5 py-0.5 rounded">
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} más</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function YearView({
  currentDate,
  events,
  holidays,
  customNonWorkingDays,
  onDayClick,
  onMonthClick,
  onToggleNonWorkingDay,
}: Omit<CalendarGridProps, "view">) {
  const year = currentDate.getFullYear()
  const months = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {months.map((month) => (
        <MiniMonth
          key={month}
          year={year}
          month={month}
          events={events}
          holidays={holidays}
          customNonWorkingDays={customNonWorkingDays}
          onDayClick={onDayClick}
          onMonthClick={onMonthClick}
          onToggleNonWorkingDay={onToggleNonWorkingDay}
        />
      ))}
    </div>
  )
}

function MiniMonth({
  year,
  month,
  events,
  holidays,
  customNonWorkingDays,
  onDayClick,
  onMonthClick,
  onToggleNonWorkingDay,
}: {
  year: number
  month: number
  events: CalendarEvent[]
  holidays: Holiday[]
  customNonWorkingDays: string[]
  onDayClick: (date: Date) => void
  onMonthClick?: (date: Date) => void
  onToggleNonWorkingDay: (date: Date) => void
}) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const monthName = new Date(year, month).toLocaleDateString("es-ES", {
    month: "long",
  })

  const isHoliday = (day: number) => {
    const date = new Date(year, month, day)
    const dateStr = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()
    // Sábado (6) o Domingo (0) o festivo predefinido
    return dayOfWeek === 0 || dayOfWeek === 6 || holidays.some((h) => h.date === dateStr)
  }

  const hasEvents = (day: number) => {
    const date = new Date(year, month, day)
    const dateStr = date.toISOString().split("T")[0]
    return events.some((e) => e.date === dateStr)
  }

  const isNonWorkingDay = (day: number) => {
    const date = new Date(year, month, day)
    const dateStr = date.toISOString().split("T")[0]
    const dayOfWeek = date.getDay()
    return (
      dayOfWeek === 0 ||
      dayOfWeek === 6 ||
      holidays.some((h) => h.date === dateStr) ||
      customNonWorkingDays.includes(dateStr)
    )
  }

  return (
    <div className="border rounded-lg p-3 bg-card">
      <button
        onClick={() => onMonthClick?.(new Date(year, month, 1))}
        className="text-sm font-semibold capitalize mb-2 text-foreground hover:text-primary transition-colors w-full text-left"
      >
        {monthName}
      </button>
      <div className="grid grid-cols-7 gap-1">
        {["D", "L", "M", "M", "J", "V", "S"].map((day, i) => (
          <div key={i} className="text-xs text-center text-muted-foreground font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} />
          }

          const date = new Date(year, month, day)
          const nonWorkingDay = isNonWorkingDay(day)
          const hasEvent = hasEvents(day)

          return (
            <button
              key={index}
              onClick={() => onDayClick(date)}
              onContextMenu={(e) => {
                e.preventDefault()
                onToggleNonWorkingDay(date)
              }}
              className={cn(
                "aspect-square text-xs rounded flex items-center justify-center relative transition-colors",
                "hover:bg-accent",
                nonWorkingDay && "bg-holiday text-holiday-foreground font-semibold",
                !nonWorkingDay && "text-foreground",
              )}
            >
              {day}
              {hasEvent && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
