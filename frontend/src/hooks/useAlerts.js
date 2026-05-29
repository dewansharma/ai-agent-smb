import { useEffect, useState } from "react";

import { supabase } from "../services/supabase";

export function useAlerts() {

  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // Initial Fetch
  // =========================

  async function fetchAlerts() {

    const { data, error } =
      await supabase

        .from("inventory_alerts")

        .select("*")

        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
    } else {
      setAlerts(data);
    }

    setLoading(false);
  }

  // =========================
  // Realtime Subscription
  // =========================

  useEffect(() => {

    fetchAlerts();

    const channel =
      supabase.channel(
        "inventory-alerts-channel"
      );

    channel

      .on(
        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "inventory_alerts",
        },

        (payload) => {

          console.log(
            "Realtime Update:",
            payload
          );

          fetchAlerts();
        }
      )

      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  return {
    alerts,
    loading,
  };
}