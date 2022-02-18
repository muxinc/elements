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
		await import('@mux-elements/mux-video');
	});
</script>
<mux-video
playback-id="g65IqSFtWdpGR100c2W8VUHrfIVWTNRen"
env-key="5e67cqdt7hgc9vkla7p0qch7q"
metadata-video-id="video-id-sveltekit-001"
metadata-video-title="SvelteKit: Episode 2"
metadata-viewer-user-id="user-id-sveltekit-001"
stream-type="vod"
controls
muted
></mux-video>
<a sveltekit:prefetch href="/">Browse Elements</a>