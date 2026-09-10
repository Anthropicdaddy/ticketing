# Motor Hut - Car Dealership Website

A Next.js 16 car dealership website with inventory management, WhatsApp integration, and admin panel.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Fonts**: Playfair Display (headings) + Montserrat (body)
- **Deployment**: Vercel
- **WhatsApp**: Direct integration via `wa.me` links

## Project Structure

```
src/
├── app/
│   ├── [lang]/                 # Locale routes (English only: /en)
│   │   ├── cars/               # Inventory pages
│   │   │   ├── page.tsx        # Car listing with search/filter
│   │   │   └── [id]/page.tsx   # Car detail with WhatsApp CTA
│   │   ├── services/page.tsx   # Purchase process & finance
│   │   ├── about/page.tsx      # Company info
│   │   ├── contact/page.tsx    # WhatsApp contact form
│   │   └── page.tsx            # Homepage
│   ├── kicheleboyz/            # Admin panel
│   │   ├── cars/page.tsx       # Car management (CRUD)
│   │   └── layout.tsx          # Admin layout with sidebar
│   ├── api/
│   │   ├── public/cars/        # Public car APIs
│   │   └── admin/cars/         # Admin car APIs
│   ├── layout.tsx              # Root layout with fonts
│   ├── globals.css             # Tailwind + custom theme
│   └── page.tsx                # Root redirect to /en
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── admin-sidebar.tsx       # Admin navigation
├── lib/
│   ├── db/
│   │   ├── schema.ts           # Drizzle schema (cars table)
│   │   └── index.ts            # DB connection
│   └── utils.ts                # cn() helper
└── middleware.ts               # Minimal middleware
```

## Database Schema

```typescript
// src/lib/db/schema.ts
export const carStatusEnum = pgEnum("car_status", ["available", "sold", "reserved"]);

export const cars = pgTable("cars", {
  id: uuid("id").defaultRandom().primaryKey(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  transmission: varchar("transmission", { length: 20 }).notNull(),
  fuel: varchar("fuel", { length: 20 }).notNull(),
  status: carStatusEnum("status").default("available").notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

## Key Features Implementation

### 1. WhatsApp Integration
All inquiries route to WhatsApp (`+254707242805`):

```typescript
const WHATSAPP_NUMBER = "254707242805";

const openWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

Used on:
- Car detail page "Inquire on WhatsApp" button
- Contact page quick actions
- Contact form submission

### 2. Car Inventory (Public)
- **Listing**: `/en/cars` - Search by make, max price, pagination
- **Detail**: `/en/cars/[id]` - Specs, gallery placeholder, WhatsApp CTA

### 3. Admin Car Management
- **Route**: `/kicheleboyz/cars`
- **Features**: Add/Edit/Delete cars, status management, image URL

### 4. Theme (Navy/Gold)
```css
/* globals.css */
:root {
  --background: #0d0d0d;
  --foreground: #f5f5f5;
  --primary: #c9a961;        /* Gold */
  --primary-foreground: #0d0d0d;
  --card: #1a1a1a;
  --border: rgba(201, 169, 97, 0.2);
}
```

Fonts loaded via `next/font/google`:
- `Montserrat` (variable: `--font-sans`)
- `Playfair_Display` (variable: `--font-heading`)

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Database
npx drizzle-kit push      # Sync schema to DB
npx drizzle-kit studio    # DB UI
```

## Environment Variables

```env
DATABASE_URL=postgresql://...
```

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add `DATABASE_URL` in Vercel Environment Variables
3. Deploy

## Agent Build Instructions

If rebuilding from scratch:

1. **Initialize Next.js 16**: `npx create-next-app@latest motorhut --typescript --tailwind --app`
2. **Install deps**: `npm i drizzle-orm @neondatabase/serverless drizzle-kit lucide-react clsx tailwind-merge @radix-ui/react-*`
3. **Setup Drizzle**: Create `src/lib/db/schema.ts` with cars table
4. **Create API routes**: `/api/public/cars` and `/api/admin/cars`
5. **Build pages**: Home → Cars listing → Car detail → Services → About → Contact
6. **Add WhatsApp**: Use `wa.me/${PHONE}?text=${encodeURIComponent(message)}`
7. **Admin panel**: Simple CRUD at `/kicheleboyz/cars`
8. **Style**: Navy/Gold theme with Playfair + Montserrat fonts
9. **Deploy**: Push to GitHub → Vercel → Add DB URL