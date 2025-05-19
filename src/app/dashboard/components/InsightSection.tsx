'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { InsightRow } from './InsightRow';
import { TypographySmall } from '@/components/ui/typography';
import { DashboardInsight } from '@/modules/dashboard/types';

interface InsightSectionProps {
  insights: DashboardInsight[];
}

export function InsightSection({ insights }: InsightSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [totalSlides, setTotalSlides] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setTotalSlides(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  if (!insights.length) return null;

  const slides = insights.map((insight) => {
    const isPositive = insight.id.includes('saved') || insight.id.includes('decreased');
    const variant =
      insight.id.includes('over') ? 'destructive' :
      isPositive ? 'positive' :
      'neutral';

    return (
      <InsightRow
        key={insight.id}
        icon={variant === 'destructive' ? '⚠️' : variant === 'positive' ? '✅' : '📊'}
        label={insight.message}
        value={insight.value ?? ''}
        subtext='This month'
        variant={variant as any}
      />
    );
  });

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <TypographySmall>Insights</TypographySmall>
        {totalSlides > 0 && (
          <span className='text-xs text-muted-foreground'>
            {selectedIndex + 1} / {totalSlides}
          </span>
        )}
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {slides.map((item, index) => (
            <div key={index} className='min-w-full sm:min-w-1/2 lg:min-w-1/3'>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
