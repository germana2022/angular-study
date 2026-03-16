# Angular Study Platform - SPEC.md

## 1. Project Overview

**Project Name:** Angular Study Platform  
**Project Type:** Single Page Application (SPA) - Educational Dashboard  
**Core Functionality:** A professional documentation platform for learning Angular through interactive tutorials, code examples, and live demos  
**Target Users:** Developers learning Angular, preparing for interviews, or seeking to deepen their Angular knowledge

---

## 2. UI/UX Specification

### Layout Structure

**App Shell:**
- Fixed header (64px height)
- Fixed sidebar (280px width on desktop, collapsible on mobile)
- Main content area (scrollable)
- Responsive breakpoints:
  - Mobile: < 768px (sidebar as overlay)
  - Tablet: 768px - 1024px (compact sidebar)
  - Desktop: > 1024px (full sidebar)

**Page Sections:**
- Header: Logo, app title, theme toggle, GitHub link
- Sidebar: Navigation with topic categories, active state indicator
- Main Content: Topic detail view with structured sections
- No footer (full-height app)

### Visual Design

**Color Palette:**
- Primary: `#6366f1` (Indigo 500)
- Primary Dark: `#4f46e5` (Indigo 600)
- Primary Light: `#818cf8` (Indigo 400)
- Accent: `#10b981` (Emerald 500)
- Background: `#0f172a` (Slate 900)
- Surface: `#1e293b` (Slate 800)
- Surface Light: `#334155` (Slate 700)
- Text Primary: `#f8fafc` (Slate 50)
- Text Secondary: `#94a3b8` (Slate 400)
- Border: `#475569` (Slate 600)
- Error: `#ef4444` (Red 500)
- Warning: `#f59e0b` (Amber 500)
- Success: `#10b981` (Emerald 500)

**Typography:**
- Font Family: `'IBM Plex Sans', sans-serif`
- Monospace: `'IBM Plex Mono', monospace`
- Headings:
  - H1: 32px, 700 weight
  - H2: 24px, 600 weight
  - H3: 20px, 600 weight
- Body: 15px, 400 weight, 1.7 line-height
- Code: 14px, monospace

**Spacing System:**
- Base unit: 8px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Hover transitions: 200ms ease-out
- Active state: left border accent (3px)
- Code blocks: syntax highlighting with dark theme

### Components

**Sidebar Navigation:**
- Category headers (collapsible)
- Topic items with icons
- Active state: background highlight + left border
- Hover: subtle background change

**Topic Detail Page:**
- Breadcrumb navigation
- Title section with icon
- Summary card (highlighted)
- Content sections with proper hierarchy
- Code examples with copy button
- Interactive demo container
- Key points list
- Interview question card

**Interactive Demos:**
- Tabbed interface (Code | Preview)
- Live execution where applicable
- Reset button
- Visual feedback indicators

**Home Page:**
- Welcome hero section
- Quick stats cards
- Featured topics grid
- Getting started CTA

---

## 3. Functionality Specification

### Core Features

**Navigation:**
- Angular Router for client-side routing
- Lazy loading for feature modules
- Route guards for protected sections
- Breadcrumb navigation
- URL-based deep linking to topics

**Topic Management:**
- Centralized data source (JSON/Service)
- Dynamic routing based on topic ID
- Category-based organization

**Interactive Demos:**
1. **Change Detection Demo:** Visualize Default vs OnPush
2. **Observable vs Promise:** Live comparison
3. **Subject vs BehaviorSubject:** Value propagation
4. **Lifecycle Hooks:** Timing visualization
5. **trackBy:** List rendering comparison
6. **Data Binding:** All types live demo
7. **Angular Forms:** Template-driven vs Reactive
8. **Router/Guard/Resolver:** Navigation demo
9. **Dependency Injection:** Service injection demo
10. **Directives:** Custom directive demo
11. **ViewChild/ContentChild:** DOM access demo

**Responsive Behavior:**
- Sidebar collapses to hamburger menu on mobile
- Content adapts to screen width
- Touch-friendly navigation

### User Interactions

- Click topic → Navigate to detail page
- Click category → Expand/collapse topics
- Click demo tab → Switch code/preview
- Click copy → Copy code to clipboard
- Toggle theme → Switch light/dark mode (optional)

### Data Handling

- Topics stored in structured JSON format
- Lazy-loaded modules for each category
- Services for data access

---

## 4. Architecture

### Folder Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── topic.model.ts
│   │   ├── data/
│   │   │   └── topics.data.ts
│   │   └── services/
│   │       └── topic.service.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── code-block/
│   │   │   ├── demo-container/
│   │   │   └── topic-card/
│   │   ├── pipes/
│   │   └── directives/
│   ├── layout/
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── main-layout/
│   ├── features/
│   │   ├── home/
│   │   └── topics/
│   │       └── topic-detail/
│   ├── demos/
│   │   ├── change-detection/
│   │   ├── observables/
│   │   ├── lifecycle-hooks/
│   │   ├── forms/
│   │   ├── routing/
│   │   └── di/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.scss
└── index.html
```

### Module Organization

- **Core Module:** Singleton services, models, data
- **Shared Module:** Reusable components, pipes, directives
- **Layout Module:** Shell components
- **Features Modules:** Lazy-loaded by category

---

## 5. Acceptance Criteria

### Visual Checkpoints

- [ ] Dark theme applied consistently
- [ ] Sidebar shows all topics organized by category
- [ ] Active topic highlighted in sidebar
- [ ] Code blocks have syntax highlighting
- [ ] Responsive layout works on all breakpoints
- [ ] Animations are smooth (no jank)

### Functional Checkpoints

- [ ] All 35 topics accessible via routing
- [ ] Lazy loading works (check network tab)
- [ ] Demos are interactive and functional
- [ ] Navigation works without page reload
- [ ] Home page displays correctly
- [ ] Topic detail pages show all sections

### Technical Checkpoints

- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Angular Material components styled correctly
- [ ] Clean code without duplication
- [ ] Proper dependency injection
