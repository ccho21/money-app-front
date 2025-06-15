// src/hooks/useTopNavPreset.ts
'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/modules/shared/stores/useUIStore';

import type { TopNavConfig } from '@/modules/shared/stores/useUIStore';

export function useTopNavPreset(config: TopNavConfig) {
  useEffect(() => {
    useUIStore.getState().setTopNav(config);
    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [config]);
}
