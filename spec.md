# Adwa Ethiopia — Design Upgrade

## Current State
The site is a multi-section historical website about the Battle of Adwa, built with React/TypeScript/Tailwind. It has: a full-width layout, sticky TopNav, hero section, Heroes of Adwa cards, Learn section, Gallery, Quiz, Music, Documentary (YouTube), Donation, Comments, and an About Developer section. Animations (fade-in on scroll) and Ethiopian flag colors are already partially in place, but the overall visual quality is inconsistent — spacing is uneven, typography hierarchy is weak, cards feel generic, and transitions are not polished.

## Requested Changes (Diff)

### Add
- Premium typography system: Playfair Display (headings) + Plus Jakarta Sans (body) via @font-face from pre-bundled woff2 files
- OKLCH-based design token system in index.css with Ethiopian flag colors (green, yellow, red) as soft, muted tones on a near-white or deep-dark background
- Consistent scroll-triggered fade-in + upward movement (1s ease, staggered per card)
- Hover effects on all cards: slight translateY lift + soft shadow glow in the card's accent color
- Hover effects on buttons: subtle scale + shadow transition (0.3s ease)
- Soft box-shadow system (layered, multi-level depth)
- Section dividers with elegant spacing (py-24 min between sections)

### Modify
- index.css: Replace current token values with muted OKLCH Ethiopian palette; set font families; add global scroll-fade animation utility classes
- All section files: Apply updated spacing, font size classes, and border-radius to cards/images
- TopNav: Refine to feel more premium — thin border-bottom, backdrop blur, elegant font
- HeroesSection: Upgrade card grid with uniform sizing, improved circular image treatment, and refined hover lift
- HomeSection hero: Large Playfair Display headline, generous vertical spacing, flag color accent lines
- GallerySection: Consistent rounded corners, lazy loading, lightbox hover overlay
- LearnSection, QuizSection, MusicSection, DonationSection, CommentsTab, AboutTab: Consistent card styling, refined buttons, clean input fields

### Remove
- Any harsh/neon colors or color literals in components
- Overly fast transitions (anything < 0.25s)
- Inconsistent inline spacing/margin values that break grid rhythm

## Implementation Plan
1. Update `index.css` with OKLCH tokens (muted green/yellow/red palette), @font-face for Playfair Display + Plus Jakarta Sans, and global animation utilities (.fade-up, .fade-up-visible)
2. Update `tailwind.config.js` to register font families, custom shadow scale, and border-radius tokens
3. Refactor `TopNav` for premium feel
4. Upgrade `HomeSection` hero typography and spacing
5. Upgrade `HeroesSection` card grid with refined hover/shadow
6. Apply consistent card styles across all remaining sections
7. Validate (lint + typecheck + build)
