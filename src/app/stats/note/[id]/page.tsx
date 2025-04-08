export default function StatsNoteDetailPage() {
  return <div>Note detail page</div>;
}
// "use client";

// import DailyTransactionGroup from "@/app/dashboard/daily/_components/DailyTransactionGroup";

// const MOCK_BAR_DATA = [
//   { month: "Nov", value: 0 },
//   { month: "Dec", value: 0 },
//   { month: "Jan", value: 0 },
//   { month: "Feb", value: 0 },
//   { month: "Mar", value: 32.48 },
//   { month: "Apr", value: 0 },
//   { month: "May", value: 0 },
//   { month: "Jun", value: 0 },
//   { month: "July", value: 0 },
//   { month: "Aug", value: 0 },
//   { month: "Oct", value: 0 },
//   { month: "Sep", value: 0 },
// ];

// import {
//   TransactionSummaryResponse,
//   TransactionType,
// } from "@/features/transaction/types";
// import SummaryBox from "@/components/ui/SummaryBox";
// import BudgetBarChart from "../../budget/_components/BudgetBarChart";

// export const MOCK_TRANSACTIONS: TransactionSummaryResponse = {
//   type: "daily",
//   startDate: "2025-03-01",
//   endDate: "2025-03-31",
//   incomeTotal: 0,
//   expenseTotal: 30240,
//   data: [
//     {
//       label: "2025-03-25",
//       rangeStart: "2025-03-25",
//       rangeEnd: "2025-03-25",
//       incomeTotal: 0,
//       expenseTotal: 8000,
//       transactions: [
//         {
//           id: "1",
//           type: "expense" as TransactionType,
//           amount: 2000,
//           date: "2025-03-25T00:00:00.000Z",
//           note: "뭔데?",
//           category: {
//             id: "cat-1",
//             name: "Food",
//             icon: "utensils",
//             color: "#FF6240",
//           },
//           account: {
//             id: "acc-1",
//             name: "Cash",
//             type: "CASH",
//             color: "#34D399",
//           },
//         },
//         {
//           id: "2",
//           type: "expense" as TransactionType,
//           amount: 3000,
//           date: "2025-03-25T00:00:00.000Z",
//           note: "뭔데?",
//           category: {
//             id: "cat-1",
//             name: "Food",
//             icon: "utensils",
//             color: "#FF6240",
//           },
//           account: {
//             id: "acc-1",
//             name: "Cash",
//             type: "CASH",
//             color: "#34D399",
//           },
//         },
//         {
//           id: "3",
//           type: "expense" as TransactionType,
//           amount: 3000,
//           date: "2025-03-25T00:00:00.000Z",
//           note: "커피2",
//           category: {
//             id: "cat-1",
//             name: "Food",
//             icon: "utensils",
//             color: "#FF6240",
//           },
//           account: {
//             id: "acc-1",
//             name: "Cash",
//             type: "CASH",
//             color: "#34D399",
//           },
//         },
//       ],
//     },
//     {
//       label: "2025-03-24",
//       rangeStart: "2025-03-24",
//       rangeEnd: "2025-03-24",
//       incomeTotal: 0,
//       expenseTotal: 22240,
//       transactions: [
//         {
//           id: "4",
//           type: "expense" as TransactionType,
//           amount: 20000,
//           date: "2025-03-24T00:00:00.000Z",
//           note: "",
//           category: {
//             id: "cat-1",
//             name: "Food",
//             icon: "utensils",
//             color: "#FF6240",
//           },
//           account: {
//             id: "acc-2",
//             name: "Card",
//             type: "CARD",
//             color: "#60A5FA",
//           },
//         },
//         {
//           id: "5",
//           type: "expense" as TransactionType,
//           amount: 2240,
//           date: "2025-03-24T00:00:00.000Z",
//           note: "커피",
//           category: {
//             id: "cat-1",
//             name: "Food",
//             icon: "utensils",
//             color: "#FF6240",
//           },
//           account: {
//             id: "acc-2",
//             name: "Card",
//             type: "CARD",
//             color: "#60A5FA",
//           },
//         },
//       ],
//     },
//   ],
// };

// export default function StatsBudgetDetailPage() {
//   const selectedMonth = "Mar";

//   return (
//     <div className="p-4 space-y-4 bg-white">
//       {/* 헤더 */}
//       <div className="text-center space-y-1">
//         <h1 className="text-lg font-bold">Food</h1>
//         <p className="text-sm text-gray-500">Mar 2025</p>
//       </div>

//       {/* 요약 */}
//       <SummaryBox
//         items={[
//           {
//             label: "Income",
//             value: MOCK_TRANSACTIONS.incomeTotal,
//             color:
//               MOCK_TRANSACTIONS.incomeTotal > 0
//                 ? "text-[#3C50E0]"
//                 : "text-gray-400",
//             prefix: "$",
//           },
//           {
//             label: "Exp.",
//             value: MOCK_TRANSACTIONS.expenseTotal,
//             color:
//               MOCK_TRANSACTIONS.expenseTotal > 0
//                 ? "text-[#fb5c4c]"
//                 : "text-gray-400",
//             prefix: "$",
//           },
//           {
//             label: "Total",
//             value:
//               MOCK_TRANSACTIONS.incomeTotal - MOCK_TRANSACTIONS.expenseTotal,
//             color: "text-gray-900 dark:text-white",
//             prefix: "$",
//           },
//         ]}
//       />
//       {/* 바 차트 */}
//       <div className="w-full h-36">
//         <BudgetBarChart
//           data={MOCK_BAR_DATA}
//           selectedMonth="Mar"
//           barColor="#FF6240"
//         />
//       </div>

//       {/* 일별 거래 리스트 */}
//       <div className="space-y-4">
//         {MOCK_TRANSACTIONS.data.map((group) => (
//           <DailyTransactionGroup key={group.label} group={group} />
//         ))}
//       </div>
//     </div>
//   );
// }
