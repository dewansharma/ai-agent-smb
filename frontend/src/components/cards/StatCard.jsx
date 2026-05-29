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

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

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

        <div className="bg-slate-800 p-4 rounded-2xl">

          {Icon && (
            <Icon className="text-blue-400 w-7 h-7" />
          )}

        </div>

      </div>

    </div>
  );
}

export default StatCard;