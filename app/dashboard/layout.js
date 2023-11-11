"use client"
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
  setSidebarTitle,
  setCampaignsKey,
}) {
  return (
    <section className="flex ">
      <Sidebar setSidebarTitle={setSidebarTitle} setCampaignsKey={setCampaignsKey} />

      <div className="h-auto w-full max-w-[50rem] p-4 shadow-2xl shadow-blue-gray-900 border-primary mt-40 ml-8">
        {children}
      </div>
    </section>
  );
}
