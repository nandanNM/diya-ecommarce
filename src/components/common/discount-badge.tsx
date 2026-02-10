import { Badge } from "@/components/ui/badge";
import { Discount } from "@/lib/types";

interface DiscountBadgeProps {
  data: Discount;
}

export default function DiscountBadge({ data }: DiscountBadgeProps) {
  if (data.type === "PERCENT") {
    return <Badge>-{data.value}%</Badge>;
  }
  return <Badge>-${data.value}</Badge>;
}
