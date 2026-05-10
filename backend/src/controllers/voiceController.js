import { VoiceNote } from '../models/VoiceNote.js'
import { notifyAll } from '../services/notify.js'

export async function createVoiceNote(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'Voice file is required' })
    const voice = await VoiceNote.create({ name: req.body.name, originalName: req.file.originalname, filename: req.file.filename, path: req.file.path, mimetype: req.file.mimetype, size: req.file.size, userAgent: req.get('user-agent'), ip: req.ip })
    await notifyAll('New birthday voice note 🎙️', `A new voice note was uploaded: ${voice.originalName} (${Math.round((voice.size || 0) / 1024)} KB)`)
    res.status(201).json({ message: 'Voice note uploaded', data: voice })
  } catch (error) { next(error) }
}
