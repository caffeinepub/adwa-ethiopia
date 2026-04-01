# Adwa Ethiopia

## Current State
The site has a form-based EntryPopup (name/email/country) that appears before the main site. Music is controlled via MusicContext (YouTube embed). The site has all major sections: hero, timeline, heroes, facts, map, why adwa, history, gallery, quiz, chat, video, music, comments, about.

## Requested Changes (Diff)

### Add
- New cinematic intro screen (replaces EntryPopup) with:
  - Full black screen
  - Amharic text appearing slowly: "1896… አፍሪካ በመከፋፈል ዘመን… አንድ ሀገር ቆመች…"
  - "Enter the Story" button
  - On click: fade into main site, start music, show mute/unmute button
- Amharic narration text displayed in each section as cinematic overlays or section headings (8 narration blocks)

### Modify
- App.tsx: Replace EntryPopup with new CinematicIntro component
- MusicContext: startMusic should be called when user clicks "Enter the Story"

### Remove
- EntryPopup with name/email/country form (replace entirely with cinematic intro)

## Implementation Plan
1. Create `CinematicIntro.tsx` component with:
   - Black fullscreen overlay
   - Amharic text fade-in word by word or line by line with stagger
   - "Enter the Story" button appears after text
   - On click: calls startMusic(), fades out overlay
2. Update App.tsx to use CinematicIntro instead of EntryPopup
3. Add Amharic narration blocks as cinematic text elements in relevant sections (TimelineSection, HeroesSection, HomeSection, WhyAdwaSection, etc.) using the 8 narration scripts provided
