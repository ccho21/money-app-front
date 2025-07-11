'use client';

import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { InsightRow } from './InsightRow';
import { Insight } from '@/modules/insights/types/types';

interface InsightSectionProps {
  insights: Insight[];
  onActionClick?: (id: string) => void;
}

export default function InsightSection({
  insights,
  onActionClick,
}: InsightSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setTotalSlides(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  if (!insights.length) return null;

  return (
    <div className='bg-accent/10 rounded-md space-y-component py-element'>
      <div className='flex items-center justify-between'>
        <h3
          className='text-heading font-bold text-secondary-foreground'
          role='heading'
          aria-level={3}
        >
          Insights
        </h3>
        {totalSlides > 0 && (
          <span className='text-caption text-muted-foreground'>
            {selectedIndex + 1} / {totalSlides}
          </span>
        )}
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-element'>
          {insights.map((insight, index) => (
            <div
              key={insight.id ?? index}
              className='min-w-full sm:min-w-[70%] md:min-w-[50%] lg:min-w-[33%]'
            >
              <InsightRow insight={insight} onActionClick={onActionClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
