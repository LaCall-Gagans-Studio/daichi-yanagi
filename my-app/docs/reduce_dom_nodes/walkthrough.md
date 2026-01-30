# Walkthrough - DOM Node Reduction

These changes were made to significantly reduce the DOM size on mobile devices, addressing the iOS Safari crash/lag issues.

## 1. Responsive Conditional Rendering (`src/sections/home-grids.tsx`)

The PC-only grid component `HomeGrids` was previously hidden using CSS classes (`hidden lg:block`), meaning it was still present in the DOM and fetching data on mobile.

**Change:**

- Added a check using `useMediaQuery('(min-width: 1024px)')`.
- If the device is not desktop, the component returns `null` and skips data fetching.

```tsx
const isDesktop = useMediaQuery('(min-width: 1024px)')

useEffect(() => {
  if (!isDesktop) return
  // ... fetch data
}, [isDesktop])

if (!isDesktop) return null
```

## 2. Active Tab Only Rendering (`src/sections/home-main/policy.tsx`)

The Policy section uses tabs. Previously, all tab contents might have been rendered (or relied on library behavior). To ensure minimal DOM usage, we enforced conditional rendering.

**Change:**

- Lifted tab state to `activeTab` using `useState`.
- In the `TabsContent` loop, we added an explicit check:

```tsx
{themes.map((theme) => {
  if (theme.id !== activeTab) return null // Completely remove from DOM
  return <TabsContent ... />
})}
```

## 3. New Hook (`src/hooks/use-media-query.ts`)

Created a reusable hook for media queries to support the above feature.

```tsx
export function useMediaQuery(query: string): boolean {
  // ... implementation using window.matchMedia
}
```
