<script lang="ts">
  import { page } from '$app/stores';

  export let id: string;

  export let title = '';
  export let impact = 0;
  export let effort = 0;

  const dragStart = (event: DragEvent) => {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    event.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ id, effort, impact, offsetX, offsetY }),
    );
  };

  $: top = impact === 0 ? 98 : 100 - impact * 10;
  $: left = effort >= 10 ? 98 : effort * 10;
</script>

<a
  href="/projects/{id}"
  id="card-{id}"
  class="absolute flex min-w-24 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-md border-2 border-slate-800 bg-purple-50 p-2 text-xs text-current shadow-sm hover:z-30 hover:text-current hover:no-underline"
  class:bg-purple-200={$page.params.slug === id}
  class:z-20={$page.params.slug === id}
  style="left: {left}%; top: {top}%;"
  draggable="true"
  on:dragstart={dragStart}
  data-sveltekit-replacestate="true"
>
  <h2 class="font-semibold">{title}</h2>
</a>
