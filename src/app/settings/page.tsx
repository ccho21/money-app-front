'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { settingsConfig } from '@/modules/settings/config/settingsConfig';

import { Section, SectionTitle } from '@/components/ui/layout/section';
import SettingItem from '@/modules/settings/components/SettingItem';
import { PanelType } from '@/modules/settings/types/types';
import { SlideInPanelRenderer } from '@/modules/settings/components/panels/SlideInPanelRenderer';
import { useUserSettingStore } from '@/modules/shared/stores/useUserSettingStore';

export default function SettingsPage() {
  const router = useRouter();

  const [currentPanel, setCurrentPanel] = useState<PanelType | null>(null);
  const getSubtitleMap = useUserSettingStore((s) => s.getSubtitleMap);
  const subtitleMap = getSubtitleMap();

  // Section 단위로 묶은 config
  const sections = [
    {
      title: 'Plans',
      items: settingsConfig.filter((i) => i.section === 'category'),
    },
    // {
    //   title: 'Transaction',
    //   items: settingsConfig.filter((i) => i.section === 'transaction'),
    // },
    {
      title: 'General',
      items: settingsConfig.filter((i) => i.section === 'general'),
    },
  ];

  // 중복된 클릭 로직 추출
  const handleItemClick = (item: (typeof settingsConfig)[number]) => {
    if (item.type === 'panel') setCurrentPanel(item.panel);
    if (item.type === 'link') router.push(item.route);
    if (item.type === 'action') item.action();
  };

  return (
    <>
      <div className='bg-background text-foreground min-h-screen py-4 pb-[10vh]'>
        {sections.map((section) => (
          <Section key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.items.map((item) => (
              <SettingItem
                key={item.key}
                icon={item.icon || ''}
                title={item.title}
                subtitle={subtitleMap.get(item.key) || ''}
                className={item.className}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </Section>
        ))}
      </div>
      <SlideInPanelRenderer
        currentPanel={currentPanel}
        onClose={() => setCurrentPanel(null)}
      />
    </>
  );
}
