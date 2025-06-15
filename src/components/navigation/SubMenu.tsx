'use client';

import { memo } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/modules/shared/util/style.utils';

interface Tab {
  key: string;
  label: string;
}

interface SubMenuProps {
  active: string;
  onChange: (key: string) => void;
  tabs: Tab[];
}

function SubMenuBase({ tabs, active, onChange }: SubMenuProps) {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex">
        {tabs.map((tab) => {
          const isActive = tab.key === active;

          return (
            <NavigationMenuItem key={tab.key}>
              <NavigationMenuLink
                role="link"
                onClick={() => onChange(tab.key)}
                className={cn(
                  'text-label transition-colors px-2 py-1 rounded-md cursor-pointer',
                  'text-muted-foreground hover:text-primary hover:bg-accent',
                  isActive && 'bg-primary/10 text-primary font-semibold'
                )}
              >
                {tab.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const SubMenu = memo(SubMenuBase);
export default SubMenu;
