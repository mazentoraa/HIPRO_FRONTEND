# SRS – Training Center Management App

---

## Objective
Replace manual tools (paper, Excel) with a single browser app to manage: clients, trainers, sessions, attendance, payments, and communication.

## Scope
**Included:** Internal browser app, used by center manager, fully responsive

## Roles
- **Admin:** full access
- **Staff:** clients, sessions, attendance, payments
- maybe extended later to give roles to clients and trainers so they can manage / view

---

## BASE Features 

| Area | Details |
|---|---|
| Clients | CRUD, adult/minor, parent linking, search |
| Trainers | Basic info, linked formations, hourly rate per formation |
| Sessions | Scheduling (date/time/location), room/time conflict prevention, status (planned/done/cancelled/postponed) |
| Attendance | Mark attendance for trainers + participants per session |
| Dashboard | Weekly schedule, cancellation alerts, cash flow overview |
| Export | Manual CSV export |

---

## Add-on Modules

| Module | Description | Price |
|---|---|---|
| Client payments | Monthly tracking per formation, history, status |
| Trainer payments | Hours worked + amounts owed per sessions |
| Expenses | Log center expenses (supplies, rent, utilities…) |
| Broadcast | Group email/WhatsApp/SMS via external service |
| Tasks & alerts | Todo list with due dates/reminders, dashboard alerts |
| Reports/Stats | Charts for sessions/attendance/revenue, PDF export |
| Export/Print | Schedules + attendance sheets as PDF |
| History | Full filterable history per client/trainer |
| Arabic language | Arabic UI + RTL layout | 

---

## Timeline
**Duration:** 6–8 weeks (estimated) | **Effort:** ~160–180h
1. SRS validation → 2. MVP → 3. Modules → 4. Testing + deployment


## Delivery / Acceptance
Delivered when: all features accessible + no blocking bugs + deployed and validated by client.
Any post-validation change = new estimate.