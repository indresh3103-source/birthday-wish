import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { z } from 'zod'
import { createMessage } from '../controllers/messageController.js'
import { createQuizResponse } from '../controllers/quizController.js'
import { createReaction } from '../controllers/reactionController.js'
import { createVoiceNote } from '../controllers/voiceController.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const storage = multer.diskStorage({ destination: 'uploads/', filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`) })
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 }, fileFilter: (req, file, cb) => file.mimetype.startsWith('audio/') ? cb(null, true) : cb(new Error('Only audio uploads are allowed')) })

const messageSchema = z.object({ name: z.string().trim().max(100).optional(), message: z.string().trim().min(3).max(5000) })
const quizSchema = z.object({ answers: z.record(z.string().trim().min(1)), reaction: z.string().max(10).optional(), loveMeter: z.number().min(0).max(100).optional() })
const reactionSchema = z.object({ emoji: z.string().min(1).max(10), context: z.string().max(80).optional() })

router.get('/health', (req, res) => res.json({ ok: true, service: 'birthday-wish-api' }))
router.post('/messages', validate(messageSchema), createMessage)
router.post('/quiz', validate(quizSchema), createQuizResponse)
router.post('/reactions', validate(reactionSchema), createReaction)
router.post('/voice-notes', upload.single('voice'), createVoiceNote)

export default router
