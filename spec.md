# Adwa Ethiopia — Modern Historical Website Redesign

## Current State
The app is a mobile-first app (max-width: 430px) with a bottom navigation bar and tab-based navigation. It has 11 tabs: Home, Learn, History, Gallery, Quiz, AI Chat, Documentary, Music, Donation, Comments, About. The design uses warm cream/brown tones with a gold accent. Currently lacks scroll-based animations.

## Requested Changes (Diff)

### Add
- Scroll-triggered fade-in + upward movement animations for all sections (opacity 0→1, translateY 30px→0, duration 1s, ease-out, use IntersectionObserver)
- A `useScrollAnimation` custom hook that attaches IntersectionObserver to elements
- Ethiopian flag color palette prominently: green (#078930), yellow/gold (#FCDD09), red (#DA121A) as primary accent colors
- Full-width desktop website layout (not capped at 430px) with a top navigation bar
- A hero section that spans full viewport height with a dramatic background

### Modify
- `index.css`: Update CSS variables to feature Ethiopian flag colors as primary accents. Remove mobile-only `app-frame` max-width constraint. Add `@keyframes fadeInUp` animation classes.
- `App.tsx`: Replace bottom nav + tab system with a single-page scrolling website layout with anchor-based navigation in a sticky top nav bar. All sections on one page, scrollable.
- `HomeTab.tsx` → Becomes the main landing hero section within the single-page layout
- All tab components: Convert to sections within the single scrolling page, each wrapped with scroll animation
- `BottomNav.tsx`: Replace with a top sticky navigation bar with links to each section anchor

### Remove
- Mobile `app-shell` / `app-frame` max-width constraint
- Bottom navigation bar
- Tab switching system

## Implementation Plan
1. Update `index.css` with Ethiopian flag OKLCH color tokens as primary colors, add fade-in-up animation keyframes, remove mobile shell constraints, set full-width layout
2. Create `useScrollAnimation` hook using IntersectionObserver
3. Rewrite `App.tsx` as a single-page scrolling site with a sticky top nav
4. Rewrite `BottomNav.tsx` → `TopNav.tsx` with anchor links to all sections
5. Convert each tab into a `<section id="...">` component with scroll animations applied
6. Ensure all section headings, cards, images use fade-in-up on scroll
7. Validate and build
