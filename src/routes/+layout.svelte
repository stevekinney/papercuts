<script lang="ts">
  import '../app.css';
  import Container from '$lib/container.svelte';
</script>

<svelte:head>
  <title>Papercuts</title>
</svelte:head>

<main class="flex h-screen w-screen">
  <Container />
  <slot />
</main>
