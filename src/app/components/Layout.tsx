import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { Building2, LayoutDashboard, FileText, List, LogOut, Shield } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/new-assessment", label: "New Assessment", icon: FileText },
    { path: "/my-submissions", label: "My Submissions", icon: List },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0B3C5D' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg" style={{ color: '#0B3C5D' }}>NDMA</h2>
              <p className="text-xs text-gray-500">Assessment Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={active ? { backgroundColor: '#0B3C5D' } : {}}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate("/admin")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <Shield className="w-5 h-5" />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all mt-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl mb-6" style={{ color: '#0B3C5D' }}>{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
