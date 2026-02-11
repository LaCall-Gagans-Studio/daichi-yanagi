# DonationChart Refactor Walkthrough

## Goal

To transform the basic Sankey chart into a professional, high-quality visualization suitable for displaying political fund flows, with a focus on **mobile-first usability** and trust-evoking design.

## Changes

### 1. Visual Design Overhaul

- **Layout**: Implemented a **mobile-first responsive design** that works perfectly even in narrow columns on laptops.
  - **Margins**: Extremely tight (`10px`) to maximize data display area.
  - **Aspect Ratio**: Taller (`4:5`) to act more like a list, suitable for vertical scrolling contexts.
- **Header Design**: Redesigned the header with a **modern card style** featuring a dark gradient background.
  - **Dual Totals**: Displays both **Total Amount** (e.g., ¥5,000万) and **Total Persons** (e.g., 1,500人).
  - **Toggle Control**: Added a switch to toggle the entire chart between **Amount Base** (金額) and **Count Base** (人数).
- **Color Palette**: Adopted a semantic color scheme:
  - **Source (Nationality)**: Blue/Green tones (Trust, Stability)
  - **Middle (Area)**: Neutral/Bridge tones (Gray, Purple)
  - **Target (Occupation)**: Orange/Red tones (Impact, Distribution)
- **Node Styling**: Thinner nodes (`12px`) with rounded corners and drop shadows.
- **Label Logic (Mobile Optimized)**:
  - **Source**: Text inside or very close to left.
  - **Middle**: Text above/center.
  - **Target**: Text inside or very close to right.
  - **Font Size**: Reduced to `11px` for better fit.
  - **Filtering**: Aggressively hides labels for tiny values (< 2%) or very short nodes (< 12px) to prevent clutter.

### 2. Data Processing Logic

- **Filtering**: Automatically excludes records with 0 or invalid amounts.
- **Sorting**: Nodes are now sorted by total value in **descending order**, with "**Other (その他)**" always placed at the bottom.
- **Grand Total**: Calculated the total donation amount and displayed it prominently at the top.

### 3. Interactive Elements

- **Tooltip**: Redesigned with a cleaner, card-like appearance, showing precise flow details (Source → Target).
- **Responsiveness**: The chart layout is now strictly optimized for narrow widths, ensuring no horizontal scroll is needed even in constrained grids.

## Verification Results

### Manual Verification

- [x] **Chart Rendering**: Confirmed chart renders without errors.
- [x] **Sorting**: Validated that categories with higher amounts appear at the top.
- [x] **Filtering**: Confirmed 0 values are not shown.
- [x] **Responsive**: Chart adjusts to container width (labels position triggers based on width).

## Next Steps

- Connect to real API instead of CSV if needed.
- Add more granular filters (e.g., Year) if dataset grows.
