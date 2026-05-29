function AlertsTable({ alerts }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-6">
        Inventory Alerts
      </h2>

      ```jsx
    <table className="w-full table-fixed text-left">

    <thead className="border-b border-slate-700">

        <tr className="text-slate-400">

        <th className="pb-4 w-40">Item</th>
        <th className="pb-4 w-40">Supplier</th>
        <th className="pb-4 w-20">Stock</th>
        <th className="pb-4 w-24">Threshold</th>
        <th className="pb-4 w-28">Risk</th>
        <th className="pb-4 w-40">Urgency</th>
        <th className="pb-4">AI Operational Intelligence</th>

        </tr>

    </thead>

    <tbody>

        {alerts.map((alert) => (

        <tr
            key={alert.id}
            className="border-b border-slate-800 hover:bg-slate-800 transition-all"
        >

            {/* Item */}
            <td className="py-5">
            {alert.item_name}
            </td>

            {/* Supplier */}
            <td>
            {alert.supplier}
            </td>

            {/* Stock */}
            <td>
            {alert.current_stock}
            </td>

            {/* Threshold */}
            <td>
            {alert.threshold}
            </td>

            {/* Risk */}
            <td>

            <span
                className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${
                    alert.risk_level === "Critical"
                    ? "bg-red-500/20 text-red-400"
                    : alert.risk_level === "High"
                    ? "bg-orange-500/20 text-orange-400"
                    : alert.risk_level === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }
                `}
            >
                {alert.risk_level}
            </span>

            </td>

            {/* Urgency Score */}
            <td>

            <div className="flex items-center gap-2">

                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">

                <div
                    className="h-full bg-red-500"
                    style={{
                    width: `${alert.urgency_score * 10}%`,
                    }}
                />

                </div>

                <span className="text-sm text-slate-300">
                {alert.urgency_score}/10
                </span>

            </div>

            </td>

            {/* AI Intelligence */}
            <td className="py-6 align-top">

            <div className="space-y-3 max-w-xl">

                {/* Recommendation */}
                <div>

                <p className="text-xs uppercase text-slate-500 mb-1">
                    Recommendation
                </p>

                <p className="text-slate-200 leading-relaxed">
                    {String(alert.recommendation || "")}
                </p>

                </div>

                {/* Business Impact */}
                <div>

                <p className="text-xs uppercase text-slate-500 mb-1">
                    Business Impact
                </p>

                <p className="text-slate-400 text-sm leading-relaxed">
                    {String(alert.business_impact || "")}
                </p>

                </div>

                {/* Estimated Stockout */}
                <div className="flex items-center gap-2">

                <span className="text-xs uppercase text-slate-500">
                    Stockout ETA:
                </span>

                <span className="text-red-400 font-semibold">
                    {alert.estimated_stockout_days} days
                </span>

                </div>

            </div>

            </td>

        </tr>

        ))}

    </tbody>

    </table>
    ```


    </div>
  );
}

export default AlertsTable;