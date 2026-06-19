import { useState } from "react";

const INVENTORY = [
    { id: 1, sku: "ELEC-001", name: "Samsung Galaxy A54", category: "Electronics", stock: 12, minStock: 10, maxStock: 50, unit: "Pcs", lastRestocked: "2025-06-10", supplier: "TechZone Lagos" },
    { id: 2, sku: "FOOD-001", name: "Basmati Rice (25kg)", category: "Food & Bev", stock: 58, minStock: 15, maxStock: 100, unit: "Bags", lastRestocked: "2025-06-08", supplier: "Kwara Farms Ltd" },
    { id: 3, sku: "ELEC-002", name: "Nasco Standing Fan", category: "Electronics", stock: 2, minStock: 8, maxStock: 40, unit: "Pcs", lastRestocked: "2025-05-28", supplier: "Nasco Nigeria" },
    { id: 4, sku: "CLTH-001", name: "Men's Ankara Set", category: "Clothing", stock: 24, minStock: 10, maxStock: 80, unit: "Sets", lastRestocked: "2025-06-05", supplier: "Balogun Market" },
    { id: 5, sku: "FOOD-002", name: "Indomie Noodles (Carton)", category: "Food & Bev", stock: 120, minStock: 30, maxStock: 200, unit: "Cartons", lastRestocked: "2025-06-12", supplier: "Dufil Nigeria" },
    { id: 6, sku: "ELEC-003", name: "Hisense 32\" LED TV", category: "Electronics", stock: 3, minStock: 5, maxStock: 25, unit: "Pcs", lastRestocked: "2025-05-20", supplier: "TechZone Lagos" },
    { id: 7, sku: "HHLD-001", name: "Omo Detergent (5kg)", category: "Household", stock: 0, minStock: 20, maxStock: 100, unit: "Packs", lastRestocked: "2025-05-15", supplier: "Unilever Dist." },
    { id: 8, sku: "FOOD-003", name: "Groundnut Oil (25L)", category: "Food & Bev", stock: 35, minStock: 10, maxStock: 60, unit: "Kegs", lastRestocked: "2025-06-11", supplier: "Kwara Farms Ltd" },
];

const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700", dot: "bg-red-500", barColor: "bg-red-400" };
    if (stock <= minStock) return { label: "Low Stock", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500", barColor: "bg-amber-400" };
    return { label: "In Stock", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", barColor: "bg-emerald-400" };
};

export default function InventoryManagement() {
    const [inventory, setInventory] = useState(INVENTORY);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [restockModal, setRestockModal] = useState(null);
    const [restockQty, setRestockQty] = useState("");
    const [toast, setToast] = useState(null);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const filtered = inventory.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
        const status = getStockStatus(item.stock, item.minStock);
        const matchStatus = filterStatus === "All" || status.label === filterStatus;
        return matchSearch && matchStatus;
    });

    const lowStockCount = inventory.filter((i) => i.stock > 0 && i.stock <= i.minStock).length;
    const outOfStockCount = inventory.filter((i) => i.stock === 0).length;
    const healthyCount = inventory.filter((i) => i.stock > i.minStock).length;

    const handleRestock = () => {
        const qty = parseInt(restockQty);
        if (!qty || qty <= 0) return;
        setInventory(inventory.map((item) =>
            item.id === restockModal.id
                ? { ...item, stock: item.stock + qty, lastRestocked: new Date().toISOString().split("T")[0] }
                : item
        ));
        showToast(`${restockModal.name} restocked by ${qty} ${restockModal.unit}.`);
        setRestockModal(null);
        setRestockQty("");
    };

    return (
        <div className="space-y-5">
            {toast && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {toast}
                </div>
            )}

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-emerald-700">{healthyCount}</p>
                        <p className="text-xs text-emerald-600">Healthy Stock</p>
                    </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-700">{lowStockCount}</p>
                        <p className="text-xs text-amber-600">Low Stock Alert</p>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-400 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-700">{outOfStockCount}</p>
                        <p className="text-xs text-red-600">Out of Stock</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Search inventory…" value={search} onChange={(e) => setSearch(e.target.value)}
                           className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
                <div className="flex gap-2">
                    {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filterStatus === s ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Stock</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Min / Max</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Level</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Restocked</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {filtered.map((item) => {
                            const status = getStockStatus(item.stock, item.minStock);
                            const pct = Math.min(100, (item.stock / item.maxStock) * 100);
                            return (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                                        <p className="text-xs text-slate-400 font-mono mt-0.5">{item.sku} · {item.supplier}</p>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                      <span className={`text-xl font-bold ${item.stock === 0 ? "text-red-500" : item.stock <= item.minStock ? "text-amber-500" : "text-slate-800"}`}>
                        {item.stock}
                      </span>
                                        <span className="text-xs text-slate-400 ml-1">{item.unit}</span>
                                    </td>
                                    <td className="px-5 py-4 text-center text-xs text-slate-500">
                                        {item.minStock} / {item.maxStock}
                                    </td>
                                    <td className="px-5 py-4 min-w-[140px]">
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className={`h-2 rounded-full transition-all ${status.barColor}`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{pct.toFixed(0)}% of max</p>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                      </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-500">{item.lastRestocked}</td>
                                    <td className="px-5 py-4 text-center">
                                        <button
                                            onClick={() => { setRestockModal(item); setRestockQty(""); }}
                                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors"
                                        >
                                            Restock
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Restock Modal */}
            {restockModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800 text-lg">Restock Product</h3>
                            <p className="text-slate-500 text-sm mt-1">{restockModal.name}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs mb-1">Current Stock</p>
                                    <p className="font-bold text-slate-800">{restockModal.stock} {restockModal.unit}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs mb-1">Minimum Level</p>
                                    <p className="font-bold text-slate-800">{restockModal.minStock} {restockModal.unit}</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Quantity to Add ({restockModal.unit}) *</label>
                                <input
                                    type="number"
                                    value={restockQty}
                                    onChange={(e) => setRestockQty(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                                    placeholder="0"
                                    min={1}
                                />
                            </div>
                            {restockQty > 0 && (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm text-center">
                                    <span className="text-slate-600">New stock level: </span>
                                    <span className="font-bold text-emerald-700">{restockModal.stock + parseInt(restockQty)} {restockModal.unit}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 p-6 pt-0">
                            <button onClick={() => setRestockModal(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600">Cancel</button>
                            <button onClick={handleRestock} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold">Confirm Restock</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}