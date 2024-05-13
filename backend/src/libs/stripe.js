import stripe from "stripe";
import envs from "../config/environments.js";

export const Stripe = stripe(envs.stripe.sk_test);
