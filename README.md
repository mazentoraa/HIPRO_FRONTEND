# Torazen TC – Frontend

Next.js client for the **Torazen Training Center Management System**. Handles all UI for managing clients, trainers, sessions, attendance, payments, and reporting.

---

## Architecture & Implementation

The application is structured around **independent modules**, each isolated, testable, and deployable:

Authentication & Security · Client & Trainer Management · Sessions & Scheduling · Attendance Tracking · Payments · Reporting & Statistics · Communication & Broadcasts

**Key principles:**
- *"Frontend requests, Backend decides"* — UI never makes data decisions
- Feature-based folder structure (DDD-ish), not layer-based
- All API calls go through a `services/` layer — no raw `fetch` in components
- Consistent UI via **shadcn/ui** — no custom one-off components when a shadcn one exists

For detailed features per milestone, see **[Frontend Implementation](./implementation_summary.md)**.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript — strict mode, no `any` |
| Styling | Tailwind CSS |
| UI Library | shadcn/ui |
| State | React Context + `useState` (no Redux unless justified) |
| Server state | React Query / `useSWR` for all API data |
| Auth | JWT via HTTP-only cookies |

---

## Structure

```
features/
  clients/
    components/       # UI only 
    services/         # API calls, nothing else
    hooks/            # useClients, useClientDetail, etc.
    context/          # shared state for this feature
    types/            # TypeScript types/interfaces
  trainers/
  sessions/
  attendance/
  payments/
```

Global shared code:

```
components/           # shared UI (layout, nav, modals)
lib/                  # utils, constants, API client config
types/                # global types
```

---

## Frontend Rules

### Responsibilities

- **UI/UX only** — display data, handle interactions, show feedback
- **No business logic** — no decisions about what data means
- **No data shaping** — if the backend sends it wrong, fix the backend

```
Frontend: "Here's what the user did."
Backend:  "Here's truth. Deal with it."
```

### UI Library

- Use **shadcn/ui** components as the default for all standard UI elements (buttons, inputs, dialogs, tables, etc.)
- Custom components are for layout and feature-specific composition only

### State Management

| Type | Where |
|---|---|
| Server data | React Query / `useSWR` |
| UI state (open/closed, selected, etc.) | `useState` locally |
| Cross-component feature state | feature `context/` |
| Global app state | `lib/` context (auth, theme) |

No prop drilling beyond 2 levels — use context.

### API Integration

All API calls must go through `features/[module]/services/`:

```ts
// features/clients/services/clientService.ts
export async function getClients(): Promise<Client[]> {
  const res = await apiClient.get("/clients/");
  return res.data;
}
```

No raw `fetch` or `axios` calls inside components or hooks directly.

### Naming Conventions

| Thing | Convention |
|---|---|
| Components | `PascalCase.tsx` |
| Hooks | `useCamelCase.ts` |
| Services | `camelCaseService.ts` |
| Types/Interfaces | `PascalCase`, prefix with `I` for interfaces |
| CSS classes | Prefer Tailwind; custom CSS only for what Tailwind can't do." |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

App runs at `http://localhost:3000/`

---

## Git Workflow

### Branches

```
feature/clients-ui
feature/sessions-calendar
fix/attendance-display-bug
```

### Commit Format

```
[MODULE] type: short description
```
Add a commit description if needed

Types: `feat` · `fix` · `refactor` · `style` · `test` · `chore`

```
[CLIENTS] feat: add client list with search and filters
[SESSIONS] fix: calendar not rendering on mobile
```

### Pull Request Template

1. **Feature** – what was implemented
2. **Old Behavior** – what existed before
3. **New Behavior** – what changed
4. **Testing** – how it was tested

---

## License

Part of the Torazen Trainings Management System. Internal use only.