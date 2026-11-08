# Confessions App

An anonymous confessions platform built with [Next.js](https://nextjs.org), Tailwind CSS, and Prisma ORM with Neon PostgreSQL.

## Features
- **Anonymous Feed**: Real-time reverse-chronological list of confessions.
- **Create Confession**: Clean submit form with validation and character limits.
- **Edit & Delete**: Instant in-place editing and safe deletion with confirmation.
- **Mobile Responsive**: Fully responsive layout tailored for mobile devices, tablets, and desktop displays.
- **Production-Ready**: Configured with error boundaries (`app/error.jsx`), skeleton loading states (`app/loading.jsx`), Prisma client pooling, and security hardening.

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```
