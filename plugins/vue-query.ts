import {
  VueQueryPlugin,
  QueryClient,
  dehydrate,
  hydrate,
} from '@tanstack/vue-query';
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query';
import { defineNuxtPlugin, useState } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000, // 5 секунд
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);

  if (process.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (process.client) {
    if (vueQueryState.value) {
      hydrate(queryClient, vueQueryState.value);
    }
  }
});
