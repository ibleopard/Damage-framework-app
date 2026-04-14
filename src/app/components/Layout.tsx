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
      <header className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
            <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold" style={{ color: '#0B3C5D' }}>NDMA</h2>
            <p className="text-xs text-gray-500">Portal</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 md:z-auto
          w-64 md:w-auto md:flex-none
          bg-white shadow-lg md:shadow-none
          transition-transform duration-300 ease-in-out
          ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          md:translate-x-0 md:max-w-xs
          pt-0 md:pt-0
          top-auto md:top-0
          ${sidebarOpen ? "mt-0" : ""}
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:block p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold" style={{ color: '#0B3C5D' }}>NDMA</h2>
              <p className="text-xs text-gray-500">Assessment Portal</p>
            </div>
          </div>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="md:hidden p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
              <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-semibold" style={{ color: '#0B3C5D' }}>NDMA</h2>
              <p className="text-xs text-gray-500">Assessment Portal</p>
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

        <nav className="p-3 sm:p-4">
          <ul className="space-y-1 sm:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                      active ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={active ? { backgroundColor: '#0B3C5D' } : {}}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-8 border-t border-gray-200 space-y-2">
            <button
              onClick={() => handleNavigation("/admin")}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all text-sm sm:text-base"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#0B3C5D' }}>
            {title}
          </h1>
          {children}
        </div>
      </main>
    </div>
  );
}
