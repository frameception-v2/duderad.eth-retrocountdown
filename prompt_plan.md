# Code Generation Prompts

```markdown
## Prompt 1: Project Setup and Base Template
**Context:** Initialize Next.js TypeScript project with Farcaster Frame v2 requirements
**Task:** 
- Create `next.config.js` with asset domains
- Install @standard-crypto/farcaster-embed SDK
- Set up base layout with viewport meta tags
- Add core CSS variables for color palette
- Create empty TimerComponent with props interface
**Integration:** Wire up basic page structure with Farcaster SDK wrapper

## Prompt 2: Countdown Logic Foundation
**Context:** Implement time calculation core functionality
**Task:**
- Create utility function `calculateTimeRemaining()`
- Use Intl.DateTimeFormat for UTC target
- Set up useEffect with 1s interval
- Add state management for days/hours/minutes/seconds
- Implement basic timezone conversion
**Integration:** Connect to TimerComponent with live updates

## Prompt 3: Retro Styling System
**Context:** Apply MySpace-inspired visual theme
**Task:**
- Create blinking text CSS animation
- Implement animated GIF border using CSS gradient animation
- Set up neon text shadows with alternating colors
- Add CRT screen filter effect
- Configure vmin-based responsive typography
**Integration:** Apply styles to TimerComponent container

## Prompt 4: Time Format Interactions
**Context:** Implement user input handling
**Task:**
- Add click handler to toggle 12/24h format
- Create long-press detection logic
- Implement swipe gesture handlers
- Add haptic feedback for mobile
- Store preferences in localStorage
**Integration:** Connect interaction handlers to time display

## Prompt 5: Animated Progress Indicator 
**Context:** Visualize time progression
**Task:**
- Create CSS gradient progress bar
- Animate width based on weekly progress
- Add scanline overlay animation
- Implement cursor-trailing effect
- Add touch-responsive flicker class
**Integration:** Wire progress value to timer calculations

## Prompt 6: Mobile Optimization Layer
**Context:** Ensure mobile-first responsiveness
**Task:**
- Add touch action CSS properties
- Implement viewport height lock
- Create orientation change handler
- Add 48px minimum touch targets
- Prevent zoom with meta tag
**Integration:** Apply mobile styles via media queries

## Prompt 7: Social Sharing Integration
**Context:** Add Farcaster ecosystem features
**Task:**
- Implement share button with SDK method
- Create OG image generator using canvas
- Add deep link preservation logic
- Style custom scrollbars
- Add attribution panel animation
**Integration:** Connect sharing features to timer state

## Prompt 8: Final Assembly
**Context:** Combine all components
**Task:**
- Optimize animation performance
- Add error boundaries
- Implement loading states
- Finalize responsive breakpoints
- Set document title/metadata
**Integration:** Complete end-to-end testing
```

# Implementation Notes

1. **Progressive Enhancement:** Each prompt builds on previous work while maintaining functional fallbacks
2. **Performance Focus:** CSS animations preferred over JS, IntersectionObserver for offscreen updates
3. **Mobile Parity:** Touch/pointer events handled through unified interface
4. **State Management:** URL params + localStorage maintain consistency across sessions
5. **Farcaster Integration:** SDK usage isolated to sharing features only

Each prompt produces verifiable, testable functionality while maintaining compatibility with previous steps. The sequence follows React/Next.js best practices for static generation with client-side hydration.