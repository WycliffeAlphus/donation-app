<script>
  import { createEventDispatcher } from 'svelte';

  export let projects = [];
  const dispatch = createEventDispatcher();

  function donate(project) {
    dispatch('donate', project);
  }
</script>

<div class="project-list">
  {#each projects as project}
    <div class="project-card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button on:click={() => donate(project)}>Donate</button>
    </div>
  {/each}
</div>

<style>
  .project-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  .project-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }
</style>