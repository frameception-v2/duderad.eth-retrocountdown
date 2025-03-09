```markdown
# Farcaster Frame v2 Countdown Timer Specification

## 1. OVERVIEW
### Core Functionality
- Real-time countdown display targeting 5pm Friday UTC
- Retro visual theme inspired by MySpace (blinking text, animated GIF borders, neon colors)
- Persistent timer updates without page refresh
- Basic social sharing capability within Farcaster ecosystem

### UX Flow
1. User opens frame in Farcaster feed
2. Immediate full-screen timer display with retro animations
3. Continuous automatic updates every second
4. Optional: Hidden "glitch" effect on tap/click
5. Optional: Right-click context menu for sharing

## 2. TECHNICAL REQUIREMENTS
- Mobile-first responsive design (320px-768px viewports)
- CSS-only animations for performance
- Client-side timezone calculations using browser Intl API
- Frame persistence through Farcaster SDK session management
- Color palette: Hex codes #00FF00 (neon green), #FF00FF (hot pink), #0000FF (electric blue)

## 3. FRAMES v2 IMPLEMENTATION
### Interactive Elements
- Animated progress bar using CSS gradients
- Cursor-trailing effect for desktop hover states
- Tap-sensitive "screen flicker" effect on mobile
- Custom scrollbar styling for metadata panel

### Input Handling
- Touch/click anywhere to toggle 12/24hr time format
- Long-press to show raw timestamp data
- Vertical swipe to reveal credits/attribution

### Sharing Features
- SDK-powered "Share This Timer" button
- Auto-generated OG image with remaining time
- Deep link preservation of timer state

## 4. MOBILE CONSIDERATIONS
### Responsive Techniques
- Viewport-relative units (vmin/vmax) for text scaling
- CSS media queries for orientation changes
- Dynamic image loading based on DPI
- Touch target minimum size of 48x48px

### Touch Patterns
- Horizontal swipe to cycle through color themes
- Pinch-zoom prevention for timer focus
- Haptic feedback on major interactions
- Soft keyboard avoidance strategies

## 5. CONSTRAINTS COMPLIANCE
### Storage
- LocalStorage for user preference persistence
- SessionStorage for temporary interaction states
- No cross-device sync requirements

### Infrastructure
- Zero backend dependencies
- Static hosting via Vercel/Next.js
- All assets bundled locally
- No authentication requirements

### Scope
- Single-frame implementation
- No blockchain interactions
- No smart contract requirements
- No third-party API calls
- Progressive enhancement approach
```