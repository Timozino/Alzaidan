import { useState } from "react";

const INITIAL_PRODUCTS = [
    { id: 1, name: "Samsung Galaxy A54", sku: "ELEC-001", category: "Electronics", price: 240000, cost: 185000, stock: 12, unit: "Pcs", status: "Active" },
    { id: 2, name: "Basmati Rice (25kg)", sku: "FOOD-001", category: "Food & Bev", price: 17500, cost: 13000, stock: 58, unit: "Bags", status: "Active" },
    { id: 3, name: "Nasco Standing Fan", sku: "ELEC-002", category: "Electronics", price: 38000, cost: 28000, stock: 8, unit: "Pcs", status: "Active" },
    { id: 4, name: "Men's Ankara 3-Piece", sku: "CLTH-001", category: "Clothing", price: 15000, cost: 9000, stock: 24, unit: "Sets", status: "Active" },
    { id: 5, name: "Indomie Noodles (Carton)", sku: "FOOD-002", category: "Food & Bev", price: 5500, cost: 4200, stock: 120, unit: "Cartons", status: "Active" },
    { id: 6, name: "Hisense 32\" LED TV", sku: "ELEC-003", category: "Electronics", price: 195000, cost: 148000, stock: 3, unit: "Pcs", status: "Low Stock" },
    { id: 7, name: "Omo Detergent (5kg)", sku: "HHLD-001", category: "Household", price: 4800, cost: 3600, stock: 0, unit: "Packs", status: "Out of Stock" },
    { id: 8, name: "Groundnut Oil (25L)", sku: "FOOD-003", category: "Food & Bev", price: 28000, cost: 21000, stock: 35, unit: "Kegs", status: "Active" },
];

const CATEGORIES = ["Electronics", "Food & Bev", "Household", "Clothing", "Others"];
const UNITS = ["Pcs", "Bags", "Cartons", "Sets", "Kegs", "Packs", "Litres", "Kg"];

const EMPTY_FORM = { name: "", sku: "", category: "Electronics", price: "", cost: "", stock: "", unit: "Pcs", status: "Active" };

export default function ProductManagement() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === "All" || p.category === filterCat;
        return matchSearch && matchCat;
    });

    const openAdd = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = (product) => {
        setForm({ ...product });
        setEditingId(product.id);
        setShowModal(true);
    };

    const handleSave = () => {
        if (!form.name || !form.price || !form.cost || !form.sku) {
            showToast("Please fill in all required fields.", "error");
            return;
        }
        if (editingId) {
            setProducts(products.map((p) => (p.id === editingId ? { ...form, id: editingId } : p)));
            showToast("Product updated successfully.");
        } else {
            const newId = Math.max(...products.map((p) => p.id)) + 1;
            setProducts([...products, { ...form, id: newId, price: Number(form.price), cost: Number(form.cost), stock: Number(form.stock) }]);
            showToast("Product added successfully.");
        }
        setShowModal(false);
    };

    const handleDelete = () => {
        setProducts(products.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        showToast("Product deleted.");
    };

    const statusColors = {
        "Active": "bg-emerald-50 text-emerald-700",
        "Low Stock": "bg-amber-50 text-amber-700",
        "Out of Stock": "bg-red-50 text-red-700",
    };

    return (
        <div className="space-y-5">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 transition-all ${toast.type === "error" ? "bg-red-500 text-white" : "bg-slate-900 text-white"}`}>
                    {toast.type !== "error" && <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Product Catalog</h2>
                    <p className="text-sm text-slate-500">{products.length} total products</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        type="text"
                        placeholder="Search by name or SKU…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {["All", ...CATEGORIES].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCat(cat)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${filterCat === cat ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-300"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                            <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost</th>
                            <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} className="text-center py-12 text-slate-400 text-sm">No products found.</td></tr>
                        ) : filtered.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 text-sm font-semibold text-slate-800">{p.name}</td>
                                <td className="px-5 py-4 text-xs font-mono text-slate-500 bg-slate-50/50">{p.sku}</td>
                                <td className="px-5 py-4 text-sm text-slate-600">{p.category}</td>
                                <td className="px-5 py-4 text-sm text-slate-600 text-right">₦{Number(p.cost).toLocaleString()}</td>
                                <td className="px-5 py-4 text-sm font-semibold text-slate-800 text-right">₦{Number(p.price).toLocaleString()}</td>
                                <td className="px-5 py-4 text-sm text-center font-medium text-slate-700">{p.stock} {p.unit}</td>
                                <td className="px-5 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[p.status] || "bg-slate-100 text-slate-600"}`}>
                      {p.status}
                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="Edit">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="Delete">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{editingId ? "Edit Product" : "Add New Product"}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Product Name *</label>
                                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Samsung Galaxy A54" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">SKU *</label>
                                    <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="ELEC-001" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cost Price (₦) *</label>
                                    <input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Selling Price (₦) *</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Initial Stock</label>
                                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Unit</label>
                                    <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                        {UNITS.map((u) => <option key={u}>{u}</option>)}
                                    </select>
                                </div>
                            </div>
                            {form.cost && form.price && (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2.5 flex justify-between text-sm">
                                    <span className="text-slate-600">Margin:</span>
                                    <span className="font-semibold text-emerald-700">
                    {form.price > 0 ? `${(((form.price - form.cost) / form.price) * 100).toFixed(1)}%` : "—"}
                                        &nbsp;·&nbsp; ₦{(form.price - form.cost).toLocaleString()} per unit
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 p-6 pt-0">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors">
                                {editingId ? "Save Changes" : "Add Product"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">Delete Product?</h3>
                        <p className="text-slate-500 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}