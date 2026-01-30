# Implementation Plan - Performance Optimization

## 1. Optimize `src/sections/home-main/grids.tsx`

- **Goal**: Reduce DOM nodes by virtually rendering slider pages.
- **Changes**:
  - Change `fetchComments(120)` to `fetchComments(24)`.
  - In the `pages.map` loop, check if `Math.abs(pageIndex - page) <= 1`.
  - If true, render the actual content.
  - If false, render a placeholder `div` with `aspect-square` class to maintain layout without heavy DOM elements.

## 2. Optimize `src/sections/home-main/hero.tsx`

- **Goal**: Reduce memory usage by optimizing background image.
- **Changes**:
  - Import `Image` from `next/image`.
  - Remove `bg-[url(/hero_bg_3.webp)]` class from the section.
  - Insert `<Image src="/hero_bg_3.webp" alt="hero background" fill priority className="object-cover object-bottom -z-10" />` as the first child of the section.

## 3. Optimize `src/components/youtube-playlist.tsx`

- **Goal**: Delay iframe loading until user interaction.
- **Changes**:
  - Create state `showVideo` (boolean).
  - Render a placeholder div with a "Play" button/icon initially.
  - On click, set `showVideo(true)` and render the definition `iframe`.

## 4. Optimize Images in `page.tsx` and `news.tsx`

- **Goal**: Use `next/image` for optimization.
- **Changes**:
  - `src/app/(frontend)/page.tsx`: Import `heroLink` from `../../public/hero_link.png` (or use robust path) and replace `img` tag with `Image`. If static import fails, use fixed dimensions/style.
  - `src/sections/home-main/news.tsx`: Remove `unoptimized` prop from `Image` component. Ensure dimensions are correct.

## Verification

- Verify build success.
- Verify no TypeScript errors.
- Verify visual consistency (layout check).
