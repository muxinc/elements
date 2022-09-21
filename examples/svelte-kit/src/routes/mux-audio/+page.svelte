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
		await import('@mux/mux-audio');
	});
</script>

<svelte:head>
	<style>
		mux-audio {
			width: 100%;
			margin: 1rem 0 2rem;
		}
	</style>
</svelte:head>

<mux-audio
	playback-id="vDpm5ygrRJgfIEPNIc02IJR4Trf3z00AiP"
	metadata-video-id="episode-id-12345"
	metadata-video-title="Podcast: Episode 3"
	metadata-viewer-user-id="user-id-6789"
	muted
	controls
></mux-audio>

<a data-sveltekit-prefetch href="/">Browse Elements</a>
