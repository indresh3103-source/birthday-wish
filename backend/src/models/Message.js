import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: 'My Love' },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  userAgent: String,
  ip: String
}, { timestamps: true })

export const Message = mongoose.model('Message', messageSchema)
