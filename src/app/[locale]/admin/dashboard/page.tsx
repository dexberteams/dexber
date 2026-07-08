import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Basic protection: must be logged in and have admin role
  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin") {
    redirect("/"); // Or an unauthorized page
  }

  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-card-foreground">Total Users</h2>
          <p className="text-3xl font-bold mt-2 text-primary">124</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-card-foreground">Active Subscriptions</h2>
          <p className="text-3xl font-bold mt-2 text-primary">89</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-card-foreground">System Status</h2>
          <p className="text-3xl font-bold mt-2 text-green-500">Operational</p>
        </div>
      </div>
    </div>
  );
}
