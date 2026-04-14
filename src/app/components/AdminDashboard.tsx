import { useState } from "react";
import { useNavigate } from "react-router";
import { useIsMobile } from "./ui/use-mobile";
import { 
  Building2, LogOut, FileText, Filter, Download, 
  MapPin, Calendar, AlertTriangle, ChevronDown, Menu, X
} from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDamage, setSelectedDamage] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

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
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0B3C5D' }}>
              <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold" style={{ color: '#0B3C5D' }}>
                NDMA Admin
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Assessment System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:block px-3 sm:px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs sm:text-sm"
            >
              Field View
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all text-xs sm:text-sm"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#0B3C5D' }}>
                All Submissions
              </h2>
              <button
                className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-4 py-2 rounded-lg border-2 transition-all hover:opacity-80 text-xs sm:text-sm"
                style={{ 
                  borderColor: '#2ECC71',
                  color: '#2ECC71'
                }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Export CSV
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-600">Filter:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none text-xs sm:text-sm"
                    style={{ focusRingColor: '#328CC1' }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedDamage}
                    onChange={(e) => setSelectedDamage(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none text-xs sm:text-sm"
                    style={{ focusRingColor: '#328CC1' }}
                  >
                    <option value="all">All Damage Levels</option>
                    <option value="minor">Minor</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">ID</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Location</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Damage</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Inspector</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-xs md:text-sm text-gray-900">{submission.id}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 max-w-xs">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-700 truncate">{submission.location}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span
                        className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm inline-flex items-center gap-1 font-medium"
                        style={{
                          backgroundColor: `${getDamageLevelColor(submission.damageLevel)}15`,
                          color: getDamageLevelColor(submission.damageLevel),
                        }}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {submission.damageLevel}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600">
                      {submission.inspector}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{submission.date}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span
                        className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                        style={{
                          backgroundColor: `${submission.statusColor}15`,
                          color: submission.statusColor,
                        }}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <button
                        onClick={() => navigate(`/admin/submission/${submission.id}`)}
                        className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-lg text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: '#0B3C5D' }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {submissions.map((submission) => (
              <div key={submission.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="space-y-3">
                  {/* ID and Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-bold text-sm text-gray-900">{submission.id}</span>
                    </div>
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                      style={{
                        backgroundColor: `${submission.statusColor}15`,
                        color: submission.statusColor,
                      }}
                    >
                      {submission.status}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{submission.location}</span>
                  </div>

                  {/* Date and Inspector */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">{submission.date}</span>
                  </div>

                  {/* Damage Level */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1"
                      style={{
                        backgroundColor: `${getDamageLevelColor(submission.damageLevel)}15`,
                        color: getDamageLevelColor(submission.damageLevel),
                      }}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {submission.damageLevel}
                    </span>
                    <span className="text-xs text-gray-600">{submission.inspector}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/admin/submission/${submission.id}`)}
                    className="w-full text-xs px-3 py-2 rounded-lg text-white transition-all hover:opacity-90 mt-2"
                    style={{ backgroundColor: '#0B3C5D' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing 1 to {submissions.length} of 234 submissions
              </p>
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                <button
                  className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                  disabled
                >
                  Previous
                </button>
                <button className="px-2 sm:px-4 py-2 rounded-lg text-white text-xs sm:text-sm" style={{ backgroundColor: '#0B3C5D' }}>
                  1
                </button>
                <button className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm">
                  2
                </button>
                <button className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
