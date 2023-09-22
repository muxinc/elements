# Upgrading Mux Player from v1.x.x to v2.x.x

Version 2 of Mux Player introduces a new default theme that comes with a couple key differences to be aware of when upgrading.

## Colors

In the previous version there were two main options for controlling the overall colors of controls and UI elements.

- **Primary color** - Affects the color of icons and text
- **Secondary color** - Affects the background color of controls

In the new theme we have introduced a third option: **Accent color**.

Accent color mostly affects interactions, like a button background color on hover. It's also used for the time range progress bar background showing how much of a video has been viewed.

You can override the accent color using a new CSS variable:

```css
mux-player {
	--media-accent-color: lime;
}
```

## Pre-playback UI

Before a video is played, a large central play button is now shown on the video instead of the control bar along the bottom. This is a more obvious call-to-action for the user and the control bar will show immediately after the video starts playing. You don't have to do anything for this when upgrading but as it's a core change in how the player works we wanted to highlight it here.

## Stream type property no longer required

In the previous version you needed to specify the stream type of a video like this:

```html
<mux-player
	playback-id="..."
	stream-type="on-demand"
></mux-player>
```

This is no longer required as the stream type will be automatically derived by the player. You can remove this property after upgrading.

## Upgrading to Mux Player V2 while keeping the old theme

The old theme is still available if you have a need to use it while still upgrading the player.

You can import it like this:

```javascript
import "@mux/mux-player/themes/classic";
```

and...

### Using the web component

```html
<mux-player theme="classic"></mux-player>
```

### Or with React

```javascript
const MyComponent = () => {
	return <MuxPlayer theme="classic"></MuxPlayer>
}
```