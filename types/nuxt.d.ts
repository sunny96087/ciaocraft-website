import { NuxtConfig } from '@nuxt/schema'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    css?: string[];
    postcss?: {
      plugins?: {
        [key: string]: any;
      };
    };
    components?: {
      path: string;
      pathPrefix?: boolean;
    }[];
    runtimeConfig?: {
      public?: {
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}