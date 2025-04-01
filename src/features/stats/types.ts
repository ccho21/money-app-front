
export interface StatBase {
    categoryId: string;
    categoryName: string;
    amount: number;
    percentage: number; // 전체 대비 %
  }
  
  export interface ExpenseStat extends StatBase {
    type: 'expense';
  }
  
  export interface IncomeStat extends StatBase {
    type: 'income';
  }