# Adwa Ethiopia — Cinematic Redesign

## Current State
The site is a multi-section React app with a dark museum theme, Ethiopian flag colors (green #078930, yellow #FCB514, red #DA121A), Playfair Display headings, Plus Jakarta Sans body, scroll animations, and the following sections: Home, Learn, History, Heroes (12 cards), Gallery, Quiz, Chat (AI Chatbot), Documentary, Music, Comments, About. It has an EntryPopup (name + email + country), TopNav, and a footer.

## Requested Changes (Diff)

### Add
- Cinematic fullscreen Hero section with particle/smoke animation, "Victory of Adwa – Africa's Pride" title, "March 1, 1896 – Ethiopia defeated colonial invasion" subtitle, animated "Explore the Story" CTA button
- Interactive scroll-based animated Story Timeline section (5 steps: Treaty of Wuchale, Preparation for War, March 1 Battle, Ethiopian Victory, Impact on Africa) with icons and step-by-step reveal on scroll
- Interactive Map section showing Ethiopia with Adwa highlighted and animated battle positions
- Animated Facts/Counters section (Year 1896, Ethiopian Forces 100,000+, Italian Casualties 6,000+, Result: Decisive Victory)
- "Why Adwa Matters" section with strong quotes and modern layout explaining African independence inspiration
- Social share buttons in the footer
- Footer quote: "Adwa is a symbol of freedom for all Africa"
- Parallax scrolling effects on key sections

### Modify
- Hero section: upgrade to fullscreen cinematic with particle animation, new title/subtitle/CTA, more dramatic dark overlay
- App.tsx footer: add quote, social share buttons
- EntryPopup: keep as-is (name, email, country)
- Heroes section: keep 12 cards, already good
- ChatSection: keep as-is (AI chatbot named "Ask Adwa AI")
- TopNav: add smooth scroll links to all new sections
- Overall feel: more cinematic, award-winning, parallax, premium animations

### Remove
- Nothing to remove (donation already removed)

## Implementation Plan
1. Upgrade HomeSection to fullscreen cinematic hero with particle canvas animation, new headline, subtitle, animated CTA button, parallax background
2. Create new TimelineSection with 5 scroll-animated steps with icons
3. Create new MapSection with SVG/canvas Ethiopia map highlighting Adwa with animated dots
4. Create new FactsSection with animated counters using intersection observer
5. Create new WhyAdwaSection with quotes and modern layout
6. Update App.tsx to include all new sections in correct order and update footer with quote + social share
7. Update TopNav to include smooth scroll links to new sections
8. Add parallax effects throughout using CSS/JS
