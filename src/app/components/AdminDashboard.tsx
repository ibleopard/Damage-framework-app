import { useState } from "react";
import { useNavigate } from "react-router";
import { useIsMobile } from "./ui/use-mobile";
import { 
  Building2, LogOut, FileText, Filter, Download, 
  MapPin, Calendar, AlertTriangle, ChevronDown, ChevronLeft, ChevronRight,
  Clock, CheckCircle
} from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
      statusBg: "#E0F4FF",
      inspector: "Field Inspector #42",
    },
    {
      id: "AS-2026-002",
      location: "District Skardu, Sadpara",
      damageLevel: "Moderate",
      date: "March 24, 2026",
      status: "Approved",
      statusColor: "#10B981",
      statusBg: "#ECFDF5",
      inspector: "Field Inspector #38",
    },
    {
      id: "AS-2026-003",
      location: "District Gilgit, Jutial",
      damageLevel: "Minor",
      date: "March 23, 2026",
      status: "Approved",
      statusColor: "#10B981",
      statusBg: "#ECFDF5",
      inspector: "Field Inspector #42",
    },
    {
      id: "AS-2026-004",
      location: "District Hunza, Karimabad",
      damageLevel: "Severe",
      date: "March 22, 2026",
      status: "Under Review",
      statusColor: "#F59E0B",
      statusBg: "#FFFBEB",
      inspector: "Field Inspector #15",
    },
    {
      id: "AS-2026-005",
      location: "District Astore, Bulen",
      damageLevel: "Moderate",
      date: "March 21, 2026",
      status: "Rejected",
      statusColor: "#EF4444",
      statusBg: "#FEF2F2",
      inspector: "Field Inspector #23",
    },
    {
      id: "AS-2026-006",
      location: "District Diamer, Chilas",
      damageLevel: "Severe",
      date: "March 20, 2026",
      status: "Pending",
      statusColor: "#328CC1",
      statusBg: "#E0F4FF",
      inspector: "Field Inspector #19",
    },
  ];

  const stats = [
    { label: "Total Submissions", value: "234", color: "#0B3C5D", icon: FileText },
    { label: "Pending", value: "18", color: "#328CC1", icon: Clock },
    { label: "Approved", value: "189", color: "#10B981", icon: CheckCircle },
    { label: "Rejected", value: "27", color: "#EF4444", icon: AlertTriangle },
  ];

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case "Minor": return { color: "#10B981", bg: "#ECFDF5" };
      case "Moderate": return { color: "#F59E0B", bg: "#FFFBEB" };
      case "Severe": return { color: "#EF4444", bg: "#FEF2F2" };
      default: return { color: "#328CC1", bg: "#E0F4FF" };
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9FC' }}>
      {/* Premium Header */}
      <header className="card card-flat border-b-2 sticky top-0 z-40" style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)', borderBottomColor: '#E5E7EB' }}>
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group"
              style={{
                background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
                boxShadow: '0 4px 12px rgba(11, 60, 93, 0.2)'
              }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold" style={{ color: '#0B3C5D' }}>
                NDMA Admin
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Infrastructure Assessment System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-outline btn-md hidden sm:flex"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="btn-outline btn-md flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card rounded-2xl p-6 sm:p-7 hover:shadow-lg transition-all duration-300 group border-t-4"
                style={{ borderTopColor: stat.color, background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Submissions Table Card */}
        <div className="card card-elevated rounded-2xl overflow-hidden">
          {/* Header & Filters */}
          <div className="p-6 sm:p-8 border-b-2 border-gray-200"
            style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#0B3C5D' }}>
                  All Submissions
                </h2>
                <p className="text-sm text-gray-600">Review and manage all damage assessments</p>
              </div>
              <button className="btn-secondary btn-lg flex items-center justify-center sm:justify-start gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="input-field flex-1 sm:flex-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={selectedDamage}
                  onChange={(e) => setSelectedDamage(e.target.value)}
                  className="input-field flex-1 sm:flex-none"
                >
                  <option value="all">All Damage Levels</option>
                  <option value="minor">Minor</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', borderBottom: '2px solid #E5E7EB' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Damage</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Inspector</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission, idx) => (
                  <tr key={submission.id} className="hover:bg-blue-50 transition-all duration-200 group"
                    style={{ borderBottomColor: idx === submissions.length - 1 ? 'transparent' : '#E5E7EB' }}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{submission.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 max-w-sm">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{submission.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
                        style={{
                          backgroundColor: getDamageLevelColor(submission.damageLevel).bg,
                          color: getDamageLevelColor(submission.damageLevel).color,
                        }}>
                        <AlertTriangle className="w-3 h-3" />
                        {submission.damageLevel}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 font-medium">{submission.inspector}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{submission.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: submission.statusBg,
                          color: submission.statusColor,
                        }}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => navigate(`/admin/submission/${submission.id}`)}
                        className="btn-outline btn-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-200">
            {submissions.map((submission) => (
              <div key={submission.id} className="p-4 sm:p-5 hover:bg-blue-50 transition-all duration-200">
                <div className="space-y-4">
                  {/* Header: ID + Status */}
                  <div className="flex items-start justify-between gap-2 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F4FF' }}>
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-900">{submission.id}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 whitespace-nowrap"
                      style={{
                        backgroundColor: submission.statusBg,
                        color: submission.statusColor,
                      }}>
                      {submission.status}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{submission.location}</span>
                  </div>

                  {/* Inspector & Date Row */}
                  <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
                    <span>{submission.inspector}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {submission.date}
                    </div>
                  </div>

                  {/* Damage Level & Action */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1"
                      style={{
                        backgroundColor: getDamageLevelColor(submission.damageLevel).bg,
                        color: getDamageLevelColor(submission.damageLevel).color,
                      }}>
                      <AlertTriangle className="w-3 h-3" />
                      {submission.damageLevel}
                    </span>
                    <button
                      onClick={() => navigate(`/admin/submission/${submission.id}`)}
                      className="btn-outline btn-sm"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Pagination */}
          <div className="px-6 py-5 border-t-2 border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-600 font-medium">
              Showing 1 to <span className="font-bold">{submissions.length}</span> of <span className="font-bold">234</span> submissions
            </p>
            <div className="flex gap-2">
              <button
                className="btn-outline btn-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button className="btn-primary btn-md">1</button>
              <button className="btn-outline btn-md">2</button>
              <button className="btn-outline btn-md flex items-center gap-1">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
