<script>
  import ProjectList from '$lib/components/ProjectList.svelte';
  import DonationModal from '$lib/components/DonationModal.svelte';

  let projects = [
    { id: 1, name: 'Education for All', description: 'Providing books and uniforms for underprivileged students.' },
    { id: 2, name: 'Clean Water Initiative', description: 'Building wells in remote communities.' },
    { id: 3, name: 'Healthcare Support', description: 'Supplying essential medical supplies to local clinics.' }
  ];

  let selectedProject = null;
  let showModal = false;

  function handleDonate(event) {
    selectedProject = event.detail;
    showModal = true;
  }

  function handleClose() {
    showModal = false;
  }
</script>

<svelte:head>
  <title>Donate to a Cause</title>
</svelte:head>

<main>
  <h1>Social Projects</h1>
  <p>Choose a project you would like to support.</p>
  <ProjectList {projects} on:donate={handleDonate} />
</main>

{#if showModal}
  <DonationModal project={selectedProject} on:close={handleClose} />
{/if}

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>