# Ummie Shammie

A modern single-page application built with **React**, **TypeScript**, **Vite**, and **shadcn/ui**, featuring light/dark theme, multiple pages, and a responsive layout.

---

## Quick Start

### Prerequisites

- **Node.js** (LTS, e.g. 18+) — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node) or **Bun**

### Install & Run

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd ummie-shammie-6767-1

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:8080** (or the port shown in the terminal).

---

## Tech Stack

| Category   | Technologies |
|-----------|---------------|
| Framework | React 18 |
| Language  | TypeScript |
| Build     | Vite 5 |
| Styling   | Tailwind CSS |
| UI        | shadcn/ui (Radix UI) |
| Routing   | React Router v6 |
| Data      | TanStack React Query |
| Testing   | Vitest + React Testing Library |
| Linting   | ESLint 9 + TypeScript ESLint |

---

## Project Structure

```
src/
├── components/     # Layout (Navbar, Footer, Layout) and shared UI
├── components/ui/  # shadcn/ui components
├── contexts/       # Theme (light/dark) provider
├── hooks/          # Custom React hooks
├── lib/            # Utilities (e.g. cn)
├── pages/          # Route pages (Index, Projects, Experience, CV, etc.)
└── test/           # Test setup and example tests
```

---

## Available Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server (port 8080)   |
| `npm run build`   | Production build               |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint                     |
| `npm run test`    | Run tests once                 |
| `npm run test:watch` | Run tests in watch mode     |

---

## Pages

- **/** — Home  
- **/projects** — Projects  
- **/experience** — Experience  
- **/cv** — CV  
- **/courses** — Courses  
- **/transcript** — Transcript  
- **/leadership** — Leadership  
- **/social** — Social  
- **/contact** — Contact  

---

## Documentation

For a detailed breakdown of the app infrastructure, configuration, and dependencies, see **[documentation.md](./documentation.md)**.

---

## License

Private project. All rights reserved.
