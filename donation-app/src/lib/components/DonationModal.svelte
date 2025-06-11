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
      // Assuming /api/donate is your backend endpoint for STK Push
      const response = await fetch('/api/daraja/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          amount,
          phone
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Use the error message from the backend if available
        throw new Error(errorData.error || 'Donation failed. Please try again.');
      }

      const data = await response.json();
      // Check Daraja's ResponseCode for successful initiation
      if (data.ResponseCode === '0') {
          alert('M-Pesa STK Push sent! Please check your phone to complete the payment.');
          dispatch('close');
      } else {
          errorMessage = data.ResponseDescription || 'M-Pesa request failed.';
      }

    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="modal-backdrop" on:click={() => dispatch('close')}
     role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') dispatch('close'); }}
>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" on:click|stopPropagation>
    <h2 id="modal-title" class="modal-title">Donating to {project.name}</h2>
    <form on:submit|preventDefault={handleSubmit} class="donation-form">
      <!-- Amount Input Group -->
      <div class="form-group">
        <label for="amount" class="form-label">Amount (KES)</label>
        <input
          type="number"
          id="amount"
          bind:value={amount}
          min="1"
          required
          class="form-input"
        >
      </div>

      <!-- Phone Number Input Group -->
      <div class="form-group">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          bind:value={phone}
          required
          placeholder="e.g. 07........"
          pattern="^(?:0|\\+254|254)([17])\\d{8}$"
          class="form-input"
        >
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" on:click={() => dispatch('close')}>Cancel</button>
        <button type="submit" disabled={isLoading} class="btn btn-primary">
          {isLoading ? 'Processing...' : `Donate ${amount ?? 0} KES`}
        </button>
      </div>

      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
    </form>
  </div>
</div>

<style>
  /* Base styles for all elements */
  :global(body) {
      font-family: 'Inter', sans-serif; /* Using a clean, modern font */
  }

  /* --- Modal Backdrop & Container --- */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Slightly darker overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's on top of other content */
    backdrop-filter: blur(4px); /* Subtle blur effect */
  }

  .modal {
    background: linear-gradient(135deg, #ffffff, #f0f4f8); /* Subtle gradient background */
    padding: 2.5rem; /* Increased padding */
    border-radius: 12px; /* More rounded corners */
    width: 90%;
    max-width: 450px; /* Slightly wider modal */
    box-shadow: 0 10px 30px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.1); /* Enhanced shadow */
    border: 1px solid #e0e0e0; /* Subtle border */
    animation: fadeIn 0.3s ease-out; /* Add a fade-in animation */
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-title {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
  }

  /* --- Form Styling --- */
  .donation-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem; /* Consistent spacing between form groups */
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.4rem;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d8df;
    border-radius: 8px; /* Rounded input fields */
    font-size: 1rem;
    color: #333;
    transition: all 0.2s ease-in-out;
  }

  .form-input:focus {
    outline: none;
    border-color: #007bff; /* Highlight border on focus */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); /* Subtle shadow on focus */
  }

  .form-input::placeholder {
      color: #999;
  }

  /* --- Buttons --- */
  .form-actions {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    gap: 0.8rem; /* Space between buttons */
    margin-top: 2rem; /* More space above buttons */
  }

  .btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px; /* Rounded buttons */
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn:hover {
    transform: translateY(-1px); /* Slight lift on hover */
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .btn:active {
    transform: translateY(0); /* Press effect */
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .btn-primary {
    background-color: #007bff; /* Blue for primary action */
    color: white;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .btn-secondary {
    background-color: #e9ecef; /* Light gray for secondary action */
    color: #495057;
    border: 1px solid #ced4da;
  }

  .btn-secondary:hover {
    background-color: #d3d9df;
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #cccccc;
    color: #666666;
    transform: none;
    box-shadow: none;
  }

  /* --- Error Message --- */
  .error-message {
    color: #dc3545; /* Red for errors */
    font-size: 0.9rem;
    margin-top: 1rem;
    text-align: center;
    background-color: #f8d7da; /* Light red background */
    border: 1px solid #f5c6cb;
    border-radius: 6px;
    padding: 0.75rem;
  }
</style>