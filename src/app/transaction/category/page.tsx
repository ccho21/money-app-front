'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Pencil, GripVertical, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialCategories = [
  'Food',
  'Social Life',
  'Pets',
  'Transport',
  'Culture',
  'Household',
  'Apparel',
  'Beauty',
  'Health',
  'Education',
  'Gift',
  'Other',
];

export default function CategoryEditPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const router = useRouter();

  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b'>
        <div className='flex items-center gap-3'>
          <button onClick={router.back}>
            <ArrowLeft />
          </button>
          <h1 className='text-lg font-semibold'>Expense</h1>
        </div>
        <button>
          <Plus />
        </button>
      </div>

      {/* Category List */}
      <div className='px-4'>
        {categories.map((item, i) => (
          <div
            key={i}
            className='flex items-center justify-between py-3 border-b'
          >
            {/* 삭제 버튼 */}
            <button className='text-red-500'>
              <Minus />
            </button>

            {/* 이름 */}
            <span className='text-sm'>{item}</span>

            {/* 수정 + 정렬 */}
            <div className='flex items-center gap-3'>
              <button>
                <Pencil className='w-4 h-4 text-gray-500' />
              </button>
              <button>
                <GripVertical className='w-4 h-4 text-gray-500' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
