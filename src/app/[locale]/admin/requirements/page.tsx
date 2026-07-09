"use client";

import { Eye, Trash2, Mail } from "lucide-react";
import { useEffect, useState } from "react";

type Requirement = {
  id: string;
  clientName: string;
  companyName: string | null;
  email: string;
  websiteType: string;
  status: string;
  createdAt: string;
  // Other fields omitted for brevity, will display in modal if needed
  budget: string | null;
  features: string[];
};

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const res = await fetch("/api/admin/requirements");
      if (res.ok) {
        const data = await res.json();
        setRequirements(data.requirements);
      }
    } catch (error) {
      console.error("Failed to fetch requirements", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/requirements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRequirements(requirements.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const deleteRequirement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this requirement?")) return;
    try {
      const res = await fetch(`/api/admin/requirements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequirements(requirements.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Project Requirements</h1>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading requirements...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-sm border-b border-slate-800">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Website Type</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {requirements.map((req) => (
                <tr key={req.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {req.clientName}
                    <div className="text-xs text-slate-500 font-normal">{req.companyName}</div>
                  </td>
                  <td className="px-6 py-4">{req.websiteType}</td>
                  <td className="px-6 py-4">{req.budget || "-"}</td>
                  <td className="px-6 py-4">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className={`bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        req.status === "NEW" ? "text-blue-400" :
                        req.status === "IN_REVIEW" ? "text-amber-400" :
                        req.status === "COMPLETED" ? "text-green-400" :
                        "text-slate-400"
                      }`}
                    >
                      <option value="NEW">New</option>
                      <option value="IN_REVIEW">In Review</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                    <a href={`mailto:${req.email}`} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={() => alert(JSON.stringify(req, null, 2))}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteRequirement(req.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && requirements.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No project requirements found.
          </div>
        )}
      </div>
    </div>
  );
}
