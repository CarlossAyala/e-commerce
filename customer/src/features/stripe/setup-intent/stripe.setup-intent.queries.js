import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './stripe.setup-intent.api';

const stripeSetupIntentKeys = {
  key: ['stripe/setup-intent'],
  get: (id) => [...stripeSetupIntentKeys.key, 'get', id],
};
