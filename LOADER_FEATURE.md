# Loader Feature

## Overview

Website sekarang memiliki loading screen yang muncul saat pertama kali dibuka.

## Features

### 1. **Animated Loader** 🎬
- Percentage counter (0-100)
- Animated progress bar
- "Loading Portfolio" text
- Smooth slide-up animation

### 2. **Smart Loading** 🧠
- Hanya muncul sekali per session
- Menggunakan `sessionStorage` untuk tracking
- Tidak muncul lagi saat refresh/navigasi dalam session yang sama
- Reset saat browser ditutup atau tab baru dibuka

### 3. **Smooth Transitions** ✨
- Loader slides up dengan GSAP animation
- Content fades in setelah loader selesai
- Duration: ~2 detik total

## How It Works

### Initial Load:
1. User membuka website
2. Loader muncul dengan percentage 0%
3. Percentage naik secara random hingga 100%
4. Setelah 2 detik, loader slide up
5. Content fade in
6. `sessionStorage` menyimpan flag "hasSeenLoader"

### Subsequent Loads (Same Session):
1. User refresh atau navigasi
2. Check `sessionStorage` untuk "hasSeenLoader"
3. Jika ada, skip loader
4. Content langsung muncul

### New Session:
1. User tutup browser atau buka tab baru
2. `sessionStorage` cleared
3. Loader muncul lagi

## Customization

### Timing:
Edit `components/sections/Loader.tsx`:

```typescript
// Loading speed
const iv = setInterval(() => {
  n += Math.random() * 15  // Increase for faster loading
}, 60)  // Decrease for faster updates

// Total duration
const t = setTimeout(() => {
  // ...
}, 2000)  // Change total duration (milliseconds)
```

### Animation:
```typescript
gsap.to(ref.current, {
  yPercent: -100,
  duration: 0.8,  // Slide up duration
  ease: 'power3.inOut',  // Easing function
})
```

### Disable Session Storage:
Edit `app/page.tsx`:

Remove these lines to show loader on every page load:
```typescript
// Remove this useEffect
useEffect(() => {
  const hasSeenLoader = sessionStorage.getItem('hasSeenLoader')
  if (hasSeenLoader) {
    setLoading(false)
    setShowContent(true)
  }
}, [])

// Remove this line
sessionStorage.setItem('hasSeenLoader', 'true')
```

## Styling

Loader styles in `app/portfolio.css`:

```css
.loader {
  position: fixed;
  inset: 0;
  background: var(--black);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.loader-pct {
  font-family: var(--font-display);
  font-size: 5rem;
  color: var(--white);
  line-height: 1;
}

.loader-bar-wrap {
  width: 200px;
  height: 1px;
  background: rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}

.loader-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: var(--red);
  animation: loadBar 2s ease-in-out forwards;
}

.loader-text {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(245,240,235,0.3);
}
```

## Testing

### Test Loader:
1. Open website in incognito/private mode
2. Loader should appear
3. Wait for completion
4. Refresh page - loader should NOT appear
5. Close tab and open new one - loader should appear again

### Test Without Loader:
1. Open website normally
2. If you've seen it before, it won't show
3. Clear session storage in DevTools:
   - F12 → Application → Session Storage → Clear
4. Refresh - loader should appear

## Performance

- Loader adds ~2 seconds to initial load time
- No impact on subsequent page loads
- Minimal JavaScript overhead
- GSAP animation is GPU-accelerated

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 not supported (uses sessionStorage)

## Troubleshooting

### Loader doesn't appear:
- Check if `sessionStorage` has "hasSeenLoader"
- Clear session storage and refresh
- Check browser console for errors

### Loader stuck:
- Check if GSAP is loaded
- Verify `onDone` callback is called
- Check browser console for errors

### Content doesn't appear:
- Check React state updates
- Verify fade-in transition
- Check browser console for errors
