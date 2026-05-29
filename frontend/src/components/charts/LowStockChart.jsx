import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", alerts: 12 },
  { day: "Tue", alerts: 18 },
  { day: "Wed", alerts: 9 },
  { day: "Thu", alerts: 22 },
  { day: "Fri", alerts: 16 },
  { day: "Sat", alerts: 28 },
  { day: "Sun", alerts: 19 },
];

function LowStockChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-semibold mb-6">
        Low Stock Alerts Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <XAxis dataKey="day" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="alerts"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default LowStockChart;