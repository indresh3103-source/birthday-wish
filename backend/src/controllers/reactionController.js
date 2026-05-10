import { Reaction } from '../models/Reaction.js'
import { notifyAll } from '../services/notify.js'

export async function createReaction(req, res, next) {
  try {
    const reaction = await Reaction.create({ ...req.body, userAgent: req.get('user-agent'), ip: req.ip })
    await notifyAll('New birthday reaction ❤️', `Reaction: ${reaction.emoji}\nContext: ${reaction.context}`)
    res.status(201).json({ message: 'Reaction saved', data: reaction })
  } catch (error) { next(error) }
}
