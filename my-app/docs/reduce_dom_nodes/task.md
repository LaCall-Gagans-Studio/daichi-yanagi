# DOM Node Reduction for iOS Performance

## Goal

Reduce the number of DOM nodes to improve performance on iOS Safari, specifically targeting hidden but mounted elements.

## Issues Identified

1.  **Hidden PC Components**: `HomeGrids` component was hidden via CSS (`hidden lg:block`) but still fully rendered and fetching data on mobile devices.
2.  **Inactive Tab Content**: The `Policy` section likely kept inactive tab content in the DOM (or at least the structure), contributing to node count.

## Actions

1.  **Conditional Rendering for PC Grid**: Implement a `useMediaQuery` hook to detect mobile viewports and completely prevent the `HomeGrids` component from mounting on mobile.
2.  **Optimized Tab Rendering**: Refactor the `Policy` component to strictly render only the active tab's content, removing inactive tabs from the DOM entirely.
