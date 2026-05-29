import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/cards/StatCard";

import LowStockChart from "../components/charts/LowStockChart";

import { useAlerts } from "../hooks/useAlerts";

import {
  Boxes,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
  Truck,
} from "lucide-react";

function Dashboard() {

  const { alerts, loading } = useAlerts();

  // SAFE NORMALIZED DATA
  const safeAlerts = Array.isArray(alerts)
    ? alerts
    : [];

  // METRICS
  const totalAlerts = safeAlerts.length;

  const criticalRisks = safeAlerts.filter(
    (alert) =>
      String(alert?.risk_level || "")
        .toLowerCase() === "critical"
  ).length;

  const lowStockAlerts = safeAlerts.filter(
    (alert) =>
      Number(alert?.current_stock || 0) <
      Number(alert?.threshold || 0)
  ).length;

  const valueAtRisk = safeAlerts.reduce(
    (sum, alert) => {

      const threshold = Number(
        alert?.threshold || 0
      );

      const currentStock = Number(
        alert?.current_stock || 0
      );

      const unitPrice = Number(
        alert?.unit_price || 0
      );

      const deficit = threshold - currentStock;

      return (
        sum +
        (deficit > 0
          ? deficit * unitPrice
          : 0)
      );
    },
    0
  );

  const suppliersCount = new Set(
    safeAlerts.map(
      (alert) => alert?.supplier
    )
  ).size;

  const predictedStockouts = safeAlerts.filter(
    (alert) =>
      Number(
        alert?.estimated_stockout_days || 999
      ) <= 3
  ).length;

  const averageUrgencyScore =
    safeAlerts.length > 0
      ? (
          safeAlerts.reduce(
            (sum, alert) =>
              sum +
              Number(
                alert?.urgency_score || 0
              ),
            0
          ) / safeAlerts.length
        ).toFixed(1)
      : "0";

  // CHART DATA
  const chartData = [
    { day: "Mon", alerts: 12 },
    { day: "Tue", alerts: 18 },
    { day: "Wed", alerts: 9 },
    { day: "Thu", alerts: 22 },
    { day: "Fri", alerts: 16 },
    { day: "Sat", alerts: 28 },
    { day: "Sun", alerts: 19 },
  ];

  if (loading) {

    return (
      <DashboardLayout>

        <div className="text-white text-xl">
          Loading dashboard...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          AI-powered inventory operations monitoring
        </p>

      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 mb-8">

        <StatCard
          title="Total Inventory Alerts"
          value={Number(totalAlerts || 0)}
          icon={Boxes}
          growth="+4.5%"
        />

        <StatCard
          title="Low Stock Alerts"
          value={Number(lowStockAlerts || 0)}
          icon={AlertTriangle}
          growth="+12%"
        />

        <StatCard
          title="Critical Risks"
          value={Number(criticalRisks || 0)}
          icon={ShieldAlert}
          growth="+8%"
        />

        <StatCard
          title="Value At Risk"
          value={`$${Number(
            valueAtRisk || 0
          ).toFixed(2)}`}
          icon={DollarSign}
          growth="+18%"
        />

        <StatCard
          title="Suppliers"
          value={Number(suppliersCount || 0)}
          icon={Truck}
          growth="+2%"
        />

        <StatCard
          title="Avg Urgency"
          value={String(
            averageUrgencyScore || "0"
          )}
          icon={ShieldAlert}
          growth="+6%"
        />

      </div>

      {/* AI METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-4">
            Predicted Stockouts
          </h2>

          <div className="text-5xl font-bold text-red-400">
            {Number(predictedStockouts || 0)}
          </div>

          <p className="text-slate-400 mt-2">
            Items projected to stock out within 3 days
          </p>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-4">
            Operational Priority
          </h2>

          <div className="space-y-3">

            {["Critical", "High", "Medium"].map(
              (priority) => {

                const count = safeAlerts.filter(
                  (alert) =>
                    String(
                      alert?.operational_priority || ""
                    ).toLowerCase() ===
                    priority.toLowerCase()
                ).length;

                return (

                  <div
                    key={priority}
                    className="flex justify-between items-center bg-slate-800 rounded-xl px-4 py-3"
                  >

                    <span className="text-white">
                      {priority}
                    </span>

                    <span className="text-blue-400 font-bold">
                      {count}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* CHART */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Low Stock Alerts Trend
        </h2>

        <LowStockChart data={chartData} />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;