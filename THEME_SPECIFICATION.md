# RINGLY — Entire Website Theme & Design System Specification

> **Document Purpose:** Complete, definitive specification of the visual theme, color palette, typography system, component design rules, and UI micro-interactions for the **Ringly Website**.

---

## 1. Theme Philosophy & Aesthetic Identity

**Theme Name:** Tactical Monochromatic Slate & Cream  
**Aesthetic Style:** Edgy, Precision Flat, High-Contrast Monospace Telephony  

### Core Design Principles
1. **Anti-App Telephony Feel:** The site reflects a raw, highly reliable human telephony service. No glossy gradients, generic soft blurs, or app-like rounded pill bubbles.
2. **Strict Flatness:** Hierarchy is created through size, font weights, and sharp color contrast — **never** through 3D elevation or drop shadows.
3. **Sharp Edgy Geometry:** Every UI element (buttons, cards, modals, navigation containers, inputs) uses **sharp 90° corners (`0px` `border-radius`)**.
4. **Restrained Motion:** Animations serve functional state feedback or high-impact intro beats (e.g. Amber Sweep headline ignition, clock hand sweeps, left-to-right button fills).

---

## 2. Color Palette & Tokens

### Primary System Colors

| Token Name | Hex Code | HSL / RGBA Equivalent | Usage / Application |
|---|---|---|---|
| **`var(--bg-dark)`** | `#0F212A` | `hsl(201, 48%, 11%)` | Deep Dark Slate Navy root background |
| **`var(--bg-card)`** | `#12242E` | `rgb(18, 36, 46)` | Card surface background & clock dial face |
| **`var(--accent-cream)`** | `#F5E6C8` | `rgb(245, 230, 200)` | Warm Pale Cream primary accent, clock hands, active pills, CTA borders |
| **`PALETTE.orange`** | `#FD6B00` | `rgb(253, 107, 0)` | Busywork Amber accent (clock comet trail & headline Amber Sweep ignition) |
| **`PALETTE.meetingMark`**| `#E74C3C` | `rgb(231, 76, 60)` | Signal Red (4:00 o'clock deadline pin & callout label) |
| **`var(--border-subtle)`**| `#3A5C6E` | `rgb(58, 92, 110)` | Slate line dividers & card borders |
| **`var(--text-white)`** | `#FFFFFF` | `rgb(255, 255, 255)` | Primary title & body text |
| **`var(--text-muted)`** | `#A0C0D0` | `rgb(160, 192, 208)` | Monospace subtext, operational labels, and secondary copy |

---

## 3. Typography & Font Stacks

### 1. Display Header Font — `Space Grotesk`
- **CSS Variable:** `var(--font-display)`
- **Font Stack:** `'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif`
- **Usage:** Main hero headlines, section headers, primary button labels, logo titles.
- **Key Weights:** `700` (Bold), `800` (Extra Bold), `900` (Black).

### 2. Monospace Technical Font — `Space Mono`
- **CSS Variable:** `var(--font-mono)`
- **Font Stack:** `'Space Mono', monospace`
- **Usage:** Operational badges (`[ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]`), pricing formulas, rate/limit counters (`RATE: ₹149/WK BASE`).
- **Key Weights:** `700` (Bold).

### 3. Body Text Font — `Inter`
- **CSS Variable:** `var(--font-body)`
- **Font Stack:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Usage:** Paragraph copy, descriptions, modal instructions.
- **Key Weights:** `400` (Regular), `600` (Semi-Bold).

---

## 4. UI Component Design Specifications

### 1. Navigation Bar (`PillNav.jsx` & `PillNav.css`)
- **Container:** Floating top nav bar centered at `top: 1.5rem`.
- **Corners:** Sharp `0px` `border-radius`.
- **Hover Micro-Interaction:** Left-to-right CSS width expansion hover fill (`.pill::before` transition `width 0.3s ease-in-out`).
- **Hover Colors:** Fills with Warm Pale Cream (`#F5E6C8`) and smoothly transitions text to Dark Slate Navy (`#0F212A`).

### 2. Primary CTA Button ("FIX IT" / `SpotlightButton.jsx`)
- **Structure:** Tactical button wrapper (`.button-borders`) with sharp outer corner accent brackets (`:before` / `:after`).
- **Hover Animation:** SVG polygon background sweep animation (`background-position: 40%` on hover).
- **Dimensions:** Fixed `min-width: 260px`, `padding: 1rem 4.5rem`, `border: 1.5px solid #F5E6C8`.

### 3. Headline Animation ("Amber Sweep" / `GradientRevealText.jsx`)
- **Character Reveal:** Splits headline text (`"WE CALL." / "YOU REMEMBER."`) into individual character `<span>` elements.
- **On Mount Animation:** Sweep front moves left-to-right over ~1.1s. Each character ignites to Busywork Amber (`#FD6B00`), then cools to Ivory (`#F5E6C8`).
- **Beat Hold:** The word `"REMEMBER"` holds its amber state for an extra ~0.38s hold beat before cooling.
- **Interaction:** Completely static after intro reveal (0 hover listeners, no cursor pointer).

### 4. Hero Clock Animation (`WriglyClock.jsx`)
- **Face:** HTML5 Canvas rendering at 60fps rAF.
- **Aspect Ratio:** Locked 1:1 square ratio (`aspectRatio: '1 / 1'`).
- **Visuals:** Ivory hands (`#F5E6C8`), Amber comet trail sweep (`#FD6B00`), Miss flinch pulse at 4:00 (120°), red leader pin line & callout text (`4:00 Meeting`).

### 5. Cards & Input Elements (`SubscribeModal.jsx`, `HowItWorksView.jsx`, `AboutView.jsx`)
- **Card Background:** `var(--bg-card)` (`#12242E`)
- **Card Borders:** `1px solid var(--border-subtle)` (`#3A5C6E`)
- **Card Corners:** `0px` `border-radius`
- **Box Shadows:** `none`

---

## 5. Page Layout Rules

1. **Landing Page (`UnifiedMainView.jsx`):**
   - Strictly single viewport height (`100vh`, `overflow: hidden`).
   - 2-column grid layout (Left: Copy & CTA; Right: Canvas Clock).
   - Bottom metadata footer bar anchored to full-width page bottom (`RATE: ₹149/WK BASE | LIMIT: 1–6 CALLS/DAY`).
2. **Secondary Views (`HowItWorksView.jsx`, `AboutView.jsx`):**
   - Scrollable pages with top header navigation (`← BACK TO HOME`).
   - Modular sections structured for clean reading and future motion expansion.
