// types/next-pwa.d.ts
declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: (string | RegExp)[];
    
  }

  function withPWA(options: PWAOptions): (config: NextConfig) => NextConfig;
  export = withPWA;
}