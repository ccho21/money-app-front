import { Inbox } from 'lucide-react';

export default function EmptyMessage({ message = 'No data available' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-component space-y-element">
      <Inbox className="w-10 h-10 text-muted" />
      <p className="text-body text-muted-foreground text-center">{message}</p>
    </div>
  );
}
