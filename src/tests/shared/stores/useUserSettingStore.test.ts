import { useUserSettingStore } from "@/modules/shared/stores/useUserSettingStore";

describe('useUserSettingStore', () => {
    beforeEach(() => {
      useUserSettingStore.setState({
        weeklyStartDay: 'sunday',
        inputOrder: 'amount-first',
        theme: 'system',
        themeColor: 'green',
        mainCurrency: 'CAD',
        startPage: 'list',
        monthlyStartDate: 1,
        currencyUnitPosition: 'front',
        currencyDecimalPlaces: 2,
      });
    });
  
    it('should have correct default values', () => {
      const state = useUserSettingStore.getState();
      expect(state.theme).toBe('system');
      expect(state.mainCurrency).toBe('CAD');
      expect(state.weeklyStartDay).toBe('sunday');
      expect(state.currencyDecimalPlaces).toBe(2);
    });
  
    it('should update theme and themeColor', () => {
      useUserSettingStore.getState().setTheme('dark');
      useUserSettingStore.getState().setThemeColor('blue');
      const state = useUserSettingStore.getState();
      expect(state.theme).toBe('dark');
      expect(state.themeColor).toBe('blue');
    });
  
    it('should update mainCurrency and decimal places', () => {
      useUserSettingStore.getState().setMainCurrency('USD');
      useUserSettingStore.getState().setCurrencyDecimalPlaces(0);
      const state = useUserSettingStore.getState();
      expect(state.mainCurrency).toBe('USD');
      expect(state.currencyDecimalPlaces).toBe(0);
    });
  
    it('should return formatted subtitle map', () => {
      const map = useUserSettingStore.getState().getSubtitleMap();
  
      expect(map.get('themeSetting')).toBe('System (Green)');
      expect(map.get('weeklyStartDay')).toBe('Sunday');
      expect(map.get('inputOrder')).toBe('Amount First');
      expect(map.get('mainCurrency')).toBe('CAD');
      expect(map.get('startPage')).toBe('List');
      expect(map.get('monthlyStartDate')).toBe('Every 1');
      expect(map.get('currencyUnitPosition')).toBe('$100');
      expect(map.get('currencyDecimalPlaces')).toBe('0.00');
    });
  });