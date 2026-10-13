# Kestrel Design System (`DESIGN.md`)

## 1. Aesthetic Direction & Concept Anchor
- **System Name:** Kestrel Daylight Static Architecture & Design System Workbench
- **Concept Anchor:** Architectural Daylight Calibration Sheet & Specimen Workbench (Seed Key `752bbf61`, Candidate #5)
- **Mode:** Persuade (Editorial Daylight Precision)
- **Taste Dials:** `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 4`
- **Theme Lock:** Mandatory Daylight-First Light Theme (`color-scheme: light`). No dark mode, no dark sections, no theme-toggle controls.

## 2. Daylight Color Palette & Atmospheric Tokens (`:root`)
All surfaces, borders, text, and interactive states are governed by CSS custom properties in [`css/style.css`](file:///c:/Test123/css/style.css):

| Token | Value | Role & Contrast |
| :--- | :--- | :--- |
| `--color-background` | `#FBFBF9` | Warm Alabaster Canvas (primary page ground) |
| `--color-surface` | `#FFFFFF` | Pure Daylight Specimen Plate (elevated cards & panels) |
| `--color-surface-subtle` | `#F4F3EF` | Warm Stone Secondary Ground (`#workbench`, `#cta`, pill trays) |
| `--color-surface-tinted` | `#EEF2FF` | Subtle Cobalt-Tinted Highlight Surface |
| `--color-bezel-tray` | `#F1EFEA` | Recessed 6px Double-Bezel Outer Ring |
| `--color-text` | `#141517` | Deep Carbon Ink (`17.5:1` WCAG AAA on `--color-background`) |
| `--color-text-muted` | `#4A4E58` | Calibrated Slate Body Copy (`8.0:1` WCAG AAA on `--color-background`) |
| `--color-primary` | `#1D4ED8` | Architectural Cobalt Action (`6.7:1` WCAG AA+ with `#FFFFFF` text) |
| `--color-primary-hover` | `#1E40AF` | Deep Cobalt Active/Hover State (`8.3:1` WCAG AAA) |
| `--color-accent` | `#0F766E` | Mineral Teal Calibration & Verification Accent |
| `--color-border` | `#E4E2DC` | `1px` Warm Stone Hairline Divider |
| `--color-border-strong` | `#D0CEC5` | Emphasized Control & Input Hairline |

## 3. Typography & Scannable Hierarchy
- **Primary Font Stack (`--font-sans`):** `'Satoshi', 'General Sans', 'Switzer', 'Segoe UI Variable Display', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif` (zero external font runtime requests; zero overused default fonts).
- **Monospace Stack (`--font-mono`):** `'JetBrains Mono', 'Cascadia Code', 'SF Mono', Consolas, monospace` with `font-variant-numeric: tabular-nums` on all metrics, dimensions, and token values.
- **Fluid Scale (`clamp()`):**
  - Hero Display (`h1`): `clamp(2.15rem, 3.35vw, 3.15rem)`, weight `700`, line-height `1.08`, tracking `-0.032em`, `max-width: 19ch`.
  - Section Headings (`h2`): `clamp(1.75rem, 2.8vw, 2.5rem)`, weight `700`, line-height `1.14`, tracking `-0.028em`, `text-wrap: balance`.
  - Bento & Step Titles (`h3`): `clamp(1.25rem, 1.6vw, 1.45rem)`, weight `700`, line-height `1.25`, tracking `-0.02em`.
  - Body Copy: `1.0625rem` (`17px`), line-height `1.65`, constrained to `60ch–65ch`.
  - Minimum Technical Label Size: `0.8125rem` (`13px`) — strictly above the `12px` legibility floor.

## 4. Layout Architecture & Section Diversity
- **Container & Grid:** `1280px` max-width container (`--container-max`) with a 12-column CSS Grid on desktop (`1440×900`, `1366×768`), collapsing cleanly to 2 columns on tablet (`768×1024`) and 1 column (`minmax(0, 1fr)`) on mobile (`390×844`, `360×800`).
- **Distinct Section Geometries (No Repeated Card Rows):**
  1. **Header (`.site-header`):** `68px` fixed-cap frosted daylight glass bar (`rgba(251, 251, 249, 0.88)`, `backdrop-filter: blur(16px)`).
  2. **Hero (`#hero`):** Asymmetric 7/5 split with `19ch` display headline, dual pill CTAs, and a Double-Bezel studio calibration plate. Fits comfortably within `1440×900` and `1366×768` above the fold.
  3. **Verified Architecture Ledger (`#highlights`):** 4-column tabular numeral `<dl>` proof bar (`0` dependencies, `59` detector rules, `7 / 5 / 4` dials, `5` verified viewports).
  4. **Capabilities (`#capabilities`):** 3-cell asymmetric Bento grid (`7` col + `5` col + `12` col horizontal split).
  5. **Interactive Workbench (`#workbench`):** WAI-ARIA tabbed specification inspector (`role="tablist"`, `role="tab"`, `role="tabpanel"`), live `Editorial` vs `Compact` spatial density switcher, and one-click CSS token clipboard copy with `aria-live="polite"` feedback.
  6. **Engineering Methodology (`#methodology`):** 5/7 sticky editorial lead column paired with a 3-phase vertical specification timeline.
  7. **FAQ (`#faq`):** Native `<details>`/`<summary>` accordion with exclusive open-item synchronization.
  8. **Final CTA (`#cta`) & Footer (`.site-footer`):** Double-Bezel conversion plate with `:root` clipboard export and 4-column light architectural footer.

## 5. Tactile Framing & Motion Choreography
- **Double-Bezel (Doppelrand) Ring:** Major plates (`.bezel-core`, `.bento-core`, `.workbench-core`, `.cta-core`) render a `6px` recessed stone ring and `1px` outer border via multi-layer `box-shadow` (`0 0 0 6px var(--color-bezel-tray), 0 0 0 7px var(--color-border), var(--shadow-ambient)`) so the visual depth is achieved without nested card DOM bloat.
- **Motion & Accessibility:**
  - Spring curve (`--ease-spring: cubic-bezier(0.22, 1, 0.36, 1)`) and exponential ease-out (`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`).
  - Content is never hidden at `opacity: 0` on fast scroll or anchor navigation.
  - Full `@media (prefers-reduced-motion: reduce)` and `@media (prefers-reduced-transparency: reduce)` support.

