export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  date: string; // ISO string
  note?: string;
}
