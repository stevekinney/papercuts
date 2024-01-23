<script lang="ts">
  import { page } from '$app/stores';
  import cards from '$lib/cards';
</script>

<div class="z-10 min-w-96 border-l-2 border-slate-900 bg-white">
  <nav class="flex justify-between bg-slate-900 text-white">
    <a href="/projects/new" class="block p-2 text-current hover:bg-purple-800 hover:text-purple-50">
      New
    </a>
    <a href="/" class="block p-2 text-current hover:bg-purple-800 hover:text-purple-50">❌</a>
  </nav>
  <section class="space-y-8 p-2">
    <slot />
    <div>
      <h2 class="p-2">
        <span class="font-bold">Projects</span> (<a href="/projects/new">Add</a>)
      </h2>
      <ul>
        {#each $cards as card (card.id)}
          <li>
            <a
              href="/projects/{card.id}"
              class="flex items-center gap-2 p-2 text-sm text-current hover:bg-purple-100 hover:text-current hover:no-underline"
              class:bg-purple-50={$page.params.slug === card.id}
            >
              <p class="w-full">{card.title}</p>
              <label>
                💪
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  name="effort"
                  value={card.effort.toFixed(1)}
                  on:click|preventDefault
                  on:change={(e) => {
                    cards.update(card.id, {
                      [e.currentTarget.name]: e.currentTarget.valueAsNumber,
                    });
                  }}
                  class="w-fit"
                />
              </label>
              <label>
                🥰
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={card.impact.toFixed(1)}
                  name="impact"
                  on:click|preventDefault
                  on:change={(e) =>
                    cards.update(card.id, {
                      [e.currentTarget.name]: e.currentTarget.valueAsNumber,
                    })}
                  class="w-fit"
                />
              </label>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</div>
