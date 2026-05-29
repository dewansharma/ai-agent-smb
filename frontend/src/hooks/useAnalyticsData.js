import { useMemo } from "react";

export function useAnalyticsData(alerts = []) {

  return useMemo(() => {

    // =========================
    // Risk Distribution
    // =========================

    const riskDistribution = [
      {
        name: "Critical",
        value: alerts.filter(
          (a) =>
            String(
              a?.risk_level || ""
            ).toLowerCase() === "critical"
        ).length,
      },

      {
        name: "High",
        value: alerts.filter(
          (a) =>
            String(
              a?.risk_level || ""
            ).toLowerCase() === "high"
        ).length,
      },

      {
        name: "Medium",
        value: alerts.filter(
          (a) =>
            String(
              a?.risk_level || ""
            ).toLowerCase() === "medium"
        ).length,
      },
    ];

    // =========================
    // Supplier Risk Analysis
    // =========================

    const supplierMap = {};

    alerts.forEach((alert) => {

      const supplier =
        alert?.supplier || "Unknown";

      if (!supplierMap[supplier]) {
        supplierMap[supplier] = 0;
      }

      supplierMap[supplier] += 1;

    });

    const supplierRiskData =
      Object.entries(supplierMap).map(
        ([supplier, count]) => ({
          supplier,
          alerts: count,
        })
      );

    // =========================
    // Most Risky Products
    // =========================

    const uniqueProducts = {};

    alerts.forEach((alert) => {

      const deficit =
        Number(alert?.threshold || 0) -
        Number(alert?.current_stock || 0);

      const itemName =
        alert?.item_name || "Unknown";

      if (
        !uniqueProducts[itemName] ||
        deficit >
          uniqueProducts[itemName].deficit
      ) {

        uniqueProducts[itemName] = {
          item: itemName,
          deficit,
        };

      }

    });

    const riskyProducts =
      Object.values(uniqueProducts)
        .sort(
          (a, b) =>
            b.deficit - a.deficit
        )
        .slice(0, 5);

    // =========================
    // Return Analytics Data
    // =========================

    return {
      riskDistribution,
      supplierRiskData,
      riskyProducts,
    };

  }, [alerts]);
}