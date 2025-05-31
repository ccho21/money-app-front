// import { TransactionGroupSummary } from '@/modules/transaction/types/types';
// import { cn } from '@/modules/shared/lib/utils';
// import CurrencyDisplay from '../../../components/ui/custom/currencyDisplay';
// import { Card, CardContent } from '@/components/ui/card';
// import Link from 'next/link';
// import { Separator } from '../../../components/ui/separator';
// import DateNavigator from '../../../components/navigation/DateNavigator';
// import { ArrowRight } from 'lucide-react';

// interface AccountSummaryBoxProps {
//   summary: TransactionGroupSummary;
//   onClick?: () => void;
//   onNavigate?: () => void;
//   className?: string;
// }

// export default function AccountSummaryBox({
//   summary,
//   onNavigate,
//   className,
// }: SummaryBoxProps) {
//   const {
//     totalIncome,
//     totalExpense,
//     netBalance,
//     comparison,
//     topSpendingCategory,
//   } = summary;

//   return (
//     <Card className={cn('flat-card', className)}>
//       <CardContent className='flat-card-content'>
//         {/* Total Spending */}
//         <div className=''>
//           <div className='w-full flex justify-between items-center'>
//             <p className='text-label text-muted-foreground uppercase tracking-wide'>
//               Total Spending
//             </p>
//             <DateNavigator variant='dropdown' onNavigate={onNavigate} />
//           </div>
//           <h2 className='text-display text-primary'>
//             <CurrencyDisplay amount={totalExpense} />
//           </h2>
//           {comparison && (
//             <p className='text-caption text-muted-foreground font-medium'>
//               ↑ <CurrencyDisplay amount={comparison.difference} /> (
//               {comparison.percent}%) from last month
//             </p>
//           )}
//         </div>

//         <div className='flex items-center space-x-4 h-10'>
//           <div>
//             <div className='text-label'>Income</div>
//             <CurrencyDisplay type='income' amount={totalIncome} />
//           </div>
//           <Separator
//             orientation='vertical'
//             className='w-px bg-border self-stretch py-3'
//           />
//           <div>
//             <div className='text-label'>Net Balance</div>
//             <CurrencyDisplay
//               type='expense'
//               className='text-destructive'
//               amount={Math.abs(netBalance)}
//             />
//           </div>
//         </div>

//         {/* Top Spending */}
//         {topSpendingCategory && (
//           <div className='flex justify-between text-caption text-muted-foreground pt-tight'>
//             <span>
//               Top: {topSpendingCategory.name}{' '}
//               <CurrencyDisplay amount={topSpendingCategory.amount} />
//             </span>
//             <Link
//               href='/transaction/view/chart/flow'
//               className='flex items-center justify-end text-label text-primary hover:underline'
//             >
//               View charts <ArrowRight className='ml-1 w-4 h-4'></ArrowRight>
//             </Link>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
