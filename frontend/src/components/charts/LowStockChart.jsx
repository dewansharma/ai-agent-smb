import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
    <div className="bg-[#081224] border border-blue-900/30 rounded-2xl p-6 mt-8 shadow-[0_0_20px_rgba(59,130,246,0.08)]">

      <h2 className="text-xl font-semibold mb-6 text-white">
        Low Stock Alerts Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#1e3a8a"
              strokeOpacity={0.25}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#081224",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="alerts"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: "#60a5fa",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 7,
                fill: "#3b82f6",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default LowStockChart;