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
  class="p-2 border-2 w-36 border-slate-800 bg-purple-50 absolute flex flex-col gap-1 justify-center items-center rounded-md shaodw-md text-xs hover:no-underline text-current hover:text-current"
  class:bg-purple-100={$page.params.slug === id}
  class:z-20={$page.params.slug === id}
  style="left: {left}%; top: {top}%"
  draggable="true"
  on:dragstart={dragStart}
  data-sveltekit-replacestate="true"
>
  <h2 class="font-semibold">{title}</h2>
  <div class="flex gap-2">
    <p class="before:content-['💪'] before:mr-1">{effort.toFixed(1)}</p>
    <p class="before:content-['🥰'] before:mr-1">{impact.toFixed(1)}</p>
  </div>
</a>
