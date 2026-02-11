# Donation Visualization Refactor Plan

## Goal Description

Transform `DonationChart.tsx` into a professional, high-quality Sankey diagram visualizing donation flows. Key improvements include enhanced styling, data sorting, value filtering, and a grand total display.

## User Review Required

- Color palette selection: Using a professional "Trust & Stability" theme (Deep Blues, Greens, muted accents).

## Proposed Changes

### Components

#### [MODIFY] [DonationChart.tsx](file:///c:/Users/Tohma/Dev/daichi-yanagi/my-app/src/components/ui/DonationChart.tsx)

- **Styling:**
  - Increase `nodeWidth` to 20px.
  - Update `COLORS` constant to a professional palette (e.g., `#264653`, `#2a9d8f`, `#e9c46a`, etc.).
  - Implement custom `node` renderer:
    - Labels placed _outside_ nodes (Left for source, Right for target).
    - Display Name, Value, and %.
    - Prevent label overlap.

- **Data Parsing (`processData`):**
  - Filter out 0 amounts.
  - Calculate `GrandTotal`.
  - Sort nodes by total value (Descending) to minimize link crossing and improve readability.

- **Interaction:**
  - Custom Tooltip showing rich details (Source → Target: Amount).

- **Layout:**
  - Add header with `GrandTotal`.
  - Ensure responsiveness within container.

## Verification Plan

### Manual Verification

- Verify chart renders with new colors and thicker nodes.
- Confirm nodes are sorted by value.
- Confirm 0 value links are hidden.
- Check tooltips on hover.
- Check label positioning (outside nodes).
- Resize window to checking responsiveness.
