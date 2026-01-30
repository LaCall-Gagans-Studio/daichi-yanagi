# Performance Optimization Task

## Context

The project is experiencing crashes on iOS Safari due to high DOM node count (7000+) and memory pressure. Optimizations are required to reduce DOM nodes, memory usage, and initial load time.

## Objectives

1.  **Reduce DOM Nodes in `Grids.tsx`**: Implement virtualization/conditional rendering for the comment slider.
2.  **Optimize Memory in `Hero.tsx`**: Replace CSS background image with optimized `next/image`.
3.  **Reduce Initial Load in `YouTubePlaylist.tsx`**: Implement lazy loading (Facade pattern) for the YouTube iframe.
4.  **Optimize Images**: Use `next/image` in `page.tsx` and `news.tsx`.

## Constraints

- No design changes.
- Use existing libraries (shadcn/ui, lucide-react).
- No TypeScript errors.
