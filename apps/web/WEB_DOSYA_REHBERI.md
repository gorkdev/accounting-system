# Web Dosya Rehberi

Bu dokuman `apps/web` klasoru icin hizli referanstir.
Amac: "hangi dosya ne ise yariyor?" sorusunu tek yerden cevaplamak.

## `apps/web` klasoru

- `package.json`
  - Web uygulamasinin script ve bagimliliklarini tutar.
  - Onemli scriptler:
    - `npm run dev`: gelistirme sunucusu
    - `npm run build`: production build
    - `npm run preview`: build sonucu local preview

- `.env.example`
  - Frontend ortam degiskenleri sablonu.
  - Projeyi indiren kisi bununla kendi `.env` dosyasini olusturur.

- `.env`
  - Lokal gercek config.
  - Ornek: `NUXT_PUBLIC_API_BASE_URL`

- `nuxt.config.ts`
  - Nuxt ana ayar dosyasi.
  - Tailwind Vite plugin ayari burada.
  - `runtimeConfig.public.apiBaseUrl` degeri burada okunur.
  - Frontend, backend URL'sini bu config uzerinden alir.

- `app/app.vue`
  - Su an ana ekran.
  - Backend'den durum cekip gosterir:
    - frontend
    - backend
    - prisma
    - db
  - Durumlar emoji ile gosterilir (`calisiyor ✅`, `calismiyor ❌`).

- `app/assets/css/main.css`
  - Tailwind giris css dosyasi.
  - `@import "tailwindcss";` buradadir.

## `packages` ile iliski (onemli)

Monorepo'da ortak kodlar `packages` altinda tutulacak:

- `packages/types`
  - Ortak type/interface tanimlari
  - Ornek: API response tipleri, ortak enumlar

- `packages/utils`
  - Ortak utility/helper fonksiyonlari
  - Ornek: tarih/para formatlama, parser, ortak dogrulama helper'lari

Web tarafinda tekrar eden kod yazmamak icin once bu iki pakete bak.

## Gelistirme notu

Yeni bir ozellik eklerken tip veya helper hem API'de hem web'de kullanilacaksa:

1. once `packages/types` veya `packages/utils` icine ekle
2. sonra `apps/web` ve `apps/api` icinden import et

Bu yaklasim kod tekrarini azaltir ve bakimi kolaylastirir.

## Son yapilanlar (icon + animasyon)

- Kurulan paketler:
  - `@heroicons/vue`
  - `@vueuse/motion`
- Nuxt tarafinda motion module kullanimi:
  - `nuxt.config.ts` icinde `modules: ["@vueuse/motion/nuxt"]` eklenebilir.
  - Alternatif olarak plugin ile de aktif edilebilir.
- `app/app.vue` uzerinde test:
  - Heroicons import edilip ikon gosterimi denendi.
  - `v-motion` ve preset directive'ler (`v-motion-roll-top`, `v-motion-pop-bottom` vb.) ile animasyon test edildi.
- Heroicons import notu:
  - Uygulamada tek standart olarak `@heroicons/vue/24/solid` (veya `24/outline`) kullanilmasi onerilir.

