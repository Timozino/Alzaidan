import { useState } from "react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const SALES_MONTHLY = [
    { month: "Jan", revenue: 1240000, cost: 890000, profit: 350000 },
    { month: "Feb", revenue: 1580000, cost: 1100000, profit: 480000 },
    { month: "Mar", revenue: 1320000, cost: 940000, profit: 380000 },
    { month: "Apr", revenue: 1890000, cost: 1300000, profit: 590000 },
    { month: "May", revenue: 2140000, cost: 1480000, profit: 660000 },
    { month: "Jun", revenue: 1760000, cost: 1230000, profit: 530000 },
];

const WEEKLY_SALES = [
    { day: "Mon", sales: 148000 }, { day: "Tue", sales: 220000 },
    { day: "Wed", sales: 190000 }, { day: "Thu", sales: 310000 },
    { day: "Fri", sales: 275000 }, { day: "Sat", sales: 420000 }, { day: "Sun", sales: 185000 },
];

const TOP_PRODUCTS = [
    { name: "Samsung Galaxy A54", sold: 34, revenue: 8160000, profit: 1870000 },
    { name: "Basmati Rice (25kg)", sold: 210, revenue: 3675000, profit: 945000 },
    { name: "Hisense 32\" LED TV", sold: 18, revenue: 3510000, profit: 846000 },
    { name: "Groundnut Oil (25L)", sold: 88, revenue: 2464000, profit: 616000 },
    { name: "Indomie Noodles", sold: 320, revenue: 1760000, profit: 416000 },
];

const CATEGORY_DATA = [
    { name: "Electronics", value: 52, revenue: 11670000 },
    { name: "Food & Bev", value: 27, revenue: 6063000 },
    { name: "Household", value: 11, revenue: 2469000 },
    { name: "Clothing", value: 10, revenue: 2246000 },
];

const INVENTORY_REPORT = [
    { name: "Samsung Galaxy A54", stock: 12, value: 2220000, status: "Healthy" },
    { name: "Basmati Rice (25kg)", stock: 58, value: 1015000, status: "Healthy" },
    { name: "Nasco Standing Fan", stock: 2, value: 76000, status: "Low" },
    { name: "Men's Ankara Set", stock: 24, value: 360000, status: "Healthy" },
    { name: "Indomie Noodles", stock: 120, value: 660000, status: "Healthy" },
    { name: "Hisense 32\" LED TV", stock: 3, value: 585000, status: "Low" },
    { name: "Omo Detergent (5kg)", stock: 0, value: 0, status: "Out" },
    { name: "Groundnut Oil (25L)", stock: 35, value: 980000, status: "Healthy" },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

const fmt = (n) => `₦${(n / 1000000).toFixed(2)}M`;
const fmtK = (n) => n >= 1000000 ? `₦${(n / 1000000).toFixed(1)}M` : `₦${(n / 1000).toFixed(0)}k`;

const SummaryCard = ({ label, value, sub, color }) => (
    <div className={`rounded-2xl p-5 border ${color}`}>
        <p className="text-sm font-medium opacity-80 mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
    </div>
);

export default function Reports() {
    const [activeReport, setActiveReport] = useState("sales");
    const [period, setPeriod] = useState("monthly");

    const totalRevenue = SALES_MONTHLY.reduce((s, m) => s + m.revenue, 0);
    const totalProfit = SALES_MONTHLY.reduce((s, m) => s + m.profit, 0);
    const totalCost = SALES_MONTHLY.reduce((s, m) => s + m.cost, 0);
    const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);
    const totalInventoryValue = INVENTORY_REPORT.reduce((s, p) => s + p.value, 0);
    const lowStockItems = INVENTORY_REPORT.filter((p) => p.status === "Low" || p.status === "Out").length;

    const tabs = [
        { key: "sales", label: "Sales Report" },
        { key: "inventory", label: "Inventory Report" },
        { key: "profit", label: "Profit Report" },
        { key: "summary", label: "Business Summary" },
    ];

    return (
        <div className="space-y-5">
            {/* Report type selector */}
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setActiveReport(tab.key)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${activeReport === tab.key ? "bg-emerald-500 text-white border-emerald-500 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"}`}>
                        {tab.label}
                    </button>
                ))}
                <div className="ml-auto flex gap-1 bg-slate-100 rounded-xl p-1">
                    {["weekly", "monthly"].map((p) => (
                        <button key={p} onClick={() => setPeriod(p)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${period === p ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── SALES REPORT ── */}
            {activeReport === "sales" && (
                <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <SummaryCard label="Total Revenue (6mo)" value={fmt(totalRevenue)} sub="+14.2% vs last period" color="bg-emerald-600 text-white border-emerald-700" />
                        <SummaryCard label="Transactions" value="847" sub="Avg 141/month" color="bg-blue-600 text-white border-blue-700" />
                        <SummaryCard label="Avg Order Value" value="₦26,480" sub="This period" color="bg-violet-600 text-white border-violet-700" />
                        <SummaryCard label="Best Month" value="May" sub="₦2.14M revenue" color="bg-amber-500 text-white border-amber-600" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-800 mb-1">Monthly Revenue vs Cost</h3>
                            <p className="text-xs text-slate-500 mb-4">Jan – Jun 2025 · in ₦</p>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={SALES_MONTHLY} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                                    <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                                    <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} name="Revenue" />
                                    <Bar dataKey="cost" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Cost" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="flex gap-5 mt-3 justify-center">
                                <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" />Revenue</span>
                                <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-3 h-3 rounded bg-slate-200 inline-block" />Cost</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-800 mb-1">Revenue by Category</h3>
                            <p className="text-xs text-slate-500 mb-4">This period</p>
                            <ResponsiveContainer width="100%" height={170}>
                                <PieChart>
                                    <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                                        {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                    </Pie>
                                    <Tooltip formatter={(v, n, p) => [`${v}% · ${fmtK(p.payload.revenue)}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 mt-1">
                                {CATEGORY_DATA.map((c, i) => (
                                    <div key={c.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                            <span className="text-xs text-slate-600">{c.name}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-700">{c.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-800">Top Selling Products</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">#</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Product</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Units Sold</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Profit</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {TOP_PRODUCTS.map((p, i) => (
                                    <tr key={p.name} className="hover:bg-slate-50">
                                        <td className="px-5 py-3.5 text-sm font-bold text-slate-400">#{i + 1}</td>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{p.name}</td>
                                        <td className="px-5 py-3.5 text-sm text-slate-700 text-right">{p.sold}</td>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-800 text-right">₦{p.revenue.toLocaleString()}</td>
                                        <td className="px-5 py-3.5 text-sm font-bold text-emerald-600 text-right">₦{p.profit.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ── INVENTORY REPORT ── */}
            {activeReport === "inventory" && (
                <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <SummaryCard label="Total SKUs" value="284" sub="Active products" color="bg-blue-600 text-white border-blue-700" />
                        <SummaryCard label="Inventory Value" value={fmt(totalInventoryValue)} sub="At cost price" color="bg-emerald-600 text-white border-emerald-700" />
                        <SummaryCard label="Low / Out of Stock" value={`${lowStockItems} items`} sub="Need restocking" color="bg-amber-500 text-white border-amber-600" />
                        <SummaryCard label="Turnover Rate" value="4.2×" sub="Avg per month" color="bg-violet-600 text-white border-violet-700" />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800">Stock Levels by Product</h3>
                            <span className="text-xs text-slate-500">Total value: {fmt(totalInventoryValue)}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Product</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Stock</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Stock Value</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Level</th>
                                    <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {INVENTORY_REPORT.map((item) => {
                                    const pct = Math.min(100, (item.stock / 120) * 100);
                                    const status = item.status === "Out" ? { label: "Out of Stock", color: "bg-red-50 text-red-700", bar: "bg-red-400" }
                                        : item.status === "Low" ? { label: "Low Stock", color: "bg-amber-50 text-amber-700", bar: "bg-amber-400" }
                                            : { label: "Healthy", color: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-400" };
                                    return (
                                        <tr key={item.name} className="hover:bg-slate-50">
                                            <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{item.name}</td>
                                            <td className="px-5 py-3.5 text-sm text-right font-bold text-slate-700">{item.stock}</td>
                                            <td className="px-5 py-3.5 text-sm text-right text-slate-600">₦{item.value.toLocaleString()}</td>
                                            <td className="px-5 py-3.5 min-w-[140px]">
                                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full ${status.bar}`} style={{ width: `${pct}%` }} />
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>{status.label}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ── PROFIT REPORT ── */}
            {activeReport === "profit" && (
                <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <SummaryCard label="Gross Revenue" value={fmt(totalRevenue)} sub="6-month total" color="bg-slate-800 text-white border-slate-900" />
                        <SummaryCard label="Total Cost" value={fmt(totalCost)} sub="Cost of goods" color="bg-red-500 text-white border-red-600" />
                        <SummaryCard label="Gross Profit" value={fmt(totalProfit)} sub="+16% vs prev period" color="bg-emerald-600 text-white border-emerald-700" />
                        <SummaryCard label="Profit Margin" value={`${margin}%`} sub="Industry avg: 22%" color="bg-blue-600 text-white border-blue-700" />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="font-semibold text-slate-800 mb-1">Profit Trend</h3>
                        <p className="text-xs text-slate-500 mb-5">Monthly gross profit Jan – Jun 2025</p>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={SALES_MONTHLY}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                                <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5 }} name="Gross Profit" />
                                <Line type="monotone" dataKey="revenue" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Revenue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-100">
                            <h3 className="font-semibold text-slate-800">Profit by Product</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Product</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Profit</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Margin</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Contribution</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {TOP_PRODUCTS.map((p) => {
                                    const m = ((p.profit / p.revenue) * 100).toFixed(1);
                                    const contrib = ((p.profit / totalProfit) * 100).toFixed(1);
                                    return (
                                        <tr key={p.name} className="hover:bg-slate-50">
                                            <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{p.name}</td>
                                            <td className="px-5 py-3.5 text-sm text-slate-600 text-right">₦{p.revenue.toLocaleString()}</td>
                                            <td className="px-5 py-3.5 text-sm font-bold text-emerald-600 text-right">₦{p.profit.toLocaleString()}</td>
                                            <td className="px-5 py-3.5 text-right">
                                                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-lg">{m}%</span>
                                            </td>
                                            <td className="px-5 py-3.5 min-w-[160px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                                                        <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${contrib}%` }} />
                                                    </div>
                                                    <span className="text-xs text-slate-500 w-10">{contrib}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ── BUSINESS SUMMARY ── */}
            {activeReport === "summary" && (
                <div className="space-y-5">
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">Business Performance Summary</p>
                                <h2 className="text-2xl font-bold">AlZaidan Global Investment</h2>
                                <p className="text-emerald-300 text-sm mt-0.5">Minna, Niger State · Jan – Jun 2025</p>
                            </div>
                            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                                <p className="text-xs text-emerald-300">Overall Health</p>
                                <p className="text-2xl font-black text-emerald-300">A+</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            {[
                                { label: "Revenue", value: fmt(totalRevenue) },
                                { label: "Gross Profit", value: fmt(totalProfit) },
                                { label: "Profit Margin", value: `${margin}%` },
                                { label: "Total Transactions", value: "847" },
                            ].map((s) => (
                                <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                                    <p className="text-emerald-300 text-xs mb-1">{s.label}</p>
                                    <p className="text-xl font-bold">{s.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-800 mb-4">Revenue & Profit Trend</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={SALES_MONTHLY}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                                    <Tooltip formatter={(v) => [`₦${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                                    <Bar dataKey="revenue" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Revenue" />
                                    <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                            <h3 className="font-semibold text-slate-800">Key Performance Indicators</h3>
                            {[
                                { label: "Revenue Growth (MoM)", value: "+14.2%", status: "up", note: "Above target of 10%" },
                                { label: "Profit Margin", value: `${margin}%`, status: "up", note: "Industry average: 22%" },
                                { label: "Inventory Turnover", value: "4.2×/mo", status: "up", note: "Healthy turnover rate" },
                                { label: "Stock-Out Incidents", value: "3 items", status: "down", note: "Omo, Fan, TV lines" },
                                { label: "Customer Retention", value: "68%", status: "up", note: "Returning buyers" },
                            ].map((kpi) => (
                                <div key={kpi.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{kpi.label}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{kpi.note}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold ${kpi.status === "up" ? "text-emerald-600" : "text-red-500"}`}>{kpi.value}</span>
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center ${kpi.status === "up" ? "bg-emerald-50" : "bg-red-50"}`}>
                      {kpi.status === "up" ? (
                          <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                      ) : (
                          <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                      )}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="font-semibold text-slate-800 mb-4">Recommendations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { icon: "📦", title: "Restock Urgently", body: "Omo Detergent, Nasco Fan, and Hisense TV are out or critically low. Reorder immediately to avoid lost sales.", color: "bg-red-50 border-red-100" },
                                { icon: "📈", title: "Scale Electronics", body: "Electronics account for 52% of revenue with the highest margins. Consider expanding stock and supplier network.", color: "bg-emerald-50 border-emerald-100" },
                                { icon: "💡", title: "Bundle Strategy", body: "Pair high-margin Electronics with fast-moving Food products to increase average order value per customer.", color: "bg-blue-50 border-blue-100" },
                            ].map((r) => (
                                <div key={r.title} className={`rounded-xl border p-4 ${r.color}`}>
                                    <p className="text-xl mb-2">{r.icon}</p>
                                    <p className="font-semibold text-slate-800 text-sm mb-1">{r.title}</p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{r.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}