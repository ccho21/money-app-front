// src/components/ui/UIIcon.tsx
import {
  Calendar,
  Plus,
  ShoppingCart,
  Trash,
  Wallet,
  Search,
  ChevronsLeftRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Filter,
  CalendarDays,
  BadgeDollarSign,
  Car,
  Utensils,
  type LucideProps,
} from 'lucide-react';
import clsx from 'clsx';

// 안전하게 enum-like 구조로 제한
const iconMap = {
  calendar: Calendar,
  wallet: Wallet,
  cart: ShoppingCart,
  plus: Plus,
  trash: Trash,
  search: Search,
  chevrons: ChevronsLeftRight,
  chevronLeft: ChevronsLeft,
  chevronRight: ChevronsRight,
  pencil: Pencil,
  filter: Filter,
  calendarDays: CalendarDays,
  badgeDollarSign: BadgeDollarSign,
  utensils: Utensils,
  car: Car,
} as const;

export type IconName = keyof typeof iconMap;

interface UIIconProps extends LucideProps {
  name: IconName;
  className?: string;
}

export default function UIIcon({ name, className, ...props }: UIIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;

  return <Icon className={clsx('w-5 h-5', className)} {...props} />;
}
