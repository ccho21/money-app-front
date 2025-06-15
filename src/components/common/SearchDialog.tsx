'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRecommendedKeywords } from '@/modules/transaction/hooks/queries';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({
  open,
  onOpenChange,
}: SearchDialogProps) {
  const { query, setQuery } = useTransactionFilterStore();
  const [noteInput, setNoteInput] = useState(query.note ?? '');

  const { data: keywords = [], isLoading } = useRecommendedKeywords();

  const handleKeywordClick = (word: string) => {
    setNoteInput(word);
  };

  const handleSearch = () => {
    setQuery(() => ({
      ...query,
      note: noteInput.trim(),
      version: Date.now(),
    }));

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='text-left'>
          <DialogTitle>Search Transactions</DialogTitle>
        </DialogHeader>

        <div className='grid gap-4 my-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='search'>Keyword</Label>
            <Input
              id='search'
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className='col-span-3'
            />
          </div>

          {!isLoading && keywords.length > 0 && (
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label className='text-muted-foreground pt-1'>Suggested</Label>
              <div className='col-span-3 flex flex-wrap gap-2'>
                {keywords.map((word) => (
                  <Button
                    key={word}
                    variant='secondary'
                    size='sm'
                    className='text-xs'
                    onClick={() => handleKeywordClick(word)}
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type='button' onClick={handleSearch}>
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
