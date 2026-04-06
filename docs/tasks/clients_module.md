# MODULE 2 — Clients (Frontend)
> Reusable components built here will cut next modules in half. Build them right the first time.

---

## FE-CLIENTS-1 — Types Definition

**Goal:** Strict typing aligned with backend contract.

- [ ] Use file `src/features/clients/types/client.ts`
  - [ ] Define `Client` type matching backend fields exactly:
    - [ ] `id`, `first_name`, `last_name`, `phone`, `email`
    - [ ] `is_minor`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`
    - [ ] `first_parent_name`, `first_parent_phone`, `first_parent_email`
    - [ ] `second_parent_name`, `second_parent_phone`, `second_parent_email`
- [ ] Use file `src/types/api.ts`
  - [ ] Define generic `PaginatedResponse<T>` type:
    ```ts
    type PaginatedResponse<T> = {
      count: number
      next: string | null
      previous: string | null
      results: T[]
    }
    ```
  - [ ] Use `PaginatedResponse<Client>` for list responses

> No `any`. Matches API contract exactly.

---

## FE-CLIENTS-2 — Services Layer

**Goal:** Centralized API communication — no fetch/axios in components.

- [ ] Use file `src/features/clients/services/clientService.ts`
  - [ ] `getClients(search?: string, page?: number)` — active clients list
  - [ ] `getDeletedClients(page?: number)` — soft-deleted clients
  - [ ] `getClient(id: number)` — single client
  - [ ] `createClient(data: Partial<Client>)` — create
  - [ ] `updateClient(id: number, data: Partial<Client>)` — full + partial update
  - [ ] `deleteClient(id: number)` — soft delete
  - [ ] `restoreClient(id: number)` — restore from trash
- [ ] Define and use shared `apiClient` instance from `lib/`
- [ ] Handle query params (`search`, `page`) correctly

---

## FE-CLIENTS-3 — Hooks (React Query)

**Goal:** Clean server state — no manual state sync.

- [ ] Use file `src/features/clients/hooks/useClients.ts`
- [ ] **Query hooks:**
  - [ ] `useClients(search?, page?)` — fetch active clients
  - [ ] `useDeletedClients(page?)` — fetch soft-deleted clients
  - [ ] `useClient(id)` — fetch single client
- [ ] **Mutation hooks:**
  - [ ] `useCreateClient()` — create + invalidate `clients`
  - [ ] `useUpdateClient()` — update + invalidate `clients` + `client(id)`
  - [ ] `useDeleteClient()` — delete + invalidate `clients`
  - [ ] `useRestoreClient()` — restore + invalidate `clients` + `deletedClients`
- [ ] All mutations invalidate relevant cache keys on success
- [ ] Verify list auto-refetches after any mutation

---

## FE-CLIENTS-4 — DataTable Component *(Global)*

**Goal:** Build once, reuse for clients, trainers, sessions, and beyond.

- [ ] Use file `src/components/ui/DataTable.tsx`
  - [ ] Accept props:
    - [ ] `columns` — column definitions
    - [ ] `data` — row data
    - [ ] `loading` — boolean
  - [ ] Handle empty state (no data message)
  - [ ] Handle loading state (skeleton or spinner)
  - [ ] No client-specific logic — fully generic

> If next modules don't reuse this: PR rejected.

---

## FE-CLIENTS-5 — Clients List Page

**Goal:** Display active clients in a paginated, searchable table.

- [ ] Use file `src/features/clients/components/ClientList.tsx`
  - [ ] Fetch data via `useClients`
  - [ ] Integrate `DataTable` with columns:
    - [ ] Full name (`first_name` + `last_name`)
    - [ ] Phone
    - [ ] Email
    - [ ] Parent info (display only if `is_minor=true`)
    - [ ] Actions (edit, delete)
  - [ ] Integrate `SearchInput` (see FE-CLIENTS-6)
  - [ ] Add pagination controls (previous / next / page number)
- [ ] No frontend filtering — search is backend-driven via `?search=`

---

## FE-CLIENTS-6 — SearchInput Component *(Global)*

**Goal:** Debounced search input, reusable across all modules.

- [ ] Use file `src/components/ui/SearchInput.tsx`
  - [ ] Controlled input field
  - [ ] Debounce: 300–500ms
  - [ ] Emit final search value to parent via `onSearch` callback
  - [ ] No module-specific logic
- [ ] Integrate into `ClientList`
- [ ] Verify API is not called on every keystroke

---

## FE-CLIENTS-7 — Client Form *(Create + Update)*

**Goal:** Single reusable form for both create and update modes.

- [ ] Use file `src/features/clients/components/ClientForm.tsx`
  - [ ] Fields:
    - [ ] `first_name`, `last_name`
    - [ ] `phone`, `email`
    - [ ] `is_minor` — checkbox
    - [ ] Parent fields — shown only when `is_minor=true`
  - [ ] Handle **create mode** — calls `useCreateClient`
  - [ ] Handle **update mode** — pre-fills fields, calls `useUpdateClient`
  - [ ] Display field-level validation errors from API (`400` response)
- [ ] Verify correct payload sent for both modes

---

## FE-CLIENTS-8 — ConfirmModal Component *(Global)*

**Goal:** Prevent accidental deletions — reusable across all modules.

- [ ] Use file `src/components/ui/ConfirmModal.tsx`
  - [ ] Props:
    - [ ] `title` — string
    - [ ] `description` — string
    - [ ] `onConfirm` — callback
    - [ ] `onCancel` — callback
  - [ ] Built with shadcn `Dialog`
  - [ ] No module-specific logic
- [ ] Integrate into client delete flow (FE-CLIENTS-9)

---

## FE-CLIENTS-9 — Delete Client

**Goal:** Soft delete via UI with confirmation.

- [ ] Add delete action button in `ClientList` table row
- [ ] Open `ConfirmModal` on click
- [ ] Call `useDeleteClient` on confirm
- [ ] Verify client disappears from list immediately (optimistic or invalidation)
- [ ] Verify no page reload required

---

## FE-CLIENTS-10 — Trash / Corbeille *(Reusable Pattern)*

**Goal:** Generic deleted-items management — not just for clients.

- [ ] **Generic component:** `src/components/ui/TrashTable.tsx`
  - [ ] Props: `data`, `columns`, `onRestore`, `loading`
  - [ ] No module-specific logic
- [ ] **Clients trash page:** `src/features/clients/components/DeletedClients.tsx`
  - [ ] Fetch via `useDeletedClients`
  - [ ] Render via `TrashTable`
  - [ ] Restore button calls `useRestoreClient`
  - [ ] List refreshes instantly after restore
- [ ] Verify `TrashTable` is generic enough to reuse for trainers + sessions

---

## FE-CLIENTS-11 — Client Detail Page *(Optional, we can keep the edit form as a preview form)*

**Goal:** View full client info on a dedicated page.

- [ ] Fetch data via `useClient(id)`
- [ ] Display all fields cleanly
- [ ] Verify displayed data matches backend response

---

## FE-CLIENTS-12 — Error Handling

**Goal:** Consistent, visible error UX — no silent failures.

- [ ] Handle `400` — display field-level validation messages in form
- [ ] Handle `401` — redirect to login page
- [ ] Handle `404` — show "not found" message or redirect
- [ ] Verify all errors are visible and understandable to the user