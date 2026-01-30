# Walkthrough - Performance Optimization

## Changes Overview

### 1. `src/sections/home-main/grids.tsx` (DOM Reduction)

- **Reduced Fetch Count**: Changed `fetchComments` to fetch 24 items initially (4 visual pages).
- **Infinite Scroll Implemented**:
  - Expanded `fetchComments` to support pagination.
  - Added state management (`items` list, `hasMore`, `apiPage`) to `Grids.tsx`.
  - Implemented auto-fetch trigger: when the user scrolls within 2 pages of the end, the next batch of comments is fetched and appended.
- **Restored Grid Dimension**: Adjusted `PAGE_COLS` to 2 and `PAGE_ROWS` to 3.
- **Virtualized Rendering**: Implemented a conditional check `Math.abs(pageIndex - page) <= 1`.
  - Content outside the current and adjacent pages is replaced with lightweight placeholder `div`s.
  - This drastically reduces the number of DOM nodes (`CommentTile` components) rendered at once while maintaining the scrollable layout and "snap" feel.

### 2. `src/sections/home-main/hero.tsx` (Memory Optimization)

- **Optimized Background Image**:
  - Removed the CSS `backgound-image` property from the section.
  - Implemented `next/image` with `fill`, `priority`, and `object-cover`.
  - Assigned `z-index: -10` to ensure it stays in the background.
  - This allows Next.js to serve an appropriately sized and optimized image format (WebP/AVIF), saving memory compared to the original high-res CSS background.

### 3. `src/components/youtube-playlist.tsx` (Initial Load Reduction)

- **Facade Pattern**:
  - Introduced `showVideo` state.
  - Initially renders a static placeholder with a "Play" button instead of the heavy `iframe`.
  - The YouTube `iframe` is only loaded and rendered after the user clicks the play button.
  - This saves significant bandwidth and main thread processing during initial page load.

### 4. `src/app/(frontend)/page.tsx` & `src/sections/home-main/news.tsx` (Image Optimization)

- **Page.tsx**: Replaced the standard `img` tag for the hero link with `next/image`. Configured with `width={1000} height={300}` and `w-full` style for responsiveness.
- **News.tsx**: Removed the `unoptimized` prop from the thumbnail images to leverage Next.js's built-in image optimization (resizing/compression).

## Verification Results

- **DOM Size**: Significantly reduced in the "Voice" section due to virtualization.
- **Memory**: Lowered usage by optimizing large background assets and deferring the YouTube iframe.
- **Lints**: No new critical TypeErrors introduced.
