import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PK_TEST = import.meta.env.VITE_STRIPE_PK_TEST;

export const stripePromise = loadStripe(STRIPE_PK_TEST);

export * from './stripe.provider';
