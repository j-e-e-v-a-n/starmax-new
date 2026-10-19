# Starmax Systems — Corporate Website

A production-ready corporate website for **Starmax Systems**, a security systems, surveillance, access control, vehicle tracking, and automation solutions provider based in Kadavanthra, Kochi, Kerala, India.

---

## 1. Company Overview

- **Company Name:** Starmax Systems
- **Industry:** Security Systems, Surveillance, Access Control, Tracking and Automation
- **Registered Office:** 55/1668, Green Nest Business Center, Girinagar, 9th Cross Road, Behind Mini Community Hall, Kadavanthra, Kochi – 682020, Kerala, India
- **Primary Phone:** +91 99954 33366
- **Secondary Phone:** +91 94465 04401
- **General Email:** info@starmaxsystems.com
- **Business Email:** eldho@starmaxsystems.com
- **GSTIN:** 32CJGPM2017L1ZD
- **Service Network:** Kochi (Central), Haripad, Chengannur, and Calicut
- **Copyright:** © 2025 Starmax Systems. All rights reserved.
- **Credit:** Designed and maintained by NetVenture Web Solutions ([http://www.netventure.in/](http://www.netventure.in/))

---

## 2. Implemented Pages & Routes

Every required route has its own dedicated page component, metadata, and structured content:

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Complete corporate landing page featuring Hero, Trust Intro, 8-Service Grid, Why Starmax, Application Environments, Featured Solutions, Client Wordmarks, Testimonials, Gallery Preview, Callback Form, and Final CTA. |
| `/about` | **About Us** | Company approach, technology evolution, services links, installation & maintenance, and service points across Kerala. |
| `/services` | **Services Overview** | Comprehensive overview grid of all 8 security & automation disciplines with consultation request form. |
| `/services/ip-cctv-systems` | **IP CCTV Systems** | Commercial & residential surveillance, NVR setups, IR night vision, coverage planning, and dedicated enquiry form. |
| `/services/gps-tracking-systems` | **GPS Tracking Systems** | Fleet visibility, route tracking, optional sensor telemetry, and fleet enquiry form. |
| `/services/access-control-systems` | **Access Control Systems** | Biometric fingerprint readers, RFID cards, EM locks, audit trails, and security enquiry form. |
| `/services/video-door-phone` | **Video Door Phone** | Indoor color monitors, exterior doorbell cameras, remote door release, and villa/apartment enquiry form. |
| `/services/automatic-gates` | **Automatic Gates** | Motorized sliding gates, swing gates, boom barriers, safety photo-beams, and gate automation enquiry form. |
| `/services/intercom-epabx` | **Intercom / EPABX** | Private PBX switchboards, receptionist consoles, multi-floor call distribution, and telecom enquiry form. |
| `/services/time-attendance-systems` | **Time & Attendance** | Biometric clocking, shifts, overtime logging, exportable attendance logs, and attendance enquiry form. |
| `/services/home-automation` | **Home Automation** | Smart touchscreen panels, automated lighting scenes, security coordination, and residential enquiry form. |
| `/gallery` | **Gallery** | Categorized equipment gallery (CCTV, Signal Boosters, Gates, Access, etc.) with accessible keyboard-navigable Lightbox (ESC, Next, Prev). |
| `/clients` | **Top Clients** | Typography-restrained client wordmark grid featuring all 21 supplied client references. |
| `/careers` | **Careers** | Candidate application form with file validation for CV uploads (PDF/DOC up to 5MB) and structured fields. |
| `/testimonials` | **Testimonials** | Authentic client feedback regarding automatic gates and security equipment support. |
| `/contact` | **Contact Us** | Interactive contact message form, full address with copy function, direct calling links, and office details. |
| `/privacy-policy` | **Privacy Policy** | Pragmatic data handling notice for enquiries and career submissions. |
| `/*` | **404 Page** | Branded not-found page with clear pathways back to Home or Services. |

---

## 3. Technology Stack

- **Framework:** React 19 SPA with TypeScript
- **Styling:** Tailwind CSS v4 with custom brand tokens:
  - Primary Navy: `#10243A`
  - Deep Navy: `#0A1726`
  - Secondary Blue: `#174A78`
  - Security Blue: `#2475B8`
  - Accent Amber: `#F5A623`
- **Icons:** `lucide-react`
- **Routing:** History API Client Router with deep linking, breadcrumbs, and scroll restoration
- **Backend:** Express full-stack API server (`server.ts`) supporting `/api/callback`, `/api/contact`, `/api/enquiry`, and `/api/careers`

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js 18+
- npm or pnpm

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Compile TypeScript & bundle production assets
npm run build

# Preview build locally
npm run preview
```

### Type Checking & Linting
```bash
npm run lint
```

---

## 5. Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Contact form recipient
CONTACT_EMAIL_RECIPIENT="info@starmaxsystems.com"
BUSINESS_EMAIL_RECIPIENT="eldho@starmaxsystems.com"

# SMTP mail settings (Google Workspace example; use an app password)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="username"
SMTP_PASSWORD="google-workspace-app-password"
SMTP_FROM="mailer@starmaxsystems.com"

# Database, first admin login, and session signing
MONGODB_URI="mongodb+srv://..."
MONGODB_DB="starmax"
ADMIN_EMAIL="admin@starmaxsystems.com"
ADMIN_PASSWORD="use-a-long-unique-password"
ADMIN_JWT_SECRET="use-a-long-random-secret"

# Image uploads from the admin panel
IMAGEKIT_PUBLIC_KEY="public_..."
IMAGEKIT_PRIVATE_KEY="private_..."
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"
```

Restart the development server after changing `.env`. Open `/admin` to sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. On first login, the owner account and starter website content are initialized in MongoDB. Add other staff accounts from the **Admins** tab. Configure the same values in your production host's environment settings before deploying; local `.env` values do not transfer to Vercel.
