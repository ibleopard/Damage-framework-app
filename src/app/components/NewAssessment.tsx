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
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
          {/* Desktop/Tablet Progress View */}
          <div className="hidden sm:flex items-center justify-between gap-2 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                        isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-gray-400 bg-gray-100'
                      }`}
                      style={isActive ? { backgroundColor: '#0B3C5D' } : isCompleted ? { backgroundColor: '#2ECC71' } : {}}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <p className={`mt-2 text-xs md:text-sm ${isActive ? 'font-medium' : ''}`} style={isActive ? { color: '#0B3C5D' } : {}}>
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-1 md:mx-2 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} 
                      style={isCompleted ? { backgroundColor: '#2ECC71' } : {}}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Progress View */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium" style={{ color: '#0B3C5D' }}>
                Step {currentStep} of {steps.length}
              </p>
              <p className="text-xs text-gray-600">{steps[currentStep - 1]?.label}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                  backgroundColor: '#0B3C5D'
                }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                Location Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Province / Region
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => updateFormData("province", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ focusRingColor: '#328CC1' }}
                  >
                    <option value="">Select Province</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    District / City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    placeholder="e.g., District Ghanche"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  rows={3}
                  placeholder="Enter complete address with landmarks"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => updateFormData("latitude", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    placeholder="35.1988 N"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => updateFormData("longitude", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    placeholder="76.6003 E"
                  />
                </div>
              </div>

              <button
                onClick={autoDetectLocation}
                className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all hover:opacity-80 text-sm"
                style={{ 
                  borderColor: '#328CC1',
                  color: '#328CC1'
                }}
              >
                <Locate className="w-4 h-4 sm:w-5 sm:h-5" />
                Auto-detect GPS
              </button>
            </div>
          )}

          {/* Step 2: Structure */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                Structure Information
              </h2>
              
              <div>
                <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Building Type
                </label>
                <select
                  value={formData.buildingType}
                  onChange={(e) => updateFormData("buildingType", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
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

              <div>
                <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Primary Usage
                </label>
                <input
                  type="text"
                  value={formData.usage}
                  onChange={(e) => updateFormData("usage", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  placeholder="e.g., Single family home, Office building"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Year Built (if known)
                </label>
                <input
                  type="text"
                  value={formData.yearBuilt}
                  onChange={(e) => updateFormData("yearBuilt", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  placeholder="e.g., 2010"
                />
              </div>
            </div>
          )}

          {/* Step 3: Damage */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                Damage Assessment
              </h2>
              
              <div>
                <label className="block mb-3 text-xs sm:text-sm font-medium text-gray-700">
                  Damage Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { value: "Minor", color: "#2ECC71", label: "Minor (Repair Req.)" },
                    { value: "Moderate", color: "#F39C12", label: "Moderate (Major Repairs)" },
                    { value: "Severe", color: "#E74C3C", label: "Severe (Reconstruction)" },
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => updateFormData("damageLevel", level.value)}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
                        formData.damageLevel === level.value ? 'text-white' : 'bg-white'
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
                <label className="block mb-3 text-xs sm:text-sm font-medium text-gray-700">
                  Structural Issues (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
                      className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={formData.structuralIssues.includes(issue)}
                        onChange={() => toggleIssue(issue)}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ accentColor: '#0B3C5D' }}
                      />
                      <span>{issue}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                  rows={5}
                  placeholder="Describe the damage in detail, including any immediate safety concerns..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Evidence */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                Upload Evidence
              </h2>
              
              <div>
                <label className="block mb-3 text-xs sm:text-sm font-medium text-gray-700">
                  Photographs
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 text-center hover:bg-gray-50 transition-colors">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" />
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Drag & drop photos or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-3 sm:mb-4">
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
                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white cursor-pointer transition-all hover:opacity-90 text-xs sm:text-sm"
                    style={{ backgroundColor: '#328CC1' }}
                  >
                    Choose Files
                  </label>
                  {formData.photos.length > 0 && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm" style={{ color: '#2ECC71' }}>
                      ✓ {formData.photos.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-3 text-xs sm:text-sm font-medium text-gray-700">
                  Documents (PDFs, Reports)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 text-center hover:bg-gray-50 transition-colors">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" />
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    Upload assessment forms or handwritten notes
                  </p>
                  <p className="text-xs text-gray-500 mb-3 sm:mb-4">
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
                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white cursor-pointer transition-all hover:opacity-90 text-xs sm:text-sm"
                    style={{ backgroundColor: '#328CC1' }}
                  >
                    Choose Files
                  </label>
                  {formData.documents.length > 0 && (
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm" style={{ color: '#2ECC71' }}>
                      ✓ {formData.documents.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#0B3C5D' }}>
                Review & Submit
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm sm:text-lg font-medium mb-2" style={{ color: '#0B3C5D' }}>
                    Location
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">
                    {formData.province}, {formData.city}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{formData.address}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    GPS: {formData.latitude}, {formData.longitude}
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm sm:text-lg font-medium mb-2" style={{ color: '#0B3C5D' }}>
                    Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">Type: {formData.buildingType}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Usage: {formData.usage}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Year Built: {formData.yearBuilt || "N/A"}</p>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm sm:text-lg font-medium mb-2" style={{ color: '#0B3C5D' }}>
                    Damage Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">Level: {formData.damageLevel}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Issues: {formData.structuralIssues.join(", ") || "None selected"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">{formData.description}</p>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm sm:text-lg font-medium mb-2" style={{ color: '#0B3C5D' }}>
                    Evidence
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">
                    Photos: {formData.photos.length} file(s)
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Documents: {formData.documents.length} file(s)
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  Please review all information carefully before submitting. Once submitted, this assessment will be sent for review.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition-all hover:opacity-90 text-sm sm:text-base order-1 sm:order-2"
                style={{ backgroundColor: '#0B3C5D' }}
              >
                Next
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white transition-all hover:opacity-90 text-sm sm:text-base order-1 sm:order-2"
                style={{ backgroundColor: '#2ECC71' }}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}