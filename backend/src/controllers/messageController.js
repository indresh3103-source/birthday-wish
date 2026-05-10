import { Message } from '../models/Message.js'
import { notifyAll } from '../services/notify.js'

export async function createMessage(req, res, next) {
  try {
    const message = await Message.create({ ...req.body, userAgent: req.get('user-agent'), ip: req.ip })
    await notifyAll('New birthday love note 💌', `New message from ${message.name}:\n\n${message.message}`)
    res.status(201).json({ message: 'Love note saved', data: message })
  } catch (error) { next(error) }
}
