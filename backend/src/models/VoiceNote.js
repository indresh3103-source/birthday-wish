import mongoose from 'mongoose'

const voiceNoteSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: 'My Love' },
  originalName: String,
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: String,
  size: Number,
  userAgent: String,
  ip: String
}, { timestamps: true })

export const VoiceNote = mongoose.model('VoiceNote', voiceNoteSchema)
