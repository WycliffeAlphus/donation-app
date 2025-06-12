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

<div class="page-wrapper">
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Make a Difference Today</h1>
      <p class="hero-subtitle">Choose a project you would like to support and help transform lives in your community.</p>
    </div>
    <div class="hero-decoration"></div>
  </div>
  
  <main>
    <div class="content-header">
      <h2>Our Impact Projects</h2>
      <div class="underline"></div>
    </div>
    
    <ProjectList {projects} on:donate={handleDonate} />
  </main>
</div>

{#if showModal}
  <DonationModal project={selectedProject} on:close={handleClose} />
{/if}

<style>
  :global(body) {
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  
  .page-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
  }
  
  .hero-section {
    position: relative;
    padding: 4rem 2rem 6rem;
    text-align: center;
    color: white;
    overflow: hidden;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin: 0 0 1.5rem;
    background: linear-gradient(45deg, #ffffff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
    opacity: 0.95;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .hero-decoration {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  .hero-decoration::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 4s ease-in-out infinite reverse;
  }
  
  main {
    background: white;
    border-radius: 2rem;
    margin-top: -2rem;
    position: relative;
    z-index: 3;
    padding: 3rem 2rem 4rem;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -2rem;
  }
  
  .content-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .content-header h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 1rem;
    background: linear-gradient(135deg, #4a5568, #2d3748);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .underline {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }
  
  @media (max-width: 768px) {
    .hero-section {
      padding: 3rem 1rem 4rem;
    }
    
    main {
      padding: 2rem 1rem 3rem;
      border-radius: 1.5rem;
    }
    
    .content-header h2 {
      font-size: 2rem;
    }
    
    .hero-decoration {
      width: 400px;
      height: 400px;
      right: -30%;
    }
  }
  
  @media (max-width: 480px) {
    .hero-section {
      padding: 2rem 1rem 3rem;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
    }
    
    main {
      margin-top: -1rem;
    }
  }
</style>