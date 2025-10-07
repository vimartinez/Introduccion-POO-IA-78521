# Configuración de Notificaciones por Email

Este calendario ahora incluye notificaciones automáticas por email que se envían 1 día antes de cada evento.

## Configuración Requerida

### 1. Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Verifica tu dominio (o usa el dominio de prueba `onboarding@resend.dev`)
3. Genera una API Key en el dashboard
4. Copia la API Key

### 2. Agregar Variable de Entorno

Agrega la siguiente variable de entorno a tu proyecto:

\`\`\`
RESEND_API_KEY=tu_api_key_aqui
\`\`\`

**En Vercel:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega `RESEND_API_KEY` con tu API key
4. Redeploy tu aplicación

**En desarrollo local:**
Crea un archivo `.env.local` en la raíz del proyecto:
\`\`\`
RESEND_API_KEY=tu_api_key_aqui
\`\`\`

### 3. Configurar Dominio de Envío

En el archivo `app/api/send-notification/route.ts`, cambia:

\`\`\`typescript
from: "Calendario <onboarding@resend.dev>", // Dominio de prueba
\`\`\`

Por tu dominio verificado:

\`\`\`typescript
from: "Calendario <notificaciones@tudominio.com>",
\`\`\`

## Cómo Funciona

1. Al crear un evento, marca la casilla "Enviar recordatorio por email"
2. Ingresa el email donde quieres recibir la notificación
3. El sistema verifica cada hora si hay eventos para mañana
4. Si encuentra eventos con notificación habilitada, envía un email automáticamente

## Limitaciones del Plan Gratuito de Resend

- 100 emails por día
- 3,000 emails por mes
- Solo puedes enviar desde dominios verificados (o usar onboarding@resend.dev para pruebas)

## Producción: Usar Cron Jobs

Para producción, se recomienda usar Vercel Cron Jobs en lugar de verificar cada hora en el cliente:

1. Crea `app/api/cron/check-events/route.ts`
2. Configura en `vercel.json`:
\`\`\`json
{
  "crons": [{
    "path": "/api/cron/check-events",
    "schedule": "0 9 * * *"
  }]
}
\`\`\`

Esto ejecutará la verificación todos los días a las 9 AM.
