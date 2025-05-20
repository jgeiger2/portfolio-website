# James Geiger Portfolio Website

A modern, elegant portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design
- Blog with Firebase backend
- Dark/light mode
- Portfolio project showcase
- Modern UI components

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Authentication)
- **Styling**: TailwindCSS with custom components
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Firebase account (for backend functionality)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add your Firebase configuration:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utility functions and libraries
- `/public` - Static assets
- `/project-docs` - Project documentation

## Deployment

The website is configured for easy deployment on Vercel.

## License

This project is licensed under the MIT License.
