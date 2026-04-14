import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { FileText, Upload, CheckCircle, Clock, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Submissions", value: "234", icon: FileText, color: "#0B3C5D", bgLight: "#E8F1F7" },
    { label: "Pending Reviews", value: "18", icon: Clock, color: "#328CC1", bgLight: "#E0F4FF" },
    { label: "Approved", value: "189", icon: CheckCircle, color: "#10B981", bgLight: "#ECFDF5" },
    { label: "Critical Cases", value: "12", icon: AlertTriangle, color: "#EF4444", bgLight: "#FEF2F2" },
  ];

  return (
    <Layout title="Welcome back, Field Inspector">
      {/* Premium Welcome Card */}
      <div className="card card-elevated rounded-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)',
          borderLeft: '6px solid #0B3C5D'
        }}>
        <div className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none">
          <TrendingUp className="w-full h-full" color="#0B3C5D" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-3" style={{ color: '#0B3C5D' }}>
              Start Your Assessment
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed max-w-2xl">
              Document infrastructure damage efficiently. Complete assessments through our streamlined, step-by-step process with GPS tracking and photo verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/new-assessment")}
                className="btn-primary btn-lg group flex items-center justify-center"
              >
                <FileText className="w-5 h-5" />
                <span>New Report</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              </button>
              <button
                onClick={() => navigate("/ai-autofill")}
                className="btn-secondary btn-lg"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Form</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Premium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="card rounded-2xl p-6 sm:p-7 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default group"
              style={{ 
                borderTop: `4px solid ${stat.color}`,
                background: `linear-gradient(135deg, white 0%, ${stat.bgLight} 100%)`
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0" 
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-xs font-bold px-2 py-1 rounded-lg" style={{ 
                  backgroundColor: `${stat.color}15`, 
                  color: stat.color 
                }}>
                  {index === 0 ? '+12%' : index === 1 ? '+5%' : index === 2 ? '+8%' : '-3%'}
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <div className="mt-4 pt-4 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
                Updated today
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Submissions Section */}
      <div className="card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#0B3C5D' }}>
              Recent Submissions
            </h3>
            <p className="text-sm text-gray-500 mt-1">Latest damage assessments from field inspectors</p>
          </div>
          <button 
            onClick={() => navigate("/my-submissions")}
            className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity" 
            style={{ color: '#328CC1' }}>
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { location: "District Ghanche, Ghulshan-e-Kabbir", date: "March 25, 2026", status: "Pending", statusColor: "#328CC1", statusBg: "#E0F4FF" },
            { location: "District Skardu, Sadpara", date: "March 24, 2026", status: "Approved", statusColor: "#10B981", statusBg: "#ECFDF5" },
            { location: "District Gilgit, Jutial", date: "March 23, 2026", status: "Approved", statusColor: "#10B981", statusBg: "#ECFDF5" },
            { location: "District Hunza, Karimabad", date: "March 22, 2026", status: "Pending", statusColor: "#328CC1", statusBg: "#E0F4FF" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer group gap-3"
              onClick={() => navigate("/my-submissions")}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{item.location}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.date}</p>
              </div>
              <span
                className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0 w-fit whitespace-nowrap"
                style={{ 
                  backgroundColor: item.statusBg,
                  color: item.statusColor
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/my-submissions")}
          className="btn-outline btn-lg btn-full mt-6 sm:hidden"
        >
          View All Submissions
        </button>
      </div>
    </Layout>
  );
}
