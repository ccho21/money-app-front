// src/hooks/useTopNavPreset.ts
'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';

import type { TopNavConfig } from '@/stores/useUIStore';

export function useTopNavPreset(config: TopNavConfig) {
  useEffect(() => {
    useUIStore.getState().setTopNav(config);
    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [config]);
}
