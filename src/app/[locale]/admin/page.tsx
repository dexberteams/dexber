import { MessageSquare, Users, Briefcase, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Inquiries", value: "24", icon: MessageSquare, trend: "+12% this month" },
    { label: "Active Projects", value: "7", icon: Briefcase, trend: "3 completing soon" },
    { label: "Clients Served", value: "42", icon: Users, trend: "+4 this month" },
    { label: "Revenue (Est)", value: "$12,400", icon: TrendingUp, trend: "+18% vs last month" },
  ];

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

      {/* Recent Activity (Mock) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center pb-4 border-b border-slate-800 last:border-0 last:pb-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
              <div>
                <p className="text-white text-sm">New inquiry from <strong>Company {i}</strong></p>
                <p className="text-xs text-slate-500">{i * 2} hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
