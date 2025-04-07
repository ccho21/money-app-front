'use client';

import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center py-10'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary' />
    </div>
  );
}
