// import { useState } from "react";
// import {
//     LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
//     Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
// } from "recharts";
//
// const salesData = [
//     { day: "Mon", sales: 148000, revenue: 52000 },
//     { day: "Tue", sales: 220000, revenue: 78000 },
//     { day: "Wed", sales: 190000, revenue: 65000 },
//     { day: "Thu", sales: 310000, revenue: 98000 },
//     { day: "Fri", sales: 275000, revenue: 88000 },
//     { day: "Sat", sales: 420000, revenue: 142000 },
//     { day: "Sun", sales: 185000, revenue: 60000 },
// ];
//
// const categoryData = [
//     { name: "Electronics", value: 38 },
//     { name: "Food & Bev", value: 24 },
//     { name: "Household", value: 18 },
//     { name: "Clothing", value: 12 },
//     { name: "Others", value: 8 },
// ];
//
// const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#64748b"];
//
// const recentSales = [
//     { id: "TXN-001", product: "Samsung Galaxy A54", qty: 2, amount: "₦480,000", time: "10:32 AM", status: "Completed" },
//     { id: "TXN-002", product: "Basmati Rice (25kg)", qty: 5, amount: "₦87,500", time: "11:15 AM", status: "Completed" },
//     { id: "TXN-003", product: "Nasco Fan (Standing)", qty: 1, amount: "₦38,000", time: "12:04 PM", status: "Completed" },
//     { id: "TXN-004", product: "Men's Ankara Set", qty: 3, amount: "₦45,000", time: "1:22 PM", status: "Pending" },
//     { id: "TXN-005", product: "Indomie (Carton)", qty: 10, amount: "₦55,000", time: "2:47 PM", status: "Completed" },
// ];
//
// const lowStockAlerts = [
//     { product: "Samsung Galaxy A54", stock: 3, min: 10 },
//     { product: "Nasco Standing Fan", stock: 2, min: 8 },
//     { product: "Basmati Rice 25kg", stock: 5, min: 15 },
// ];
//
// const KPICard = ({ title, value, change, positive, icon, color }) => (
//     <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
//         <div className="flex items-start justify-between mb-4">
//             <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
//                 {icon}
//             </div>
//             <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
//         {change}
//       </span>
//         </div>
//         <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
//         <p className="text-slate-500 text-sm">{title}</p>
//     </div>
// );
//
// export default function Dashboard() {
//     const [period, setPeriod] = useState("week");
//
//     return (
//         <div className="space-y-6">
//             {/* Low stock alerts */}
//             {lowStockAlerts.length > 0 && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
//                     <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                         </svg>
//                     </div>
//                     <div>
//                         <p className="font-semibold text-amber-800 text-sm">Low Stock Alert — {lowStockAlerts.length} items need restocking</p>
//                         <p className="text-amber-600 text-xs mt-0.5">
//                             {lowStockAlerts.map(a => `${a.product} (${a.stock} left)`).join(" · ")}
//                         </p>
//                     </div>
//                 </div>
//             )}
//
//             {/* KPIs */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 <KPICard
//                     title="Today's Revenue"
//                     value="₦583,500"
//                     change="+12.4%"
//                     positive={true}
//                     color="bg-emerald-100"
//                     icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//                 />
//                 <KPICard
//                     title="Total Sales Today"
//                     value="47 Orders"
//                     change="+8.1%"
//                     positive={true}
//                     color="bg-blue-100"
//                     icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
//                 />
//                 <KPICard
//                     title="Products in Stock"
//                     value="284 SKUs"
//                     change="-3 low"
//                     positive={false}
//                     color="bg-violet-100"
//                     icon={<svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
//                 />
//                 <KPICard
//                     title="Gross Profit (Week)"
//                     value="₦2.14M"
//                     change="+19.2%"
//                     positive={true}
//                     color="bg-amber-100"
//                     icon={<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
//                 />
//             </div>
//
//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {/* Sales Trend */}
//                 <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
//                     <div className="flex items-center justify-between mb-5">
//                         <div>
//                             <h3 className="font-semibold text-slate-800">Sales & Revenue Trend</h3>
//                             <p className="text-xs text-slate-500 mt-0.5">This week · values in ₦</p>
//                         </div>
//                         <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
//                             {["week", "month", "year"].map((p) => (
//                                 <button
//                                     key={p}
//                                     onClick={() => setPeriod(p)}
//                                     className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${period === p ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
//                                 >
//                                     {p}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <ResponsiveContainer width="100%" height={220}>
//                         <LineChart data={salesData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                             <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                             <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
//                             <Tooltip formatter={(val) => [`₦${val.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
//                             <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="Sales" />
//                             <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#3b82f6", r: 3 }} name="Revenue" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                     <div className="flex gap-4 mt-3 justify-center">
//                         <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-emerald-500 inline-block rounded" />Sales</span>
//                         <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-blue-500 inline-block rounded border-dashed" />Revenue</span>
//                     </div>
//                 </div>
//
//                 {/* Category breakdown */}
//                 <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
//                     <h3 className="font-semibold text-slate-800 mb-1">Sales by Category</h3>
//                     <p className="text-xs text-slate-500 mb-4">This month</p>
//                     <ResponsiveContainer width="100%" height={160}>
//                         <PieChart>
//                             <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
//                                 {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                             </Pie>
//                             <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
//                         </PieChart>
//                     </ResponsiveContainer>
//                     <div className="space-y-2 mt-2">
//                         {categoryData.map((c, i) => (
//                             <div key={c.name} className="flex items-center justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
//                                     <span className="text-slate-600 text-xs">{c.name}</span>
//                                 </div>
//                                 <span className="font-medium text-slate-700 text-xs">{c.value}%</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Recent transactions */}
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//                 <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
//                     <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
//                     <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">View all</span>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                         <tr className="bg-slate-50">
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
//                         </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-50">
//                         {recentSales.map((sale) => (
//                             <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
//                                 <td className="px-5 py-3.5 text-sm font-mono text-emerald-600">{sale.id}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-700 font-medium">{sale.product}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-600">{sale.qty}</td>
//                                 <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{sale.amount}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-500">{sale.time}</td>
//                                 <td className="px-5 py-3.5">
//                     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         sale.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
//                     }`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${sale.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
//                         {sale.status}
//                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }



// import { useState } from "react";
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid,
//     Tooltip, ResponsiveContainer, PieChart, Pie, Cell
// } from "recharts";
//
// const salesData = [
//     { day: "Mon", sales: 148000, revenue: 52000 },
//     { day: "Tue", sales: 220000, revenue: 78000 },
//     { day: "Wed", sales: 190000, revenue: 65000 },
//     { day: "Thu", strokeDasharray: "5 5", sales: 310000, revenue: 98000 },
//     { day: "Fri", sales: 275000, revenue: 88000 },
//     { day: "Sat", sales: 420000, revenue: 142000 },
//     { day: "Sun", sales: 185000, revenue: 60000 },
// ];
//
// const categoryData = [
//     { name: "Electronics", value: 38 },
//     { name: "Food & Bev", value: 24 },
//     { name: "Household", value: 18 },
//     { name: "Clothing", value: 12 },
//     { name: "Others", value: 8 },
// ];
//
// const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#64748b"];
//
// const recentSales = [
//     { id: "TXN-001", product: "Samsung Galaxy A54", qty: 2, amount: "₦480,000", time: "10:32 AM", status: "Completed" },
//     { id: "TXN-002", product: "Basmati Rice (25kg)", qty: 5, amount: "₦87,500", time: "11:15 AM", status: "Completed" },
//     { id: "TXN-003", product: "Nasco Fan (Standing)", qty: 1, amount: "₦38,000", time: "12:04 PM", status: "Completed" },
//     { id: "TXN-004", product: "Men's Ankara Set", qty: 3, amount: "₦45,000", time: "1:22 PM", status: "Pending" },
//     { id: "TXN-005", product: "Indomie (Carton)", qty: 10, amount: "₦55,000", time: "2:47 PM", status: "Completed" },
// ];
//
// const lowStockAlerts = [
//     { product: "Samsung Galaxy A54", stock: 3, min: 10 },
//     { product: "Nasco Standing Fan", stock: 2, min: 8 },
//     { product: "Basmati Rice 25kg", stock: 5, min: 15 },
// ];
//
// const KPICard = ({ title, value, change, positive, icon, color }) => (
//     <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
//         <div className="flex items-start justify-between mb-4">
//             <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
//                 {icon}
//             </div>
//             <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
//         {change}
//       </span>
//         </div>
//         <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
//         <p className="text-slate-500 text-sm">{title}</p>
//     </div>
// );
//
// export default function Dashboard() {
//     const [period, setPeriod] = useState("week");
//
//     return (
//         <div className="space-y-6">
//             {/* Low stock alerts */}
//             {lowStockAlerts.length > 0 && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
//                     <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                         </svg>
//                     </div>
//                     <div>
//                         <p className="font-semibold text-amber-800 text-sm">Low Stock Alert — {lowStockAlerts.length} items need restocking</p>
//                         <p className="text-amber-600 text-xs mt-0.5">
//                             {lowStockAlerts.map(a => `${a.product} (${a.stock} left)`).join(" · ")}
//                         </p>
//                     </div>
//                 </div>
//             )}
//
//             {/* KPIs */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 <KPICard
//                     title="Today's Revenue"
//                     value="₦583,500"
//                     change="+12.4%"
//                     positive={true}
//                     color="bg-emerald-100"
//                     icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
//                 />
//                 <KPICard
//                     title="Total Sales Today"
//                     value="47 Orders"
//                     change="+8.1%"
//                     positive={true}
//                     color="bg-blue-100"
//                     icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
//                 />
//                 <KPICard
//                     title="Products in Stock"
//                     value="284 SKUs"
//                     change="-3 low"
//                     positive={false}
//                     color="bg-violet-100"
//                     icon={<svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
//                 />
//                 <KPICard
//                     title="Gross Profit (Week)"
//                     value="₦2.14M"
//                     change="+19.2%"
//                     positive={true}
//                     color="bg-amber-100"
//                     icon={<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
//                 />
//             </div>
//
//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {/* Sales Trend */}
//                 <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm min-w-0">
//                     <div className="flex items-center justify-between mb-5">
//                         <div>
//                             <h3 className="font-semibold text-slate-800">Sales & Revenue Trend</h3>
//                             <p className="text-xs text-slate-500 mt-0.5">This week · values in ₦</p>
//                         </div>
//                         <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
//                             {["week", "month", "year"].map((p) => (
//                                 <button
//                                     key={p}
//                                     onClick={() => setPeriod(p)}
//                                     className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${period === p ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
//                                 >
//                                     {p}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     {/* Added relative parent div with set height to fix fluid width parsing layout collapse */}
//                     <div className="w-full h-[220px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <LineChart data={salesData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
//                                 <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                                 <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                                 <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
//                                 <Tooltip formatter={(val) => [`₦${val.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
//                                 <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="Sales" />
//                                 <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#3b82f6", r: 3 }} name="Revenue" />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>
//                     <div className="flex gap-4 mt-3 justify-center">
//                         <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-emerald-500 inline-block rounded" />Sales</span>
//                         <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-blue-500 inline-block rounded border-dashed" />Revenue</span>
//                     </div>
//                 </div>
//
//                 {/* Category breakdown */}
//                 <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm min-w-0">
//                     <h3 className="font-semibold text-slate-800 mb-1">Sales by Category</h3>
//                     <p className="text-xs text-slate-500 mb-4">This month</p>
//                     <div className="w-full h-[160px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
//                                     {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                                 </Pie>
//                                 <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                     <div className="space-y-2 mt-2">
//                         {categoryData.map((c, i) => (
//                             <div key={c.name} className="flex items-center justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
//                                     <span className="text-slate-600 text-xs">{c.name}</span>
//                                 </div>
//                                 <span className="font-medium text-slate-700 text-xs">{c.value}%</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Recent transactions */}
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//                 <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
//                     <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
//                     <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">View all</span>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                         <tr className="bg-slate-50">
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
//                             <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
//                         </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-50">
//                         {recentSales.map((sale) => (
//                             <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
//                                 <td className="px-5 py-3.5 text-sm font-mono text-emerald-600">{sale.id}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-700 font-medium">{sale.product}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-600">{sale.qty}</td>
//                                 <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{sale.amount}</td>
//                                 <td className="px-5 py-3.5 text-sm text-slate-500">{sale.time}</td>
//                                 <td className="px-5 py-3.5">
//                     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         sale.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
//                     }`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${sale.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
//                         {sale.status}
//                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }








import { useState } from "react";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const salesData = [
    { day: "Mon", sales: 148000, revenue: 52000 },
    { day: "Tue", sales: 220000, revenue: 78000 },
    { day: "Wed", sales: 190000, revenue: 65000 },
    { day: "Thu", sales: 310000, revenue: 98000 },
    { day: "Fri", sales: 275000, revenue: 88000 },
    { day: "Sat", sales: 420000, revenue: 142000 },
    { day: "Sun", sales: 185000, revenue: 60000 },
];

const categoryData = [
    { name: "Electronics", value: 38 },
    { name: "Food & Bev",  value: 24 },
    { name: "Household",   value: 18 },
    { name: "Clothing",    value: 12 },
    { name: "Others",      value: 8  },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#64748b"];

const recentSales = [
    { id: "TXN-001", product: "Samsung Galaxy A54",    qty: 2,  amount: "₦480,000",  time: "10:32 AM", status: "Completed" },
    { id: "TXN-002", product: "Basmati Rice (25kg)",   qty: 5,  amount: "₦87,500",   time: "11:15 AM", status: "Completed" },
    { id: "TXN-003", product: "Nasco Fan (Standing)",  qty: 1,  amount: "₦38,000",   time: "12:04 PM", status: "Completed" },
    { id: "TXN-004", product: "Men's Ankara Set",      qty: 3,  amount: "₦45,000",   time: "1:22 PM",  status: "Pending"   },
    { id: "TXN-005", product: "Indomie (Carton)",      qty: 10, amount: "₦55,000",   time: "2:47 PM",  status: "Completed" },
];

const lowStockAlerts = [
    { product: "Samsung Galaxy A54",  stock: 3,  min: 10 },
    { product: "Nasco Standing Fan",  stock: 2,  min: 8  },
    { product: "Basmati Rice 25kg",   stock: 5,  min: 15 },
];

const KPICard = ({ title, value, change, positive, color, icon }) => (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
        {change}
      </span>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-0.5">{value}</p>
        <p className="text-slate-500 text-xs sm:text-sm">{title}</p>
    </div>
);

export default function Dashboard() {
    const [period, setPeriod] = useState("week");

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Low stock alert banner */}
            {lowStockAlerts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-amber-800 text-sm">Low Stock — {lowStockAlerts.length} items need restocking</p>
                        <p className="text-amber-600 text-xs mt-0.5 truncate">
                            {lowStockAlerts.map(a => `${a.product} (${a.stock} left)`).join(" · ")}
                        </p>
                    </div>
                </div>
            )}

            {/* KPI Grid — 2 cols on mobile, 4 on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <KPICard title="Today's Revenue"     value="₦583,500"  change="+12.4%" positive color="bg-emerald-100"
                         icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <KPICard title="Total Sales Today"  value="47 Orders"  change="+8.1%"  positive color="bg-blue-100"
                         icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                />
                <KPICard title="Products in Stock"  value="284 SKUs"   change="-3 low" positive={false} color="bg-violet-100"
                         icon={<svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                />
                <KPICard title="Gross Profit (Week)" value="₦2.14M"   change="+19.2%" positive color="bg-amber-100"
                         icon={<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                />
            </div>

            {/* Charts — stack on mobile, side-by-side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Line chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                        <div>
                            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Sales & Revenue Trend</h3>
                            <p className="text-xs text-slate-500 mt-0.5">This week · values in ₦</p>
                        </div>
                        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 flex-shrink-0">
                            {["week", "month", "year"].map((p) => (
                                <button key={p} onClick={() => setPeriod(p)}
                                        className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${period === p ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} width={48} />
                            <Tooltip formatter={(val) => [`₦${val.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                            <Line type="monotone" dataKey="sales"   stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 3 }} name="Sales" />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#3b82f6", r: 3 }} name="Revenue" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex gap-4 mt-3 justify-center">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-emerald-500 inline-block rounded" />Sales</span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500"><span className="w-4 h-0.5 bg-blue-500 inline-block rounded" />Revenue</span>
                    </div>
                </div>

                {/* Pie chart */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">Sales by Category</h3>
                    <p className="text-xs text-slate-500 mb-3">This month</p>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 mt-2">
                        {categoryData.map((c, i) => (
                            <div key={c.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="text-slate-600 text-xs">{c.name}</span>
                                </div>
                                <span className="font-medium text-slate-700 text-xs">{c.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent transactions — scrollable on mobile */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Recent Transactions</h3>
                    <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">View all</span>
                </div>

                {/* Mobile card view */}
                <div className="sm:hidden divide-y divide-slate-50">
                    {recentSales.map((sale) => (
                        <div key={sale.id} className="px-4 py-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{sale.product}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{sale.id} · Qty {sale.qty} · {sale.time}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-bold text-slate-800">{sale.amount}</p>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${sale.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {sale.status}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-slate-50">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Txn ID</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {recentSales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-3.5 text-sm font-mono text-emerald-600">{sale.id}</td>
                                <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{sale.product}</td>
                                <td className="px-5 py-3.5 text-sm text-slate-600">{sale.qty}</td>
                                <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{sale.amount}</td>
                                <td className="px-5 py-3.5 text-sm text-slate-500">{sale.time}</td>
                                <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${sale.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sale.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {sale.status}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}