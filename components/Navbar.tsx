"use client";
import { UserButton } from "@clerk/nextjs";

import MobileSidedar from "@/components/MobileSidebar";

function Navbar({
  currentApiLimit,
  isPro,
}: {
  currentApiLimit: number;
  isPro: boolean;
}) {
  return (
    <div className="flex items-center p-4">
      <MobileSidedar currentApiLimit={currentApiLimit} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;
