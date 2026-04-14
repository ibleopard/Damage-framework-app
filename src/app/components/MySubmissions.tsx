import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { FileText, Calendar, MapPin, AlertTriangle } from "lucide-react";

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
      cost: "1,474,360",
    },
    {
      id: "AS-2026-002",
      location: "District Skardu, Sadpara",
      damageLevel: "Moderate",
      date: "March 24, 2026",
      status: "Approved",
      statusColor: "#2ECC71",
      cost: "2,890,500",
    },
    {
      id: "AS-2026-003",
      location: "District Gilgit, Jutial",
      damageLevel: "Minor",
      date: "March 23, 2026",
      status: "Approved",
      statusColor: "#2ECC71",
      cost: "890,000",
    },
    {
      id: "AS-2026-004",
      location: "District Hunza, Karimabad",
      damageLevel: "Severe",
      date: "March 22, 2026",
      status: "Under Review",
      statusColor: "#F39C12",
      cost: "5,240,000",
    },
    {
      id: "AS-2026-005",
      location: "District Astore, Bulen",
      damageLevel: "Moderate",
      date: "March 21, 2026",
      status: "Rejected",
      statusColor: "#E74C3C",
      cost: "1,560,000",
    },
  ];

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case "Minor": return "#2ECC71";
      case "Moderate": return "#F39C12";
      case "Severe": return "#E74C3C";
      default: return "#328CC1";
    }
  };

  return (
    <Layout title="My Submissions">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: '#0B3C5D' }}>
                Assessment Submissions
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Track and manage your damage assessments</p>
            </div>
            <button
              onClick={() => navigate("/new-assessment")}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition-all hover:opacity-90 text-sm sm:text-base font-medium"
              style={{ backgroundColor: '#0B3C5D' }}
            >
              New Assessment
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Submission ID
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Damage Level
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Est. Cost (PKR)
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Date
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-sm text-gray-900">{submission.id}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2 max-w-xs">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{submission.location}</span>
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
                  <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-700 font-medium">
                    {submission.cost}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{submission.date}</span>
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
                      className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-lg border-2 transition-all hover:opacity-80 whitespace-nowrap"
                      style={{
                        borderColor: '#328CC1',
                        color: '#328CC1',
                      }}
                    >
                      View Details
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

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{submission.date}</span>
                </div>

                {/* Damage Level and Cost */}
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
                  <span className="text-xs font-medium text-gray-700">
                    ₨ {submission.cost}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/admin/submission/${submission.id}`)}
                  className="w-full text-xs px-3 py-2 rounded-lg border-2 transition-all hover:opacity-80 mt-2"
                  style={{
                    borderColor: '#328CC1',
                    color: '#328CC1',
                  }}
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
              Showing 1 to {submissions.length} of {submissions.length} submissions
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                disabled
              >
                Previous
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
