# Donation Visualization Walkthrough (Sankey Diagram)

I have updated the donation visualization to use a Sankey Diagram, illustrating the flow of donations from **Nationality** to **Occupation** and then to **Area**.

## Changes

### 1. Updated Component: `DonationChart`

- **Logic Change**: Removed time-series aggregation. Implemented logic to aggregate donation amounts between:
  - Nationality -> Occupation
  - Occupation -> Area
- **Visualization**: Switched from `AreaChart` to `Sankey` component from `recharts`.
- **Styling**:
  - Custom colors for nodes.
  - Custom SVG `Rectangle` rendering for nodes.
  - Custom tooltip showing the source, target, and amount of the flow.

### 2. Data Processing

- Extracted unique `nationality`, `occupation`, and `area` values to create nodes.
- Calculated link values based on summed donation amounts for each connection.

## Verification Results

### Automated Tests

- Lint checks passed (addressed `any` type usage).

### Manual Verification

- [ ] **Flow**: Verify that links correctly connect Nationalities to Occupations, and Occupations to Areas.
- [ ] **Amounts**: Check if the thickness of links roughly corresponds to the donation amounts.
- [ ] **Tooltips**: Hover over links to ensure they show correct "Source -> Target: Amount" information.
- [ ] **Responsiveness**: Ensure the chart resizes correctly within the container.
