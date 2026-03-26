# Accounting System

Bu proje bir monorepo yapisindadir:

- `apps/web`: Nuxt frontend
- `apps/api`: Express + Prisma backend

## 1) Gereksinimler

Projeyi sifirdan kurmak icin sunlar bilgisayarinda kurulu olmali:

- Node.js (LTS)
- npm
- PostgreSQL

## 2) Projeyi indir

```bash
git clone <repo-url>
cd accounting-system
```

## 3) API icin `.env` olustur

`apps/api` klasorunde `.env.example` dosyasini kopyala:

Windows (cmd / powershell):

```bash
copy .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

Sonra `apps/api/.env` icindeki `DATABASE_URL` satirini kendi PostgreSQL bilgilerine gore duzenle.

Ornek:

```env
DATABASE_URL="postgresql://postgres:SIFREN@localhost:5432/account_system?schema=public"
```

## 4) Web icin `.env` olustur

`apps/web` klasorunde `.env.example` dosyasini kopyala:

Windows (cmd / powershell):

```bash
copy .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

Varsayilan API adresi:

```env
NUXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

## 5) API bagimliliklarini kur

```bash
cd apps/api
npm install
```

## 6) Veritabanini olustur

`apps/api` klasorunde:

```bash
npm run db:create
```

Bu komut `account_system` veritabanini yoksa olusturur.

## 7) Prisma hazirlik

`apps/api` klasorunde:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## 8) Backend'i calistir

`apps/api` klasorunde:

```bash
npm run dev
```

Backend adresi:

- `http://localhost:3001`

## 9) Frontend'i calistir

Yeni bir terminal ac ve:

```bash
cd apps/web
npm install
npm run dev
```

Frontend adresi:

- `http://localhost:3000`

## 10) Hizli kontrol

- `http://localhost:3000` acildiginda durumlar ekranda gorunmeli

## Commit Standarti

Commit mesajlari `type: aciklama` formatinda yazilmalidir.

Temel tipler:

- `feat`: yeni ozellik
- `fix`: hata duzeltme
- `refactor`: kod iyilestirme (davranis degismez)
- `style`: sadece format duzenlemeleri (bosluk, noktalama, lint-fix)
- `docs`: dokumantasyon degisikligi
- `chore`: config, bagimlilik, script gibi teknik isler
- `perf`: performans iyilestirmesi
- `test`: test ekleme/guncelleme

Kisa kurallar:

- Mesaji kisa, net ve fiil odakli yaz.
- Tum harfler kucuk harf olmali.
- Turkce ama Ingilizce karakterlerle olmali.

Ornekler:

- `feat: kullanici kayit ozelligi eklendi`
- `fix: giris endpointinde token dogrulama hatasi duzeltildi`
- `docs: kurulum adimlari guncellendi`
