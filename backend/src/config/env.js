import dotenv from 'dotenv'
dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  emailFrom: process.env.EMAIL_FROM || '',
  emailTo: process.env.EMAIL_TO || '',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  twilioSid: process.env.TWILIO_ACCOUNT_SID || '',
  twilioToken: process.env.TWILIO_AUTH_TOKEN || '',
  twilioWhatsAppFrom: process.env.TWILIO_WHATSAPP_FROM || '',
  twilioWhatsAppTo: process.env.TWILIO_WHATSAPP_TO || '',
  callMeBotPhone: process.env.CALLMEBOT_PHONE || '',
  callMeBotApiKey: process.env.CALLMEBOT_API_KEY || ''
}
