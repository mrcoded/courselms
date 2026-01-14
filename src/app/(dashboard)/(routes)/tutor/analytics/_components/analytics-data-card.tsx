import React from "react";
import { formatPrice } from "@/lib/formatPrice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsDataCardProps } from "@/types/dashboard.types";

const AnalyticsDataCard = ({
  value,
  label,
  shouldFormat,
}: AnalyticsDataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{shouldFormat ? formatPrice(value) : value}</div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDataCard;
