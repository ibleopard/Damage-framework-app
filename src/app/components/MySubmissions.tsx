import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { FileText, Calendar, MapPin, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

export function MySubmissions() {
  const navigate = useNavigate();

  const submissions = [
    {
      id: "AS-2026-001",
      location: "District Ghanche, Ghulshan-e-Kabbir",
      damageLevel: "Minor",
      date: "March 25, 2026",
      status: "Pending",
      statusColor: "#328CC1",
      statusBg: "#E0F4FF",
      cost: "1,474,360",
    },
    {
      id: "AS-2026-002",
      location: "District Skardu, Sadpara",
      damageLevel: "Moderate",
      date: "March 24, 2026",
      status: "Approved",
      statusColor: "#10B981",
      statusBg: "#ECFDF5",
      cost: "2,890,500",
    },
    {
      id: "AS-2026-003",
      location: "District Gilgit, Jutial",
      damageLevel: "Minor",
      date: "March 23, 2026",
      status: "Approved",
      statusColor: "#10B981",
      statusBg: "#ECFDF5",
      cost: "890,000",
    },
    {
      id: "AS-2026-004",
      location: "District Hunza, Karimabad",
      damageLevel: "Severe",
      date: "March 22, 2026",
      status: "Under Review",
      statusColor: "#F59E0B",
      statusBg: "#FFFBEB",
      cost: "5,240,000",
    },
    {
      id: "AS-2026-005",
      location: "District Astore, Bulen",
      damageLevel: "Moderate",
      date: "March 21, 2026",
      status: "Rejected",
      statusColor: "#EF4444",
      statusBg: "#FEF2F2",
      cost: "1,560,000",
    },
  ];

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case "Minor": return { color: "#10B981", bg: "#ECFDF5" };
      case "Moderate": return { color: "#F59E0B", bg: "#FFFBEB" };
      case "Severe": return { color: "#EF4444", bg: "#FEF2F2" };
      default: return { color: "#328CC1", bg: "#E0F4FF" };
    }
  };

  return (
    <Layout title="My Submissions">
      <div className="space-y-6">
        {/* Header Card */}
        <div className="card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
              Assessment Submissions
            </h2>
            <p className="text-sm text-gray-600">Track and manage your damage assessments</p>
          </div>
          <button
            onClick={() => navigate("/new-assessment")}
            className="btn-primary btn-lg flex-shrink-0"
          >
            <FileText className="w-5 h-5" />
            New Assessment
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', borderBottom: '2px solid #E5E7EB' }}>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Submission ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Damage Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Est. Cost (PKR)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.map((submission, idx) => (
                  <tr key={submission.id} className="hover:bg-blue-50 transition-all duration-200 group"
                    style={{ borderBottomColor: idx === submissions.length - 1 ? 'transparent' : '#E5E7EB' }}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#E0F4FF' }}>
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{submission.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 max-w-xs">
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
                      <span className="text-sm font-bold text-gray-900">
                        ₨ {submission.cost}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
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
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="card rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
              <div className="space-y-4">
                {/* Header: ID + Status */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
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

                {/* Main Content */}
                <div className="space-y-3">
                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-700">{submission.location}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{submission.date}</span>
                  </div>

                  {/* Damage & Cost Row */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-200">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1"
                      style={{
                        backgroundColor: getDamageLevelColor(submission.damageLevel).bg,
                        color: getDamageLevelColor(submission.damageLevel).color,
                      }}>
                      <AlertTriangle className="w-3 h-3" />
                      {submission.damageLevel}
                    </span>
                    <span className="text-xs font-bold text-gray-700">
                      ₨ {submission.cost}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/admin/submission/${submission.id}`)}
                  className="btn-outline btn-md w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600 font-medium">
            Showing 1 to <span className="font-bold">{submissions.length}</span> of <span className="font-bold">{submissions.length}</span> submissions
          </p>
          <div className="flex gap-2">
            <button className="btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled>
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button className="btn-outline btn-sm flex items-center gap-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
