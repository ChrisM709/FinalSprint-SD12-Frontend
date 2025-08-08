# Airport Admin Dashboard (front‑end)

A React single‑page app that lets airport staff create, edit, and delete **aircraft, gates, and flights**, all kept in sync with the Spring Boot API that powers the back‑end.

> Back‑end repo: https://github.com/Ndevine709/MidSprint-SD12-API
---

## Tech stack

| Tool | Why it’s here |
| ---- | ------------- |
| **React 18 + React Router v7** | Core SPA & client‑side routing |
| **Fetch API** | Simple REST calls to the Spring Boot back‑end |
| **Plain CSS** | Quick styling in `/src/styles` (matching gradient theme) |

---

## Key features

* **Manage Aircraft** – Add new planes (tail #, model, capacity, airline) or delete existing ones, all displayed in a live table.  
* **Manage Gates** – Assign or remove aircraft from gates; shows only gates that currently hold a plane.  
* **Manage Flights** – Create, list, and remove flights with full airline / aircraft / gate look‑ups.  
* **Reusable gradient UI** – Consistent dark panel + white inputs / tables for every admin page.


## Folder structure

```
Airport-Frontend/
├─ src/
│  ├─ components/
│  │  ├─ ManageAircrafts.jsx
│  │  ├─ ManageGates.jsx
│  │  └─ ManageFlights.jsx
│  ├─ styles/
│  │  ├─ AdminDashboard.css
│  │  ├─ ManageAircrafts.css
│  │  ├─ ManageGates.css
│  │  └─ ManageFlights.css
│  └─ App.jsx
└─ package.json
```
