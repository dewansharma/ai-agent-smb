function StatCard({
  title,
  value,
  icon: Icon,
  growth,
}) {

  // FORCE SAFE RENDERING
  const safeValue =
    typeof value === "object"
      ? JSON.stringify(value)
      : String(value ?? "");

  return (

    <div className="bg-[#081224] border border-blue-900/40 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.08)] hover:shadow-[0_0_25px_rgba(59,130,246,0.18)] transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm mb-3">
            {title}
          </p>

          <h3 className="text-4xl font-bold text-white">
            {safeValue}
          </h3>

          <p className="text-emerald-400 mt-3 text-sm">
            {growth}
          </p>

        </div>

        <div className="bg-blue-950/50 p-4 rounded-2xl border border-blue-900/30">

          {Icon && (
            <Icon className="text-blue-500 w-7 h-7" />
          )}

        </div>

      </div>

    </div>
  );
}

export default StatCard;