import { DollarSign, ShoppingCart, RefreshCw, Truck, AlertTriangle, AlertCircle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const metricCards = [
  {
    label: "Total Revenue",
    value: "₹4,28,450",
    change: "+12.4%",
    note: "vs last week",
    trend: "up" as const,
    icon: DollarSign,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    label: "Orders This Week",
    value: "274",
    change: "+8.1%",
    note: "vs last week",
    trend: "up" as const,
    icon: ShoppingCart,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    label: "Active Subscriptions",
    value: "1,342",
    change: "-2.3%",
    note: "vs last week",
    trend: "down" as const,
    icon: RefreshCw,
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
  },
  {
    label: "Pending Shipments",
    value: "58",
    change: "+5.7%",
    note: "vs last week",
    trend: "up" as const,
    icon: Truck,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
];

const alerts = [
  { type: "Low Inventory", message: "Bhagavad Gita (Hindi) - Only 12 copies left", severity: "warning" },
  { type: "Failed Delivery", message: "Order #AMR-2847 marked as RTS by India Post", severity: "error" },
  { type: "Low Inventory", message: "Upanishads Collection (Tamil) - Only 8 copies left", severity: "warning" },
];

const revenueData = [
  { month: "Oct", revenue: 325000 },
  { month: "Nov", revenue: 398000 },
  { month: "Dec", revenue: 445000 },
  { month: "Jan", revenue: 412000 },
  { month: "Feb", revenue: 398000 },
  { month: "Mar", revenue: 428450 },
];

const orderData = [
  { day: "Mon", orders: 45 },
  { day: "Tue", orders: 52 },
  { day: "Wed", orders: 38 },
  { day: "Thu", orders: 61 },
  { day: "Fri", orders: 48 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 28 },
];

export function Dashboard() {

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Dashboard</h1>
        <p className="text-sm text-[#43474e] font-normal leading-5">Welcome back, here's your overview</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
          <div
            key={card.label}
            className="bg-white rounded-[12px] p-5 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-transform duration-200"
          >
            {/* Top row: label + icon */}
            <div className="flex items-start justify-between mb-4">
              <p className="text-[13px] font-medium text-[#64748B] leading-tight">{card.label}</p>
              <div
                className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center flex-shrink-0"
                style={{ backgroundColor: card.iconBg }}
              >
                <Icon className="w-[18px] h-[18px]" style={{ color: card.iconColor }} strokeWidth={2} />
              </div>
            </div>

            {/* Value */}
            <p className="text-[26px] font-bold leading-none tracking-tight text-[#1E293B] mb-3">{card.value}</p>

            {/* Trend */}
            <div className="flex items-center gap-1.5">
              <span className={`text-[13px] font-semibold ${card.trend === "up" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                {card.trend === "up" ? "↑" : "↓"} {card.change}
              </span>
              <span className="text-[12px] text-[#94A3B8]">{card.note}</span>
            </div>
          </div>
          );
        })}
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-[#E2E8F0] rounded-[12px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <CartesianGrid key="dash-rev-grid" strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} vertical={false} />
              <XAxis key="dash-rev-xaxis" dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
              <YAxis key="dash-rev-yaxis" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dx={-8} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip key="dash-rev-tooltip" contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", borderColor: "var(--color-border)", borderRadius: "var(--radius-md)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)", fontFamily: "Inter, sans-serif" }} itemStyle={{ color: "var(--color-foreground)", fontSize: "13px" }} labelStyle={{ fontWeight: "bold", color: "var(--color-muted-foreground)", fontSize: "12px", marginBottom: "4px" }} formatter={(value: any) => [`₹${value.toLocaleString()}`, "Revenue"]} />
              <Area key="dash-rev-area" type="monotone" dataKey="revenue" stroke="#002045" strokeWidth={3} fill="#002045" fillOpacity={0.1} dot={{ fill: "#002045", r: 4, stroke: "#FFFFFF", strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-[#E2E8F0] rounded-[12px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e] mb-6">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={orderData}>
              <CartesianGrid key="dash-ord-grid" strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} vertical={false} />
              <XAxis key="dash-ord-xaxis" dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
              <YAxis key="dash-ord-yaxis" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dx={-8} />
              <Tooltip key="dash-ord-tooltip" contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", borderColor: "var(--color-border)", borderRadius: "var(--radius-md)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)", fontFamily: "Inter, sans-serif" }} itemStyle={{ color: "var(--color-foreground)", fontSize: "13px" }} labelStyle={{ fontWeight: "bold", color: "var(--color-muted-foreground)", fontSize: "12px", marginBottom: "4px" }} formatter={(value: any) => [value, "Orders"]} />
              <Bar key="dash-ord-bar" dataKey="orders" fill="#2e7d32" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-[16px] font-bold text-[#1E293B]">System Alerts</h3>
            <span className="bg-[#FEE2E2] text-[#DC2626] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {alerts.length} active
            </span>
          </div>
          <button className="text-[13px] text-[#64748B] hover:text-[#1E293B] transition-colors font-medium">View all</button>
        </div>

        {/* Alert rows */}
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const isError = alert.severity === "error";
            const AlertIcon = isError ? AlertCircle : AlertTriangle;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#CBD5E1] transition-colors"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isError ? "bg-[#FEE2E2]" : "bg-[#FEF3C7]"
                }`}>
                  <AlertIcon className={`w-5 h-5 ${isError ? "text-[#DC2626]" : "text-[#D97706]"}`} strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1E293B]">{alert.type}</p>
                  <p className="text-[13px] text-[#64748B] mt-0.5">{alert.message}</p>
                </div>

                {/* Right: severity label + actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${
                    isError ? "text-[#DC2626]" : "text-[#D97706]"
                  }`}>
                    {isError ? "ERROR" : "WARNING"}
                  </span>
                  <button className="text-[13px] font-medium text-[#475569] border border-[#E2E8F0] rounded-lg px-3.5 py-1.5 hover:bg-[#F8FAFC] transition-colors bg-white">
                    View
                  </button>
                  <button className="text-[13px] font-semibold text-white bg-[#002045] rounded-lg px-3.5 py-1.5 hover:bg-[#001b3c] transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
