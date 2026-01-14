import React from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";
import { getAnalytics } from "@/lib/actions/get-analytics.actions";

import Charts from "./_components/charts";
import AnalyticsDataCard from "./_components/analytics-data-card";

const AnalyticsPage = async () => {
  const session = await getServerSession();
  const userId = session?.user?.id;

  // Redirect if not logged in
  if (!userId) redirect("/");

  // Get analytics
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <AnalyticsDataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />

        <AnalyticsDataCard label="Total Sales" value={totalSales} />
      </div>

      {/* // Analytics Charts */}
      <Charts data={data} />
    </div>
  );
};

export default AnalyticsPage;
