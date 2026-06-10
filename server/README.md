# H-Daily API

Backend for the H-Daily grocery store: **Express + TypeScript + Prisma + PostgreSQL**.

## Prerequisites

- Node.js >= 18
- A PostgreSQL database. Easiest local option is Docker (a `docker-compose.yml` is included). Alternatively use a free hosted Postgres (Neon, Supabase, Railway).

## Setup (first run on a new machine)

```bash
cd server

# 1. Install dependencies (also runs `prisma generate` via postinstall)
npm install

# 2. Configure environment
cp .env.example .env
#   -> edit .env and set DATABASE_URL + JWT_SECRET

# 3. Start Postgres (skip if you use a hosted DB)
docker compose up -d

# 4. Create the database schema
npm run db:migrate          # creates tables (prompts for a migration name first time)

# 5. Seed products + subscription plans
npm run db:seed

# 6. Run the API in watch mode
npm run dev
```

The API listens on `http://localhost:4000` (configurable via `PORT`). Health check: `GET /health`.

## Scripts

| Script               | Description                                  |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Start API with hot reload (tsx watch)        |
| `npm run build`      | Compile TypeScript to `dist/`                |
| `npm start`          | Run the compiled server (`dist/index.js`)    |
| `npm run db:migrate` | Create/apply a dev migration                 |
| `npm run db:deploy`  | Apply migrations in production               |
| `npm run db:seed`    | Seed products + plans                        |
| `npm run db:studio`  | Open Prisma Studio (visual DB browser)       |
| `npm run db:reset`   | Drop, re-migrate, and re-seed the database   |

## API overview

All routes are under `/api`. Admin routes require a JWT from an account with `role = admin`.

### Products

- `GET /products?category=frais&search=riz` — list active products
- `GET /products/:id` — single product
- `POST /products` _(admin)_ — create
- `PATCH /products/:id` _(admin)_ — update
- `DELETE /products/:id` _(admin)_ — soft delete

### Orders

- `POST /orders` — checkout. Body: `{ customerName, phone, address, paymentMethod, items: [{ productId, quantity }] }`. Prices and stock are validated server-side; stock is decremented in a transaction.
- `GET /orders/:id` — fetch an order
- `GET /orders` _(admin)_ — list all
- `PATCH /orders/:id/status` _(admin)_ — update status

### Subscriptions

- `GET /subscriptions/plans` — the three plans (basic / family / premium)
- `POST /subscriptions` — create a subscription request
- `GET /subscriptions` _(admin)_

### Credit

- `GET /credit/levels` — tier limits (Express 5 000 / Standard 15 000 / Premium 30 000 HTG)
- `POST /credit/applications` — submit a credit request
- `GET /credit/applications` _(admin)_
- `POST /credit/applications/:id/approve` _(admin)_ — approve + open a credit account
- `GET /credit/account` _(auth)_ — current user's account + transactions
- `POST /credit/account/purchase` _(auth)_ — spend credit (1-month term adds 10%)
- `POST /credit/account/payment` _(auth)_ — repay credit

### Payments (manual MonCash)

- `GET /payments/config` — merchant number + instructions (from `MONCASH_NUMBER`)
- `POST /payments/moncash` — create a subscription + a pending MonCash payment in one transaction. Amount is taken from the plan server-side. Body includes the subscription details plus `senderPhone` and `transactionRef`.
- `GET /payments` _(admin)_ — list payments to verify
- `PATCH /payments/:id/verify` _(admin)_ — `{ status: "verified" | "rejected" }`. Verifying activates the linked subscription; rejecting cancels it.

> Manual flow: the customer sends money to the MonCash number themselves, then enters the transaction ID. Payments land as `pending_verification` for you to confirm.

### Contact

- `POST /contact` — send a message
- `GET /contact` _(admin)_

### Auth

- `POST /auth/register` → `{ token, user }`
- `POST /auth/login` → `{ token, user }`
- `GET /auth/me` _(auth)_

> To create an admin: register a user, then in Prisma Studio (`npm run db:studio`) set that user's `role` to `admin`.

## Project structure

```
server/
├─ prisma/
│  ├─ schema.prisma     # data model
│  └─ seed.ts           # 12 products + 3 plans
├─ src/
│  ├─ index.ts          # server bootstrap
│  ├─ app.ts            # express app + middleware
│  ├─ env.ts            # env loading/validation
│  ├─ db.ts             # shared Prisma client
│  ├─ lib/credit.ts     # credit limits / interest helpers
│  ├─ middleware/       # auth (JWT) + error handling
│  └─ routes/           # products, orders, subscriptions, credit, contact, auth
├─ docker-compose.yml   # local Postgres
└─ .env.example
```
