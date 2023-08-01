<script context="module" lang="ts">
	export const prerender = true;
</script>

<svelte:head>
	<title>Browse Mux Elements</title>
</svelte:head>

<nav>
	<ul>
		<li><a data-sveltekit-prefetch href="./mux-video" class="video">&lt;mux-video&gt;</a></li>
		<li><a data-sveltekit-prefetch href="./mux-audio" class="audio">&lt;mux-audio&gt;</a></li>
		<li><a data-sveltekit-prefetch href="./mux-player" class="player">&lt;mux-player&gt;</a></li>
		<li><a data-sveltekit-prefetch href="./mux-player-theme" class="player">&lt;mux-player&gt; (theme)</a></li>
	</ul>
</nav>
