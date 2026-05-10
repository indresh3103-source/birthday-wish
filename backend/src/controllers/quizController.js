import { QuizResponse } from '../models/QuizResponse.js'
import { notifyAll } from '../services/notify.js'

export async function createQuizResponse(req, res, next) {
  try {
    const response = await QuizResponse.create({ ...req.body, userAgent: req.get('user-agent'), ip: req.ip })
    await notifyAll('New birthday quiz response ✨', `Quiz answers: ${JSON.stringify(Object.fromEntries(response.answers), null, 2)}\nReaction: ${response.reaction}\nLove meter: ${response.loveMeter}%`)
    res.status(201).json({ message: 'Quiz response saved', data: response })
  } catch (error) { next(error) }
}
