# অন্নপূর্ণা উপহার ভাণ্ডার — Product Catalogue Website

A simple, responsive product catalogue website for a local stationery and gift shop. Customers can browse products and new arrivals. The shop owner has a secure admin dashboard to manage product listings.

## Features

- **Customer Website**: Browse products, filter by category, search, view new arrivals, contact info
- **Admin Dashboard**: Secure login, add/edit/delete products, upload images, manage availability
- **Mobile Friendly**: Optimized for mobile phones, tablets, and desktops
- **Bengali Support**: Shop name and content displayed correctly in Bengali

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Lucide React (icons)
- Firebase (Authentication, Firestore, Storage)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Firebase](https://console.firebase.google.com/) project

---

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** and follow the steps
3. Once created, click the **Web** icon (`</>`) to add a web app
4. Copy the Firebase config values (you'll need them for `.env`)

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Go to **Users** tab and click **Add user**
4. Enter the admin email and password — this will be the shop owner's login

### 3. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll apply proper rules next)
3. Select a location close to your users

### 4. Enable Storage

1. Go to **Storage** → **Get started**
2. Accept the default rules (we'll update them)

### 5. Deploy Security Rules

Copy the contents of `firestore.rules` and `storage.rules` from this project into the Firebase Console:

- **Firestore**: Go to Firestore → **Rules** tab → paste the rules → **Publish**
- **Storage**: Go to Storage → **Rules** tab → paste the rules → **Publish**

### 6. Create Firestore Index (Required)

The app queries products with multiple filters. You may need to create a composite index:

1. Go to **Firestore** → **Indexes** → **Composite**
2. Create an index for the `products` collection:
   - Fields: `isNewArrival` (Ascending), `isAvailable` (Ascending), `createdAt` (Descending)
3. Create another index:
   - Fields: `category` (Ascending), `isAvailable` (Ascending), `createdAt` (Descending)

> **Tip**: If you see an error in the browser console about missing indexes, Firebase provides a direct link to create the required index — just click it.

---

## Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Fill in your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── config/          # Shop info & Firebase initialization
├── types/           # TypeScript type definitions
├── contexts/        # React contexts (Auth)
├── hooks/           # Custom React hooks
├── services/        # Firebase service functions (Firestore, Storage)
├── utils/           # Utility functions (formatting, image resize)
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── ui/          # Reusable UI components
│   ├── product/     # Product display components
│   └── admin/       # Admin-specific components
└── pages/           # Route pages
```

---

## Customization

### Shop Information

Edit `src/config/shop.ts` to update:
- Shop name
- Owner name
- Phone number
- Address
- Google Maps URL
- WhatsApp number

### Categories

Edit the `productCategories` array in `src/config/shop.ts` to add or remove product categories.

---

## Deployment

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set build directory to "dist"
# Configure as single-page app: Yes
npm run build
firebase deploy
```

### Vercel

```bash
npm install -g vercel
vercel
# Follow the prompts
```

### Netlify

1. Push to a Git repository
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

---

## Security Notes

- Only authenticated users (the shop owner) can add, edit, or delete products
- Firebase Security Rules enforce read/write permissions server-side
- Environment variables with `VITE_` prefix are embedded in the client bundle — this is expected for Firebase web apps
- The Firebase API key is safe to expose; security is enforced by Firebase Security Rules
- For additional security, restrict the admin to a specific email in Firestore rules

---

## License

Private — for use by অন্নপূর্ণা উপহার ভাণ্ডার only.
