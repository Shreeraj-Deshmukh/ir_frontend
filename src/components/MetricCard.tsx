import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  maxValue?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  variant?: "clarity" | "confidence" | "engagement";
}

const variantStyles = {
  clarity: "border-primary/20 bg-primary/5",
  confidence: "border-accent/20 bg-accent/5",
  engagement: "border-warning/20 bg-warning/5",
};

export function MetricCard({
  title,
  value,
  maxValue = 100,
  icon: Icon,
  trend,
  subtitle,
  variant = "clarity",
}: MetricCardProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <Card className={cn("p-4 border-2", variantStyles[variant])}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            variant === "clarity" && "bg-primary",
            variant === "confidence" && "bg-accent",
            variant === "engagement" && "bg-warning"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
}
