# MODULE 2 — Clients (Frontend)
> Reusable components built here will cut next modules in half. Build them right the first time.

---

## FE-CLIENTS-1 — Types Definition

**Goal:** Strict typing aligned with backend contract.

- [x] Use file `src/features/clients/types/client.ts`
  - [x] Define `Client` type matching backend fields exactly:
    - [x] `id`, `first_name`, `last_name`, `phone`, `email`
    - [x] `is_minor`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`
    - [x] `first_parent_name`, `first_parent_phone`, `first_parent_email`
    - [x] `second_parent_name`, `second_parent_phone`, `second_parent_email`
- [x] Use file `src/types/api.ts`
  - [x] Define generic `PaginatedResponse<T>` type:
    ```ts
    type PaginatedResponse<T> = {
      count: number
      next: string | null
      previous: string | null
      results: T[]
    }
    ```
  - [x] Use `PaginatedResponse<Client>` for list responses

> No `any`. Matches API contract exactly.

---

## FE-CLIENTS-2 — Services Layer

**Goal:** Centralized API communication — no fetch/axios in components.

- [x] Use file `src/features/clients/services/clientService.ts`
  - [x] `getClients(search?: string, page?: number)` — active clients list
  - [x] `getDeletedClients(page?: number)` — soft-deleted clients
  - [x] `getClient(id: number)` — single client
  - [x] `createClient(data: Partial<Client>)` — create
  - [x] `updateClient(id: number, data: Partial<Client>)` — full + partial update
  - [x] `deleteClient(id: number)` — soft delete
  - [x] `restoreClient(id: number)` — restore from trash
- [x] Define and use shared `apiClient` instance from `lib/`
- [x] Handle query params (`search`, `page`) correctly

---

## FE-CLIENTS-3 — Hooks (React Query)

**Goal:** Clean server state — no manual state sync.

- [x] Use file `src/features/clients/hooks/useClients.ts`
- [x] **Query hooks:**
  - [x] `useClients(search?, page?)` — fetch active clients
  - [x] `useDeletedClients(page?)` — fetch soft-deleted clients
  - [x] `useClient(id)` — fetch single client
- [x] **Mutation hooks:**
  - [x] `useCreateClient()` — create + invalidate `clients`
  - [x] `useUpdateClient()` — update + invalidate `clients` + `client(id)`
  - [x] `useDeleteClient()` — delete + invalidate `clients`
  - [x] `useRestoreClient()` — restore + invalidate `clients` + `deletedClients`
- [x] All mutations invalidate relevant cache keys on success
- [x] Verify list auto-refetches after any mutation

---

## FE-CLIENTS-4 — DataTable Component *(Global)*

**Goal:** Build once, reuse for clients, trainers, sessions, and beyond.

- [x] Use file `src/components/ui/DataTable.tsx`
  - [x] Accept props:
    - [x] `columns` — column definitions
    - [x] `data` — row data
    - [x] `loading` — boolean
  - [x] Handle empty state (no data message)
  - [x] Handle loading state (skeleton or spinner)
  - [x] No client-specific logic — fully generic

> If next modules don't reuse this: PR rejected.

---

## FE-CLIENTS-5 — Clients List Page

**Goal:** Display active clients in a paginated, searchable table.

- [x] Use file `src/features/clients/components/ClientList.tsx`
  - [x] Fetch data via `useClients`
  - [x] Integrate `DataTable` with columns:
    - [x] Full name (`first_name` + `last_name`)
    - [x] Phone
    - [x] Email
    - [x] Parent info (display only if `is_minor=true`)
    - [x] Actions (edit, delete)
  - [x] Integrate `SearchInput` (see FE-CLIENTS-6)
  - [x] Add pagination controls (previous / next / page number)
- [x] No frontend filtering — search is backend-driven via `?search=`

---

## FE-CLIENTS-6 — SearchInput Component *(Global)*

**Goal:** Debounced search input, reusable across all modules.

- [x] Use file `src/components/ui/SearchInput.tsx`
  - [x] Controlled input field
  - [x] Debounce: 300–500ms
  - [x] Emit final search value to parent via `onSearch` callback
  - [x] No module-specific logic
- [x] Integrate into `ClientList`
- [x] Verify API is not called on every keystroke

---

## FE-CLIENTS-7 — Client Form *(Create + Update)*

**Goal:** Single reusable form for both create and update modes.

- [x] Use file `src/features/clients/components/ClientForm.tsx`
  - [x] Fields:
    - [x] `first_name`, `last_name`
    - [x] `phone`, `email`
    - [x] `is_minor` — checkbox
    - [x] Parent fields — shown only when `is_minor=true`
  - [x] Handle **create mode** — calls `useCreateClient`
  - [x] Handle **update mode** — pre-fills fields, calls `useUpdateClient`
  - [x] Display field-level validation errors from API (`400` response)
- [x] Verify correct payload sent for both modes

---

## FE-CLIENTS-8 — ConfirmModal Component *(Global)*

**Goal:** Prevent accidental deletions — reusable across all modules.

- [x] Use file `src/components/ui/ConfirmModal.tsx`
  - [x] Props:
    - [x] `title` — string
    - [x] `description` — string
    - [x] `onConfirm` — callback
    - [x] `onCancel` — callback
  - [x] Built with shadcn `Dialog`
  - [x] No module-specific logic
- [x] Integrate into client delete flow (FE-CLIENTS-9)

---

## FE-CLIENTS-9 — Delete Client

**Goal:** Soft delete via UI with confirmation.

- [x] Add delete action button in `ClientList` table row
- [x] Open `ConfirmModal` on click
- [x] Call `useDeleteClient` on confirm
- [x] Verify client disappears from list immediately (optimistic or invalidation)
- [x] Verify no page reload required

---

## FE-CLIENTS-10 — Trash / Corbeille *(Reusable Pattern)*

**Goal:** Generic deleted-items management — not just for clients.

- [x] **Generic component:** `src/components/ui/TrashTable.tsx`
  - [x] Props: `data`, `columns`, `onRestore`, `loading`
  - [x] No module-specific logic
- [x] **Clients trash page:** `src/features/clients/components/DeletedClients.tsx`
  - [x] Fetch via `useDeletedClients`
  - [x] Render via `TrashTable`
  - [x] Restore button calls `useRestoreClient`
  - [x] List refreshes instantly after restore
- [x] Verify `TrashTable` is generic enough to reuse for trainers + sessions

---

## FE-CLIENTS-11 — Client Detail Page *(Optional, we can keep the edit form as a preview form)*

**Goal:** View full client info on a dedicated page.

- [x] Fetch data via `useClient(id)`
- [x] Display all fields cleanly
- [x] Verify displayed data matches backend response

---

## FE-CLIENTS-12 — Error Handling

**Goal:** Consistent, visible error UX — no silent failures.

- [x] Handle `400` — display field-level validation messages in form
- [x] Handle `401` — redirect to login page
- [x] Handle `404` — show "not found" message or redirect
- [x] Verify all errors are visible and understandable to the user