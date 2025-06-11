import mpesa from '$lib/server/mpesa.js';

// A simple in-memory store for donations (in a real app, use a database)
const donations = [];

export async function POST({ request }) {
  const { projectId, amount, phone } = await request.json();

  if (!projectId || !amount || !phone) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const response = await mpesa.stkPush({
      amount: Number(amount),
      phoneNumber: phone,
      callBackURL: 'https://your-app-url.com/api/callback', // Replace with your callback URL
      accountReference: `Project_${projectId}`,
      transactionDesc: `Donation to project ${projectId}`
    });

    // Store donation attempt
    donations.push({ projectId, amount, phone, status: 'pending', ...response });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// This would typically be in a separate file, but for simplicity:
export async function GET() {
  // In a real app, you would secure this endpoint
  return new Response(JSON.stringify(donations), { status: 200 });
}