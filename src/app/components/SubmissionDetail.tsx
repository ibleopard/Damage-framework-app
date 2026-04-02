import { useNavigate, useParams } from "react-router";
import { 
  Building2, LogOut, MapPin, Calendar, AlertTriangle, 
  CheckCircle, XCircle, Download, FileText, Image as ImageIcon,
  ArrowLeft, User
} from "lucide-react";

export function SubmissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const submission = {
    id: id || "AS-2026-001",
    location: {
      province: "Gilgit-Baltistan",
      district: "District Ghanche",
      village: "Ghulshan-e-Kabbir",
      address: "Restoration of Drinking Water supply Dumsum and Sino",
      latitude: "35°11'55\"N",
      longitude: "76°36'01\"E",
    },
    event: {
      type: "Flood",
      date: "21st to 23rd July 2025",
      assessmentDate: "March 25, 2026",
    },
    damage: {
      level: "Minor",
      infrastructure: "Water Supply Systems - Drinking Water Supply",
      description: "Water Supply pipe line damage affecting the main distribution network",
      structuralIssues: ["Water Damage", "Foundation Damage"],
      estimatedCost: "1,474,360",
    },
    structure: {
      type: "Water Supply System",
      ownership: "Public",
      usage: "Drinking Water Supply",
    },
    inspector: {
      name: "Field Inspector #42",
      team: "C&W Department Ghanche",
      contact: "inspector42@ndma.gov.pk",
    },
    status: "Pending",
    photos: 4,
    documents: 2,
  };

  const handleApprove = () => {
    alert("Assessment approved successfully!");
    navigate("/admin");
  };

  const handleReject = () => {
    alert("Assessment rejected!");
    navigate("/admin");
  };

  const getDamageLevelColor = (level: string) => {
    switch (level) {
      case "Minor": return "#2ECC71";
      case "Moderate": return "#F39C12";
      case "Severe": return "#E74C3C";
      default: return "#328CC1";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl" style={{ color: '#0B3C5D' }}>Submission Details</h1>
                <p className="text-sm text-gray-500">{submission.id}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Files Preview */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg mb-4" style={{ color: '#0B3C5D' }}>Uploaded Files</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Photographs ({submission.photos})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: submission.photos }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents ({submission.documents})
                </h4>
                <div className="space-y-2">
                  {Array.from({ length: submission.documents }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                    >
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Assessment_Form_{i + 1}.pdf</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all hover:opacity-80"
                style={{ 
                  borderColor: '#328CC1',
                  color: '#328CC1'
                }}
              >
                <Download className="w-5 h-5" />
                Download All Files
              </button>
            </div>
          </div>

          {/* Right Column: Structured Data */}
          <div className="col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg mb-2" style={{ color: '#0B3C5D' }}>Assessment Status</h3>
                  <span
                    className="px-4 py-2 rounded-full text-sm inline-block"
                    style={{
                      backgroundColor: '#328CC115',
                      color: '#328CC1',
                    }}
                  >
                    {submission.status}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#2ECC71' }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#E74C3C' }}
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: '#0B3C5D' }}>
                <MapPin className="w-5 h-5" />
                Location Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Province</p>
                  <p className="text-gray-900">{submission.location.province}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">District</p>
                  <p className="text-gray-900">{submission.location.district}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Village/Area</p>
                  <p className="text-gray-900">{submission.location.village}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">GPS Coordinates</p>
                  <p className="text-gray-900">{submission.location.latitude}, {submission.location.longitude}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Full Address</p>
                  <p className="text-gray-900">{submission.location.address}</p>
                </div>
              </div>
            </div>

            {/* Event Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: '#0B3C5D' }}>
                <Calendar className="w-5 h-5" />
                Event Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Event Type</p>
                  <p className="text-gray-900">{submission.event.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Event Date</p>
                  <p className="text-gray-900">{submission.event.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Assessment Date</p>
                  <p className="text-gray-900">{submission.event.assessmentDate}</p>
                </div>
              </div>
            </div>

            {/* Damage Assessment */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: '#0B3C5D' }}>
                <AlertTriangle className="w-5 h-5" />
                Damage Assessment
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Damage Level</p>
                  <span
                    className="px-4 py-2 rounded-full text-sm inline-flex items-center gap-2"
                    style={{
                      backgroundColor: `${getDamageLevelColor(submission.damage.level)}15`,
                      color: getDamageLevelColor(submission.damage.level),
                    }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {submission.damage.level} (Repair Required)
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Infrastructure Affected</p>
                  <p className="text-gray-900">{submission.damage.infrastructure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Damage Description</p>
                  <p className="text-gray-900">{submission.damage.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Structural Issues</p>
                  <div className="flex flex-wrap gap-2">
                    {submission.damage.structuralIssues.map((issue, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Repair Cost</p>
                  <p className="text-2xl" style={{ color: '#0B3C5D' }}>
                    PKR {submission.damage.estimatedCost}
                  </p>
                </div>
              </div>
            </div>

            {/* Structure Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg mb-4" style={{ color: '#0B3C5D' }}>Structure Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p className="text-gray-900">{submission.structure.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ownership</p>
                  <p className="text-gray-900">{submission.structure.ownership}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Primary Usage</p>
                  <p className="text-gray-900">{submission.structure.usage}</p>
                </div>
              </div>
            </div>

            {/* Inspector Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2" style={{ color: '#0B3C5D' }}>
                <User className="w-5 h-5" />
                Inspector Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Inspector ID</p>
                  <p className="text-gray-900">{submission.inspector.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Assessment Team</p>
                  <p className="text-gray-900">{submission.inspector.team}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Contact</p>
                  <p className="text-gray-900">{submission.inspector.contact}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all hover:opacity-80"
                  style={{ 
                    borderColor: '#328CC1',
                    color: '#328CC1'
                  }}
                >
                  <Download className="w-5 h-5" />
                  Export as PDF
                </button>
                <button
                  onClick={() => navigate("/admin")}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
