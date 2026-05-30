import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  AlertTriangle,
  BrainCircuit,
  BarChart3,
  Truck,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: AlertTriangle,
  },
  {
    name: "AI Insights",
    path: "/insights",
    icon: BrainCircuit,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
//   {
//     name: "Suppliers",
//     path: "/suppliers",
//     icon: Truck,
//   },
//   {
//     name: "Settings",
//     path: "/settings",
//     icon: Settings,
//   },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-[#081224] border-r border-blue-900/40 p-5 shadow-[0_0_30px_rgba(59,130,246,0.08)]">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-blue-500">
          Agentic AI
        </h1>

        <p className="text-sm text-slate-400">
          Inventory Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-300 hover:bg-blue-950/40 hover:text-blue-300"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}

export default Sidebar;