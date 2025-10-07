"use client"

import { Button } from "@/components/ui/button"
import { Calendar, CalendarDays } from "lucide-react"

interface ViewToggleProps {
  view: "month" | "year"
  onViewChange: (view: "month" | "year") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border rounded-lg p-1">
      <Button
        variant={view === "month" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("month")}
        className="gap-2"
      >
        <Calendar className="h-4 w-4" />
        Mes
      </Button>
      <Button
        variant={view === "year" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("year")}
        className="gap-2"
      >
        <CalendarDays className="h-4 w-4" />
        Año
      </Button>
    </div>
  )
}
