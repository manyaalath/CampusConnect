# CampusConnect – University Directory

A clean, responsive university directory web app for browsing and connecting with students and faculty across campus. Built with vanilla HTML, CSS, and JavaScript.

---

## Getting Started

**Run with Node.js (recommended):**

```bash
node server.js
# or
npm start
```

Then open **http://localhost:3000** in your browser.

**Or open directly** — the files in `public/` work without a server too. Just open `public/index.html` in a browser.

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Directory | `/` or `/index.html` | Browse all members with search, filter, and pagination |
| Profile | `/profile.html?id=1` | Detailed individual profile view |
| Admin | `/admin.html` | Register new students or faculty members |

---

## Features

- **Search** — Find members by name, department, or skills
- **Filter** — Filter by Department, Role (Student / Faculty), and Batch year
- **Paginated directory** — 8 cards per page with smart ellipsis pagination
- **Profile pages** — Academic details, skills, interests, badges, and a share button
- **Admin panel** — Form with live validation to register new members; success modal and toast notifications
- **Responsive design** — Mobile-friendly with a hamburger menu
- **Accessible** — Semantic HTML, ARIA attributes, keyboard-navigable dropdowns

---

## Project Structure

```
CampusConnect/
├── server.js         # Entry point — serves public/ as a static site
├── package.json      # npm metadata and start script
├── README.md
└── public/           # All static assets
    ├── index.html    # Directory / home page
    ├── profile.html  # Individual profile page
    ├── admin.html    # Admin user management page
    ├── css/
    │   └── styles.css
    └── js/
        ├── main.js       # Directory data, rendering, search, filter, pagination
        ├── profile.js    # Profile page logic (reads ?id= from URL)
        └── admin.js      # Admin form validation, submission, modal, toast
```

---

## Data

Member data lives as a plain JavaScript array in `public/js/main.js` (`profiles`). Extended profile details (school, roll number, email, badges, interests) are in `public/js/profile.js` (`profileExtras`), keyed by profile ID.

To add a new member:
1. Append an entry to the `profiles` array in `main.js`
2. Add a matching entry to `profileExtras` in `profile.js` with the same `id`

The Admin page form simulates registration with a success modal — it does not persist data (no backend).

---

## Tech Stack

- **Node.js** — `server.js` static file server (zero dependencies, built-in `http` module only)
- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Flexbox/Grid, responsive breakpoints (single `styles.css`)
- **JavaScript** (ES6+, strict mode) — No libraries or bundlers
- **Google Fonts** — Inter (400 / 500 / 600 / 700)

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Edge, Safari).

---

© 2024 CampusConnect University Directory. All rights reserved.
