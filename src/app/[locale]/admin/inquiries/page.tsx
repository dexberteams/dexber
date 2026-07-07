import { Eye, Trash2, Mail } from "lucide-react";

const MOCK_INQUIRIES = [
  { id: 1, name: "Ahmed Ali", company: "TechNova", type: "Business Website", date: "2 hours ago", status: "New" },
  { id: 2, name: "Sarah Smith", company: "Brew Coffee", type: "Coffee Shop", date: "1 day ago", status: "In Review" },
  { id: 3, name: "Mohammed Khalid", company: "", type: "Portfolio", date: "3 days ago", status: "Contacted" },
];

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Client Inquiries</h1>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 text-slate-400 text-sm border-b border-slate-800">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Website Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {MOCK_INQUIRIES.map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{inquiry.name}</td>
                <td className="px-6 py-4">{inquiry.company || "-"}</td>
                <td className="px-6 py-4">{inquiry.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inquiry.status === "New" ? "bg-blue-500/10 text-blue-400" :
                    inquiry.status === "In Review" ? "bg-amber-500/10 text-amber-400" :
                    "bg-green-500/10 text-green-400"
                  }`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{inquiry.date}</td>
                <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {MOCK_INQUIRIES.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No inquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
