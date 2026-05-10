import nodemailer from 'nodemailer'
import twilio from 'twilio'
import { env } from '../config/env.js'

function emailReady() { return env.smtpHost && env.smtpUser && env.smtpPass && env.emailTo }
function twilioReady() { return env.twilioSid && env.twilioToken && env.twilioWhatsAppFrom && env.twilioWhatsAppTo }
function callMeBotReady() { return env.callMeBotPhone && env.callMeBotApiKey }

export async function sendEmailNotification(subject, text) {
  if (!emailReady()) { console.warn('Email notification skipped: SMTP env vars missing.'); return }
  const transporter = nodemailer.createTransport({ host: env.smtpHost, port: env.smtpPort, secure: env.smtpPort === 465, auth: { user: env.smtpUser, pass: env.smtpPass } })
  await transporter.sendMail({ from: env.emailFrom || env.smtpUser, to: env.emailTo, subject, text })
}

export async function sendWhatsAppNotification(message) {
  if (twilioReady()) {
    const client = twilio(env.twilioSid, env.twilioToken)
    await client.messages.create({ from: env.twilioWhatsAppFrom, to: env.twilioWhatsAppTo, body: message })
    return
  }
  if (callMeBotReady()) {
    const url = new URL('https://api.callmebot.com/whatsapp.php')
    url.searchParams.set('phone', env.callMeBotPhone)
    url.searchParams.set('text', message)
    url.searchParams.set('apikey', env.callMeBotApiKey)
    const response = await fetch(url)
    if (!response.ok) throw new Error('CallMeBot WhatsApp notification failed')
    return
  }
  console.warn('WhatsApp notification skipped: Twilio/CallMeBot env vars missing.')
}

export async function notifyAll(subject, message) {
  const settled = await Promise.allSettled([sendEmailNotification(subject, message), sendWhatsAppNotification(message)])
  settled.filter((item) => item.status === 'rejected').forEach((item) => console.error(item.reason))
}
