# SnapStore

> AI-powered visual e-commerce platform — built with MeDo for the Build with MeDo Hackathon

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-4F46E5?style=for-the-badge)](https://app-avjuc60bs16p.appmedo.com)
[![Built with MeDo](https://img.shields.io/badge/Built%20with-MeDo-FF6B6B?style=for-the-badge)](https://medo.dev)
[![Hackathon](https://img.shields.io/badge/Hackathon-Build%20with%20MeDo-orange?style=for-the-badge)](https://medo.devpost.com)

## What is SnapStore?

SnapStore lets any small business owner turn product photos into a live, shoppable storefront in seconds — no coding required. Upload a photo, describe your product, and our AI (powered by MeDo's LLM plugin) instantly generates a compelling product title, description, pricing suggestion, and SEO tags. Buyers can browse your storefront and purchase instantly via Stripe.

## Live Demo

**[https://app-avjuc60bs16p.appmedo.com](https://app-avjuc60bs16p.appmedo.com)**

## Features

### For Sellers
- **AI Listing Generation** — describe your product and the LLM plugin writes your title, description (150 words), suggested price, and 5 SEO tags automatically
- **Drag & Drop Upload** — upload product photos with ease
- **Editable Listings** — tweak AI-generated content before publishing
- **Seller Dashboard** — view total products, revenue, and orders at a glance
- **Secure Auth** — seller login protected by MeDo's built-in auth

### For Buyers
- **Beautiful Storefront** — product grid with images, titles, and prices
- **Shopping Cart** — sidebar cart with add/remove functionality
- **Stripe Checkout** — real payment processing via Stripe plugin
- **Payment Confirmation** — order success page after purchase

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS + Radix UI |
| Routing | React Router v7 |
| AI Generation | MeDo Large Language Model Plugin |
| Payments | MeDo Stripe Payments Plugin |
| Database | Supabase (via MeDo) |
| Auth | MeDo Auth (miaoda-auth-react) |
| Build | Vite + Rolldown |
| Platform | MeDo by Baidu |

## Project Structure

```
src/
  pages/
    LandingPage.tsx         # Hero + How It Works + Features
    LoginPage.tsx           # Seller authentication
    ProductUploadPage.tsx   # AI-powered listing creation
    StorefrontPage.tsx      # Public product grid + cart
    DashboardPage.tsx       # Seller analytics + order management
    PaymentSuccessPage.tsx  # Post-checkout confirmation
  components/
    layouts/Header.tsx      # Navigation bar
    common/RouteGuard.tsx   # Protected route wrapper
    common/CartSidebar.tsx  # Shopping cart sidebar
  contexts/
    AuthContext.tsx         # Auth state management
  db/
    api.ts                  # Supabase database layer
  types/
    index.ts                # TypeScript type definitions
```

## Design System

- **Primary**: Deep Indigo `#4F46E5`
- **Accent**: Coral `#FF6B6B` (CTAs)
- **Background**: White
- **Typography**: Inter / System fonts
- **Mobile-first**: Fully responsive

## How It Was Built

This entire app was built using **MeDo's Deep Build mode** with two plugins:
1. **Large Language Model plugin** — powers the AI listing generator
2. **Stripe Payments plugin** — enables real checkout flow

The prompt described all 5 pages, their interactions, the plugin integrations, and the design system. MeDo's AI agent generated the full React/TypeScript codebase, wired up the database schema, configured auth, and deployed to a public URL — all from natural language.

## Hackathon Category

**Business & E-Commerce** — Build with MeDo Hackathon by Baidu

## Setup (Local Development)

> Note: This app is deployed and fully functional at the live demo URL above. To run locally, you would need a MeDo account and API keys.

```bash
npm install
npm run dev
```

## License

MIT
