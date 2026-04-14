import { useState } from "react";
import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { 
  MapPin, Building, AlertCircle, Upload, CheckCircle, 
  ChevronRight, ChevronLeft, Locate 
} from "lucide-react";

interface FormData {
  // Step 1: Location
  province: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  
  // Step 2: Structure
  buildingType: string;
  usage: string;
  yearBuilt: string;
  
  // Step 3: Damage
  damageLevel: string;
  structuralIssues: string[];
  description: string;
  
  // Step 4: Evidence
  photos: File[];
  documents: File[];
}

export function NewAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    province: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    buildingType: "",
    usage: "",
    yearBuilt: "",
    damageLevel: "",
    structuralIssues: [],
    description: "",
    photos: [],
    documents: [],
  });

  const steps = [
    { number: 1, label: "Location", icon: MapPin },
    { number: 2, label: "Structure", icon: Building },
    { number: 3, label: "Damage", icon: AlertCircle },
    { number: 4, label: "Evidence", icon: Upload },
    { number: 5, label: "Review", icon: CheckCircle },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission
    alert("Assessment submitted successfully!");
    navigate("/dashboard");
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleIssue = (issue: string) => {
    const issues = formData.structuralIssues.includes(issue)
      ? formData.structuralIssues.filter(i => i !== issue)
      : [...formData.structuralIssues, issue];
    updateFormData("structuralIssues", issues);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photos" | "documents") => {
    if (e.target.files) {
      updateFormData(field, Array.from(e.target.files));
    }
  };

  const autoDetectLocation = () => {
    // Mock GPS detection
    updateFormData("latitude", "35.1988 N");
    updateFormData("longitude", "76.6003 E");
  };

  return (
    <Layout title="New Damage Assessment">
      <div className="w-full max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-0">
        {/* Premium Progress Stepper */}
        <div className="card card-elevated rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
          
          {/* Desktop/Tablet Stepper */}
          <div className="hidden sm:flex items-center justify-between gap-2 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full flex-shrink-0 group transition-all duration-200"
                      style={
                        isActive 
                          ? {
                              background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
                              boxShadow: '0 8px 20px rgba(11, 60, 93, 0.3), 0 0 1px rgba(255, 255, 255, 0.5) inset'
                            }
                          : isCompleted
                          ? {
                              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }
                          : {
                              backgroundColor: '#F3F4F6',
                              border: '2px solid #E5E7EB'
                            }
                      }>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <p className={`mt-3 text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive ? 'font-bold' : ''
                    }`} style={isActive ? { color: '#0B3C5D' } : { color: isCompleted ? '#10B981' : '#9CA3AF' }}>
                      {step.label}
                    </p>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="h-1 flex-1 mx-1 md:mx-2 rounded-full transition-all duration-300 flex-shrink-0" 
                      style={isCompleted ? { background: 'linear-gradient(90deg, #10B981 0%, #10B981 100%)' } : { backgroundColor: '#E5E7EB' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Progress Bar */}
          <div className="sm:hidden space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold" style={{ color: '#0B3C5D' }}>
                Step {currentStep} of {steps.length}
              </p>
              <p className="text-xs text-gray-600 font-medium">{steps[currentStep - 1]?.label}</p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                  background: 'linear-gradient(90deg, #0B3C5D 0%, #328CC1 100%)',
                  boxShadow: '0 0 8px rgba(11, 60, 93, 0.3)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card card-elevated rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)' }}>
          
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
                  Location Details
                </h2>
                <p className="text-sm text-gray-600">
                  Enter the precise location of the damaged infrastructure
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="block mb-2.5 text-sm font-bold text-gray-900">
                    Province / Region
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => updateFormData("province", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select Province</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block mb-2.5 text-sm font-bold text-gray-900">
                    District / City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="input-field"
                    placeholder="e.g., District Ghanche"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block mb-2.5 text-sm font-bold text-gray-900">
                  Full Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Enter complete address with landmarks"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="block mb-2.5 text-sm font-bold text-gray-900">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => updateFormData("latitude", e.target.value)}
                    className="input-field"
                    placeholder="35.1988 N"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2.5 text-sm font-bold text-gray-900">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => updateFormData("longitude", e.target.value)}
                    className="input-field"
                    placeholder="76.6003 E"
                  />
                </div>
              </div>

              <button
                onClick={autoDetectLocation}
                className="btn-secondary btn-md"
              >
                <Locate className="w-5 h-5" />
                Auto-detect GPS
              </button>
            </div>
          )}

          {/* Step 2: Structure */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
                  Structure Information
                </h2>
                <p className="text-sm text-gray-600">
                  Describe the building structure and its original use
                </p>
              </div>

              <div className="form-group">
                <label className="block mb-2.5 text-sm font-bold text-gray-900">
                  Building Type
                </label>
                <select
                  value={formData.buildingType}
                  onChange={(e) => updateFormData("buildingType", e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Building Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Infrastructure">Infrastructure (Bridge/Road)</option>
                  <option value="Public Building">Public Building</option>
                  <option value="Water Supply">Water Supply System</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block mb-2.5 text-sm font-bold text-gray-900">
                  Primary Usage
                </label>
                <input
                  type="text"
                  value={formData.usage}
                  onChange={(e) => updateFormData("usage", e.target.value)}
                  className="input-field"
                  placeholder="e.g., Single family home, Office building"
                />
              </div>

              <div className="form-group">
                <label className="block mb-2.5 text-sm font-bold text-gray-900">
                  Year Built (if known)
                </label>
                <input
                  type="text"
                  value={formData.yearBuilt}
                  onChange={(e) => updateFormData("yearBuilt", e.target.value)}
                  className="input-field"
                  placeholder="e.g., 2010"
                />
              </div>
            </div>
          )}

          {/* Step 3: Damage */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
                  Damage Assessment
                </h2>
                <p className="text-sm text-gray-600">
                  Assess the severity and specific issues observed
                </p>
              </div>

              <div>
                <label className="block mb-4 text-sm font-bold text-gray-900">
                  Damage Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: "Minor", color: "#10B981", label: "Minor (Repair Req.)" },
                    { value: "Moderate", color: "#F59E0B", label: "Moderate (Major Repairs)" },
                    { value: "Severe", color: "#EF4444", label: "Severe (Reconstruction)" },
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => updateFormData("damageLevel", level.value)}
                      className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 font-bold text-sm sm:text-base group ${
                        formData.damageLevel === level.value 
                          ? 'text-white shadow-lg' 
                          : 'bg-white hover:shadow-md'
                      }`}
                      style={{
                        borderColor: level.color,
                        backgroundColor: formData.damageLevel === level.value ? level.color : 'white',
                        color: formData.damageLevel === level.value ? 'white' : level.color,
                      }}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-4 text-sm font-bold text-gray-900">
                  Structural Issues (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Foundation Damage",
                    "Wall Cracks",
                    "Roof Damage",
                    "Water Damage",
                    "Electrical Issues",
                    "Plumbing Issues",
                  ].map((issue) => (
                    <label
                      key={issue}
                      className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.structuralIssues.includes(issue)}
                        onChange={() => toggleIssue(issue)}
                        className="w-5 h-5 rounded transition-all"
                        style={{ accentColor: '#0B3C5D' }}
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{issue}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="block mb-2.5 text-sm font-bold text-gray-900">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="input-field resize-none"
                  rows={5}
                  placeholder="Describe the damage in detail, including any immediate safety concerns..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Evidence */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
                  Upload Evidence
                </h2>
                <p className="text-sm text-gray-600">
                  Upload photos and documents as supporting evidence
                </p>
              </div>

              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900">
                  Photographs
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
                  <Upload className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Drag & drop photos or click to browse
                  </p>
                  <p className="text-xs text-gray-600 mb-5">
                    Supported: JPG, PNG (Max 10MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "photos")}
                    className="hidden"
                    id="photos"
                  />
                  <label
                    htmlFor="photos"
                    className="btn-secondary btn-md inline-flex"
                  >
                    Choose Files
                  </label>
                  {formData.photos.length > 0 && (
                    <p className="mt-4 text-sm font-bold" style={{ color: '#10B981' }}>
                      ✓ {formData.photos.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900">
                  Documents (PDFs, Reports)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
                  <Upload className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Upload assessment forms or handwritten notes
                  </p>
                  <p className="text-xs text-gray-600 mb-5">
                    Supported: PDF, DOC (Max 20MB)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "documents")}
                    className="hidden"
                    id="documents"
                  />
                  <label
                    htmlFor="documents"
                    className="btn-secondary btn-md inline-flex"
                  >
                    Choose Files
                  </label>
                  {formData.documents.length > 0 && (
                    <p className="mt-4 text-sm font-bold" style={{ color: '#10B981' }}>
                      ✓ {formData.documents.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#0B3C5D' }}>
                  Review & Submit
                </h2>
                <p className="text-sm text-gray-600">
                  Please review all information carefully before submitting
                </p>
              </div>

              <div className="space-y-4">
                <div className="card rounded-xl p-5 sm:p-6 border-l-4" style={{ borderLeftColor: '#0B3C5D', background: 'linear-gradient(135deg, #F9FAFB 0%, white 100%)' }}>
                  <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#0B3C5D' }}>
                    Location
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-700 font-semibold">
                      {formData.province}, {formData.city}
                    </p>
                    <p className="text-gray-600">{formData.address}</p>
                    <p className="text-gray-600">
                      GPS: {formData.latitude}, {formData.longitude}
                    </p>
                  </div>
                </div>

                <div className="card rounded-xl p-5 sm:p-6 border-l-4" style={{ borderLeftColor: '#328CC1', background: 'linear-gradient(135deg, #F9FAFB 0%, white 100%)' }}>
                  <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#328CC1' }}>
                    Structure
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-700 font-semibold">Type: {formData.buildingType}</p>
                    <p className="text-gray-600">Usage: {formData.usage}</p>
                    <p className="text-gray-600">Year Built: {formData.yearBuilt || "N/A"}</p>
                  </div>
                </div>

                <div className="card rounded-xl p-5 sm:p-6 border-l-4" style={{ borderLeftColor: '#F59E0B', background: 'linear-gradient(135deg, #F9FAFB 0%, white 100%)' }}>
                  <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#F59E0B' }}>
                    Damage Assessment
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-700 font-semibold">Level: {formData.damageLevel}</p>
                    <p className="text-gray-600">
                      Issues: {formData.structuralIssues.join(", ") || "None selected"}
                    </p>
                    <p className="text-gray-600 mt-2">{formData.description}</p>
                  </div>
                </div>

                <div className="card rounded-xl p-5 sm:p-6 border-l-4" style={{ borderLeftColor: '#10B981', background: 'linear-gradient(135deg, #F9FAFB 0%, white 100%)' }}>
                  <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: '#10B981' }}>
                    Evidence
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-700 font-semibold">
                      Photos: {formData.photos.length} file(s)
                    </p>
                    <p className="text-gray-600">
                      Documents: {formData.documents.length} file(s)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border-l-4 border-blue-400" style={{ backgroundColor: '#EFF6FF' }}>
                <p className="text-sm text-blue-900 font-medium">
                  ✓ All information looks complete! Once submitted, this assessment will be sent for review by NDMA officials.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 order-last sm:order-none">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="btn-outline btn-lg flex items-center justify-center gap-2 order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="btn-primary btn-lg flex items-center justify-center gap-2 order-1 sm:order-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-lg flex items-center justify-center gap-2 order-1 sm:order-2 text-white font-bold transition-all duration-200 group"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle className="w-5 h-5" />
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}