# App Infrastructure Documentation

This document describes the full infrastructure, architecture, and dependencies of the application.

---

## 1. Project Overview

- **Type:** Single-page application (SPA)
- **Stack:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui (Radix primitives) + Tailwind CSS
- **Package manager:** npm (lockfiles: `package-lock.json`, `bun.lockb`)

---

## 2. Directory Structure

```
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI & layout
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Modal.tsx
│   │   ├── PageHeader.tsx
│   │   ├── RoomCard.tsx
│   │   └── NavLink.tsx
│   ├── contexts/           # React context providers
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── pages/              # Route-level pages
│   │   ├── Index.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── CV.tsx
│   │   ├── Courses.tsx
│   │   ├── Transcript.tsx
│   │   ├── Leadership.tsx
│   │   ├── Social.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── test/               # Test setup & examples
│   │   ├── setup.ts
│   │   └── example.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html              # Entry HTML
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vitest.config.ts
├── eslint.config.js
└── components.json         # shadcn/ui config
```

---

## 3. Dependencies to Install

Install all dependencies with:

```bash
npm install
```

Or with Bun:

```bash
bun install
```

### 3.1 Production Dependencies

| Package | Purpose |
|--------|---------|
| **React** | |
| `react`, `react-dom` | Core UI library |
| **Routing & data** | |
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Server state / data fetching & caching |
| **UI (shadcn/Radix)** | |
| `@radix-ui/react-accordion` | Accordion |
| `@radix-ui/react-alert-dialog` | Alert dialogs |
| `@radix-ui/react-aspect-ratio` | Aspect ratio container |
| `@radix-ui/react-avatar` | Avatar |
| `@radix-ui/react-checkbox` | Checkbox |
| `@radix-ui/react-collapsible` | Collapsible sections |
| `@radix-ui/react-context-menu` | Context menu |
| `@radix-ui/react-dialog` | Modal dialogs |
| `@radix-ui/react-dropdown-menu` | Dropdown menus |
| `@radix-ui/react-hover-card` | Hover cards |
| `@radix-ui/react-label` | Accessible labels |
| `@radix-ui/react-menubar` | Menubar |
| `@radix-ui/react-navigation-menu` | Navigation menu |
| `@radix-ui/react-popover` | Popovers |
| `@radix-ui/react-progress` | Progress bar |
| `@radix-ui/react-radio-group` | Radio groups |
| `@radix-ui/react-scroll-area` | Custom scroll area |
| `@radix-ui/react-select` | Select dropdowns |
| `@radix-ui/react-separator` | Separator |
| `@radix-ui/react-slider` | Slider |
| `@radix-ui/react-slot` | Composition primitive |
| `@radix-ui/react-switch` | Toggle switch |
| `@radix-ui/react-tabs` | Tabs |
| `@radix-ui/react-toast` | Toast notifications |
| `@radix-ui/react-toggle` | Toggle button |
| `@radix-ui/react-toggle-group` | Toggle group |
| `@radix-ui/react-tooltip` | Tooltips |
| **Forms & validation** | |
| `react-hook-form` | Form state & validation |
| `@hookform/resolvers` | Schema resolvers for react-hook-form |
| `zod` | Schema validation |
| **Styling & theming** | |
| `tailwind-merge` | Merge Tailwind classes |
| `tailwindcss-animate` | Tailwind animations |
| `class-variance-authority` | CVA for component variants |
| `clsx` | Conditional class names |
| **Theming** | |
| `next-themes` | Theme (light/dark) utilities (used via ThemeContext) |
| **Icons & UI extras** | |
| `lucide-react` | Icon set |
| `date-fns` | Date formatting/utilities |
| `react-day-picker` | Date picker |
| `recharts` | Charts |
| `embla-carousel-react` | Carousel |
| `cmdk` | Command palette (cmdk) |
| `input-otp` | OTP input |
| `react-resizable-panels` | Resizable panels |
| `vaul` | Drawer component |
| `sonner` | Toast notifications (sonner) |

### 3.2 Dev Dependencies

| Package | Purpose |
|--------|---------|
| **Build & dev server** | |
| `vite` | Build tool & dev server |
| `@vitejs/plugin-react-swc` | React + SWC for Vite |
| **TypeScript** | |
| `typescript` | Type checking & compilation |
| `@types/node` | Node.js type definitions |
| `@types/react`, `@types/react-dom` | React type definitions |
| **Styling** | |
| `tailwindcss` | Tailwind CSS |
| `@tailwindcss/typography` | Typography plugin (optional) |
| `postcss` | PostCSS pipeline |
| `autoprefixer` | CSS vendor prefixes |
| **Linting** | |
| `eslint` | Linter |
| `@eslint/js` | ESLint JS config |
| `typescript-eslint` | TypeScript ESLint rules |
| `eslint-plugin-react-hooks` | React Hooks rules |
| `eslint-plugin-react-refresh` | React Refresh rules |
| `globals` | Global variables for ESLint |
| **Testing** | |
| `vitest` | Test runner |
| `jsdom` | DOM environment for tests |
| `@testing-library/react` | React testing utilities |
| `@testing-library/jest-dom` | DOM matchers |
| **Tooling** | |
| `lovable-tagger` | Component tagging (dev only, used in Vite plugin) |

---

## 4. Configuration Files

### 4.1 Vite (`vite.config.ts`)

- **Plugin:** `@vitejs/plugin-react-swc` for React + SWC.
- **Alias:** `@` → `./src` for imports like `@/components/...`.
- **Dev server:** `host: "::"`, `port: 8080`; HMR overlay disabled.
- **Optional:** `lovable-tagger` plugin in development mode.

### 4.2 TypeScript

- **Root:** `tsconfig.json` – path alias `@/*` → `./src/*`, references app and node configs.
- **App:** `tsconfig.app.json` – compiles `src/`, ESNext modules, JSX, Vitest globals.
- **Node:** `tsconfig.node.json` – for Vite/config tooling.

### 4.3 Tailwind (`tailwind.config.ts`)

- **Dark mode:** `class` (e.g. `.dark` on root).
- **Content:** `./pages/**`, `./components/**`, `./app/**`, `./src/**` (`.ts`, `.tsx`).
- **Theme:** Custom fonts (Lato, Space Grotesk, EB Garamond, Fira Code), semantic colors (border, primary, muted, etc.), custom `nvidia` palette, radius, shadows, keyframes (`accordion-down/up`, `fade-in`, `scale-in`, `glow-pulse`).
- **Plugin:** `tailwindcss-animate`.

### 4.4 PostCSS (`postcss.config.js`)

- **Plugins:** `tailwindcss`, `autoprefixer`.

### 4.5 ESLint (`eslint.config.js`)

- **Config:** Flat config; extends `@eslint/js` and `typescript-eslint` recommended.
- **Scope:** `**/*.{ts,tsx}`; ignores `dist`.
- **Plugins:** `react-hooks`, `react-refresh`.
- **Globals:** Browser (`globals.browser`).

### 4.6 Vitest (`vitest.config.ts`)

- **Environment:** `jsdom`.
- **Setup:** `src/test/setup.ts`.
- **Tests:** `src/**/*.{test,spec}.{ts,tsx}`.
- **Alias:** `@` → `./src` (same as Vite).

### 4.7 shadcn/ui (`components.json`)

- **Style:** default; TSX; Tailwind from `tailwind.config.ts` and `src/index.css`.
- **Base color:** slate; CSS variables enabled.
- **Aliases:** `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.

---

## 5. Application Architecture

### 5.1 Entry & Root

- **HTML:** `index.html` → `<div id="root">` and script `/src/main.tsx`.
- **JS:** `main.tsx` mounts `<App />` and imports `index.css`.

### 5.2 Provider Hierarchy (in `App.tsx`)

From outer to inner:

1. `QueryClientProvider` – React Query.
2. `ThemeProvider` – Light/dark theme (persisted in `localStorage`, respects `prefers-color-scheme`).
3. `TooltipProvider` – Radix tooltips.
4. `Toaster` (shadcn) + `Sonner` – Toasts.
5. `BrowserRouter` – React Router.
6. `Layout` – Wraps all routes (Navbar + main content + Footer).

### 5.3 Routing

| Path | Page component |
|------|----------------|
| `/` | Index |
| `/projects` | Projects |
| `/experience` | Experience |
| `/cv` | CV |
| `/courses` | Courses |
| `/transcript` | Transcript |
| `/leadership` | Leadership |
| `/social` | Social |
| `/contact` | Contact |
| `*` | NotFound |

### 5.4 Layout

- **Layout:** Navbar (fixed top), main content (`flex-1 pt-16`), Footer.
- **Theme:** `ThemeContext` provides `theme` and `toggleTheme`; root element gets `.light` or `.dark` for Tailwind dark mode.

---

## 6. NPM Scripts

| Script | Command | Description |
|--------|--------|-------------|
| `dev` | `vite` | Start dev server (default port 8080) |
| `build` | `vite build` | Production build |
| `build:dev` | `vite build --mode development` | Build in development mode |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Run ESLint |
| `test` | `vitest run` | Run tests once |
| `test:watch` | `vitest` | Run tests in watch mode |

---

## 7. Environment Requirements

- **Node.js:** LTS version (e.g. 18+); recommended to manage via [nvm](https://github.com/nvm-sh/nvm) or similar.
- **Package manager:** npm or Bun (project contains both `package-lock.json` and `bun.lockb`).

---

## 8. Quick Reference: Install & Run

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Tests
npm run test
npm run test:watch
```

For a high-level overview and getting started, see **README.md**.
