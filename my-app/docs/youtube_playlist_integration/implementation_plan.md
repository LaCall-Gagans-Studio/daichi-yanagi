# Implementation Plan - YouTube Playlist Integration

## Goal

Add a YouTube playlist embed to the application in two specific locations based on device view, as requested by the user.

## User Review Required

- **Placement**: Mobile (below HeroNotice) and Desktop (above HomeLinks).
- **Text**: Both will display "SNSで情報発信中！".

## Proposed Changes

### Components

#### [NEW] `src/components/youtube-playlist.tsx`

- Create a new component `YouTubePlaylist`.
- Arguments: `className` (optional).
- Content:
  - Header: `<h3>SNSで情報発信中！</h3>` (styled appropriately).
  - Iframe:
    ```html
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/videoseries?si=T5j_dpWLsWZkReTh&amp;list=PLrqNIJBpFYrG1FHKO3x3-cyQqzdlwtIrj"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    ```
  - Styling: Wrapper div to make iframe responsive (aspect ratio).

### Pages & Layouts

#### [MODIFY] `src/app/(frontend)/page.tsx`

- Import `YouTubePlaylist`.
- Insert `<YouTubePlaylist />` immediately after `<HeroNotice />`.
- Add class `lg:hidden` to the component or wrapper to hide on desktop.

#### [MODIFY] `src/app/(frontend)/layout.tsx`

- Import `YouTubePlaylist`.
- Insert `<YouTubePlaylist />` inside `<div id="home-links">` before `<HomeLinks />`.
- Since `<div id="home-links">` already has `hidden lg:block`, the embed will automatically be desktop-only.

## Verification Plan

### Manual Verification

1.  **Mobile View**:
    - Open the site in a mobile emulator or narrow window (< 1024px).
    - Verify "SNSで情報発信中！" and the YouTube playlist appear directly below the "HPにて皆様の声を募集中！" (HeroNotice) card.
    - Verify it is NOT visible in the right sidebar (sidebar should be hidden).

2.  **Desktop View**:
    - Open the site in a wide window (>= 1024px).
    - Verify the "SNSで情報発信中！" and YouTube playlist appear in the right sidebar, above the social links.
    - Verify the mobile embed (center column) is HIDDEN. (Wait, I need to ensure it is hidden. `lg:hidden` on the mobile instance should handle this).

3.  **Responsiveness**:
    - Resize window to check transition point.
    - Ensure iframe fits width correctly in both locations.
