<script lang="ts">
  import { page } from '$app/stores';
  import cards from '$lib/cards';
</script>

<div class="w-96 border-l-2 border-slate-900 z-10 bg-white">
  <nav class="bg-slate-900 text-white flex justify-between">
    <a href="/projects/new" class="block p-2 hover:bg-purple-800 text-current hover:text-purple-50">
      New
    </a>
    <a href="/" class="block p-2 hover:bg-purple-800 text-current hover:text-purple-50">❌</a>
  </nav>
  <section class="space-y-8 p-2">
    <slot />
    <div>
      <h2 class="p-2">
        <span class="font-bold">Projects</span> (<a href="/projects/new">Add</a>)
      </h2>
      <ul>
        {#each $cards as card}
          <li>
            <a
              href="/projects/{card.id}"
              class="p-2 hover:bg-purple-100 hover:no-underline hover:text-current text-current flex justify-between items-center"
              class:bg-purple-50={$page.params.slug === card.id}
            >
              <span>{card.title}</span>
              <div class="font-thin space-x-2">
                <span class="font-thin before:content-['💪'] before:mr-1"
                  >{card.effort.toFixed(1)}</span
                >
                <span class="font-thin before:content-['🥰'] before:mr-1"
                  >{card.impact.toFixed(1)}</span
                >
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</div>
