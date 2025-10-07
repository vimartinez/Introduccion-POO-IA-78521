import Calendar from "@/components/calendar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Calendario de Eventos</h1>
          <p className="text-muted-foreground">Gestiona tus eventos y visualiza días no laborables</p>
        </div>
        <Calendar />
      </div>
    </main>
  )
}
