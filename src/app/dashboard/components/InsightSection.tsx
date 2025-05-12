'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { InsightBanner } from './insightBanner';
import { InsightRow } from './InsightRow';

export function InsightSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [totalSlides, setTotalSlides] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setTotalSlides(emblaApi.scrollSnapList().length);
    onSelect(); // init
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  const slides = [
    <InsightBanner
      key='1'
      icon={<span className='text-xl'>💰</span>}
      text="You've saved 32% of your budget this month!"
      variant='default'
    />,
    <InsightRow
      key='2'
      icon='📈'
      label='Spending Growth'
      value='+12.5%'
      subtext='Compared to last month'
      variant='destructive'
    />,
    <InsightRow
      key='3'
      icon='📉'
      label='Income Drop'
      value='-5.4%'
      subtext='vs last month'
      variant='neutral'
    />,
  ];

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold text-muted-foreground'>
          Insights
        </h3>

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
