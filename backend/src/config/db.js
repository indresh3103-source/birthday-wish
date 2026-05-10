import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDb() {
  if (!env.mongoUri) {
    console.warn('MONGODB_URI is not set. API will run, but database writes will fail until configured.')
    return
  }
  await mongoose.connect(env.mongoUri)
  console.log('MongoDB connected')
}
