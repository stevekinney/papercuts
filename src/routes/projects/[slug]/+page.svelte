<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import cards from '$lib/cards';

  $: card = cards.get($page.params.slug);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!$card) return;
    const target = e.target as HTMLInputElement;
    const { name, valueAsNumber, value } = target;

    if (target.type === 'range' || target.type === 'number') {
      cards.update($card.id, { [name]: valueAsNumber });
    } else {
      cards.update($card.id, { [name]: value });
    }
  };

  const handleDelete = () => {
    if (!$card) return;
    cards.remove($card.id);
    goto('/projects');
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
        class="border-0 px-0 font-bold"
      />
      <button
        class="p-0 bg-white text-xl hover:bg-white hover:ring-2 ring-purple-400 px-2"
        on:click={handleDelete}>🗑️</button
      >
    </header>
    <label>
      Effort: {$card.effort.toFixed(1)}
      <input
        type="range"
        name="effort"
        min="0"
        max="10"
        step="0.1"
        value={$card.effort}
        on:change={handleChange}
      />
    </label>
    <label>
      Impact: {$card.impact.toFixed(1)}
      <input
        type="range"
        name="impact"
        min="0"
        max="10"
        step="0.1"
        value={$card.impact}
        on:change={handleChange}
      />
    </label>
  </div>
{/if}
