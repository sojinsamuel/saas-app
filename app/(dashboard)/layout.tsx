import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { hasActiveSubscription } from "@/lib/subscribed";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const currentApiLimit = await getApiLimitCount();
  const isPro = await hasActiveSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
        <Sidebar currentApiLimit={currentApiLimit} isPro={isPro} />
      </div>
      <Navbar currentApiLimit={currentApiLimit} isPro={isPro} />
      <main className="md:pl-72"> {children}</main>
    </div>
  );
}

export default DashboardLayout;
