/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      colors: {
        blush: '#ff7ab6',
        roseglass: 'rgba(255,255,255,0.14)',
        night: '#12071f',
        lavender: '#9b8cff'
      },
      boxShadow: {
        glow: '0 0 60px rgba(255,122,182,.42)',
        card: '0 24px 90px rgba(33,8,51,.35)'
      },
      backgroundImage: {
        radialGlow: 'radial-gradient(circle at 20% 20%, rgba(255,122,182,.35), transparent 28%), radial-gradient(circle at 80% 0%, rgba(155,140,255,.28), transparent 32%), linear-gradient(135deg, #170821, #32103f 45%, #160720)'
      }
    }
  },
  plugins: []
}
