# Advocado — Solusi Digital Batam Assessment

## By - Reza F Budiono

Pixel-perfect React implementation of the **advocado** legal marketplace UI, built from a design reference image. No external UI libraries — everything built from scratch.

---

## Tech Stack

- **React 18** + Vite 5
- **CSS Modules** — scoped styles per component, zero class collision
- **Inline SVG icons** — no icon library dependency
- **JSON mock data** — all display text/data from `src/data/mockData.json`

---

## Requirements

- Node.js ≥ 18
- npm ≥ 9

---

## Installation & Running

```bash
# 1. Clone / extract the project
cd solusi-digital-batam-assessment

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── App.css                        ← Global CSS variables (design tokens), resets, keyframes
├── App.jsx                        ← Root component, all state management
├── data/
│   └── mockData.json              ← All displayed data: nav, cards, filters, banner, labels
└── components/
    ├── Layout/
    │   ├── Layout.jsx             ← Shell: sidebar + topbar + content + overlay
    │   ├── Layout.module.css
    │   ├── Sidebar.jsx            ← Nav items, badges, sub-items, drawer header
    │   ├── Sidebar.module.css
    │   ├── Topbar.jsx             ← Logo, breadcrumb, search, avatar dropdown
    │   └── Topbar.module.css
    ├── UI/                        ← Reusable primitives
    │   ├── Avatar.jsx             ← Photo or initials fallback
    │   ├── Badge.jsx              ← type="nav" (blue) | type="new" (green)
    │   ├── Button.jsx             ← variants: primary, outline, danger, ghost, secure
    │   ├── Coin.jsx               ← Gold coin + amount display
    │   ├── Icons.jsx              ← All SVG icons as named exports
    │   └── Tag.jsx
    ├── Questions/
    │   ├── QuestionCard.jsx       ← Card row + smooth expand/collapse
    │   ├── QuestionCard.module.css
    │   ├── QuestionFilter.jsx     ← Page title + filter tabs + sort/filter buttons
    │   ├── QuestionFilter.module.css
    │   ├── QuestionList.jsx       ← Table headers + card list + "Ältere Rechtsfragen" section
    │   └── QuestionList.module.css
    └── PromoBanner.jsx            ← Dismissible info banner with animation
```

---

## UI/UX Improvements Beyond Design Reference

The reference provides a desktop-only design. The following was added:

| Improvement | Description |
|---|---|
| **Responsive layout** | Wide monitor, laptop (1024px+), tablet (hamburger+drawer ≤1023px), mobile portrait/landscape |
| **Hamburger drawer** | Sidebar slides in from left with overlay; logo shown inside drawer header |
| **Mobile card actions** | "Sichern" button moves to expanded content on ≤600px — card row stays uncluttered |
| **Button color hierarchy** | Sichern (green/success), Falsches Rechtsgebiet (blue/neutral), Melden (red/danger) |
| **Avatar dropdown** | Reference has no dropdown; added user name + settings + logout |
| **Active tab underline** | Reference shows selected state; implemented smooth CSS transition |
| **Floating topbar** | Reference has flat bar; implemented as floating card with shadow and border-radius |
| **Wide monitor cap** | Content capped at 1400px on ≥1600px viewports |
| **Touch UX** | Entire card row clickable, not just chevron |
| **Micro-animations** | NEU ribbon pop, card entrance stagger, banner dismiss, dropdown fade-in |

---

## Reusable Components

### `Avatar` (`src/components/UI/Avatar.jsx`)
```jsx
<Avatar src="/avatar-user.jpg" initials="RF" size="sm" />
<Avatar initials="MF" size="md" />
```
Props: `src` (optional photo URL), `initials` (fallback text), `size` (`sm` | `md`)

### `Badge` (`src/components/UI/Badge.jsx`)
```jsx
<Badge type="nav" count={3} />
<Badge type="new" count={3} />
```
Props: `type` (`nav` = blue circle | `new` = green circle), `count`, `label`

### `Button` (`src/components/UI/Button.jsx`)
```jsx
<Button variant="primary" icon={<LockIcon />}>Sichern</Button>
<Button variant="danger" icon={<WarningIcon />}>Melden</Button>
<Button variant="outline" disabled>Sichern</Button>
```
Props: `variant` (`primary` | `outline` | `danger` | `ghost` | `secure` | `secure-disabled`), `icon`, `iconPosition`, `disabled`, `onClick`

### `Coin` (`src/components/UI/Coin.jsx`)
```jsx
<Coin amount={30} />
```
Renders gold coin icon + `{amount} €`

### Icons (`src/components/UI/Icons.jsx`)
All icons as named SVG exports using `stroke="currentColor"` — color controlled by parent CSS `color` property:
```jsx
import { HomeIcon, QuestionIcon, LockIcon, LogoutIcon } from '../UI/Icons';
```

---

## State Management

All state in `App.jsx` — no external state library:

| State | Type | Purpose |
|---|---|---|
| `activeFilter` | `string` | Active filter tab ID |
| `activeNavId` | `number` | Active sidebar nav item |
| `bannerDismissed` | `boolean` | Whether promo banner is hidden |
| `sidebarOpen` | `boolean` | Mobile/tablet drawer open state |
| `cards` | `array` | Current question cards (supports dismiss) |
| `olderCards` | `array` | Older question cards section |

Card `expanded` state is stored inside the card object in `cards`/`olderCards` arrays and toggled via `handleToggleCard`.

---

## CSS Architecture

- **CSS Modules** per component — `ComponentName.module.css`
- **Design tokens** in `App.css` `:root` — single source of truth for colors, spacing, typography
- **No inline styles** except for dynamic values (`iconColor` from data, animation delays)
- **Global keyframes** in `App.css`: `fadeSlideIn`, `fadeSlideUp`, `neuPop`, `cardEntrance`

Key tokens:
```css
--color-sidebar: #275f82
--color-topbar: #0D3B57
--color-accent: #0099CC
--color-success: #22a96e
--color-danger: #DC3545
--color-badge-new-bg: #bbd020
--color-coin: #F5A800
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| ≥ 1600px | Content max-width: 1400px (no infinite stretch on 4K) |
| ≥ 1024px | Full sidebar (200px) + full topbar with logo |
| ≤ 1100px | Card columns "Erstellt" + "Paket" hidden |
| ≤ 1023px | Hamburger mode: sidebar becomes slide-in drawer, logo in drawer header |
| ≤ 767px | Narrower content padding (16px) |
| ≤ 600px | "Fragesteller" column hidden; "Sichern" moves to expanded content |
| ≤ 480px | Breadcrumb hidden; search fills available topbar space |
