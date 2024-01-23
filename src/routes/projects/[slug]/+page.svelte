<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  import Range from '$lib/range.svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import cards from '$lib/cards';

  $: card = cards.get($page.params.slug);
  $: !card && goto('/projects', { replaceState: true });

  const handleChange = (e: Event) => {
    if (!$card) return;
    const target = e.target as HTMLInputElement;
    const { name, valueAsNumber, value } = target;

    if (target.type === 'range' || target.type === 'number') {
      card.update({ [name]: valueAsNumber });
    } else {
      card.update({ [name]: value });
    }
  };
</script>

{#if $card}
  <div class="m-2 space-y-4 rounded-md border-2 border-slate-200 p-4 shadow-md">
    <header class="flex items-center justify-between">
      <h2 class="sr-only">{$card.title}</h2>
      <input
        name="title"
        value={$card.title}
        on:change={handleChange}
        class="w-fit border-0 px-0 py-1 font-bold"
      />
      <button
        class="bg-white p-0 px-2 text-xl ring-purple-400 hover:bg-white hover:ring-2"
        on:click={card.remove}>🗑️</button
      >
    </header>

    <Range
      name="effort"
      value={$card.effort}
      min="0"
      max="10"
      step="0.1"
      label="Effort"
      on:change={handleChange}
    />
    <Range
      name="impact"
      value={$card.impact}
      min="0"
      max="10"
      step="0.1"
      label="Impact"
      on:change={handleChange}
    />
  </div>
{/if}
