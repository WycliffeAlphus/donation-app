<script>
  import { onMount } from 'svelte';

  let projectsData = []; // Will hold all projects with their donation summaries
  let isLoading = true;

  onMount(async () => {
    try {
      // 1. Fetch all projects first
      const projectsResponse = await fetch('/api/projects'); // Assuming you have an endpoint for all projects
      if (!projectsResponse.ok) {
        throw new Error('Failed to fetch projects.');
      }
      const allProjects = await projectsResponse.json();

      // 2. Fetch all donations
      const donationsResponse = await fetch('/api/donate');
      if (!donationsResponse.ok) {
        throw new Error('Failed to fetch donations.');
      }
      const donations = await donationsResponse.json();

      // 3. Process donations to get totals per project
      const processedDonations = donations.reduce((acc, donation) => {
        const { projectId, amount } = donation;
        if (!acc[projectId]) {
          acc[projectId] = { total: 0, count: 0, donations: [] };
        }
        acc[projectId].total += amount;
        acc[projectId].count += 1;
        acc[projectId].donations.push(donation);
        return acc;
      }, {});

      // 4. Merge all projects with their donation data
      projectsData = allProjects.map(project => {
        const projectDonations = processedDonations[project.id];
        return {
          id: project.id,
          name: project.name, // Assuming projects have a name
          total: projectDonations ? projectDonations.total : 0,
          count: projectDonations ? projectDonations.count : 0,
          donations: projectDonations ? projectDonations.donations : []
        };
      });

    } catch (error) {
      console.error('Failed to fetch data:', error);
      // You might want to show an error message to the user here
    } finally {
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>Admin Dashboard</title>
</svelte:head>

<main>
  <h1>Donations Dashboard</h1>
  {#if isLoading}
    <p>Loading...</p>
  {:else if projectsData.length === 0}
    <p>No donations to display.</p>
  {:else}
    {#each projectsData as project}
      <div class="project-summary">
        <h2>Project {project.name || `ID: ${project.id}`}</h2> <p>Total Donations: KES {project.total.toLocaleString()}</p>
        <p>Number of Donations: {project.count}</p>

        {#if project.donations.length > 0}
          <h3>Individual Donations:</h3>
          <ul>
            {#each project.donations as donation}
              <li>{donation.phone} donated KES {donation.amount.toLocaleString()}</li>
            {/each}
          </ul>
        {:else}
          <p>No individual donations for this project yet.</p>
        {/if}
      </div>
    {/each}
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  .project-summary {
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
</style>