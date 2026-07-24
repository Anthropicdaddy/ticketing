import { AdminSidebar } from "@/components/admin-sidebar";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1">
        <div className="flex items-center justify-end p-4 border-b">
          <UserButton />
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
