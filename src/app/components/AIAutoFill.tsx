import { useState } from "react";
import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { Upload, Sparkles, CheckCircle, FileText, Edit } from "lucide-react";

export function AIAutoFill() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      processFile();
    }
  };

  const processFile = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };

  const mockExtractedData = {
    province: "",
    city: "",
    village: "",
    latitude: "",
    longitude: "",
    dateOfEvent: "",
    typeOfEvent: "",
    infrastructureAffected: "",
    damageDescription: "",
    structureType: "",
    ownership: "",
    damageExtent: "",
    estimatedCost: "",
    assessmentTeam: "",
  };

  return (
    <Layout title="AI-Powered Form Upload">
      <div className="max-w-6xl mx-auto">
        {!isProcessed ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#328CC115' }}>
                <Sparkles className="w-8 h-8" style={{ color: '#328CC1' }} />
              </div>
              <h2 className="text-2xl mb-2" style={{ color: '#0B3C5D' }}>AI Form Extraction</h2>
              <p className="text-gray-600">
                Upload a PDF or image of a filled assessment form. Our AI will automatically extract and populate the data.
              </p>
            </div>

            {!file ? (
              <div className="border-2 border-dashed rounded-xl p-12 text-center hover:bg-gray-50 transition-colors" style={{ borderColor: '#328CC1' }}>
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2 text-gray-700">Upload Assessment Form</h3>
                <p className="text-gray-500 mb-6">
                  Drag & drop your file here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-8 py-3 rounded-lg text-white cursor-pointer transition-all hover:opacity-90"
                  style={{ backgroundColor: '#328CC1' }}
                >
                  Select File
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, JPG, PNG (Max 20MB)
                </p>
              </div>
            ) : (
              <div className="text-center">
                {isProcessing ? (
                  <div className="py-12">
                    <div className="inline-block w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: '#328CC1', borderTopColor: 'transparent' }} />
                    <h3 className="text-xl mb-2" style={{ color: '#0B3C5D' }}>Processing Document...</h3>
                    <p className="text-gray-600">AI is extracting information from your form</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#2ECC71' }} />
                    <h3 className="text-xl mb-2" style={{ color: '#2ECC71' }}>Processing Complete!</h3>
                    <p className="text-gray-600">Data has been extracted successfully</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 mt-0.5" style={{ color: '#328CC1' }} />
                <div className="flex-1">
                  <h4 className="font-medium mb-1" style={{ color: '#0B3C5D' }}>AI-Powered Extraction</h4>
                  <p className="text-sm text-gray-600">
                    Our AI technology can read handwritten forms, typed documents, and scanned PDFs. The system will extract location details, damage assessments, and other key information automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Preview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl mb-4" style={{ color: '#0B3C5D' }}>Uploaded Document</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">Document Preview</p>
                  <p className="text-sm text-gray-500">{file?.name}</p>
                </div>
              </div>
            </div>

            {/* Right: Extracted Data */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl" style={{ color: '#0B3C5D' }}>Extracted Information</h3>
                <span className="px-3 py-1 rounded-full text-sm flex items-center gap-2" style={{ 
                  backgroundColor: '#2ECC7115',
                  color: '#2ECC71'
                }}>
                  <Sparkles className="w-4 h-4" />
                  AI Extracted
                </span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Province / Region</label>
                  <input
                    type="text"
                    value={mockExtractedData.province}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">District / City</label>
                  <input
                    type="text"
                    value={mockExtractedData.city}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Village / Area</label>
                  <input
                    type="text"
                    value={mockExtractedData.village}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <label className="block text-sm mb-1 text-gray-600">Latitude</label>
                    <input
                      type="text"
                      value={mockExtractedData.latitude}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ backgroundColor: '#FFFEF0' }}
                    />
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <label className="block text-sm mb-1 text-gray-600">Longitude</label>
                    <input
                      type="text"
                      value={mockExtractedData.longitude}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ backgroundColor: '#FFFEF0' }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Date of Event</label>
                  <input
                    type="text"
                    value={mockExtractedData.dateOfEvent}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Type of Event</label>
                  <input
                    type="text"
                    value={mockExtractedData.typeOfEvent}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Infrastructure Affected</label>
                  <input
                    type="text"
                    value={mockExtractedData.infrastructureAffected}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Damage Description</label>
                  <input
                    type="text"
                    value={mockExtractedData.damageDescription}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Damage Extent</label>
                  <input
                    type="text"
                    value={mockExtractedData.damageExtent}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <label className="block text-sm mb-1 text-gray-600">Estimated Cost</label>
                  <input
                    type="text"
                    value={mockExtractedData.estimatedCost}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#FFFEF0' }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate("/new-assessment")}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0B3C5D' }}
                >
                  <Edit className="w-5 h-5" />
                  Confirm & Edit
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setIsProcessed(false);
                  }}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Upload New
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
