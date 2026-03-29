# Accounting System

Bu proje bir monorepo yapisindadir:

- `apps/web`: Nuxt frontend
- `apps/api`: Express + Prisma backend
- `packages/types`, `packages/utils`: Ortak tipler ve yardimci sabitler

Kokte `package.json` icinde `workspaces` tanimlidir. Gunluk gelistirmede `npm install` ve `npm run dev` komutlarini genelde **`apps/api`** ve **`apps/web`** icinden calistirmak yeterlidir.

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

- `http://localhost:3000` kok adresi, oturum durumuna gore `/ozet` veya `/giris-yap` sayfasina yonlendirir.
- Giris sayfasi: `/giris-yap` (ornek form; gercek API auth henuz yok, cookie tabanli mock oturum).
- Ozet paneli: `/ozet` — sol sidebar, ust bar, sistem durumu kartlari (API `GET /` ile uyumludur).

## Gelistirme Rehberi

Bu bolum, projede duzenli ve sorunsuz gelistirme yapman icin standart akisi anlatir.

### 1) Main'i guncelle

Calismaya baslamadan once ana dali guncelle:

```bash
git checkout main
git pull origin main
```

### 2) Yeni branch olustur

Her is icin ayri branch ac:

```bash
git checkout -b feat/kisa-aciklama
```

Ornek branch adlari:

- `feat/auth-login`
- `fix/api-health-response`
- `docs/readme-update`

### 3) Gelistirme sirasinda calistirma

Iki terminal kullan:

- Terminal 1 (API):
  ```bash
  cd apps/api
  npm run dev
  ```
- Terminal 2 (Web):
  ```bash
  cd apps/web
  npm run dev
  ```

### 4) Degisiklikleri kontrol et

Commit atmadan once:

- Uygulama aciliyor mu kontrol et (`http://localhost:3000`)
- API ayakta mi kontrol et (`http://localhost:3001`)
- Yeni ekledigin ozellik beklendigi gibi calisiyor mu
- Gerekiyorsa ilgili dokumani da guncelle (`README.md`, `apps/docs/*`)

### 5) Commit at

Degisiklikleri staged edip anlamli bir commit mesaji yaz:

```bash
git add .
git commit -m "feat: kisa ve net aciklama"
```

Birden fazla konu varsa tek committe toplama; mumkunse kucuk ve odakli commitler at.

### 6) Branch'i remote'a gonder

```bash
git push -u origin <branch-adi>
```

### 7) Pull Request ac

PR acarken su 3 soruya cevap ver:

- Ne degisti?
- Neden degisti?
- Nasil test edildi?

Kisa ama net bir aciklama, kod inceleme surecini hizlandirir.

### 8) Review sonrasi

- Istenen duzeltmeleri ayni branch uzerinde yap.
- Yeni commitlerle push et.
- PR guncel kalmasi icin gerekirse `main` ile sync et.


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
