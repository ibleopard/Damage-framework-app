import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { FileText, Upload, CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Submissions", value: "234", icon: FileText, color: "#0B3C5D" },
    { label: "Pending Reviews", value: "18", icon: Clock, color: "#328CC1" },
    { label: "Approved", value: "189", icon: CheckCircle, color: "#2ECC71" },
    { label: "Critical Cases", value: "12", icon: AlertTriangle, color: "#E74C3C" },
  ];

  return (
    <Layout title="Welcome back, Field Inspector">
      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8" style={{ borderLeft: '4px solid #0B3C5D' }}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl mb-2" style={{ color: '#0B3C5D' }}>Start Your Assessment</h2>
            <p className="text-gray-600 mb-4">
              Document infrastructure damage efficiently with our streamlined process
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/new-assessment")}
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: '#0B3C5D' }}
              >
                <FileText className="w-5 h-5" />
                Start New Assessment
              </button>
              <button
                onClick={() => navigate("/ai-autofill")}
                className="px-6 py-3 rounded-lg border-2 transition-all hover:opacity-80 flex items-center gap-2"
                style={{ 
                  borderColor: '#328CC1',
                  color: '#328CC1',
                  backgroundColor: 'transparent'
                }}
              >
                <Upload className="w-5 h-5" />
                Upload Form (PDF/Image)
              </button>
            </div>
          </div>
          <TrendingUp className="w-12 h-12 text-gray-300" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl mb-4" style={{ color: '#0B3C5D' }}>Recent Submissions</h3>
        <div className="space-y-3">
          {[
            { location: "District Ghanche, Ghulshan-e-Kabbir", date: "March 25, 2026", status: "Pending", statusColor: "#328CC1" },
            { location: "District Skardu, Sadpara", date: "March 24, 2026", status: "Approved", statusColor: "#2ECC71" },
            { location: "District Gilgit, Jutial", date: "March 23, 2026", status: "Approved", statusColor: "#2ECC71" },
            { location: "District Hunza, Karimabad", date: "March 22, 2026", status: "Pending", statusColor: "#328CC1" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate("/my-submissions")}
            >
              <div className="flex-1">
                <p className="text-gray-900">{item.location}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <span className="px-4 py-1 rounded-full text-sm" style={{ 
                backgroundColor: `${item.statusColor}15`,
                color: item.statusColor
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/my-submissions")}
          className="w-full mt-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
        >
          View All Submissions
        </button>
      </div>
    </Layout>
  );
}
