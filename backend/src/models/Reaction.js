import mongoose from 'mongoose'

const reactionSchema = new mongoose.Schema({
  emoji: { type: String, required: true, maxlength: 10 },
  context: { type: String, default: 'general', maxlength: 80 },
  userAgent: String,
  ip: String
}, { timestamps: true })

export const Reaction = mongoose.model('Reaction', reactionSchema)
