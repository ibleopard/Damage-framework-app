# Responsive Design Best Practices & Checklist

## Quick Reference: Common Responsive Patterns

### Pattern 1: Stacked Layout (Mobile) → Row Layout (Desktop)

```jsx
{/* Base: Flex column (stacked) */}
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Pattern 2: Grid with Responsive Columns

```jsx
{/* 1 col mobile, 2 col tablet, 3 col desktop */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

### Pattern 3: Full-Width Mobile Button, Auto Width Desktop

```jsx
<button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
  Action
</button>
```

### Pattern 4: Hide on Mobile, Show on Desktop

```jsx
{/* Desktop only */}
<div className="hidden md:block">
  <DesktopView />
</div>

{/* Mobile only */}
<div className="md:hidden">
  <MobileView />
</div>
```

### Pattern 5: Responsive Typography

```jsx
<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
  Heading
</h1>

<p className="text-xs sm:text-sm md:text-base leading-relaxed md:leading-7">
  Body text
</p>
```

---

## Do's and Don'ts

### ✅ DO

- **Start with mobile-first CSS** - Base styles for mobile, add `sm:`, `md:` for enhancements
- **Use fluid widths** - `w-full`, `max-w-*`, percentage-based layouts
- **Test on real devices** - Emulators don't catch all issues
- **Use semantic HTML** - `<nav>`, `<main>`, `<article>`, `<section>`
- **Provide touch-friendly targets** - Minimum 44×44px tap areas
- **Use responsive images** - Scale images appropriately for screen size
- **Optimize performance** - Load only necessary CSS/JS per device
- **Test keyboard navigation** - Tab through all interactive elements
- **Maintain adequate spacing** - Don't cram content on mobile
- **Use font size properly** - Base 16px, adjust with `sm:`, `md:`, etc.

### ❌ DON'T

- **Use fixed pixel widths** - ❌ `w-500px` → ✅ `w-full max-w-md`
- **Forget the viewport meta tag** - Must be in HTML `<head>`
- **Stack responsive classes deeply** - Leads to CSS bloat
- **Create tiny touch targets** - Users can't tap them on mobile
- **Ignore landscape orientation** - Test portrait AND landscape
- **Hide content with `display: none`** - May affect SEO
- **Use `@media max-width`** - Use `sm:`, `md:` prefixes instead (mobile-first)
- **Rely only on breakpoints** - Consider content-based breakpoints too
- **Skip accessibility testing** - Responsive ≠ Accessible
- **Assume fixed screen sizes** - Content should adapt fluidly

---

## Prevention Checklist

Before committing code, verify:

### Layout & Structure
- [ ] Layout works on 375px (smallest phone)
- [ ] Layout works on 1920px (large desktop)
- [ ] No horizontal scrolling (except intentional)
- [ ] Content hierarchy clear on all sizes
- [ ] Proper use of semantic HTML

### Spacing & Alignment
- [ ] Padding scales: `p-4 sm:p-6 md:p-8`
- [ ] Margins are consistent across breakpoints
- [ ] No gaps larger than necessary
- [ ] Centered content uses `mx-auto`
- [ ] Spacing looks intentional, not accidental

### Typography
- [ ] Text is readable at all sizes (min 16px on mobile)
- [ ] Line-height is adequate (`leading-relaxed` or more)
- [ ] Contrast ratio ≥ 4.5:1 for body text
- [ ] Headings scale with `text-sm sm:text-base md:text-lg`
- [ ] Text doesn't overflow containers

### Images & Media
- [ ] Images scale with `w-full h-auto`
- [ ] Aspect ratios maintained with `.aspect-*`
- [ ] No stretching or distortion
- [ ] Images optimize for mobile
- [ ] Alt text provided for all images

### Navigation & Interaction
- [ ] Buttons/links have min 44px height
- [ ] Touch targets have adequate spacing
- [ ] Hover states work on desktop
- [ ] Mobile menu is accessible
- [ ] Focus rings visible for keyboard users
- [ ] No overlapping interactive elements

### Forms
- [ ] Input fields full-width on mobile
- [ ] Labels clear and associated with inputs
- [ ] Error messages clearly visible
- [ ] Form submits successfully on mobile
- [ ] Keyboard input doesn't zoom page on iOS

### Tables
- [ ] Tables show card-based layout on mobile (not hidden)
- [ ] Essential data visible on all screen sizes
- [ ] No horizontal scrolling in tables
- [ ] Header row sticky or clearly marked

### Performance
- [ ] Page loads < 3 seconds on mobile 4G
- [ ] No layout shift on load (CLS < 0.1)
- [ ] Viewport meta tag present
- [ ] CSS is optimized (Tailwind purge is working)
- [ ] Images are optimized

---

## Responsive Component Template

Use this as a template when creating new responsive components:

```jsx
import { useIsMobile } from '@/components/ui/use-mobile';

export function ResponsiveComponent() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Title
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          Description
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Items */}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3">
          Primary
        </button>
        <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3">
          Secondary
        </button>
      </div>
    </div>
  );
}
```

---

## CSS Grid vs Flexbox Decision Tree

### Use CSS Grid when:
- 2D layout (rows AND columns matter)
- Complex template layout
- Dashboard-like layouts
- Precise alignment needed
- Fewer items (typically < 20)

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Use Flexbox when:
- 1D layout (row or column)
- Dynamic number of items
- Navigation/lists
- Form layouts
- Alignment (centering, spacing between)

```jsx
<div className="flex flex-col sm:flex-row gap-4">
```

---

## Mobile Optimization Techniques

### 1. Progressive Enhancement
Start with basic functionality, enhance with JavaScript

```jsx
// Basic: Works without JS
<form action="/submit" method="POST">
  <input type="text" required />
  <button type="submit">Submit</button>
</form>

// Enhanced with React/JS
import { useState } from 'react';

export function EnhancedForm() {
  const [loading, setLoading] = useState(false);
  // ...
}
```

### 2. Responsive Images
```jsx
// Simple responsive
<img src="image.jpg" alt="..." className="w-full h-auto" />

// Advanced with srcset
<img
  src="image-400.jpg"
  srcSet="
    image-400.jpg 400w,
    image-600.jpg 600w,
    image-1000.jpg 1000w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="..."
  className="w-full h-auto"
/>
```

### 3. Touch-Friendly Design
```jsx
// Minimum 44px tap target
<button className="min-h-11 min-w-11 px-4 py-3">
  Tap me
</button>

// Adequate spacing between
<div className="flex flex-col gap-3">
  <button className="min-h-11">Action 1</button>
  <button className="min-h-11">Action 2</button>
</div>
```

### 4. Avoid Mobile Pitfalls
```jsx
// ❌ DON'T: Hover-only interactions
a:hover { text-decoration: underline; }

// ✅ DO: Include active/tap states
@media (hover: hover) {
  a:hover { text-decoration: underline; }
}

// ❌ DON'T: Fixed-width containers
<div style={{width: '500px'}}>

// ✅ DO: Fluid layouts
<div className="w-full max-w-2xl">

// ❌ DON'T: Tiny font sizes
<p className="text-xs">Important info</p>

// ✅ DO: Readable sizes (min 16px on mobile)
<p className="text-sm sm:text-base">Important info</p>
```

---

## Debugging Responsive Issues

### Chrome DevTools
1. Press `F12` to open DevTools
2. Click "Toggle device toolbar" icon (or `Ctrl+Shift+M`)
3. Select device or set custom dimensions
4. Check responsive behavior
5. Inspect individual elements

### Testing Viewports
- 320px (iPhone SE)
- 375px (iPhone X)
- 390px (iPhone 14)
- 430px (iPhone 15 Pro Max)
- 540px (Galaxy S21)
- 768px (iPad)
- 1024px (iPad Pro)
- 1200px (Desktop)
- 1920px (Large desktop)

### Common Debugging Steps
1. Check if `<meta name="viewport">` is present
2. Open DevTools and toggle device mode
3. Check CSS specificity isn't breaking styles
4. Verify Tailwind classes are being applied
5. Check for overflow with `outline: 1px solid red;`
6. Test zoom functionality (should work on iOS/Android)
7. Print media queries and test print view

---

## Performance Monitoring

### Metric Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 600ms

### Tools
- Google Chrome Lighthouse
- WebPageTest
- GTmetrix
- Vercel Analytics

---

## Maintaining Responsive Code

### Code Review Checklist For Reviewers
- [ ] Mobile-first approach used
- [ ] No fixed pixel widths
- [ ] Responsive classes all present
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scrolling
- [ ] Works on 5 different viewports
- [ ] Accessibility maintained
- [ ] Performance acceptable

### Git Commit Message Template
```
feat: add responsive mobile navigation

- Implement hamburger menu for screens < 768px
- Use drawer pattern with overlay
- Closes on route change
- Tested on iPhone SE, Galaxy S21, iPad
```

---

## Related Files

- Component styles: `src/styles/responsive.css`
- Utility functions: `src/app/utils/responsive.ts`
- Mobile detection: `src/app/components/ui/use-mobile.ts`
- Layout pattern: `src/app/components/Layout.tsx`

---

**Version:** 1.0
**Last Updated:** April 14, 2026
