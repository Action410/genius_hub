# Tesla Hub - E-commerce Web App

A modern, mobile-first e-commerce platform inspired by Tesla's clean design aesthetic.

## Features

- 🛍️ Product catalog with grid layout
- 🛒 Shopping cart functionality
- 💳 Paystack payment integration (Ghana)
- 📱 Fully responsive mobile-first design
- ✨ Smooth animations with Framer Motion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your Paystack public key:
   - Open `app/checkout/page.tsx`
   - Find the comment `// TODO: Replace with your Paystack public key`
   - Replace `YOUR_PAYSTACK_PUBLIC_KEY` with your actual public key

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy
4. Your app will be live!

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Paystack (Payment Gateway)

