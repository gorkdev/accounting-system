# Web Dosya Rehberi

Bu dokuman `apps/web` klasoru icin hizli referanstir.
Amac: "hangi dosya ne ise yariyor?" sorusunu tek yerden cevaplamak.

## `apps/web` kok dosyalari

- `package.json`
  - Web uygulamasinin script ve bagimliliklarini tutar.
  - `@accounting/types`, `@accounting/utils` (lokal `file:../../packages/...`) burada baglidir.
  - Onemli scriptler:
    - `npm run dev`: gelistirme sunucusu
    - `npm run build`: production build
    - `npm run preview`: build sonucu local preview

- `.env.example` / `.env`
  - Ornek: `NUXT_PUBLIC_API_BASE_URL` (varsayilan `http://localhost:3001`).

- `nuxt.config.ts`
  - Nuxt ana ayar dosyasi.
  - Tailwind Vite plugin (`@tailwindcss/vite`).
  - `runtimeConfig.public.apiBaseUrl`.

## Nuxt 4 `app/` dizini

- `app/app.vue`
  - Uygulama kok bilezeni: `<NuxtLayout>` + `<NuxtPage />`.
  - Sayfa icerigi burada uretilmez; `pages` ve `layouts` kullanilir.

- `app/assets/css/main.css`
  - `@import "tailwindcss";` — global stiller.

### Sayfalar (`app/pages/`)

| Dosya           | Rota        | Aciklama |
|-----------------|-------------|----------|
| `index.vue`     | `/`         | Cookie’ye gore `/ozet` veya `/giris-yap` yonlendirmesi (`layout: false`). |
| `giris-yap.vue` | `/giris-yap`| Auth layout, `guest` middleware; mock giris formu. |
| `ozet.vue`      | `/ozet`     | App layout, `auth` middleware; ozet kartlari + API saglik bilgisi. |

### Layout’lar (`app/layouts/`)

- `auth.vue` — Giris kabugu (ortalanmis kart, acik zemin).
- `app.vue` — Panel kabugu: `LayoutAppSidebar` + `LayoutAppTopBar` + `<main><slot /></main>`.

### Middleware (`app/middleware/`)

- `auth.ts` — Oturum yoksa `/giris-yap` (korunan sayfalar icin `definePageMeta` ile).
- `guest.ts` — Oturum varsa `/ozet` (giris sayfasinda).

### Composable’lar (`app/composables/`)

- `useAuth.ts` — `useCookie` ile mock oturum (`@accounting/utils` cookie adi / suresi, `@accounting/types` token tipi). Gercek API auth oldugunda burada/token mantigi guncellenir.

### Bilesenler (`app/components/layout/`)

Nuxt, `components/layout/` altindaki dosyalari **otomatik isimlendirir** (klasor adi + dosya adi):

- `AppSidebar.vue`  → sablonlarda **`LayoutAppSidebar`**
- `AppTopBar.vue`   → **`LayoutAppTopBar`**
- `AppUserMenu.vue` → **`LayoutAppUserMenu`**

`layouts/app.vue` icinde bu tam isimler kullanilmalidir; `<AppSidebar />` tek basina cozulmez.

## `packages` ile iliski

- `packages/types`: Ornek: `ApiRootHealthResponse`, `DatabaseHealth`, `AuthSessionToken`.
- `packages/utils`: Ornek: `AUTH_SESSION_COOKIE_NAME`, `AUTH_SESSION_MAX_AGE_SEC`.

Tip/sabit web + API’de tekrarlanmasin diye once bu paketlere eklenir.

## Gelistirme notu

Yeni bir ozellik eklerken tip veya helper hem API’de hem web’de kullanilacaksa:

1. once `packages/types` veya `packages/utils` icine ekle
2. sonra `apps/web` ve `apps/api` icinden import et

## Eski / kaldirilan davranislar

- Durum ekrani artik tek basina `app/app.vue` degildir; **Ozet** sayfasi (`/ozet`) API saglik endpoint’ini `onMounted` ile cagirir.
- Ingilizce rota adlari (`/login`, `/dashboard`) kaldirildi; yerine `/giris-yap` ve `/ozet` kullanilir.
