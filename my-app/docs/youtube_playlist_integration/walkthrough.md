# Walkthrough - YouTube Playlist Integration

I have integrated the YouTube playlist embed as requested.

## Changes

### 1. New Component: `YouTubePlaylist`

Created `src/components/youtube-playlist.tsx`.

- Wraps the YouTube iframe in a responsive container (`aspect-video`).
- Includes the header "SNSで情報発信中！".

### 2. Mobile Embed

Modified `src/app/(frontend)/page.tsx`.

- Inserted `<YouTubePlaylist />` below the `HeroNotice` component.
- Applied `lg:hidden` class so it only appears on mobile/tablet views.

### 3. Desktop Embed

Modified `src/app/(frontend)/layout.tsx`.

- Inserted `<YouTubePlaylist />` content inside the `#home-links` container.
- Changed `#home-links` display to `hidden lg:flex` (from `lg:block`) to stack the playlist above the sns links.
- Styled the desktop version to use white text for the header to match the blue background.

## Verification Results

### Automated Verification

- **Browser Check**: Attempted but failed due to local environment configuration.

### Manual Verification Required

Please check the following:

1.  **Mobile**: Verify the playlist appears below the "HPにて皆様の声を募集中！" card.
2.  **Desktop**: Verify the playlist appears in the right sidebar, above the social links icon grid.
