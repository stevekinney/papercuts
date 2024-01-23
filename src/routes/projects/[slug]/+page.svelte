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
  <div class="p-4 border-2 border-slate-200 m-2 rounded-md shadow-md space-y-4">
    <header class="flex items-center justify-between">
      <h2 class="sr-only">{$card.title}</h2>
      <input
        name="title"
        value={$card.title}
        on:change={handleChange}
        class="border-0 px-0 font-bold w-fit py-1"
      />
      <button
        class="p-0 bg-white text-xl hover:bg-white hover:ring-2 ring-purple-400 px-2"
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
