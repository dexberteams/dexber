import { MessageSquare, Users, Briefcase, TrendingUp } from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const totalInquiries = await db.inquiry.count();
  const totalRequirements = await db.requirementForm.count();
  const totalProjects = await db.project.count();
  const totalClientsServed = totalInquiries + totalRequirements; // Rough estimate

  const stats = [
    { label: "Total Inquiries", value: totalInquiries.toString(), icon: MessageSquare, trend: "Standard Contact" },
    { label: "Project Requirements", value: totalRequirements.toString(), icon: Briefcase, trend: "Detailed Submissions" },
    { label: "Total Projects", value: totalProjects.toString(), icon: Users, trend: "Portfolio" },
    { label: "Revenue (Est)", value: "$12,400", icon: TrendingUp, trend: "+18% vs last month" },
  ];

  // Fetch recent activity
  const recentInquiries = await db.inquiry.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 font-medium">{stat.label}</p>
            <p className="text-xs text-slate-500 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentInquiries.map((inquiry) => (
            <div key={inquiry.id} className="flex items-center p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full me-4"></div>
              <div className="flex-1 flex justify-between items-center">
                <p className="text-white text-sm">New inquiry from <strong>{inquiry.company || inquiry.name}</strong></p>
                <p className="text-xs text-slate-500">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {recentInquiries.length === 0 && (
            <p className="text-sm text-slate-500">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}
