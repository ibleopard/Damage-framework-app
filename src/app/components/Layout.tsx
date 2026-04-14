import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Building2, LayoutDashboard, FileText, List, LogOut, Shield, Menu, X } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/new-assessment", label: "New Assessment", icon: FileText },
    { path: "/my-submissions", label: "My Submissions", icon: List },
  ];

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-md border-b border-gray-100 px-4 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ 
            background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
            boxShadow: '0 4px 6px rgba(11, 60, 93, 0.15)'
          }}>
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold" style={{ color: '#0B3C5D' }}>NDMA</h2>
            <p className="text-xs text-gray-500">Damage Assessment</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Premium Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 md:z-auto
          w-64 md:w-80
          bg-white shadow-lg md:shadow-none md:border-r md:border-gray-100
          transition-transform duration-300 ease-in-out
          ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          md:translate-x-0
          pt-0 md:pt-0
          top-auto md:top-0
          ${sidebarOpen ? "mt-0" : ""}
          flex flex-col
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ 
              background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
              boxShadow: '0 4px 12px rgba(11, 60, 93, 0.2)'
            }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: '#0B3C5D' }}>NDMA</h2>
              <p className="text-xs text-gray-500 font-medium">Portal</p>
            </div>
          </div>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="md:hidden p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ 
              background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
              boxShadow: '0 4px 6px rgba(11, 60, 93, 0.15)'
            }}>
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold" style={{ color: '#0B3C5D' }}>NDMA</h2>
              <p className="text-xs text-gray-500 font-medium">Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm relative group ${
                      active 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={active ? { 
                      background: 'linear-gradient(135deg, #0B3C5D 0%, #1A5A8C 100%)',
                      boxShadow: '0 4px 12px rgba(11, 60, 93, 0.2)'
                    } : {}}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {!active && <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-200" style={{ backgroundColor: '#0B3C5D' }}></div>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-3 sm:p-4 md:p-6 border-t border-gray-100 bg-gradient-to-br from-white to-gray-50 space-y-2">
          <button
            onClick={() => handleNavigation("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium text-sm"
          >
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span>Admin Panel</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium text-sm"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#0B3C5D' }}>
            {title}
          </h1>
          {children}
        </div>
      </main>
    </div>
  );
}
