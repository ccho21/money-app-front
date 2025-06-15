// src/modules/shared/util/iconMap.test.ts
import { iconMap } from '@/modules/shared/util/icon.utils';

describe('iconMap', () => {
  it('should include expected keys', () => {
    expect(Object.keys(iconMap)).toEqual(
      expect.arrayContaining(['wallet', 'calendar', 'logout'])
    );
  });
});
