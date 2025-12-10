# React + Vite

Documentation Tamplate

---

## Instalation

```
git pull https://github.com/Sias-AI-Interview/Frontend-Web.git
```

Go to the Directory

```
cd Frontend-Web
```
Install Depns & Running

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
├─ libs/          # helper, api, utils
├─ servers/       # api services / queries
├─ validations/   # yup schemas
```
Eazy Command to generate Folder:

``` 
mkdir -p src/{assets,components,hooks,libs,servers,validations}
```
---

### state management
``` pnpm add zustand 
```

### data fetching & caching
``` pnpm add @tanstack/react-query
```

### forms + validation
``` pnpm add react-hook-form yup @hookform/resolvers
```

### routing
``` pnpm add react-router-dom
```

### animation
``` pnpm add @react-spring/web
```

### UI Component & Styling
``` pnpm add @tailwindcss
```

``` npx shadcn@latest add skeleton
```

### testing
``` pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

### storybook
``` pnpm add -D storybook @storybook/react @storybook/addon-actions @storybook/addon-essentials
```

