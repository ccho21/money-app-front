'use client';

import React from 'react';

export default function LoadingSpinner() {
  return (
    <div
      className='flex justify-center items-center py-10'
      role='status'
      aria-label='Loading'
    >
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary' />
    </div>
  );
}
