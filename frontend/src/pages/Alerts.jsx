import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import AlertsTable from "../components/tables/AlertsTable";

// import { mockAlerts } from "../utils/mockAlerts";
import { useAlerts } from "../hooks/useAlerts";

function Alerts() {

  const [search, setSearch] = useState("");

  const [riskFilter, setRiskFilter] = useState("");

  const [supplierFilter, setSupplierFilter] = useState("");
  const { alerts, loading } = useAlerts();

  const suppliers = [
    ...new Set(alerts.map((alert) => alert.supplier)),
    ];
    
  // Filtering logic
  const filteredAlerts = alerts.filter((alert) => {

    const matchesSearch =
      alert.item_name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRisk =
      riskFilter === ""
        ? true
        : alert.risk_level === riskFilter;

    const matchesSupplier =
      supplierFilter === ""
        ? true
        : alert.supplier === supplierFilter;

    
    return (
      matchesSearch &&
      matchesRisk &&
      matchesSupplier
    );
  });

  if (loading) {
  return (
    <DashboardLayout>
      <h1 className="text-2xl">
        Loading alerts...
      </h1>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Inventory Alerts
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered operational inventory monitoring
        </p>

      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search inventory item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="">
              All Risk Levels
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

          </select>

          {/* Supplier Filter */}
          <select
            value={supplierFilter}
            onChange={(e) =>
              setSupplierFilter(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          >

            <option value="">
              All Suppliers
            </option>

            {suppliers.map((supplier) => (

              <option
                key={supplier}
                value={supplier}
              >
                {supplier}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* Table */}
      <AlertsTable alerts={filteredAlerts} />

    </DashboardLayout>
  );
}

export default Alerts;