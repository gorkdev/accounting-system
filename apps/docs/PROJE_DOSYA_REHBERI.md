# Proje Dosya Rehberi

Bu dokuman, projeyi unutmayasin diye "hangi dosya ne ise yariyor" sorusuna direkt cevap verir.

## Genel yapi

- `apps/api`: Backend (Express + Prisma + PostgreSQL)
- `apps/web`: Frontend (Nuxt + Vue + Tailwind)
- `apps/docs`: Proje notlari ve teknik dokumantasyon
- `packages/types`: Ortak TypeScript tipleri (web + api + ileride mobile)
- `packages/utils`: Ortak utility/helper fonksiyonlari

---

## `apps/api` (Backend)

### Temel dosyalar

- `apps/api/package.json`
  - API tarafinin komutlarini ve bagimliliklarini tutar.
  - Onemli komutlar:
    - `npm run dev`: API'yi gelistirme modunda calistirir.
    - `npm run db:create`: `account_system` DB'sini yoksa olusturur.
    - `npm run prisma:generate`: Prisma client uretir.
    - `npm run prisma:migrate`: Migration uygular/olusturur.

- `apps/api/tsconfig.json`
  - TypeScript ayarlari.
  - `@/*` alias'i burada tanimli (`src/*`'a gider).
  - Bu sayede `../../` yerine `@/services/...` seklinde import yaziyorsun.

- `apps/api/.env.example`
  - Ortam degiskenleri sablonu.
  - GitHub'a gidebilir.

- `apps/api/.env`
  - Gercek lokal config dosyasi (sifre vb. burada).
  - GitHub'a gonderilmez.

### Calisma akisi (entrypoint ve server)

- `apps/api/src/index.ts`
  - En minimal giris noktasi.
  - Sadece `startServer()` cagirir.

- `apps/api/src/server.ts`
  - Sunucuyu ayaga kaldiran orchestrator dosyasi.
  - Sirayla:
    1. `createApp()` ile Express app olusturur
    2. Baslangicta DB baglantisini test eder
    3. `PORT` uzerinden dinlemeye baslar

- `apps/api/src/app.ts`
  - Express uygulama konfigurasyonu:
    - `helmet`, `cors`, `express.json`
    - route baglama
    - 404 handler (`NOT_FOUND`)
    - 500 handler (`INTERNAL_SERVER_ERROR`)

### Config ve DB

- `apps/api/src/env.ts`
  - `.env` degerlerini yukler (`dotenv`)
  - Zod ile dogrular (`PORT`, `DATABASE_URL`)
  - Yanlis/eksik env varsa uygulama baslarken hata verir.

- `apps/api/src/lib/prisma.ts`
  - Tek bir `PrismaClient` instance'i olusturur.
  - Tum servisler DB'ye buradan gider.

- `apps/api/prisma/schema.prisma`
  - Prisma datasource ve generator ayarlari.
  - Gelecekte domain modelleri (account, transaction vs.) burada olacak.

### Route, servis, script

- `apps/api/src/routes/index.ts`
  - Su an tek endpoint:
    - `GET /` -> backend/prisma/db durumunu JSON doner.

- `apps/api/src/services/database.service.ts`
  - DB saglik/ulasilabilirlik mantigi burada.
  - `checkDatabaseConnectionOnStartup()`: startup sirasinda baglanti test/log
  - `getDatabaseHealth()`: endpoint icin `calisiyor / calismiyor` sonucu

- `apps/api/src/scripts/db-create.ts`
  - DB otomasyon scripti.
  - `DATABASE_URL` icinden hedef DB adini alir.
  - DB yoksa olusturur.
  - Sifre placeholder ise terminalden ister ve `.env` icine yazar.

---

## `apps/web` (Frontend)

### Temel dosyalar

- `apps/web/package.json`
  - Nuxt tarafinin komutlari ve bagimliliklari.
  - Onemli komutlar:
    - `npm run dev`
    - `npm run build`
    - `npm run preview`

- `apps/web/.env.example`
  - Frontend env sablonu.
  - `NUXT_PUBLIC_API_BASE_URL` burada tanimli.

- `apps/web/.env`
  - Gercek lokal frontend env.

### Nuxt ve UI

- `apps/web/nuxt.config.ts`
  - Nuxt ana konfigurasyonu.
  - Tailwind Vite plugin ayari burada.
  - `runtimeConfig.public.apiBaseUrl` burada tanimli.
  - Frontend, backend URL'ini buradan okur.

- `apps/web/app/app.vue`
  - Su an ana sayfa.
  - API'den durum cekip ekranda gosterir:
    - frontend
    - backend
    - prisma
    - db
  - `calisiyor`/`calismiyor` icin emoji gosterimi var.

- `apps/web/app/assets/css/main.css`
  - Tailwind giris CSS dosyasi (`@import "tailwindcss";`).
  - `nuxt.config.ts` icindeki `css` yolu bu dosyaya isaret etmeli.

---

## Kisa notlar (unutmamak icin)

- API ve web icin `.env` ayri dosyalardadir.
- API root endpoint'i: `http://localhost:3001/`
- Web dev endpoint'i: `http://localhost:3000/`
- Projede import alias:
  - API: `@/`
- Ortak kod yaklasimi:
  - `packages/types`: ortak type/interface tanimlari
  - `packages/utils`: ortak fonksiyonlar (format, parser, helper vb.)
- Yeni domain gelistirirken:
  1. `schema.prisma` model ekle
  2. migrate calistir
  3. service yaz
  4. route ile expose et

---

## Son oturumda yapilanlar

### API calistirma notu

- `apps/api` tarafinda `npm run start` komutu `dist/index.js` bekler.
- `dist` yoksa once `npm run build`, sonra `npm run start` calistirilir.
- Gelistirme icin hizli yol: `npm run dev` (tsx watch ile TypeScript'i direkt calistirir).
- Bu nedenle su an `nodemon` zorunlu degil; mevcut `dev` scripti ayni ihtiyaci karsiliyor.

### Frontend UI paketleri

- `apps/web` tarafina su paketler eklendi:
  - `@heroicons/vue`
  - `@vueuse/motion`
- Motion, Nuxt'ta module yaklasimiyla kullanilabilir:
  - `modules: ["@vueuse/motion/nuxt"]`

### Frontend test sonucu

- `app/app.vue` uzerinde icon + animasyon testleri yapildi.
- Heroicons import ve gorunurluk testi tamamlandi.
- `v-motion` ve motion directive'leri calisacak sekilde kullanildi.

