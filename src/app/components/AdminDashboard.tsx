import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Building2, LogOut, FileText, Filter, Download, 
  MapPin, Calendar, AlertTriangle, ChevronDown 
} from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDamage, setSelectedDamage] = useState("all");

  const submissions = [
    {
      id: "AS-2026-001",
      location: "District Ghanche, Ghulshan-e-Kabbir",
      damageLevel: "Minor",
      date: "March 25, 2026",
      status: "Pending",
      statusColor: "#328CC1",
      inspector: "Field Inspector #42",
    },
    {
      id: "AS-2026-002",
      location: "District Skardu, Sadpara",
      damageLevel: "Moderate",
      date: "March 24, 2026",
      status: "Approved",
      statusColor: "#2ECC71",
      inspector: "Field Inspector #38",
    },
    {
      id: "AS-2026-003",
      location: "District Gilgit, Jutial",
      damageLevel: "Minor",
      date: "March 23, 2026",
      status: "Approved",
      statusColor: "#2ECC71",
      inspector: "Field Inspector #42",
    },
    {
      id: "AS-2026-004",
      location: "District Hunza, Karimabad",
      damageLevel: "Severe",
      date: "March 22, 2026",
      status: "Under Review",
      statusColor: "#F39C12",
      inspector: "Field Inspector #15",
    },
    {
      id: "AS-2026-005",
      location: "District Astore, Bulen",
      damageLevel: "Moderate",
      date: "March 21, 2026",
      status: "Rejected",
      statusColor: "#E74C3C",
      inspector: "Field Inspector #23",
    },
    {
      id: "AS-2026-006",
      location: "District Diamer, Chilas",
      damageLevel: "Severe",
      date: "March 20, 2026",
      status: "Pending",
      statusColor: "#328CC1",
      inspector: "Field Inspector #19",
    },
  ];

  const stats = [
    { label: "Total Submissions", value: "234", color: "#0B3C5D" },
    { label: "Pending", value: "18", color: "#328CC1" },
    { label: "Approved", value: "189", color: "#2ECC71" },
    { label: "Rejected", value: "27", color: "#E74C3C" },
  ];

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case "Minor": return "#2ECC71";
      case "Moderate": return "#F39C12";
      case "Severe": return "#E74C3C";
      default: return "#328CC1";
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl" style={{ color: '#0B3C5D' }}>NDMA Admin Panel</h1>
              <p className="text-sm text-gray-500">Infrastructure Damage Assessment System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Field View
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ color: '#0B3C5D' }}>All Submissions</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:opacity-80"
                style={{ 
                  borderColor: '#2ECC71',
                  color: '#2ECC71'
                }}
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Filter by:</span>
              </div>
              
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                  style={{ focusRingColor: '#328CC1' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedDamage}
                  onChange={(e) => setSelectedDamage(e.target.value)}
                  className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none"
                  style={{ focusRingColor: '#328CC1' }}
                >
                  <option value="all">All Damage Levels</option>
                  <option value="minor">Minor</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Location</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Damage Level</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Inspector</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{submission.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{submission.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm inline-flex items-center gap-1"
                        style={{
                          backgroundColor: `${getDamageLevelColor(submission.damageLevel)}15`,
                          color: getDamageLevelColor(submission.damageLevel),
                        }}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {submission.damageLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {submission.inspector}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{submission.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: `${submission.statusColor}15`,
                          color: submission.statusColor,
                        }}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/submission/${submission.id}`)}
                        className="text-sm px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#0B3C5D' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-gray-600">Showing 1 to {submissions.length} of 234 submissions</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0B3C5D' }}>
                1
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
