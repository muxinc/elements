<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	// this prevents the custom elements from being redefined when the REPL is updated and reloads, which throws an error
	// this means that any changes to the custom element won't be picked up without saving and refreshing the REPL
	// const oldRegister = customElements.define;
	// customElements.define = function(name, constructor, options) {
	// 	if (!customElements.get(name)) {
	// 		oldRegister(name, constructor, options);
	// 	}
	// }
	// import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(async () => {
		await import('@mux/mux-player');
	});
</script>

<!-- Test attributes
      style="aspect-ratio: 16 / 10"
      primary-color="#5c6ac4"
      secondary-color="#ecc94b"
      playback-id="xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE"
      poster="https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0"
      src="https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8"
      muted
      volume="0.4"
      playbackrate="2"
      forward-seek-offset="10"
      backward-seek-offset="10"
     -->

<mux-player
	playback-id="g65IqSFtWdpGR100c2W8VUHrfIVWTNRen"
	env-key="5e67cqdt7hgc9vkla7p0qch7q"
	metadata-video-id="video-id-54321"
	metadata-video-title="Svelte Kit: Episode 2"
	metadata-viewer-user-id="user-id-sveltekit007"
	stream-type="on-demand"
/>
<a sveltekit:prefetch href="/">Browse Elements</a>
