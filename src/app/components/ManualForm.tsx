import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Layout } from "./Layout";

export function ManualForm() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    alert("Proforma submitted successfully!");
    navigate("/my-submissions");
  };

  const handleReset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.currentTarget.form?.reset();
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#0B3C5D' }}>
              NDMA Infrastructure Damage Verification Proforma
            </h1>
            <p className="text-gray-600 mt-2">Fill out all sections to submit damage assessment details</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg border-2 overflow-hidden shadow-lg" style={{ borderColor: '#328CC1' }}>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* General Information Section */}
              <section className="border border-gray-300 rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold p-4" style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #1a1a1a' }}>
                  General Information
                </h2>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Project / Work Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Construction of 15 Mtr span RCC bridge at Ronai Chilas"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ focusRingColor: '#328CC1' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">District / Tehsil / Sub-Tehsil *</label>
                      <input type="text" required placeholder="Diamer / Chilas" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Union Council / Village *</label>
                      <input type="text" required placeholder="Ronai Chilas" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Moza / Khasra No. / Landmark</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Latitude</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Longitude</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Date of Assessment *</label>
                      <input type="date" required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Assessment Team</label>
                      <input type="text" placeholder="C&WD Sub Division HQ-I" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Initial Estimate of Damages (Million)</label>
                      <input type="number" step="0.001" placeholder="18.000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Person Visiting the Site</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Compensation Paid</label>
                      <input type="text" placeholder="N/A" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Incident Overview Section */}
              <section className="border border-gray-300 rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold p-4" style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #1a1a1a' }}>
                  Incident Overview
                </h2>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date of Event *</label>
                    <input type="text" required placeholder="21st & 22nd July, 2025" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Type of Event *</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="eventType" value="Flood" />
                        <span>Flood</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="eventType" value="Landslide" />
                        <span>Landslide</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="eventType" value="GLOF" />
                        <span>GLOF</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="eventType" value="Cloudburst" />
                        <span>Cloudburst</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Source of Information</label>
                    <input type="text" placeholder="Flood / Cloudburst" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </section>

              {/* Infrastructure Affected Section */}
              <section className="border border-gray-300 rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold p-4" style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #1a1a1a' }}>
                  Infrastructure Affected
                </h2>
                <div className="p-4 space-y-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFFBEB' }}>
                    <label className="block text-sm font-semibold mb-3">Roads</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="roads" value="Major" />
                        <span>Major Arterial</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="roads" value="Minor" />
                        <span>Minor Arterial</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFFBEB' }}>
                    <label className="block text-sm font-semibold mb-3">Bridges</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="bridges" value="Wooden" />
                        <span>Wooden</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="bridges" value="Pedestrian" />
                        <span>Pedestrian</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="bridges" value="Suspension" />
                        <span>Suspension</span>
                      </label>
                      <label className="flex items-center gap-2" style={{ backgroundColor: '#D6F0FF', padding: '4px 8px', borderRadius: '4px' }}>
                        <input type="checkbox" name="bridges" value="RCC" />
                        <span>RCC (Yes)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="bridges" value="Others" />
                        <span>Others</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Buildings</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="RCC" />
                        <span>RCC</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Brick" />
                        <span>Brick</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Block" />
                        <span>Block</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Stone" />
                        <span>Stone</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Wooden" />
                        <span>Wooden</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Adobe" />
                        <span>Adobe</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="buildings" value="Others" />
                        <span>Others</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Water Supply Systems</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Electricity Networks</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Communication Towers</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Others (Specify)</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Damage Assessment Section */}
              <section className="border border-gray-300 rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold p-4" style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #1a1a1a' }}>
                  Damage Assessment
                </h2>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description of Damage *</label>
                    <textarea
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-24"
                      placeholder="Describe the damage in detail..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type of Structure *</label>
                      <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ownership *</label>
                      <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select...</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Extent of Damage *</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="extent" value="Minor" required />
                        <span>Minor (Repairs Required)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="extent" value="Moderate" />
                        <span>Moderate (Major Repairs)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="extent" value="Severe" />
                        <span>Severe (Reconstruction Required)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Estimated Cost of Repair / Reconstruction (Million) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Photographic Evidence</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-20"
                      placeholder="Attach or mention photographs showing damage with proforma"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Remarks</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-20"
                      placeholder="Additional remarks..."
                    />
                  </div>
                </div>
              </section>

              {/* Additional Observations Section */}
              <section className="border border-gray-300 rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold p-4" style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #1a1a1a' }}>
                  Additional Observations
                </h2>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Impact on Community</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Population Affected</label>
                      <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Access to Essential Services</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Water" />
                        <span>Water Supply</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Healthcare" />
                        <span>Healthcare</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Education" />
                        <span>Education</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Electricity" />
                        <span>Electricity</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Transportation" />
                        <span>Transportation</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="services" value="Others" />
                        <span>Others</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Response & Recovery Actions</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Immediate Actions</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="actions" value="TempRepairs" />
                        <span>Temporary Repairs</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="actions" value="Supplies" />
                        <span>Supplies Received</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" name="actions" value="Evacuation" />
                        <span>Evacuation</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Challenges Encountered</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Logistical issues / Resource constraints / Communication barriers"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Details</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-20"
                      placeholder="Additional details..."
                    />
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="reset"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0B3C5D' }}
                >
                  Submit Proforma
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
