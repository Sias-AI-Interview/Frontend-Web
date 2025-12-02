# React + Vite

Documentation Tamplate

---

## Folder Structure
``` bash
src/
├─ assets/        # gambar, ikon, svg
├─ components/    # semua komponen reusable
├─ hooks/         # custom hooks
├─ libs/          # helper, api, utils
├─ servers/       # api services / queries
├─ validations/   # yup schemas
```
Eazy Command to generate Folder:

``` bash 
mkdir -p src/{assets,components,hooks,libs,servers,validations}
```
---

### state management
``` bash pnpm add zustand 
```

### data fetching & caching
``` bash pnpm add @tanstack/react-query
```

### forms + validation
``` bash pnpm add react-hook-form yup @hookform/resolvers
```

### routing
``` bash pnpm add react-router-dom
```

### animation
``` bash pnpm add @react-spring/web
```

### UI Component & Styling
``` bash pnpm add @tailwindcss
```

``` bash npx shadcn@latest add skeleton
```

### testing
``` bash pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

### storybook
``` bash pnpm add -D storybook @storybook/react @storybook/addon-actions @storybook/addon-essentials
```

