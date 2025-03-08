import { loadStripe } from '@stripe/stripe-js';

// Only expose the publishable key to the client.
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
