export interface MetricCardProps {
  label: string;
  value: string | number;
  /** Ignored — kept for API compatibility */
  iconPaths?: { d: string; stroke: string }[];
  iconGradient?: string;
  showIcon?: boolean;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    note?: string;
  };
  subtitle?: string;
  valueColor?: string;
}

export function MetricCard({
  label,
  value,
  trend,
  subtitle,
  valueColor = "#1E293B",
}: MetricCardProps) {
  const isUp = trend?.direction === "up";
  const isDown = trend?.direction === "down";

  return (
    <div className="bg-white rounded-[12px] p-5 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-transform duration-200">
      {/* Label */}
      <p className="text-[13px] font-medium text-[#64748B] leading-tight mb-4">{label}</p>

      {/* Value */}
      <p className="text-[26px] font-bold leading-none tracking-tight mb-3" style={{ color: valueColor }}>
        {value}
      </p>

      {/* Trend or subtitle */}
      {trend ? (
        <div className="flex items-center gap-1.5">
          <span className={`text-[13px] font-semibold ${isUp ? "text-[#16A34A]" : isDown ? "text-[#DC2626]" : "text-[#64748B]"}`}>
            {isUp ? "↑" : isDown ? "↓" : ""} {trend.value}
          </span>
          {trend.note && <span className="text-[12px] text-[#94A3B8]">{trend.note}</span>}
        </div>
      ) : subtitle ? (
        <p className="text-[12px] text-[#94A3B8]">{subtitle}</p>
      ) : null}
    </div>
  );
}
