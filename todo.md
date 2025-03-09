Here's the optimized 20-task checklist ordered by implementation dependencies:

- [ ] 1. Create Next.js TypeScript project with `create-next-app@latest` (Project Setup)
- [x] 2. Configure `next.config.js` with `images.remotePatterns` for Farcaster assets (Project Setup)
- [x] 3. Install `@standard-crypto/farcaster-embed` package via npm (Project Setup)
- [x] 4. Create `RootLayout` with viewport meta tags and CSS variables (Project Setup)
- [x] 5. Implement base `TimerComponent` with `TimeRemaining` props interface (Project Setup)
- [x] 6. Create `calculateTimeRemaining` utility with Intl.DateTimeFormat UTC (Countdown Logic)
- [x] 7. Add useState/useEffect for countdown updates with 1s interval (Countdown Logic)
- [x] 8. Implement CSS blinking animation `@keyframes blink` (Retro Styling)
- [x] 9. Create `.crt-effect` class with linear-gradient overlay (Retro Styling)
- [x] 10. Add neon text shadows using `text-shadow` alternating colors (Retro Styling)
- [x] 11. Build 12/24h toggle handler with localStorage persistence (Time Format)
- [x] 12. Implement touch event handlers with `ontouchstart/end` (Time Format)
- [x] 13. Create progress bar component with gradient background (Progress Indicator)
- [x] 14. Animate progress width using `requestAnimationFrame` (Progress Indicator)
- [x] 15. Add `touch-action: manipulation` CSS rule (Mobile Optimization)
- [x] 16. Implement viewport height lock with `window.innerHeight` (Mobile Optimization)
- [x] 17. Create share button with `fc:frame:share` SDK method (Social Sharing)
- [x] 18. Add dynamic OG image generation using Canvas API (Social Sharing)
- [ ] 19. Optimize animations with `will-change` and IntersectionObserver (Final Assembly)
- [ ] 20. Set document title and metadata using Next Head (Final Assembly)

Implementation sequence rationale:
1. Starts with core Next.js setup (1-5)
2. Adds countdown functionality (6-7)
3. Applies visual styling (8-10)
4. Implements user interactions (11-12)
5. Builds progress visualization (13-14)
6. Optimizes mobile experience (15-16)
7. Adds social features (17-18)
8. Final polish and SEO (19-20)

Each task completes a verifiable feature while maintaining dependency order. Completing all 20 will result in a fully functional application matching the specification.
