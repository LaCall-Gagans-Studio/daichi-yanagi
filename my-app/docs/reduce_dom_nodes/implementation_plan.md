# Implementation Plan - Reduce DOM Nodes

## 1. Create `useMediaQuery` Hook

- **File**: `src/hooks/use-media-query.ts`
- **Purpose**: To detect screen usage (desktop vs mobile) in React components.
- **Implementation**: Standard `matchMedia` listener implementation.

## 2. Refactor `HomeGrids` (PC Grid)

- **File**: `src/sections/home-grids.tsx`
- **Action**:
  - Import `useMediaQuery`.
  - Check for `(min-width: 1024px)`.
  - If false, return `null` immediately (preventing render).
  - Prevents data fetching on mobile by making the `useEffect` dependent on the desktop state.

## 3. Refactor `Policy` Section

- **File**: `src/sections/home-main/policy.tsx`
- **Action**:
  - Convert `Tabs` to a controlled component using `activeTab` state.
  - Manually conditionally render `TabsContent`.
  - `if (theme.id !== activeTab) return null` inside the map loop.
  - Ensure only 1 tab content panel is in the DOM at any time.

## 4. Verification

- Verify that `HomeGrids` does not render on mobile views.
- Verify that only the active tab in `Policy` is in the DOM.
