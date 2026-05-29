import { useState } from "react";
import { formatAIInsight } from "../../utils/formatAIInsight";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

function InsightCard({ alert }) {

  const [expanded, setExpanded] =
    useState(false);

  const getRiskColor = (risk) => {

    switch (risk) {

      case "Critical":
        return "bg-red-500/20 text-red-400";

      case "High":
        return "bg-orange-500/20 text-orange-400";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition hover:border-slate-700">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">

        <div>

          <h2 className="text-2xl font-semibold">
            {alert.item_name}
          </h2>

          <p className="text-slate-400 mt-1">
            Supplier: {alert.supplier}
          </p>

        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(alert.risk_level)}`}
        >
          {alert.risk_level || "Unknown"}
        </div>

      </div>

      {/* Stock Info */}
      <div className="flex items-center gap-6 mb-4 text-sm">

        <div>
          <span className="text-slate-400">
            Current Stock:
          </span>

          <span className="ml-2 font-semibold">
            {alert.current_stock}
          </span>
        </div>

        <div>
          <span className="text-slate-400">
            Threshold:
          </span>

          <span className="ml-2 font-semibold">
            {alert.threshold}
          </span>
        </div>

      </div>

      {/* Business Impact */}
      <div className="bg-slate-800/50 rounded-xl p-4 mb-4">

        <div className="flex items-center gap-2 mb-2">

          <AlertTriangle
            size={18}
            className="text-yellow-400"
          />

          <h3 className="font-semibold">
            Business Impact
          </h3>

        </div>

        <p className="text-slate-300 text-sm leading-6">
          Low inventory levels may impact
          operational continuity,
          customer satisfaction, and
          revenue generation.
        </p>

      </div>

      {/* Expand Button */}
      <button
        onClick={() =>
          setExpanded(!expanded)
        }
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
      >

        {expanded
          ? "Hide AI Insight"
          : "View AI Insight"}

        {expanded
          ? <ChevronUp size={18} />
          : <ChevronDown size={18} />
        }

      </button>

      {/* Expandable AI Content */}
      {expanded && (

        <div className="mt-4 border-t border-slate-800 pt-4">

          <p className="text-slate-300 leading-7 whitespace-pre-wrap">
            {formatAIInsight(alert.ai_insight)}
          </p>

        </div>

      )}

      {/* Footer */}
      <div className="mt-6 text-xs text-slate-500">

        Generated:
        {" "}
        {new Date(
          alert.created_at
        ).toLocaleString()}

      </div>

    </div>
  );
}

export default InsightCard;