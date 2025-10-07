import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, eventTitle, eventDate, eventTime, eventDescription } = await request.json()

    // Formatear la fecha
    const date = new Date(eventDate)
    const formattedDate = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: "Calendario <onboarding@resend.dev>", // Cambiar por tu dominio verificado
      to: email,
      subject: `Recordatorio: ${eventTitle} mañana`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .detail-row:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #6b7280; }
              .value { color: #111827; margin-top: 5px; }
              .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">📅 Recordatorio de Evento</h1>
              </div>
              <div class="content">
                <p style="font-size: 18px; margin-top: 0;">Tu evento <strong>${eventTitle}</strong> es mañana.</p>
                
                <div class="event-details">
                  <div class="detail-row">
                    <div class="label">📆 Fecha</div>
                    <div class="value">${formattedDate}</div>
                  </div>
                  ${
                    eventTime
                      ? `
                  <div class="detail-row">
                    <div class="label">🕐 Hora</div>
                    <div class="value">${eventTime}</div>
                  </div>
                  `
                      : ""
                  }
                  ${
                    eventDescription
                      ? `
                  <div class="detail-row">
                    <div class="label">📝 Descripción</div>
                    <div class="value">${eventDescription}</div>
                  </div>
                  `
                      : ""
                  }
                </div>
                
                <p style="font-size: 16px; color: #6b7280;">¡No lo olvides! Te esperamos.</p>
                
                <div class="footer">
                  <p>Este es un recordatorio automático de tu calendario.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Error de Resend:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    console.log("[v0] Email enviado exitosamente:", data)
    return NextResponse.json({ success: true, message: "Notificación enviada", data })
  } catch (error) {
    console.error("[v0] Error en send-notification:", error)
    return NextResponse.json({ success: false, error: "Error al enviar notificación" }, { status: 500 })
  }
}
