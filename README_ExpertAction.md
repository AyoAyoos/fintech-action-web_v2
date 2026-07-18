<div align="center">

# ExpertAction® — Price Action Trading Academy

**A modern, high-performance marketing & enrollment site for India's premier Price Action & Risk Management trading academy.**

[![Live Site](https://img.shields.io/badge/live-fintech--action--webv2.vercel.app-000000?style=for-the-badge&logo=vercel)](https://fintech-action-webv2.vercel.app/#home)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[**🌐 Live Demo**](https://fintech-action-webv2.vercel.app/#home) 

</div>

---

## 📖 Overview

This repository powers the official website for **ExpertAction®**, a NISM-certified stock market education academy founded in 2019 by **Mangesh Balasaheb Waghmare**, specializing in **Price Action Trading**, **Risk Management**, **Trading Psychology**, and **Intraday Trading Strategies**.

The site is a fast, SEO-friendly, single-page marketing experience built to:

- Showcase the academy's copyright-registered "11 Entry Setup" curriculum
- Present tiered training programs with transparent pricing
- Drive enrollments via direct call, WhatsApp, and an on-site enquiry form
- Highlight social proof (1,500+ students trained) and a photo gallery of sessions/events

> 🎓 *Author of "ExpertAction Intraday Trading – 11 Entry Setup"* · **NISM-Certified Research Analyst** · **Copyright-Registered Author**

---

## ✨ Features

### Product / Site Features
- **Hero section** with animated tagline and dual CTAs (Call Now / WhatsApp)
- **About** section with founder credentials and academy milestones
- **Programs** — three structured, copyright-registered course tiers (Beginner, Intermediate, Master) with pricing, duration, and curriculum highlights
- **Gallery** of training sessions and student milestones
- **Why Us** — proprietary methodology highlights (Entry Setups, Micro SL Strategy, Live Mentoring)
- **Contact** section with address, business hours, and a program enquiry form
- **Legal/compliance footer** with SEBI-compliant educational disclaimer
- Smooth in-page anchor navigation (`#home`, `#about`, `#courses`, `#gallery`, `#contact`)
- Click-to-call and WhatsApp deep links for instant lead conversion

### Engineering Features
- ⚡️ **Vite**-powered build with **React 19**
- 🧭 **TanStack Start** + **TanStack Router** for file-based, type-safe routing
- 🔄 **TanStack Query** for data fetching and caching
- 🔐 **Supabase** integration for auth and backend data (admin route, migrations)
- 🎨 **Tailwind CSS** + `tailwind-merge` for a fully custom, utility-first design system
- 🧩 **Radix UI** primitives — accessible, unstyled components (dialogs, dropdowns, tabs, sidebar, carousel, charts, etc.)
- 📝 **React Hook Form** + **Zod** for type-safe, validated forms (the enquiry form)
- 🛡️ Full **TypeScript** coverage across the app
- 🚀 Deployed on **Vercel**

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TanStack Start |
| Routing | TanStack Router (file-based) |
| Data / State | TanStack Query |
| Backend / Auth | Supabase |
| Styling | Tailwind CSS, `tailwind-merge` |
| UI Primitives | Radix UI |
| Forms & Validation | React Hook Form, Zod |
| Language | TypeScript |
| Build Tool | Vite |
| Deployment | Vercel |

---

## 🗂️ Project Structure

```
.
├── AGENTS.md
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package.json
├── vite.config.ts
├── public/
├── src/
│   ├── router.tsx
│   ├── routeTree.gen.ts        # auto-generated — do not edit manually
│   ├── server.ts
│   ├── start.ts
│   ├── styles.css
│   ├── components/
│   │   ├── CTAButton.tsx
│   │   ├── TextType.tsx / .css
│   │   └── ui/                 # Radix-based UI primitives library
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── auth-attacher.ts
│   │       ├── auth-middleware.ts
│   │       ├── client.server.ts
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── lovable-error-reporting.ts
│   │   ├── site-queries.ts
│   │   └── utils.ts
│   └── routes/                 # file-based routing — see routes/README.md
│       ├── __root.tsx
│       ├── admin.tsx
│       ├── auth.tsx
│       └── index.tsx
└── supabase/
    ├── config.toml
    └── migrations/
```

> ℹ️ `src/routeTree.gen.ts` is auto-generated by TanStack Router — never edit it by hand.
> See [`src/routes/README.md`](./src/routes/README.md) for routing conventions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js **≥ 18**
- npm (or Bun, given `bunfig.toml`)
- A [Supabase](https://supabase.com) project (for auth/admin features)

### Installation

```bash
git clone https://github.com/AyoAyoos/fintech-action-web.git
cd fintech-action-web
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> Adjust variable names to match what's referenced in `src/integrations/supabase/client.ts` / `client.server.ts` if they differ.

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the port TanStack Start assigns).

### Build for production

```bash
npm run build
```

### Lint & format

```bash
npm run lint
npm run format
```

---

## 🧭 Routes

| Route | Description |
|---|---|
| `/` | Landing page — Home, About, Courses, Gallery, Contact sections |
| `/auth` | Authentication flow (Supabase) |
| `/admin` | Admin-only area (protected) |

Anchor sections on the landing page:
`#home` · `#about` · `#courses` · `#gallery` · `#contact`

---

## 🎓 Programs Offered

| Program | Level | Setups | Duration | Price |
|---|---|---|---|---|
| **Understanding Price Action** | Beginner | 2 Copyrighted Entry Setups | 2 Days | ₹19,999 |
| **Advanced Trader Program** ⭐ Most Popular | Intermediate | 7 Copyrighted Entry Setups | 15 Days | ₹50,000 |
| **Professional Master Program** | Master | 11 Copyrighted Entry Setups | 30 Days | ₹1,00,000 |

Each program includes conceptual price action training, micro risk & stop-loss frameworks, capital management, and copyrighted educational study models — with higher tiers adding live market mentoring, practical trading sessions, and a completion certificate.

---

## 📍 Contact & Business Info

- **Address:** Office No 23, 3rd Floor, B Wing, City Vista Downtown, Fountain Road, Kharadi, Pune – 411014
- **Phone:** [+91 82372 20005](tel:+918237220005)
- **WhatsApp:** [Chat now](https://wa.me/918237220005)
- **Facebook:** [ExpertAction.in](https://www.facebook.com/ExpertAction.in)
- **Hours:** 09:00 AM – 05:00 PM (daily)

---

## ⚖️ Disclaimer

ExpertAction® provides educational content for learning purposes only. It does not offer guaranteed returns, portfolio management, or investment advisory services. This website does **not** constitute investment advice, financial recommendation, or endorsement of specific securities. Trading in financial markets involves risk — please consult a **SEBI-registered professional** before making investment decisions.

---

## 📄 License

Laveric Technologies LLP — All Rights Reserved.
© 2026 ExpertAction Price Action Trading Academy — All Rights Reserved.
---

<div align="center">

**ExpertAction®** — *Price Action. Precision Execution.*

[Website](https://fintech-action-webv2.vercel.app/#home) · [Repository](https://github.com/AyoAyoos/fintech-action-web)

</div>
