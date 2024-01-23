<script lang="ts">
  import cards from '$lib/cards';
  import Card from './card.svelte';

  let element: HTMLDivElement;

  let className = 'w-full h-full';
  export { className as class };

  const drop = (event: DragEvent) => {
    if (!element) return;
    if (!event.dataTransfer) return;

    const { width, height } = element.getBoundingClientRect();

    try {
      const data: Card & { offsetX: number; offsetY: number } = JSON.parse(
        event.dataTransfer.getData('text/plain'),
      );
      const { id, offsetX, offsetY } = data;

      let impact = ((height - (event.clientY - offsetY)) / height) * 10;
      let effort = ((event.clientX - offsetX) / width) * 10;

      if (impact < 0) impact = 0;
      if (impact > 10) impact = 10;

      if (effort < 0) effort = 0;
      if (effort > 10) effort = 10;

      cards.update(id, { effort, impact });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div
  class="{className} bg-center bg-no-repeat bg-contain relative axis-background"
  on:dragover|preventDefault
  on:drop|preventDefault={drop}
  bind:this={element}
  role="list"
>
  {#each $cards as card}
    <Card {...card} />
  {/each}
</div>
