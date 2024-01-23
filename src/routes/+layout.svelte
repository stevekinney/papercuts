<script lang="ts">
  import '../app.css';
  import Container from '$lib/container.svelte';
</script>

<svelte:head>
  <title>Papercuts</title>
</svelte:head>

<main class="w-screen h-screen flex">
  <Container />
  <slot />
</main>
