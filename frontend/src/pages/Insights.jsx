import DashboardLayout from "../layouts/DashboardLayout";

import { useAlerts } from "../hooks/useAlerts";

import {
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";

function Insights() {

  const { alerts, loading } = useAlerts();

  // SAFE ARRAY
  const safeAlerts = Array.isArray(alerts)
    ? alerts
    : [];

  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-white text-xl">
          Loading AI Insights...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-white">
          AI Operational Insights
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          AI-generated inventory intelligence and operational recommendations
        </p>

      </div>

      {/* INSIGHT CARDS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {safeAlerts.map((alert) => (

          <div
            key={alert.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
          >

            {/* TOP */}
            <div className="flex justify-between items-start mb-6">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  {String(alert.item_name || "Unknown Item")}
                </h2>

                <p className="text-slate-400 mt-2">
                  Supplier:{" "}
                  {String(alert.supplier || "Unknown")}
                </p>

              </div>

              <div
                className={`
                  px-4 py-2 rounded-xl text-sm font-semibold
                  ${
                    String(alert.risk_level || "")
                      .toLowerCase() === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : String(alert.risk_level || "")
                          .toLowerCase() === "high"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
              >

                {String(
                  alert.risk_level || "Medium"
                )}

              </div>

            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 gap-4 mb-6">

              <div className="bg-slate-800 rounded-xl p-4">

                <p className="text-slate-400 text-sm mb-2">
                  Current Stock
                </p>

                <p className="text-2xl font-bold text-white">
                  {Number(alert.current_stock || 0)}
                </p>

              </div>

              <div className="bg-slate-800 rounded-xl p-4">

                <p className="text-slate-400 text-sm mb-2">
                  Threshold
                </p>

                <p className="text-2xl font-bold text-white">
                  {Number(alert.threshold || 0)}
                </p>

              </div>

            </div>

            {/* PRIORITY */}
            <div className="bg-slate-800 rounded-2xl p-5 mb-5">

              <div className="flex items-center gap-3 mb-3">

                <TrendingUp className="text-blue-400 w-5 h-5" />

                <h3 className="text-white font-semibold">
                  Operational Priority
                </h3>

              </div>

              <p className="text-slate-300">
                {String(
                  alert.operational_priority ||
                    "Medium"
                )}
              </p>

            </div>

            {/* BUSINESS IMPACT */}
            <div className="bg-slate-800 rounded-2xl p-5 mb-5">

              <div className="flex items-center gap-3 mb-3">

                <AlertTriangle className="text-yellow-400 w-5 h-5" />

                <h3 className="text-white font-semibold">
                  Business Impact
                </h3>

              </div>

              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {String(
                  alert.business_impact ||
                    "No business impact available."
                )}
              </p>

            </div>

            {/* RECOMMENDATION */}
            <div className="bg-slate-800 rounded-2xl p-5 mb-5">

              <div className="flex items-center gap-3 mb-3">

                <Clock className="text-emerald-400 w-5 h-5" />

                <h3 className="text-white font-semibold">
                  AI Recommendation
                </h3>

              </div>

              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {String(
                  alert.recommendation ||
                    "No recommendation available."
                )}
              </p>

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-6">

              <div>

                <p className="text-slate-400 text-sm">
                  Urgency Score
                </p>

                <p className="text-2xl font-bold text-red-400">
                  {Number(
                    alert.urgency_score || 0
                  )}
                </p>

              </div>

              <div>

                <p className="text-slate-400 text-sm text-right">
                  Estimated Stockout
                </p>

                <p className="text-2xl font-bold text-orange-400 text-right">
                  {Number(
                    alert.estimated_stockout_days || 0
                  )}{" "}
                  days
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
}

export default Insights;