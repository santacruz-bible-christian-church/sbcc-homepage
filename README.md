<div align="center">

# ⛪ SBCC Homepage

**A modern, responsive church website for Santa Cruz Bible Christian Church**

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)]()
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)]()
[![Status](https://img.shields.io/badge/Status-Production-brightgreen)]()

</div>

---

## 📋 Overview

SBCC Homepage is an editorial-style church website with immersive hero sections and dynamic content. Built with **React** and **Vite**, it connects to the SBCC Management System API for announcements, events, and prayer requests.

<div align="center">

|           🎯 **Client**           |           📚 **Course**           |    🏫 **Institution**    |
| :-------------------------------: | :-------------------------------: | :----------------------: |
| Santa Cruz Bible Christian Church | CMSC 309 - Software Engineering I | LSPU - Santa Cruz Campus |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Design

- **Immersive Heroes** — Full-screen backgrounds with overlays
- **Editorial Layout** — Magazine-style content presentation
- **Glassmorphism** — Modern translucent card effects
- **Smooth Animations** — Hover effects and transitions

</td>
<td width="50%">

### ⚡ Functionality

- **Dynamic Content** — Live announcements and events
- **Prayer Requests** — Digital submission form
- **Responsive** — Mobile-first adaptive design
- **Hybrid Navbar** — Auto-hide on scroll behavior

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="25%">

**Framework**

![React](https://img.shields.io/badge/-React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)

</td>
<td align="center" width="25%">

**Styling**

![TailwindCSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![CSS](https://img.shields.io/badge/-CSS_3-1572B6?style=flat-square&logo=css3&logoColor=white)

</td>
<td align="center" width="25%">

**UI Components**

![shadcn](https://img.shields.io/badge/-shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![Lucide](https://img.shields.io/badge/-Lucide-F56565?style=flat-square&logo=lucide&logoColor=white)

</td>
<td align="center" width="25%">

**Routing**

![ReactRouter](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/emperuna/sbcc-homepage.git
cd sbcc-homepage

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api-url.com
```

### Access Points

| Service       | URL                   |
| ------------- | --------------------- |
| 🖥️ Dev Server | http://localhost:5173 |

---

## 📁 Project Structure

```
sbcc-homepage/
├── 📂 public/assets/          # Static images and assets
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 home/           # Homepage sections
│   │   ├── 📂 layout/         # Navbar, Footer
│   │   ├── 📂 modals/         # Modal components
│   │   └── 📂 ui/             # shadcn/ui primitives
│   ├── 📂 constants/          # Routes and config
│   ├── 📂 contexts/           # React Context providers
│   ├── 📂 hooks/              # Custom hooks
│   ├── 📂 pages/              # Route pages
│   ├── 📂 services/           # API layer
│   └── 📂 lib/                # Utilities
└── 📄 package.json
```

---

## 📝 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🔗 Related Projects

| Project                  | Description                  |
| :----------------------- | :--------------------------- |
| [SBCC Management System] | Backend management dashboard |

[SBCC Management System]: https://github.com/santacruz-bible-christian-church/sbcc-management-system

---

## 📄 License

<div align="center">

**PROPRIETARY SOFTWARE**

Copyright © 2025-2026 Santa Cruz Bible Christian Church. All rights reserved.

Unauthorized copying, modification, or distribution is strictly prohibited.

---

**Instructor:** Prof. Reynalen Justo
**Institution:** Laguna State Polytechnic University - Santa Cruz Campus

</div>
