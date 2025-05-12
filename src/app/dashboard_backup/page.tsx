// import { redirect } from 'next/navigation';

// export default function DashboardPage() {
//   redirect('');
// }

import { DataTable } from '@/components_backup/data-table';
import { SectionCards } from '@/components_backup/section-cards';
import { SiteHeader } from '@/components_backup/site-header';
import { SidebarInset, SidebarProvider } from '@/components_backup/ui/sidebar';
import data from './data.json';
export default function Page() {
  return (
    <SidebarProvider>
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
              <SectionCards />
              <div className='px-4 lg:px-6'></div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
