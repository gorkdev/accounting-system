# Proje Dosya Rehberi

Bu dokuman, projeyi unutmayasin diye "hangi dosya ne ise yariyor" sorusuna direkt cevap verir.

## Genel yapi

- `apps/api`: Backend (Express + Prisma + PostgreSQL)
- `apps/web`: Frontend (Nuxt 4 + Vue + Tailwind)
- `apps/docs`: Proje notlari ve teknik dokumantasyon (bu dosya)
- `packages/types`: Ortak TypeScript tipleri (web + api)
- `packages/utils`: Ortak sabitler / yardimci export’lar

Kok dizinde `package.json` **`workspaces`** (`apps/*`, `packages/*`) tanimlar. Pratikte gelistirme icin bagimlilik ve `dev` komutlari cogu zaman **`apps/web`** ve **`apps/api`** icinde calistirilir.

Kok `.gitignore`: `node_modules`, `.env`, `dist` vb. — hassas dosyalar repoya girmemeli.

---

## `apps/api` (Backend)

### Temel dosyalar

- `apps/api/package.json`
  - `@accounting/types` baglidir (`DatabaseHealth` vb.).
  - Onemli komutlar:
    - `npm run dev`: API'yi gelistirme modunda calistirir.
    - `npm run db:create`: `account_system` DB'sini yoksa olusturur.
    - `npm run prisma:generate`: Prisma client uretir.
    - `npm run prisma:migrate`: Migration uygular/olusturur.

- `apps/api/tsconfig.json`
  - `@/*` alias'i `src/*`'a gider.

- `apps/api/.env.example` / `.env`
  - Gercek sifreler `.env` icinde; Git’e gitmez.

### Calisma akisi (entrypoint ve server)

- `apps/api/src/index.ts` — `startServer()` girisi.
- `apps/api/src/server.ts` — Express, DB testi, PORT.
- `apps/api/src/app.ts` — `helmet`, `cors`, route’lar, 404/500.

### Config ve DB

- `apps/api/src/env.ts` — Zod ile `PORT`, `DATABASE_URL`.
- `apps/api/src/lib/prisma.ts` — Tek `PrismaClient`.
- `apps/api/prisma/schema.prisma` — Datasource ve modeller.

### Route, servis, script

- `apps/api/src/routes/index.ts` — `GET /` — JSON: `backend` + `getDatabaseHealth()` alanlari.

- `apps/api/src/services/database.service.ts`
  - `import type { DatabaseHealth } from "@accounting/types"`
  - `getDatabaseHealth()` / startup baglanti kontrolu.

- `apps/api/src/scripts/db-create.ts` — `db:create` scripti.

---

## `apps/web` (Frontend)

Ayrintili dosya listesi: `apps/web/WEB_DOSYA_REHBERI.md`.

### Temel dosyalar

- `apps/web/package.json` — `@accounting/types`, `@accounting/utils` + Nuxt, Tailwind, Motion.
- `apps/web/nuxt.config.ts` — Tailwind Vite plugin, `runtimeConfig.public.apiBaseUrl`.
- `apps/web/app/app.vue` — `<NuxtLayout><NuxtPage /></NuxtLayout>`.

### Rotalar (Turkce slug)

- `/` — yonlendirme (`/ozet` veya `/giris-yap`).
- `/giris-yap` — Auth layout, mock giris (cookie).
- `/ozet` — Panel layout; backend saglik ozeti dahil.

### Layout, middleware, auth

- `app/layouts/auth.vue`, `app/layouts/app.vue`
- `app/middleware/auth.ts`, `guest.ts`
- `app/composables/useAuth.ts` — cookie mock; ileride API token ile degistirilecek.

### UI bilesenleri

- `app/components/layout/` — Sidebar, TopBar, UserMenu. Nuxt global isimleri: **`LayoutAppSidebar`**, **`LayoutAppTopBar`**, **`LayoutAppUserMenu`** (`layouts/app.vue` icinde boyle kullan).

### Stil

- `app/assets/css/main.css` — `@import "tailwindcss";`
- Panel ve giris sayfalarinda sade Tailwind utility’leri (slate paleti, kart/border).

---

## `packages/types`

- `src/auth.ts` — `AuthSessionToken` vb.
- `src/health.ts` — `DatabaseHealth`, `ApiRootHealthResponse`
- `src/index.ts` — re-export’lar
- Node `tsc` uyumu icin ic import’larda `.js` uzantisi kullanilir (`src/index.ts`).

---

## `packages/utils`

- Ornek: `AUTH_SESSION_COOKIE_NAME`, `AUTH_SESSION_MAX_AGE_SEC` (`app/composables/useAuth.ts` ile uyumlu).

---

## Kisa notlar (unutmamak icin)

- API root: `http://localhost:3001/`
- Web dev: `http://localhost:3000/`
- API import alias: `@/*` → `src/*`
- Ortak sozlesme: `packages/types` (+ gerekiyorsa `packages/utils`)
- Yeni domain: Prisma model → migrate → service → route → web’de sayfa/API cagrisi

---

## Tarihsel / arsiv notlari

- Ilk taslakta `app/app.vue` uzerinde tek sayfa + icon/motion denemeleri vardi; su an sayfa yapisi `pages/` + `layouts/` ile ayrildi.
- `nodemon` zorunlu degil; API `npm run dev` tsx watch kullanir.
- `apps/web` icin `@heroicons/vue`, `@vueuse/motion` kurulu; panel shell’de su an agir icon kullanimi yok, motion modulu ihtiyaca gore sayfalarda kullanilabilir.
