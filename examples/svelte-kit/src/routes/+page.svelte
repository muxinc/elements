<script context="module" lang="ts">
	export const prerender = true;
</script>

<svelte:head>
	<title>Browse Mux Elements</title>
</svelte:head>

<section>
	<h1>Browse Mux Elements</h1>
	<ul>
		<li>
			<a data-sveltekit-prefetch href="/mux-video">Mux Video Demo</a>
		</li>
		<li>
			<a data-sveltekit-prefetch href="/mux-audio">Mux Audio Demo</a>
		</li>
		<li>
			<a data-sveltekit-prefetch href="/mux-player">Mux Player Demo</a>
		</li>
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
