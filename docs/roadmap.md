# Torazen TC — Roadmap
**2 Months · Modular · No Illusions**

> **Frontend requests. Backend decides.** Phase 1 must be stable before Phase 2 begins. Exit conditions are non-negotiable.

---

## Phase 1 — Core System *(Weeks 1–4)*
*Build the foundation. Everything else depends on this being solid.*

### M1 · Authentication & Roles
**Goal:** Secure access + role-based system (Admin / Staff)
- JWT via HTTP-only cookies · Login/logout · Role middleware · Protected endpoints

✅ User can log in/out · Protected routes reject unauthorized · Roles enforced in ≥1 module

### M2 · Clients
**Goal:** Manage clients with minor + parent linking support
- CRUD · Parent–child relation (parents are searchable optional fields in client) · Search + pagination

✅ CRUD works · Parent linking intact · Search returns filtered results

### M3 · Trainers
**Goal:** Manage trainers and assigned trainings
- CRUD · Trainer ↔ trainings · Hourly rate per training

✅ Trainers created + assigned · Rates stored correctly · Data usable by Sessions

### M4 · Sessions
**Goal:** Schedule sessions without conflicts — core of the app
- Date/time/location · Status: planned/done/cancelled/postponed · Conflict prevention (room + trainer)

✅ No overlapping sessions · Status updates work · Sessions retrievable in structured format

### M5 · Attendance
**Goal:** Track who showed up per session
- Linked to session · Trainer + client attendance · Bulk marking

✅ Attendance saved per session · History retrievable · No duplicates

### M6 · Dashboard
**Goal:** Real-time admin overview
- Weekly schedule · Cancellation alerts · Basic financial overview (placeholder)

✅ Aggregated data loads · Reflects DB state · No heavy frontend logic

### M7 · Export (CSV)
**Goal:** Basic data export
- Export clients / sessions / attendance · CSV format

✅ Files download correctly · Data matches DB

---

## Phase 2 — Add-on Modules *(Weeks 5–8)*
*Monetization, communication, and reporting. Built on a stable core.*

### M8 · Client Payments
**Goal:** Track payment status per client + formation
- Monthly tracking · Paid/unpaid status · History

✅ Payments marked + updated · Status correct · Linked to clients + sessions

### M9 · Trainer Payments
**Goal:** Calculate amounts owed to trainers
- Based on completed sessions · Uses hourly rate from M3

✅ Calculation correct · Per-trainer report available

### M10 · Expenses
**Goal:** Track where the money goes
- CRUD · Categories (rent, utilities, supplies…)

✅ Expenses logged + retrievable · Included in financial overview

### M11 · Broadcast
**Goal:** Group messaging via external API
- Email / SMS / WhatsApp · Group targeting by formation or role

✅ Message sent to selected group · Logs stored

### M12 · Tasks & Alerts
**Goal:** Internal todo + reminder system
- Todo with deadlines · Dashboard alerts

✅ Task CRUD works · Alerts visible on dashboard

### M13 · Reports & Statistics
**Goal:** Make data visible and usable
- Attendance + revenue stats · Charts · PDF export

✅ Data aggregates correctly · Charts reflect DB state

### M14 · PDF Export
**Goal:** Printable documents
- Schedules + attendance sheets in PDF

✅ PDFs generate without errors · Layout readable

### M15 · History
**Goal:** Audit trail for all key entities
- Change tracking per entity · Filterable by date + type

✅ History retrievable per entity · Filters functional

### M16 · Arabic (RTL)
**Goal:** Full Arabic interface
- RTL layout · Full UI translation

✅ UI fully usable in Arabic · Layout intact in RTL mode

---