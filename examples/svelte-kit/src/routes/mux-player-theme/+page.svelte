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
		await import("@mux/mux-player/themes/microvideo");
	});
</script>

<svelte:head>
	<style>
		mux-player {
			display: block;
			width: 100%;
			margin: 1rem 0 2rem;
			background-color: #000;
			line-height: 0;
		}

		mux-player:not([audio]) {
			aspect-ratio: 16 / 9;
		}
	</style>
</svelte:head>

<mux-player
	stream-type="on-demand"
	playback-id="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
	theme="microvideo"
></mux-player>

<a data-sveltekit-prefetch href="/">Browse Elements</a>
