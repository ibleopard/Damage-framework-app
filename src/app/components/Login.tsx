import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Lock, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    }
  };

  const handleFieldInspector = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 50%, #328CC1 100%)',
        backgroundAttachment: 'fixed'
      }}>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(50px, -50px)'
        }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(-40px, 40px)'
        }} />

      <div className="w-full max-w-md p-4 sm:p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Premium Logo Container */}
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mb-6 relative group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                boxShadow: '0 8px 32px rgba(11, 60, 93, 0.4)'
              }} />
            <div className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }} />
            <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white relative z-10" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white tracking-tight">NDMA</h1>
          <p className="text-xl sm:text-2xl text-blue-100 font-semibold mb-2">Damage Assessment</p>
          <p className="text-sm sm:text-base text-blue-200">Infrastructure Verification System</p>
        </div>

        {/* Premium Login Card */}
        <div className="card card-elevated rounded-3xl p-6 sm:p-10 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, white 0%, #F9FAFB 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.5) inset'
          }}>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2.5">
              <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your.email@ndma.gov"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2.5">
              <label htmlFor="password" className="block text-sm font-bold text-gray-900">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              className="btn-primary btn-lg btn-full mt-8 group"
            >
              <span>Sign In</span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                }} />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Secondary Login Button */}
          <button
            onClick={handleFieldInspector}
            className="btn-secondary btn-lg btn-full mt-8"
          >
            Continue as Field Inspector
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-10">
          <p className="text-sm text-blue-100 font-medium">
            National Disaster Management Authority
          </p>
          <p className="text-xs text-blue-200 mt-2">
            Secure • Reliable • Government Infrastructure Assessment
          </p>
        </div>
      </div>
    </div>
  );
}
