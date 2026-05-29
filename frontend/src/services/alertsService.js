import { supabase } from "./supabase";

export async function getAlerts() {

  const { data, error } = await supabase
    .from("inventory_alerts")
    .select('id,item_name,category,supplier,current_stock,threshold,unit_price,ai_insight,risk_level,urgency_score,operational_priority,business_impact,recommendation,estimated_stockout_days,created_at')
    .order("created_at", {
      ascending: false,
    });

  if (error) {

    console.error(
      "Supabase error:",
      error
    );

    return [];
  }

  return data;
}