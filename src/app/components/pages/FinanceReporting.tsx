import { Download } from "lucide-react";
import { MetricCard } from "../MetricCard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyRevenue = [
  { month: "Oct '25", revenue: 325000, fees: 13000, net: 312000 },
  { month: "Nov '25", revenue: 398000, fees: 15920, net: 382080 },
  { month: "Dec '25", revenue: 445000, fees: 17800, net: 427200 },
  { month: "Jan '26", revenue: 412000, fees: 16480, net: 395520 },
  { month: "Feb '26", revenue: 398000, fees: 15920, net: 382080 },
  { month: "Mar '26", revenue: 428450, fees: 17138, net: 411312 },
];

const revenueByType = [
  { name: "Subscriptions", value: 285000, color: "#002045" },
  { name: "Digital Sales", value: 98450, color: "#17A2B8" },
  { name: "Physical Sales", value: 45000, color: "#74777f" },
];

export function FinanceReporting() {
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const totalRevenue = revenueByType.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[28px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e]">Finance & Reporting</h1>
          <p className="text-sm text-[#43474e] font-normal leading-5">Revenue tracking and Razorpay integration</p>
        </div>
        <div className="relative group flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F8FAFC] transition-all text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export Reports</span>
            <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 mt-1.5 w-52 bg-white border border-[#e6e8ea] rounded-[10px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button className="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2.5 text-[13px] text-[#191c1e]">
              <Download className="w-4 h-4 text-[#43474e]" />Revenue Report
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2.5 text-[13px] text-[#191c1e]">
              <Download className="w-4 h-4 text-[#43474e]" />Fees Breakdown
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2.5 text-[13px] text-[#191c1e]">
              <Download className="w-4 h-4 text-[#43474e]" />Tax Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <MetricCard
          label="Gross Revenue (Mar)"
          value={`₹${currentMonth.revenue.toLocaleString()}`}
          iconPaths={[{ d: "M12 2V22", stroke: "#1B5E20" }, { d: "M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6", stroke: "#1B5E20" }]}
          iconGradient="linear-gradient(135deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0.04) 100%)"
          trend={{ value: "+7.6%", direction: "up", note: "vs last month" }}
        />
        <MetricCard
          label="Payment Gateway Fees"
          value={`₹${currentMonth.fees.toLocaleString()}`}
          iconPaths={[
            { d: "M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z", stroke: "#002045" },
            { d: "M16 3H8C6.89543 3 6 3.89543 6 5V7H18V5C18 3.89543 17.1046 3 16 3Z", stroke: "#002045" },
            { d: "M2 13H22", stroke: "#002045" },
          ]}
          iconGradient="linear-gradient(135deg, rgba(0,32,69,0.12) 0%, rgba(0,32,69,0.04) 100%)"
          subtitle="Razorpay + GST"
        />
        <MetricCard
          label="Net Revenue (Mar)"
          value={`₹${currentMonth.net.toLocaleString()}`}
          iconPaths={[{ d: "M12 2V22", stroke: "#1B5E20" }, { d: "M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6", stroke: "#1B5E20" }]}
          iconGradient="linear-gradient(135deg, rgba(46,125,50,0.12) 0%, rgba(46,125,50,0.04) 100%)"
          trend={{ value: "+96%", direction: "up", note: "of gross revenue" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Revenue Trend (6 Months)</h3>
            <button className="flex items-center gap-2 px-3 py-1 border border-border rounded hover:bg-accent transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid key="grid-finance-trend" vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
              <XAxis key="xaxis-finance-trend" dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
              <YAxis key="yaxis-finance-trend" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dx={-8} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip 
                key="tooltip-finance-trend"
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)",
                  borderColor: "var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                  fontFamily: "Inter, sans-serif"
                }}
                itemStyle={{ fontSize: "13px" }}
                labelStyle={{ fontWeight: "bold", color: "var(--color-muted-foreground)", fontSize: "12px", marginBottom: "4px" }}
                formatter={(value: any, name: any) => [`₹${value.toLocaleString()}`, name]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line key="line-finance-gross" type="monotone" dataKey="revenue" stroke="var(--color-institutional-blue)" strokeWidth={3} name="Gross" dot={{ fill: "var(--color-institutional-blue)", r: 4, stroke: "#FFFFFF", strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line key="line-finance-net" type="monotone" dataKey="net" stroke="#17A2B8" strokeWidth={3} name="Net" dot={{ fill: "#17A2B8", r: 4, stroke: "#FFFFFF", strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Revenue by Type (Mar)</h3>
            <button className="flex items-center gap-2 px-3 py-1 border border-border rounded hover:bg-accent transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                key="pie-finance-type"
                data={revenueByType}
                cx="38%"
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByType.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                key="tooltip-finance-pie"
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)",
                  borderColor: "var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                  fontFamily: "Inter, sans-serif"
                }}
                itemStyle={{ fontSize: "13px" }}
                formatter={(value: any, name: any) => [`₹${value.toLocaleString()}`, name]}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Monthly Breakdown (Mar 2026)</h3>
          <button className="flex items-center gap-2 px-3 py-1 border border-border rounded hover:bg-accent transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={[currentMonth]} barGap={12}>
            <CartesianGrid key="grid-finance-breakdown" vertical={false} strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis key="xaxis-finance-breakdown" dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dy={8} />
            <YAxis key="yaxis-finance-breakdown" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dx={-8} tickFormatter={(val) => `₹${val / 1000}k`} />
            <Tooltip 
              key="tooltip-finance-breakdown"
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(4px)",
                borderColor: "var(--color-border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                fontFamily: "Inter, sans-serif"
              }}
              itemStyle={{ fontSize: "13px" }}
              labelStyle={{ fontWeight: "bold", color: "var(--color-muted-foreground)", fontSize: "12px", marginBottom: "4px" }}
              formatter={(value: any, name: any) => [`₹${value.toLocaleString()}`, name]}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar key="bar-finance-revenue" dataKey="revenue" fill="#002045" radius={[4, 4, 0, 0]} maxBarSize={60} name="Gross Revenue" />
            <Bar key="bar-finance-fees" dataKey="fees" fill="#74777f" radius={[4, 4, 0, 0]} maxBarSize={60} name="Fees & Taxes" />
            <Bar key="bar-finance-net" dataKey="net" fill="#17A2B8" radius={[4, 4, 0, 0]} maxBarSize={60} name="Net Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-[16px] font-bold leading-[24px] text-[#191c1e]">Recent Transactions (Razorpay)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="text-left px-6 py-4 whitespace-nowrap">Transaction ID</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Customer</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Type</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Fee</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Net</th>
                <th className="text-left px-6 py-4 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-foreground">pay_abc123xyz</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">Rajesh Kumar</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 bg-[var(--color-saffron)]/10 text-[var(--color-saffron)] border border-[var(--color-saffron)]/20 rounded text-xs font-semibold">
                    Subscription
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-foreground">₹2,450</td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">₹98</td>
                <td className="px-6 py-4 text-[var(--color-success-green-dark)] font-semibold whitespace-nowrap">₹2,352</td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">2026-04-07</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-foreground">pay_def456uvw</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">Priya Sharma</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 bg-[var(--color-success-green)]/10 text-[var(--color-success-green-dark)] border border-[var(--color-success-green)]/20 rounded text-xs font-semibold">Digital</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-foreground">₹850</td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">₹34</td>
                <td className="px-6 py-4 text-[var(--color-success-green-dark)] font-semibold whitespace-nowrap">₹816</td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">2026-04-07</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
