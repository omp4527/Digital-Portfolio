# Om Patil - Digital Portfolio

A modern, full-stack developer portfolio website showcasing computer engineering projects, core proficiencies, work experience, and a secure contact portal.

Built using **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **Supabase**, and **Resend**.

---

## 🚀 Key Features

* **Premium UI/UX**: Dark-theme aesthetics with floating particle effects, typewriter role cycles, and custom glassmorphic cards.
* **Verified Contact Form**: Form requires client verification via **Google OAuth** or **Email Magic Link** (using Supabase Auth) before submitting. This locks the email input to a verified address and prevents spam/fake email entries.
* **Server Action Submissions**: Secure Next.js Server Actions process contact submissions without exposing API secret keys in the browser.
* **Database Logging**: Saves all verified client messages into a Supabase database table.
* **Instant Email Alerts**: Sends immediate HTML email notifications to the owner via **Resend** for every message.

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **Frontend**: React, TypeScript, Lucide Icons
* **Styling**: Tailwind CSS v4 (using CSS `@theme` variables)
* **Backend**: Next.js Server Actions
* **Database & Authentication**: Supabase (PostgreSQL & Supabase Auth)
* **Email Service**: Resend API

---

## ⚙️ Local Development Setup

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a local `.env` file in the root folder (a template is available in `.env.example`):
```env
# Client-side (Public, used for Supabase Auth in the browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key

# Server-side (Secret, used in Server Actions)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key
RESEND_API_KEY=re_your_resend_api_key
```

### 3. Initialize Database Table
Run the SQL script found in `supabase/create_table.sql` inside your Supabase project's **SQL Editor** to create the `contact_messages` table and set up permissions.

### 4. Enable Google Login (Optional)
To support Google Login:
1. Enable the Google Provider in Supabase (`Authentication -> Providers -> Google`).
2. Add your Google OAuth Client Credentials from the Google Cloud Console.
3. Configure the Redirect URI in Google Cloud to point back to your Supabase project's callback URL.

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment to Vercel

When deploying to Vercel:
1. Connect your GitHub repository to Vercel.
2. In the Vercel project settings, paste the five environment variables from your local `.env` file.
3. Deploy! Every git push to the `main` branch will trigger an automatic redeployment.
