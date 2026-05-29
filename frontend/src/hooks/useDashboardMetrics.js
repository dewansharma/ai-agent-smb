import { useMemo } from "react";

export function useDashboardMetrics(alerts = []) {

  return useMemo(() => {

    const totalAlerts = alerts.length;

    const criticalRisks = alerts.filter(
      (alert) =>
        alert?.risk_level === "Critical"
    ).length;

    const suppliers = new Set(
      alerts
        .filter((alert) => alert?.supplier)
        .map((alert) => alert.supplier)
    ).size;

    const inventoryValueAtRisk = alerts.reduce(
      (total, alert) => {

        const stock =
          Number(alert?.current_stock || 0);

        const price =
          Number(alert?.unit_price || 0);

        return total + (stock * price);

      },
      0
    );

    return {
      totalAlerts,
      criticalRisks,
      suppliers,
      inventoryValueAtRisk,
    };

  }, [alerts]);
}