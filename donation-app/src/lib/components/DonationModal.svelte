<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let project;
  const dispatch = createEventDispatcher();

  let amount = 100;
  let phone = '';
  let isLoading = false;
  let errorMessage = '';

  // --- Accessibility Fix ---
  // Listen for the 'Escape' key to close the modal
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }

  onMount(() => {
    // This allows the handleKeydown function to work globally when the modal is open
    window.addEventListener('keydown', handleKeydown);
    // Cleanup the event listener when the modal is destroyed
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
  // --- End of Accessibility Fix ---

  async function handleSubmit() {
    isLoading = true;
    errorMessage = '';
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          amount,
          phone
        })
      });
      if (!response.ok) {
        throw new Error('Donation failed. Please try again.');
      }
      alert('Donation request sent! Please check your phone to complete the payment.');
      dispatch('close');
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="modal-backdrop" on:click={() => dispatch('close')}>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" on:click|stopPropagation>
    <h2 id="modal-title">Donating to {project.name}</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="amount">Amount (KES)</label>
      <input type="number" id="amount" bind:value={amount} min="1" required>

      <label for="phone">Phone Number (e.g., 254...)</label>
      <input type="tel" id="phone" bind:value={phone} required pattern="^254\d{9}$">
      
      <div class="form-actions">
        <button type="button" class="close-btn" on:click={() => dispatch('close')}>Cancel</button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : `Donate ${amount ?? 0} KES`}
        </button>
      </div>

      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
    </form>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .close-btn {
    background-color: #f1f1f1;
    border-color: #ccc;
    color: #333;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
</style>