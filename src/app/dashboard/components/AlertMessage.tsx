// components/AlertMessage.tsx
import { AlertTriangle } from "lucide-react";

export function AlertMessage() {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 text-sm rounded-xl p-4">
      <AlertTriangle className="w-4 h-4 inline mr-2" />
      3 categories exceeded budget. Over by $145.20
    </div>
  );
}
