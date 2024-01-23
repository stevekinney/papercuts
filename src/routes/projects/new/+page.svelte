<script lang="ts">
  import cards from '$lib/cards';

  let title = '';
  let effort = 5;
  let impact = 5;

  const handleSubmit = () => {
    cards.add({ title, effort, impact });
    title = '';
  };
</script>

<form
  class="flex flex-col gap-2 p-4 border-2 border-slate-200 m-2 rounded-md shadow-sm"
  on:submit|preventDefault={handleSubmit}
>
  <h2 class="font-bold">Add a New Project</h2>
  <label>
    Title
    <input type="text" bind:value={title} placeholder="New Project Title" required />
  </label>
  <label>
    Effort ({effort})
    <input type="range" min="0" max="10" bind:value={effort} />
  </label>
  <label>
    Impact ({impact})
    <input type="range" min="0" max="10" bind:value={impact} />
  </label>
  <button type="submit" disabled={!title}>Add</button>
</form>
