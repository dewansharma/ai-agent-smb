import DashboardLayout from "../layouts/DashboardLayout";

import { useAlerts } from "../hooks/useAlerts";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

function Analytics() {

  const {
    alerts = [],
    loading,
  } = useAlerts();

  // =========================
  // Risk Distribution
  // =========================

  const riskDistribution = [
    {
      name: "Critical",
      value: alerts.filter(
        (a) =>
          String(a?.risk_level || "").toLowerCase() ===
          "critical"
      ).length,
    },

    {
      name: "High",
      value: alerts.filter(
        (a) =>
          String(a?.risk_level || "").toLowerCase() ===
          "high"
      ).length,
    },

    {
      name: "Medium",
      value: alerts.filter(
        (a) =>
          String(a?.risk_level || "").toLowerCase() ===
          "medium"
      ).length,
    },
  ];

  // =========================
  // Supplier Operational Risk
  // =========================

  const supplierMap = {};

  alerts.forEach((alert) => {

    const supplier =
      alert?.supplier || "Unknown";

    if (!supplierMap[supplier]) {

      supplierMap[supplier] = {
        totalUrgency: 0,
        count: 0,
      };

    }

    supplierMap[supplier].totalUrgency +=
      Number(alert?.urgency_score || 0);

    supplierMap[supplier].count += 1;

  });

  const supplierRiskData =
    Object.entries(supplierMap).map(
      ([supplier, data]) => ({

        name: supplier,

        value: Number(
          (
            data.totalUrgency /
            data.count
          ).toFixed(1)
        ),

      })
    );

  // =========================
  // Operational Priority
  // =========================

  const priorityDistribution = [
    {
      name: "Critical",
      value: alerts.filter(
        (a) =>
          String(
            a?.operational_priority || ""
          ).toLowerCase() === "critical"
      ).length,
    },

    {
      name: "High",
      value: alerts.filter(
        (a) =>
          String(
            a?.operational_priority || ""
          ).toLowerCase() === "high"
      ).length,
    },

    {
      name: "Medium",
      value: alerts.filter(
        (a) =>
          String(
            a?.operational_priority || ""
          ).toLowerCase() === "medium"
      ).length,
    },
  ];

  // =========================
  // Predicted Stockouts
  // =========================

  const stockoutTimelineData =
    alerts.map((alert) => ({

      name:
        alert?.item_name || "Unknown",

      days:
        Number(
          alert?.estimated_stockout_days || 0
        ),

    }));

  // =========================
  // Most Risky Products
  // =========================

  const riskyProducts = [...alerts]

    .sort(
      (a, b) =>
        Number(b?.urgency_score || 0) -
        Number(a?.urgency_score || 0)
    )

    .slice(0, 5);

  if (loading) {

    return (

      <DashboardLayout>

        <h1 className="text-2xl text-white">
          Loading analytics...
        </h1>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-white mb-2">
          Operational Analytics
        </h1>

        <p className="text-slate-400 text-lg">
          AI-powered operational intelligence
          and predictive inventory analytics
        </p>

      </div>

      {/* Top Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* Risk Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Risk Distribution
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                >

                  {riskDistribution.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={
                          [
                            "#ef4444",
                            "#f97316",
                            "#eab308",
                          ][index % 3]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Supplier Operational Risk */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Supplier Operational Risk
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={supplierRiskData}
              >

                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Second Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* Operational Priority */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Operational Priority
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={priorityDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                >

                  {priorityDistribution.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={
                          [
                            "#a855f7",
                            "#ec4899",
                            "#06b6d4",
                          ][index % 3]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Predicted Stockout Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Predicted Stockout Timeline
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={stockoutTimelineData}
              >

                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Most Risky Products */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Most Risky Products
        </h2>

        <div className="space-y-4">

          {riskyProducts.map(
            (product, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition-all"
              >

                <div>

                  <h3 className="font-semibold text-white">
                    {product?.item_name || "Unknown"}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {product?.supplier || "Unknown"}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-red-400 font-bold">
                    Urgency:
                    {" "}
                    {product?.urgency_score || 0}/10
                  </p>

                  <p className="text-slate-400 text-sm">
                    {product?.estimated_stockout_days || 0}
                    {" "}
                    days remaining
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Analytics;