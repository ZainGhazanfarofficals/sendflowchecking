import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
  setSidebarTitle,
  setCampaignsKey,
}) {
  return (
    <section className="flex">
      <Sidebar setSidebarTitle={setSidebarTitle} setCampaignsKey={setCampaignsKey} />

      <div className="container">
        {children}
      </div>
    </section>
  );
}
