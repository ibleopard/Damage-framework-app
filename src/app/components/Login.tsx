import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Lock, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email && password) {
      navigate("/dashboard");
    }
  };

  const handleFieldInspector = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#0B3C5D' }}>
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2" style={{ color: '#0B3C5D' }}>NDMA</h1>
          <p className="text-lg text-gray-600">Damage Assessment Portal</p>
          <p className="text-sm text-gray-500 mt-1">Infrastructure Verification System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: '#328CC1' }}
                  placeholder="your.email@ndma.gov"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: '#328CC1' }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0B3C5D' }}
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleFieldInspector}
              className="w-full py-3 rounded-lg border-2 transition-all hover:opacity-80"
              style={{ 
                borderColor: '#328CC1',
                color: '#328CC1',
                backgroundColor: 'transparent'
              }}
            >
              Continue as Field Inspector
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>National Disaster Management Authority</p>
          <p className="mt-1">Secure Infrastructure Assessment System</p>
        </div>
      </div>
    </div>
  );
}
