# RINGLY — Project Architecture & Full Technical Context

> **Target Audience for this Document:** Human Developers & AI Coding Agents (LLMs/Subagents).  
> **Purpose:** Provides complete, micro-level context, architectural decisions, design system specifications, component data flows, and constraints for the **Ringly Human Reminders** codebase.

---

## 1. Project Overview & Core Philosophy

**Ringly** is a high-aesthetic web application for a **Human Operator Telephony Reminder Service** ("The Anti-App Reminder Service").

### Key Value Proposition
- **The Problem:** App push notifications are swiped away in milliseconds without action, causing constant procrastination and missed events.
- **The Solution:** Ringly replaces silent app alerts with **real human telephone operators** who place direct phone calls to subscribers and stay on the line until the task/event is verified complete.
- **Pricing Model:** Weekly subscription starting at **₹149/week** base rate (1 call/day) + **₹60/week** per additional call/day (up to 6 calls/day max).

---

## 2. Design System & Aesthetics

### Visual Language: Tactical & Edgy Flat Design
1. **Corners:** Strictly **sharp / edgy corners (`0px` `border-radius`)** across all buttons, cards, pills, modals, inputs, and nav containers. No rounded or pill-shaped borders (`border-radius: 9999px` is strictly forbidden).
2. **Elevation & Depth:** Strictly **flat**. Hierarchy is established via scale, typography, and color contrast. No 3D shadows or `box-shadow` drop-shadows are permitted (`box-shadow: none` across all elements).
3. **Typography:**
   - Display Font: `Space Grotesk` (`var(--font-display)`) — Bold, uppercase, tactical headers.
   - Monospace Font: `Space Mono` (`var(--font-mono)`) — Technical labels, system badges, rate/limit counters.
4. **Color Palette:**
   - **Dark Slate Navy (Background):** `#0F212A` / `#162C37` (`var(--bg-dark)`)
   - **Warm Pale Cream (Primary Accent):** `#F5E6C8` (`var(--accent-cream)`) — Clock hands, hour numbers, active pills, CTA borders.
   - **Busywork Amber (Sweep Accent):** `#FD6B00` (`PALETTE.orange`) — Clock comet trail & headline Amber Sweep character reveal.
   - **Signal Red (Flinch Accent):** `#E74C3C` / `#C05C4E` — 4:00 o'clock deadline pin dot & callout label.
   - **Slate Border (Subtle Line):** `#3A5C6E` (`var(--border-subtle)`)

---

## 3. Application Architecture & View Routing

The application uses **React 18** with **Vite** and client-side view state routing managed via `AppContext`.

```
[ AppShell (App.jsx) ]
  ├── [ PillNav ] (Fixed Top Center — Items: "Home", "About Us")
  ├── [ App Logo ] (Fixed Top Left — "RINGLY")
  ├── [ main ] (Conditional Render based on activeView state)
  │     ├── 'home'         => <UnifiedMainView /> (Single Viewport 100vh Unscrollable Hero)
  │     ├── 'about'        => <AboutView /> (Company Mission & Anti-App Philosophy)
  │     └── 'how-it-works' => <HowItWorksView /> (Clock Hero, Protocol Tips, Interactive Pricing)
  └── [ SubscribeModal ] (Razorpay Checkout Modal — overlay)
```

---

## 4. Detailed Component Breakdown

### 1. `src/App.jsx`
- Root application shell wrapper.
- Contains the fixed top-left logo (`RINGLY`), floating top nav `<PillNav />`, and `<main>` view switcher.
- Configures `navItems`:
  ```javascript
  const navItems = [
    { label: 'Home', href: '#home', onClick: () => setActiveView('home') },
    { label: 'About Us', href: '#about', onClick: () => setActiveView('about') }
  ];
  ```
- Sets `height: 100vh` and `overflow: hidden` when `activeView === 'home'` to guarantee an unscrollable landing page.

### 2. `src/context/AppContext.jsx`
- Global React Context Provider (`AppProvider` & `useApp()`).
- **State Properties:**
  - `activeView`: `'home'` | `'about'` | `'how-it-works'`
  - `isSubscribeModalOpen`: `boolean`
  - `user`: `{ name, phone, dailyCallLimit, subscriptionActive, subscriptionEnd }`
- **Exposed Methods:**
  - `calculatePrice(callsPerDay)`: Computes `149 + 60 * (clamped - 1)` for daily call limits between 1 and 6.
  - `activateSubscription(dailyLimit, phone, name)`: Updates user record and closes modal.

### 3. `src/components/UnifiedMainView.jsx`
- The landing page hero view (`100vh` single viewport, `overflow: hidden`).
- **Left Column:**
  - `[ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]` monospace header.
  - `<GradientRevealText lines={["WE CALL.", "YOU REMEMBER."]} />` (Amber Sweep headline animation).
  - Subtitle copy: `"Never Miss an Event / Never Procrastinate"`.
  - `<SpotlightButton text="FIX IT" onClick={() => setActiveView('how-it-works')} />`
- **Right Column:**
  - `<WriglyClock size={400} />` canvas clock component.
- **Bottom Footer Bar:**
  - Monospace operational metadata anchored at full-width page bottom:  
    `RATE: ₹149/WK BASE | LIMIT: 1–6 CALLS/DAY | NO APP REQUIRED`

### 4. `src/components/WriglyClock.jsx` *(STRICTLY FROZEN — DO NOT TOUCH)*
- 60fps HTML5 Canvas rAF clock animation engine.
- Slowed sweep velocity (1 lap every 16 seconds).
- Ivory clock hands (`#F5E6C8`), Amber comet trail (`#FD6B00`), Miss flinch trigger at 4:00 (120°).
- Leader pin line connecting to outside two-line red callout label (`4:00 Meeting`).
- Mathematically calculated 30°-increment hour numerals (1–12) with locked 1:1 aspect ratio container (`aspectRatio: '1 / 1'`).

### 5. `src/components/GradientRevealText.jsx` & `GradientRevealText.css`
- "Amber Sweep" character-by-character GSAP headline reveal animation.
- Splits headline lines into individual `<span>` characters.
- On mount, a sweep front moves left-to-right over ~1.1s:
  - Each character ignites instantly to amber (`#FD6B00`).
  - Cools to final ivory (`#F5E6C8`) over ~350ms.
  - The word `"REMEMBER"` holds its amber state for an extra ~0.38s hold beat before cooling.
- Static headline after reveal (0 hover listeners, no cursor pointer, no translateX shift).

### 6. `src/components/SpotlightButton.jsx`
- Tactical "FIX IT" primary CTA button.
- Built using Uiverse animated SVG polygon background sweep (`background-position: 40%` on hover).
- Outer `.button-borders` pseudo-elements (`:before` / `:after`) with sharp corner accents.
- Styled with Ringly theme palette (`#F5E6C8` border, `#0F212A` background, `min-width: 260px`).

### 7. `src/components/PillNav.jsx` & `PillNav.css`
- Top floating navigation bar.
- GSAP initial scale-in (`logoRef`, `navItemsRef`).
- CSS left-to-right width expansion hover fill (`.pill::before` transition `width 0.3s ease-in-out`).
- Smooth color transition to dark navy text over cream background fill (`color: var(--hover-text)`).
- Logo phone button removed — renders only `"Home"` and `"About Us"` pill items.

### 8. `src/components/HowItWorksView.jsx`
- Dedicated page for service explanation and subscription onboarding.
- **Top Header:** Logo title + `← BACK TO HOME` button (calls `setActiveView('home')`). *(Developer comment notes header navigation will expand in future iterations).*
- **Section 1:** `<WriglyClock size={360} />` placeholder hero animation.
- **Section 2:** Protocol explanation cards (No Silent Push Alerts, Verification Protocol, Works On Any Phone).
- **Section 3:** Interactive Pricing Engine using `calculatePrice` with 1–6 daily call selection buttons, formula breakdown (`₹149 + ₹60 × (calls - 1)`), and primary CTA opening `<SubscribeModal />`.
- Built with modular section wrappers and clear comments for future scroll-driven animation timelines.

### 9. `src/components/AboutView.jsx`
- Company mission page explaining why push notifications fail and how human telephone callers enforce true accountability.

### 10. `src/components/SubscribeModal.jsx`
- Razorpay order checkout overlay modal.
- Daily call count selector, pricing calculation summary, operational phone number input, subscriber name input, and payment activation simulator.

### 11. `src/components/CustomRadio.jsx`
- Sharp, square option radio selectors (`borderRadius: '0px'`).

---

## 5. Summary of Live Codebase Files

```
c:\Users\Md Ruwaid uddin\Downloads\New folder\
├── index.html
├── package.json
├── vite.config.js
├── PROJECT_CONTEXT.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── context/
    │   └── AppContext.jsx
    └── components/
        ├── AboutView.jsx
        ├── CustomRadio.jsx
        ├── GradientRevealText.css
        ├── GradientRevealText.jsx
        ├── HowItWorksView.jsx
        ├── PillNav.css
        ├── PillNav.jsx
        ├── SpotlightButton.jsx
        ├── SubscribeModal.jsx
        ├── UnifiedMainView.jsx
        └── WriglyClock.jsx
```

---

## 6. Critical Invariants & Rules for AI Agents

1. **`WriglyClock.jsx` Freeze:** Do NOT modify `WriglyClock.jsx`'s internal canvas math, rAF loop, trail rendering, or hand sweep.
2. **Edgy Corners Only:** Do NOT add `border-radius` to buttons, cards, pills, inputs, or modals. Keep all elements at `0px` border radius.
3. **No 3D / Box Shadows:** Do NOT add drop-shadows or 3D elevation effects (`box-shadow: none` strictly enforced).
4. **Single Viewport Landing Page:** `UnifiedMainView.jsx` must remain a non-scrollable single screen (`100vh`, `overflow: hidden` when `activeView === 'home'`).
5. **Pricing Formula:** Must strictly use `149 + 60 * (callsPerDay - 1)` for daily call limits between 1 and 6.

---

## 7. Environment Variables & Supabase Setup

The project requires the following environment variables in `.env` (gitignored):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### Supabase Integration Architecture:
- `src/services/supabaseClient.js`: Exports global `supabase` client instance.
- `auth.users`: Managed by Supabase Auth with Google OAuth and Email/Password providers.
- `public.profiles`: Stores subscriber details (`daily_call_limit`, `subscription_active`, `phone`).
- `public.reminders`: Stores user task reminders with Row Level Security (RLS) policies scoped to `auth.uid()`.

