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
		await import('@mux/mux-video');
	});
</script>

<svelte:head>
	<style>
		mux-video {
			display: block;
			width: 100%;
			aspect-ratio: 16 / 9;
			margin: 1rem 0 2rem;
			background-color: #000;
		}
	</style>
</svelte:head>

<mux-video
	playback-id="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
	metadata-video-id="video-id-12345"
	metadata-video-title="Star Wars: Episode 3"
	metadata-viewer-user-id="user-id-6789"
	stream-type="on-demand"
	controls
	logo
	muted
></mux-video>

<a data-sveltekit-prefetch href="/">Browse Elements</a>
