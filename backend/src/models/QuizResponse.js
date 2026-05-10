import mongoose from 'mongoose'

const quizResponseSchema = new mongoose.Schema({
  answers: { type: Map, of: String, required: true },
  reaction: { type: String, default: '😍' },
  loveMeter: { type: Number, min: 0, max: 100, default: 0 },
  userAgent: String,
  ip: String
}, { timestamps: true })

export const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema)
