# Yum & Fit Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, minimalist, responsive landing page for the Yum & Fit restaurant featuring the bulldog chef mascot, promotional video showcase, and an interactive menu with direct WhatsApp ordering.

**Architecture:** Pure modern static architecture with zero build friction (HTML5 + Tailwind CSS + Vanilla JS ES6+). Clean separation of concerns: structured menu dataset in `js/menu-data.js`, UI interaction controllers in `js/main.js`, custom brand styling and animations in `css/styles.css`, and a fully responsive semantic `index.html`.

**Tech Stack:** HTML5, Tailwind CSS (CDN with customized theme), Vanilla JavaScript (ES6+), SVG icons.

## Global Constraints
- Brand name: "Yum & Fit", tagline: "Healthy & Delicious"
- Contact phone for orders: `098 184 0168` (WhatsApp API target: `593981840168`)
- Video asset: `Assets/gemini_generated_video_27d573df.mp4`
- Logo asset: `Assets/logo.jpg`
- Mobile-first responsive layout (tested at 375px, 768px, 1280px+)
- Direct browser compatibility (no webpack/vite/build step required to open and run)

---

### Task 1: Asset Preparation and Image Extraction

**Files:**
- Create: `Assets/images/power-steak-bowl.jpg`
- Create: `Assets/images/fresh-salad.jpg`
- Create: `Assets/images/avocado-prep.jpg`
- Create: `Assets/images/video-poster.jpg`
- Script: `scripts/extract_assets.py`

**Interfaces:**
- Produces: High-resolution optimized image assets in `Assets/images/` extracted directly from the promotional video frames for consistency with the brand identity.

- [ ] **Step 1: Write asset extraction script**

Create `scripts/extract_assets.py` to extract pristine frames from `Assets/gemini_generated_video_27d573df.mp4`:
- Frame 10 -> `Assets/images/fresh-salad.jpg` (Garden salad bowl)
- Frame 60 -> `Assets/images/avocado-prep.jpg` (Chef holding fresh avocado)
- Frame 120 -> `Assets/images/power-steak-bowl.jpg` (Steak, quinoa & avocado bowl)
- Frame 130 -> `Assets/images/video-poster.jpg` (Poster for video player)

- [ ] **Step 2: Run script to generate image assets**

Run: `python scripts/extract_assets.py`
Expected: Output confirms 4 files created in `Assets/images/`.

- [ ] **Step 3: Verify created image files**

Run: `Get-ChildItem -Path Assets/images`
Expected: 4 `.jpg` files present with sizes > 50KB.

- [ ] **Step 4: Commit**

```bash
git add scripts/extract_assets.py Assets/images/
git commit -m "chore: extract high-res dish and video poster assets"
```

---

### Task 2: Menu Data Model and Business Logic (`js/menu-data.js`)

**Files:**
- Create: `js/menu-data.js`
- Test: `tests/menu_data.test.js`

**Interfaces:**
- Produces:
  - `MENU_ITEMS`: Array of dish objects `{ id, name, category, description, price, calories, protein, badge, image }`
  - `CATEGORIES`: Array of filter categories `{ id, label, icon }`
  - `buildWhatsAppOrderUrl(dishName, price, phone)`: Returns encoded WhatsApp URL.

- [ ] **Step 1: Write test for menu data and URL generation**

Create `tests/menu_data.test.js` validating:
1. `MENU_ITEMS` has at least 8 varied dishes spanning `bowls`, `salads`, `keto`, and `drinks`.
2. Every dish contains required properties (`id`, `name`, `category`, `price`, `calories`, `protein`, `image`).
3. `buildWhatsAppOrderUrl` generates a valid URL pointing to `https://wa.me/593981840168?text=...` with properly encoded text.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/menu_data.test.js`
Expected: FAIL (Cannot find module `js/menu-data.js`).

- [ ] **Step 3: Implement `js/menu-data.js`**

Implement `js/menu-data.js` exporting (or attaching to `window` for browser and `module.exports` for node testing) the dishes, categories, and `buildWhatsAppOrderUrl`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/menu_data.test.js`
Expected: PASS with "All menu data and WhatsApp URL tests passed!".

- [ ] **Step 5: Commit**

```bash
git add js/menu-data.js tests/menu_data.test.js
git commit -m "feat: add menu data model and WhatsApp URL generator"
```

---

### Task 3: Custom Styling and Design System (`css/styles.css`)

**Files:**
- Create: `css/styles.css`

**Interfaces:**
- Consumes: Brand palette (`#1E3B2B`, `#3D6A4E`, `#C99738`, `#FAF8F5`)
- Produces:
  - Custom utility classes: `.glass-nav`, `.card-hover`, `.gold-gradient`, `.text-shadow-sm`
  - Video player overlay and custom control styles
  - Animations: `@keyframes float`, `@keyframes pulseSubtle`
  - Custom scrollbar and smooth scrolling (`scroll-behavior: smooth`)

- [ ] **Step 1: Create `css/styles.css`**

Implement:
- Color variables matching design spec.
- Typography styles importing Google Fonts (*Outfit* & *Plus Jakarta Sans*).
- Glassmorphism navigation bar style with backdrop blur.
- Custom video player controls and full-screen transitions.
- Interactive pulse badge for the floating WhatsApp button.

- [ ] **Step 2: Verify CSS syntax**

Run: `python -c "assert open('css/styles.css', encoding='utf-8').read().count('{') == open('css/styles.css', encoding='utf-8').read().count('}')"`
Expected: Clean exit (matching braces).

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: implement brand design system styles and animations"
```

---

### Task 4: Interactive Controllers (`js/main.js`)

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: `MENU_ITEMS` and `CATEGORIES` from `js/menu-data.js`
- Produces:
  - `renderMenu(category)`: Dynamically renders menu cards into the DOM.
  - `initCategoryFilters()`: Tab selection and filtering listeners.
  - `initVideoPlayer()`: Custom play/pause, sound toggle, fullscreen.
  - `initMobileNav()`: Hamburger toggle and close on outside click/escape.
  - `initScrollEffects()`: Navbar elevation on scroll and smooth scrolling.

- [ ] **Step 1: Implement `js/main.js`**

Implement complete client-side behavior:
- Dynamic menu rendering with filter tabs.
- Order button click handlers that open WhatsApp with the dish details.
- Custom video player controls handling `gemini_generated_video_27d573df.mp4`.
- Mobile navigation drawer toggle and keyboard accessibility (`Escape` key).
- Navbar shadow enhancement when scroll offset > 20px.

- [ ] **Step 2: Verify script syntax**

Run: `node -c js/main.js`
Expected: Clean exit with zero syntax errors.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: implement interactive menu, video player and navigation logic"
```

---

### Task 5: Main Landing Page HTML (`index.html`)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `Assets/logo.jpg`, `Assets/gemini_generated_video_27d573df.mp4`, `Assets/images/*`, `css/styles.css`, `js/menu-data.js`, `js/main.js`.
- Produces: Complete, accessible, responsive landing page.

- [ ] **Step 1: Implement `index.html`**

Build:
1. `<head>`: Meta viewport, SEO tags, Open Graph tags, Google Fonts (*Outfit*, *Plus Jakarta Sans*), Tailwind CDN with custom brand theme extension, and `css/styles.css`.
2. `<header>`: Glassmorphism floating navbar with bulldog chef logo badge, navigation links, and "Pedir por WhatsApp" button. Mobile menu drawer.
3. `<section id="hero">`: Inspiring headline, quality badges, CTAs ("Explorar Menú" & "Ver Preparación"), featured steak bowl card with rating and macros, metrics bar (0% ultraprocesados, 100% fresco, +40g proteína).
4. `<section id="menu">`: Category tabs container (`#category-tabs`) and dynamic menu grid (`#menu-grid`) with fallback template.
5. `<section id="cocina">`: Video showcase featuring `Assets/gemini_generated_video_27d573df.mp4` with custom playback overlay, video poster, and process highlights.
6. `<section id="valores">`: Bento grid of 3 core brand pillars (Sabor Gourmet Real, Ingredientes Seleccionados, Empaques Eco-friendly).
7. `<section id="contacto">`: Hours of operation, direct phone `098 184 0168`, delivery areas and pick-up options.
8. `<footer>`: Brand copyright, quick links, bulldog chef tribute, and floating WhatsApp widget with active notification badge.

- [ ] **Step 2: Validate HTML structure and links**

Run script to check all referenced asset paths exist:
Run: `python -c "import re, os; html=open('index.html', encoding='utf-8').read(); srcs = re.findall(r'(?:src|href)=\"([^\"]+)\"', html); missing = [s for s in srcs if not s.startswith(('http', '#', 'tel:', 'mailto:')) and not os.path.exists(s)]; print('Missing assets:', missing); assert len(missing) == 0"`
Expected: `Missing assets: []`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: complete modern and responsive landing page layout"
```

---

### Task 6: End-to-End Verification and Cross-Device Testing

**Files:**
- Create: `tests/e2e_verify.py`

- [ ] **Step 1: Write verification script `tests/e2e_verify.py`**

Verifies:
- All required assets exist (`logo.jpg`, video `.mp4`, dish images).
- HTML contains all required semantic sections (`hero`, `menu`, `cocina`, `valores`, `contacto`).
- Phone number `098 184 0168` and WhatsApp format `593981840168` appear in navigation and buttons.
- Starts a local HTTP server and verifies HTTP 200 responses for `index.html`, `css/styles.css`, `js/menu-data.js`, `js/main.js`, and video stream.

- [ ] **Step 2: Run the verification suite**

Run: `python tests/e2e_verify.py`
Expected: All tests pass with 100% success.

- [ ] **Step 3: Commit and merge feature branch**

```bash
git add tests/e2e_verify.py
git commit -m "test: add automated end-to-end verification suite"
```
