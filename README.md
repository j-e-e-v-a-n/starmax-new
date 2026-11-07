# Starmax Systems — Corporate Website

A production-ready corporate website for **Starmax Systems**, a security systems, surveillance, access control, home automation, and network solutions provider based in Kadavanthra, Kochi, Kerala, India.

---

## 1. Company Overview

- **Company Name:** Starmax Systems
- **Industry:** Security Systems, Surveillance, Access Control, Home Automation and Networking
- **Registered Office:** 55/1668, Green Nest Business Center, Girinagar, 9th Cross Road, Behind Mini Community Hall, Kadavanthra, Kochi – 682020, Kerala, India
- **Primary Phone:** +91 99954 33366
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
| `/` | **Home** | Complete corporate landing page featuring Hero, Trust Intro, 7-Service Grid, Why Starmax, Application Environments, Featured Solutions, Client Wordmarks, Testimonials, Gallery Preview, Callback Form, and Final CTA. |
| `/about` | **About Us** | Company approach, technology evolution, services links, installation & maintenance, and service points across Kerala. |
| `/services` | **Services Overview** | Comprehensive overview grid of all 7 security & automation disciplines with consultation request form. |
| `/services/ip-cctv-systems` | **IP CCTV Systems** | Commercial & residential surveillance, NVR setups, IR night vision, coverage planning, and dedicated enquiry form. |
| `/services/access-control-systems` | **Access Control Systems** | Biometric fingerprint readers, RFID cards, EM locks, audit trails, and security enquiry form. |
| `/services/video-door-phone` | **Video Door Phone** | Indoor color monitors, exterior doorbell cameras, remote door release, and villa/apartment enquiry form. |
| `/services/automatic-gates` | **Automatic Gates** | Motorized sliding gates, swing gates, boom barriers, safety photo-beams, and gate automation enquiry form. |
| `/services/intercom-epabx` | **Intercom / EPABX** | Private PBX switchboards, receptionist consoles, multi-floor call distribution, and telecom enquiry form. |
| `/services/time-attendance-systems` | **Time & Attendance** | Biometric clocking, shifts, overtime logging, exportable attendance logs, and attendance enquiry form. |
| `/services/home-automation` | **Home Automation** | Smart touchscreen panels, automated lighting scenes, security coordination, and residential enquiry form. |
| `/gallery` | **Gallery** | Categorized equipment gallery (CCTV, Signal Boosters, Gates, Access, etc.) with accessible keyboard-navigable Lightbox (ESC, Next, Prev). |
| `/clients` | **Top Clients** | Typography-restrained client wordmark grid featuring all 21 supplied client references. |
| `/testimonials` | **Testimonials** | Authentic client feedback regarding automatic gates and security equipment support. |
| `/contact` | **Contact Us** | Interactive contact message form, full address with copy function, direct calling links, and office details. |
| `/privacy-policy` | **Privacy Policy** | Pragmatic data handling notice for website enquiries. |
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
- **Backend:** Express API server (`server.ts`) for public forms, content, and admin management

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
# Database, first admin login, and session signing
MONGODB_URI="mongodb+srv://..."
MONGODB_DB="starmax"
ADMIN_EMAIL="admin@starmaxsystems.com"
ADMIN_PASSWORD="use-a-long-unique-password"
ADMIN_JWT_SECRET="use-a-long-random-secret"

# SMTP notifications for contact, callback, and service enquiry forms
CONTACT_NOTIFICATION_EMAIL="info@starmaxsystems.com"
SMTP_HOST="smtp.your-email-provider.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-smtp-login"
SMTP_PASSWORD="your-smtp-app-password"
SMTP_FROM="Starmax Systems <your-verified-sender@your-domain.com>"

# Image uploads from the admin panel
IMAGEKIT_PUBLIC_KEY="public_..."
IMAGEKIT_PRIVATE_KEY="private_..."
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"
```

Use SMTP credentials or an app password from your email provider; never put these values in frontend code or commit them. For Gmail, use a Google App Password (the server removes grouping whitespace) and set `SMTP_FROM` to the authenticated Gmail address or a verified Gmail “Send mail as” alias. Notifications go to `CONTACT_NOTIFICATION_EMAIL` (defaults to `info@starmaxsystems.com`) and replies are addressed to the submitter. Configure SMTP before accepting submissions: the API saves the lead, then sends the notification, and reports a failure if delivery is unavailable. Restart the development server after changing `.env`. Open `/admin` to sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. On first login, the owner account and starter website content are initialized in MongoDB. Add other staff accounts from the **Admins** tab. Configure the same values in your production host's environment settings before deploying; local `.env` values do not transfer to your production host.

## 6. Deploying to Vercel

The site is built as static Vite assets plus explicit serverless Express entry points for the API route groups. Nested routes use Vercel's supported dynamic path segments rather than nested catch-all functions. The current API uses nine functions, within Vercel Hobby's 12-function limit.

1. Use `npm run build` as the build command and `dist` as the output directory.
2. Set `MONGODB_URI`, `MONGODB_DB`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_JWT_SECRET` in the Vercel project's environment variables for the deployments you use. Also set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, and optionally `CONTACT_NOTIFICATION_EMAIL`.
3. For image uploads, set `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT`. The private key must only be configured as a server environment variable.
4. Contact, callback, and service enquiries are saved to MongoDB, displayed in the `/admin` inbox, and emailed to the configured notification recipient.
5. Redeploy after adding or changing environment variables. Test `/admin` and the API routes on the resulting deployment.

The admin API supports login, clients/gallery/testimonials create/read/update/delete, enquiry inbox and legacy career resume downloads, administrator listing/creation, and ImageKit uploads. Service enquiries are saved to the same admin inbox as other submissions.

## 7. Deploying the full application to cPanel

The Express server serves both the built frontend and the `/api/*` backend. cPanel's Passenger startup file is `app.js`; set the application root to the repository root and the startup file to `app.js`. The Git deployment hook installs production dependencies and restarts Passenger, but deliberately does not run Vite's memory-intensive build.

1. Confirm your cPanel plan supports Node.js 20 applications through Application Manager/Node.js Selector, Passenger, and outbound connections to MongoDB.
2. Create a MongoDB database (for example, MongoDB Atlas) and allow connections from your hosting provider's outbound IP. Ask Aqua Hosting for that IP; do not leave the database open to all IPs.
3. In cPanel, create/register the Node.js application with Node.js 20, production mode, application root `/home/jyobaqhy/repositories/starmax-new`, the domain and URL path you want to serve, and startup file `app.js`.
4. Add these application environment variables in cPanel:
   - `NODE_ENV=production`
   - `MONGODB_URI` and `MONGODB_DB`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long random `ADMIN_JWT_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`; optionally set `CONTACT_NOTIFICATION_EMAIL` (defaults to `info@starmaxsystems.com`).
   - For admin image uploads: `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT`.
5. In your local checkout, run `npm ci` and `npm run build`.
6. Upload the **contents** of the local `dist` directory (including `assets/` and `src/assets/`) into `/home/jyobaqhy/repositories/starmax-new/dist/` using cPanel File Manager. Do not upload `.env` or `node_modules`.
7. Deploy the Git branch from cPanel. The checked-in `.cpanel.yml` installs production dependencies and restarts the Node.js app without running the build on the host.
8. Visit the site's `/` and `/admin` routes, sign in with the configured admin credentials, and test a form and image upload.

For later updates, rebuild locally, update the Git branch and pull it in cPanel, replace the contents of `dist/` with the newly built files, then restart the application. Since `dist/` is Git-ignored, the uploaded build remains on the server when source changes are pulled.
