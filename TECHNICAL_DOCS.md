# CONSTANCE - Matcha Teahouse Digital Flagship

A high-end, award-winning "Story First" digital flagship site for a matcha teahouse in San Francisco, built with React, GSAP ScrollTrigger, and Lenis smooth scroll.

## 🎨 Design Philosophy

**Stone-themed Aesthetic** - Warm whites (#faf9f7) and stone greys (#f5f3f0) create an earthy, premium feel inspired by traditional Japanese tea ceremony spaces.

**Cinematic Storytelling** - Six distinct chapters guide visitors through the matcha journey from source to sanctuary, each with unique scroll-triggered animations.

## 🏗️ Architecture

### Tech Stack
- **React 18** - Component-based UI framework
- **Vite** - Fast build tool and dev server
- **GSAP ScrollTrigger** - Pin-based scroll orchestration
- **Lenis** - Buttery smooth scroll momentum
- **Tailwind CSS v4** - Utility-first styling
- **Motion (Framer Motion)** - Additional animations
- **TypeScript** - Type-safe development

### Project Structure
```
/src/app/
  ├── App.tsx                 # Main app with Lenis integration
  ├── data.json              # Headless-ready content structure
  ├── components/
  │   ├── Chapter1.tsx       # The Portal (video scrubbing)
  │   ├── Chapter2.tsx       # The Reveal (parallax text)
  │   ├── Chapter3.tsx       # Transformation (particle system)
  │   ├── Chapter4.tsx       # Precision (SVG line drawing)
  │   ├── Chapter5.tsx       # Connection (image collage)
  │   ├── Chapter6.tsx       # The Sanctuary (footer integration)
  │   ├── Navigation.tsx     # Fixed nav with progress bar
  │   └── LoadingScreen.tsx  # Initial loading animation
  ├── hooks/
  │   └── useDevice.ts       # Mobile/desktop detection
  └── styles/
      ├── theme.css          # Stone palette CSS variables
      └── index.css          # Hardware acceleration rules
```

## 📖 Chapter Breakdown

### Chapter 1: The Portal
- **Technique**: Pinned for 300% scroll with video currentTime scrubbing
- **Effect**: Text blurs and fades while zooming into darkness
- **Inspiration**: Adaline.ai "portal" aesthetic

### Chapter 2: The Reveal
- **Technique**: Portal scale effect + text parallax
- **Effect**: Landscape emerges from darkness, text drifts upward
- **Copy**: "Straight from Uji, Japan... pure expression of soil"

### Chapter 3: Transformation
- **Technique**: Canvas-based particle system linked to scroll velocity
- **Effect**: Green matcha particles swirl and fall faster with scroll speed
- **Visual**: Macro photography focus with stone texture overlay

### Chapter 4: Precision
- **Technique**: SVG path drawing with stroke-dasharray animation
- **Effect**: Blueprint schematic "draws" as you scroll
- **Feature**: Glassmorphic floating card for "High-mountain Oolong"

### Chapter 5: Connection
- **Technique**: Stacked image collage with rotation
- **Effect**: Black & white editorial photos slide over each other
- **CTA**: Glowing "Join Our Team" button

### Chapter 6: The Sanctuary
- **Technique**: Pin release into standard footer
- **Effect**: Soft focus interior shot transitions to contact info
- **Location**: 3512 Balboa St, San Francisco

## ⚡ Performance Optimizations

### Hardware Acceleration
```css
video {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}
```

### Lenis Integration
- Smooth scroll disabled on touch devices (smoothTouch: false)
- GSAP ticker integration for synchronized animations
- Lag smoothing set to 0 for 60fps consistency

### Responsive Strategy
- **Desktop**: Full pin-based ScrollTrigger animations
- **Mobile**: Standard vertical scroll with entrance animations
- **Detection**: Window width < 768px threshold

## 🔧 Configuration

### GSAP ScrollTrigger Defaults
```typescript
scrollTrigger: {
  trigger: section,
  start: 'top top',
  end: '+=200%',  // Adjustable per chapter
  pin: true,
  scrub: 1,
  anticipatePin: 1,
}
```

### Lenis Smooth Scroll
```typescript
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});
```

## 📦 Data Structure (Headless-Ready)

The `data.json` file contains all content, making it easy to integrate with:
- Headless Shopify
- Contentful
- Sanity
- WordPress REST API

```json
{
  "brand": { "name", "tagline", "location" },
  "chapters": [
    { "id", "title", "subtitle", "headline", "description", "videoUrl" }
  ],
  "contact": { "address", "city", "state", "zip", "email", "phone" }
}
```

## 🎯 Key Features

✅ **Pin-based scroll orchestration** - Each chapter uses `pin: true`  
✅ **Video scrubbing** - Scroll controls video playback in Chapter 1  
✅ **Particle physics** - Canvas-based matcha powder simulation  
✅ **SVG path drawing** - Animated blueprint in Chapter 4  
✅ **Glassmorphic UI** - Backdrop blur cards  
✅ **Progress bar** - Top navigation tracks scroll position  
✅ **Loading animation** - Branded entrance experience  
✅ **Hardware accelerated** - translateZ(0) for 60fps  
✅ **Mobile responsive** - Adaptive scroll behavior  

## 🚀 Next Steps

### Phase 2 Enhancements
- [ ] Headless Shopify integration for product catalog
- [ ] Shopping cart with Shopify Buy SDK
- [ ] Advanced mobile gestures (swipe between chapters)
- [ ] WebGL matcha particle system (Three.js)
- [ ] Audio ambience (tea pouring sounds)
- [ ] Accessibility improvements (reduced motion preference)
- [ ] Multi-language support (EN, JP)

### Performance Monitoring
- Consider adding Lighthouse CI for performance tracking
- Monitor Core Web Vitals (LCP, FID, CLS)
- Implement lazy loading for video assets

## 📱 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Note**: ScrollTrigger pinning may have reduced performance on older mobile devices. Consider feature detection for pin: false fallback.

---

**Built with ❤️ for CONSTANCE Matcha Teahouse**
