"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { CalendarEvent } from "@/lib/types"

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: CalendarEvent) => void
  selectedDate: Date | null
}

export function EventDialog({ open, onOpenChange, onAddEvent, selectedDate }: EventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [enableNotification, setEnableNotification] = useState(false)
  const [notificationEmail, setNotificationEmail] = useState("")

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate.toISOString().split("T")[0])
    }
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date) return

    onAddEvent({
      id: "",
      title,
      description,
      date,
      time,
      notificationEmail: enableNotification ? notificationEmail : undefined,
    })

    setTitle("")
    setDescription("")
    setDate("")
    setTime("")
    setEnableNotification(false)
    setNotificationEmail("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Agregar Evento</DialogTitle>
            <DialogDescription>Crea un nuevo evento en tu calendario</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Reunión importante"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalles del evento..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Hora</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-3 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notification"
                  checked={enableNotification}
                  onCheckedChange={(checked) => setEnableNotification(checked as boolean)}
                />
                <Label htmlFor="notification" className="text-sm font-normal cursor-pointer">
                  Enviar recordatorio por email (1 día antes)
                </Label>
              </div>
              {enableNotification && (
                <div className="grid gap-2 ml-6">
                  <Label htmlFor="email" className="text-sm">
                    Email para notificación
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required={enableNotification}
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Evento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
