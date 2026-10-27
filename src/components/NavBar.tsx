import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  BookOpen,
  MonitorCheck,
  BarChart3,
  Database,
  Settings2,
  UserCog,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/personas", label: "Personas", icon: Users },
  { path: "/library", label: "Library", icon: BookOpen },
  { path: "/session/workspace/1", label: "Workspace", icon: MonitorCheck },
  { path: "/session/report/1", label: "Reports", icon: BarChart3 },
  { path: "/irhub", label: "IR Data Hub", icon: Database },
  { path: "/admin", label: "Admin Center", icon: Settings2 },
  { path: "/settings", label: "Settings", icon: UserCog },
];

export function NavBar() {
  const location = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm tracking-tight select-none">
                IR
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive && "bg-blue-50 text-blue-600 font-semibold"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <Button variant="outline" className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
