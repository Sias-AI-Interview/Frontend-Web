# React + Vite SIAS

## 📄 Ringkasan Proyek
* Proses wawancara karyawan secara konvensional sangat rentan terhadap inefisiensi, kelelahan HR, serta bias subjektif, yang secara signifikan memperlambat seleksi dan menghambat penemuan kandidat terbaik.
* Permasalahan ini diatasi melalui pengembangan **"AI-Powered Interview Assessment System"** yang dirancang untuk menganalisis jawaban verbal kandidat secara otomatis dan memberikan penilaian yang lebih cepat dan objektif.
* Fokus utama penelitian ini adalah menyelidiki bagaimana sistem AI dapat menggantikan sebagian peran HR dalam menilai wawancara, menganalisis aspek verbal, serta faktor-faktor yang menentukan akurasi dan peningkatan efisiensi sistem tersebut.
---
Documentation Tamplate

---

## Instalation

```
git clone https://github.com/Sias-AI-Interview/Frontend-Web.git
```

Go to the Directory

```
cd Frontend-Web
```

Install Depns & Running

---

### ENV Config

```
VITE_APP_PROD=FALSE
VITE_API_ENDPOINT_URL=
# VITE_API_ENDPOINT_URL_PROD=

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Running & Install Denps

```
pnpm i
```

---

```
pnpm run dev
```

## Folder Structure

```
src/
├─ assets/        # gambar, ikon, svg
├─ components/    # semua komponen reusable
├─ hooks/         # custom hooks
├─ libs/          # External/Client Wrappers helper, api, utils
├─ lib/           # Internal Wrappers
├─ servers/       # api services / queries
├─ validations/   # yup schemas
├─ i18n /         # Translation
├─ layouts/       # Layouts Wrapper Pages
├─ module         # Module
├─ Utils          # Utilities reusable
├─ store          # Zustand hooks store
```

Eazy Command to generate Folder:

```
mkdir -p src/{assets,components,hooks,libs,lib,servers,validations,i18n,layouts,modules,utils,store}
```

---

### state management

```
pnpm add zustand
```

### data fetching & caching

```
pnpm add @tanstack/react-query
```

### forms + validation

```
pnpm add react-hook-form yup @hookform/resolvers
```

### routing

```
pnpm add react-router-dom
```

### animation

```
pnpm add @react-spring/web
```

### UI Component & Styling

```
pnpm add @tailwindcss
```

```
npx shadcn@latest add skeleton
```

### testing

```
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

### storybook

```
pnpm add -D storybook @storybook/react @storybook/addon-actions @storybook/addon-essentials
```


