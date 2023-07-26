import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './strapi.setup-intent.api';

const strapiSetupIntentKeys = {
  key: ['strapi/setup-intent'],
  get: (id) => [...strapiSetupIntentKeys.key, 'get', id],
};
