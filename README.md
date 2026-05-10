# Birthday Wish — Premium Interactive Love Story

A full-stack cinematic birthday surprise website built with React + Vite, Tailwind CSS, Framer Motion, GSAP, Three.js, Node.js, Express, MongoDB Atlas, Nodemailer, and WhatsApp notifications.

## Experience Highlights

- Animated intro loader with hearts, particles, cinematic text, and music controls.
- Cute cartoon character walking in with a birthday cake and candle-blow animation.
- Live birthday countdown with glassmorphism cards and animated transitions.
- Emotional hero section, interactive relationship timeline, and Polaroid gallery with lightbox.
- Romantic message form, quiz/reactions, and voice-note upload connected to the backend.
- Secret password unlock with animated envelope and type-style love letter reveal.
- Interactive Three.js birthday cake, candle flame animation, and confetti finale.
- Mobile-first responsive layout with premium gradients, glow effects, soft shadows, and smooth scrolling.

## Project Structure

```txt
birthday-wish/
├── frontend/          # React + Vite + Tailwind + animations + Three.js UI
├── backend/           # Express REST API + MongoDB + notifications + uploads
├── package.json       # npm workspaces and root scripts
└── README.md
```

## Terminal Commands

```bash
npm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Quality checks:

```bash
npm run lint
```

## Main Dependencies

Frontend:

- `react`, `react-dom`, `vite`
- `tailwindcss`, `postcss`, `autoprefixer`
- `framer-motion` for polished UI animation
- `gsap` and `ScrollTrigger` for cinematic scroll/reveal sequences
- `three` for the interactive 3D cake
- `canvas-confetti`, `lucide-react`

Backend:

- `express`, `mongoose`, `cors`, `helmet`, `morgan`, `express-rate-limit`
- `zod` for request validation
- `multer` for voice-note uploads
- `nodemailer` for email notifications
- `twilio` for WhatsApp notifications, with CallMeBot fallback support

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GIRLFRIEND_NAME=My Love
VITE_BIRTHDAY_DATE=2026-12-31T00:00:00
VITE_SECRET_PASSWORD=forever
```

### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/birthday-wish
EMAIL_FROM="Birthday Wish <your_gmail@gmail.com>"
EMAIL_TO=your_email@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+15551234567
CALLMEBOT_PHONE=
CALLMEBOT_API_KEY=
```

## REST API

Base URL: `/api`

- `GET /health` — service health check.
- `POST /messages` — saves a love note and sends email/WhatsApp alerts.
- `POST /quiz` — saves quiz answers and love meter data, then sends alerts.
- `POST /reactions` — saves emoji reactions and sends alerts.
- `POST /voice-notes` — uploads an audio file using `multipart/form-data` field `voice`.

## Personalization Checklist

1. Replace `VITE_GIRLFRIEND_NAME`, `VITE_BIRTHDAY_DATE`, and `VITE_SECRET_PASSWORD`.
2. Edit memories, gallery photos, and quiz prompts in `frontend/src/data/content.js`.
3. Add a licensed romantic instrumental file at `frontend/public/romantic-ambient.mp3` for background music.
4. Configure MongoDB Atlas, SMTP, and either Twilio WhatsApp or CallMeBot.
5. Use real relationship photos for the strongest emotional impact.

## Emotional Impact Suggestions

- Add a short real voice intro from you before the hero section.
- Use exact dates, inside jokes, nicknames, and locations in the timeline.
- Replace stock photos with private photos and handwritten-letter scans.
- Add a final video montage or a hidden “open when you miss me” card.
- Use slow piano, ambient strings, or soft lo-fi romantic instrumentals with no distracting lyrics.

## Cinematic Transition Ideas

- Fade from intro loader into hero using a blur and scale reveal.
- Use parallax hearts and star fields between sections.
- Let photos float into a collage before the final “I Love You”.
- Add envelope, curtain, or book-page transitions for secret messages.
- Use GSAP timeline sequences for synchronized music, text, and confetti moments.

## Premium Font & Music Style

- Display fonts: Playfair Display, Cormorant Garamond, or Canela-style premium serif.
- Script accents: Great Vibes, Allura, or Parisienne.
- Body fonts: Inter, Satoshi, or Manrope.
- Music: soft piano, cinematic pads, warm strings, gentle rain ambience, or lo-fi romantic instrumental.

## Responsive Design Best Practices

- Keep hero text fluid with `clamp()` or Tailwind responsive sizes.
- Use one-column cards on mobile and split layouts on desktop.
- Avoid tiny tap targets; buttons should be at least 44px tall.
- Compress real photos and use lazy loading for galleries.
- Respect `prefers-reduced-motion` for accessibility.
- Test on iPhone-sized widths, tablets, and large desktop monitors.

## Deployment Guide

### Frontend on Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set root directory to `frontend`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add frontend env vars, especially `VITE_API_BASE_URL=https://your-render-api.onrender.com/api`.

### Backend on Render

1. Create a new Render Web Service from the same repository.
2. Set root directory to `backend`.
3. Build command: `npm install`.
4. Start command: `npm run start`.
5. Add all backend environment variables.
6. Add a persistent disk if you want local voice uploads to survive redeploys, or replace local storage with S3/Cloudinary for production.

## Production Notes

- MongoDB Atlas IP access must allow Render's outbound IPs or `0.0.0.0/0` for quick setup.
- For Gmail SMTP, use an app password, not your normal account password.
- Twilio WhatsApp requires sandbox approval for testing and sender approval for production.
- Local upload storage is included for simplicity; cloud object storage is recommended for a long-lived production app.
