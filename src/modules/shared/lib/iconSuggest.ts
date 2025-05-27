import { IconName } from './iconMap';

export const iconMapEntries: [string[], IconName][] = [
  [['food', 'meal', 'dining'], 'utensils'],
  [['groceries', 'supermarket', 'shopping', 'purchase'], 'cart'],
  [['transport', 'bus', 'taxi'], 'car'],
  [['fuel', 'gas', 'petrol'], 'fuel'],
  [['housing', 'rent'], 'home'],
  [['utilities', 'electricity', 'water'], 'plug'],
  [['wifi', 'internet'], 'wifi'],
  [['phone', 'mobile'], 'smartphone'],
  [['health', 'hospital'], 'heart'],
  [['pharmacy', 'medicine'], 'pill'],
  [['insurance'], 'umbrella'],
  [['salary', 'income'], 'badgeDollarSign'],
  [['bonus'], 'gift'],
  [['freelance', 'contract'], 'briefcase'],
  [['investment', 'crypto'], 'coins'],
  [['savings', 'bank'], 'piggyBank'],
  [['education', 'school'], 'graduationCap'],
  [['books', 'reading'], 'bookOpen'],
  [['subscription', 'netflix'], 'tv'],
  [['entertainment', 'fun'], 'gamepad'],
  [['travel', 'trip'], 'plane'],
  [['gift'], 'gift'],
  [['kids', 'baby'], 'tag'],
];

export function getAutoIconFromName(
  name: string,
  fallback: IconName = 'wallet'
): IconName {
  const lowerName = name.toLowerCase();

  for (const [keywords, icon] of iconMapEntries) {
    if (keywords.some((k) => lowerName.includes(k))) {
      return icon;
    }
  }

  return fallback;
}
