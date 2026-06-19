import { useState } from "react";

const PRODUCTS = [
    { id: 1, name: "Samsung Galaxy A54", sku: "ELEC-001", price: 240000, stock: 12, unit: "Pcs" },
    { id: 2, name: "Basmati Rice (25kg)", sku: "FOOD-001", price: 17500, stock: 58, unit: "Bags" },
    { id: 3, name: "Nasco Standing Fan", sku: "ELEC-002", price: 38000, stock: 2, unit: "Pcs" },
    { id: 4, name: "Men's Ankara Set", sku: "CLTH-001", price: 15000, stock: 24, unit: "Sets" },
    { id: 5, name: "Indomie Noodles (Carton)", sku: "FOOD-002", price: 5500, stock: 120, unit: "Cartons" },
    { id: 6, name: "Hisense 32\" LED TV", sku: "ELEC-003", price: 195000, stock: 3, unit: "Pcs" },
    { id: 7, name: "Groundnut Oil (25L)", sku: "FOOD-003", price: 28000, stock: 35, unit: "Kegs" },
    { id: 8, name: "Omo Detergent (5kg)", sku: "HHLD-001", price: 4800, stock: 45, unit: "Packs" },
];

const INITIAL_TRANSACTIONS = [
    { id: "TXN-001", items: [{ name: "Samsung Galaxy A54", qty: 2, price: 240000 }], total: 480000, customer: "Musa Ibrahim", payment: "Cash", date: "2025-06-19", time: "10:32 AM", status: "Completed" },
    { id: "TXN-002", items: [{ name: "Basmati Rice (25kg)", qty: 5, price: 17500 }, { name: "Groundnut Oil (25L)", qty: 2, price: 28000 }], total: 143500, customer: "Aisha Bello", payment: "Transfer", date: "2025-06-19", time: "11:15 AM", status: "Completed" },
    { id: "TXN-003", items: [{ name: "Nasco Standing Fan", qty: 1, price: 38000 }], total: 38000, customer: "Walk-in Customer", payment: "Cash", date: "2025-06-19", time: "12:04 PM", status: "Completed" },
    { id: "TXN-004", items: [{ name: "Men's Ankara Set", qty: 3, price: 15000 }], total: 45000, customer: "Emeka Okafor", payment: "POS", date: "2025-06-19", time: "1:22 PM", status: "Pending" },
    { id: "TXN-005", items: [{ name: "Indomie Noodles (Carton)", qty: 10, price: 5500 }], total: 55000, customer: "Fatima Yusuf", payment: "Transfer", date: "2025-06-19", time: "2:47 PM", status: "Completed" },
];

const PAYMENT_METHODS = ["Cash", "Bank Transfer", "POS", "Mobile Money"];

export default function SalesManagement() {
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [products] = useState(PRODUCTS);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [amountPaid, setAmountPaid] = useState("");
    const [showReceipt, setShowReceipt] = useState(null);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState("new"); // "new" | "history"

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const change = amountPaid ? Math.max(0, parseFloat(amountPaid) - cartTotal) : 0;

    const addToCart = (product) => {
        if (product.stock === 0) return;
        const existing = cart.find((c) => c.id === product.id);
        if (existing) {
            if (existing.qty >= product.stock) {
                showToast(`Only ${product.stock} units available.`, "error");
                return;
            }
            setCart(cart.map((c) => c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
        setProductSearch("");
    };

    const updateQty = (id, qty) => {
        if (qty < 1) { removeFromCart(id); return; }
        const product = products.find((p) => p.id === id);
        if (qty > product.stock) { showToast(`Only ${product.stock} units in stock.`, "error"); return; }
        setCart(cart.map((c) => c.id === id ? { ...c, qty } : c));
    };

    const removeFromCart = (id) => setCart(cart.filter((c) => c.id !== id));

    const handleCheckout = () => {
        if (cart.length === 0) { showToast("Cart is empty.", "error"); return; }
        if (!customerName.trim()) { showToast("Enter customer name or 'Walk-in Customer'.", "error"); return; }
        if (paymentMethod === "Cash" && amountPaid && parseFloat(amountPaid) < cartTotal) {
            showToast("Amount paid is less than total.", "error"); return;
        }

        const txnId = `TXN-${String(transactions.length + 1).padStart(3, "0")}`;
        const now = new Date();
        const newTxn = {
            id: txnId,
            items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price })),
            total: cartTotal,
            customer: customerName || "Walk-in Customer",
            payment: paymentMethod,
            date: now.toISOString().split("T")[0],
            time: now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }),
            status: "Completed",
        };

        setTransactions([newTxn, ...transactions]);
        setShowReceipt({ ...newTxn, amountPaid: parseFloat(amountPaid) || cartTotal, change });
        setCart([]);
        setCustomerName("");
        setAmountPaid("");
        setPaymentMethod("Cash");
        showToast(`Sale ${txnId} recorded successfully!`);
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase())
    );

    const filteredTxns = transactions.filter((t) =>
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.customer.toLowerCase().includes(search.toLowerCase())
    );

    const todayTotal = transactions.filter((t) => t.date === "2025-06-19" && t.status === "Completed")
        .reduce((s, t) => s + t.total, 0);

    return (
        <div className="space-y-5">
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${toast.type === "error" ? "bg-red-500 text-white" : "bg-slate-900 text-white"}`}>
                    {toast.type !== "error" && <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {toast.msg}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
                {[{ key: "new", label: "New Sale" }, { key: "history", label: "Transaction History" }].map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "new" ? (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                    {/* Product Selector — left */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-800 mb-3">Select Products</h3>
                            <div className="relative mb-4">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input type="text" placeholder="Search product by name or SKU…" value={productSearch}
                                       onChange={(e) => setProductSearch(e.target.value)}
                                       className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                                {filteredProducts.map((p) => (
                                    <button key={p.id} onClick={() => addToCart(p)} disabled={p.stock === 0}
                                            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${p.stock === 0 ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed" : "border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 active:scale-98"}`}>
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                                            <p className="text-xs text-emerald-600 font-bold mt-0.5">₦{p.price.toLocaleString()}</p>
                                            <p className={`text-xs mt-0.5 ${p.stock <= 5 ? "text-amber-500" : "text-slate-400"}`}>
                                                {p.stock === 0 ? "Out of stock" : `${p.stock} ${p.unit} available`}
                                            </p>
                                        </div>
                                        {p.stock > 0 && (
                                            <span className="text-emerald-500 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-slate-800">Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})</h3>
                                {cart.length > 0 && (
                                    <button onClick={() => setCart([])} className="text-xs text-red-400 hover:text-red-600 font-medium">Clear all</button>
                                )}
                            </div>
                            {cart.length === 0 ? (
                                <div className="text-center py-10 text-slate-400">
                                    <svg className="w-10 h-10 mx-auto mb-2 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-sm">No items in cart. Add products above.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                                                <p className="text-xs text-slate-500">₦{item.price.toLocaleString()} / {item.unit}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-slate-800">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                                </button>
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 w-24 text-right">₦{(item.price * item.qty).toLocaleString()}</p>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-400 transition-colors ml-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center">
                                        <span className="font-semibold text-slate-700">Subtotal</span>
                                        <span className="text-xl font-bold text-slate-900">₦{cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Checkout Panel — right */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                            <h3 className="font-semibold text-slate-800">Checkout</h3>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Customer Name</label>
                                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                                       placeholder="Walk-in Customer"
                                       className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Payment Method</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {PAYMENT_METHODS.map((m) => (
                                        <button key={m} onClick={() => setPaymentMethod(m)}
                                                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${paymentMethod === m ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {paymentMethod === "Cash" && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Amount Paid (₦)</label>
                                    <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)}
                                           placeholder={cartTotal.toString()}
                                           className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {amountPaid && parseFloat(amountPaid) >= cartTotal && (
                                        <div className="mt-2 flex justify-between text-sm bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                                            <span className="text-slate-600">Change:</span>
                                            <span className="font-bold text-blue-700">₦{change.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Order summary */}
                            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Items</span><span>{cart.reduce((s, c) => s + c.qty, 0)} units</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Subtotal</span><span>₦{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Discount</span><span>₦0</span>
                                </div>
                                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                                    <span>Total</span><span className="text-emerald-600 text-lg">₦{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button onClick={handleCheckout}
                                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm shadow-emerald-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Complete Sale
                            </button>
                        </div>

                        {/* Today's summary */}
                        <div className="bg-emerald-600 rounded-2xl p-5 text-white">
                            <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">Today's Revenue</p>
                            <p className="text-3xl font-bold">₦{todayTotal.toLocaleString()}</p>
                            <p className="text-emerald-300 text-xs mt-1">{transactions.filter(t => t.date === "2025-06-19").length} transactions · {transactions.filter(t => t.date === "2025-06-19" && t.status === "Completed").length} completed</p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Transaction History */
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-800">Transaction History</h3>
                            <p className="text-sm text-slate-500">{transactions.length} total transactions</p>
                        </div>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="Search by ID or customer…" value={search} onChange={(e) => setSearch(e.target.value)}
                                   className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white w-64" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Txn ID</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment</th>
                                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                {filteredTxns.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-4 text-sm font-mono text-emerald-600 font-semibold">{txn.id}</td>
                                        <td className="px-5 py-4 text-sm font-medium text-slate-800">{txn.customer}</td>
                                        <td className="px-5 py-4 text-sm text-slate-600 max-w-[200px]">
                                            <span className="truncate block">{txn.items.map(i => `${i.name} ×${i.qty}`).join(", ")}</span>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-slate-900 text-right">₦{txn.total.toLocaleString()}</td>
                                        <td className="px-5 py-4 text-center">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">{txn.payment}</span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-500">{txn.date} · {txn.time}</td>
                                        <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${txn.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${txn.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                            {txn.status}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center border-b border-dashed border-slate-200">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg">Sale Complete!</h3>
                            <p className="text-slate-500 text-sm mt-1">AlZaidan Global Investment</p>
                            <p className="text-xs text-slate-400">Minna, Niger State</p>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Transaction ID</span><span className="font-mono font-semibold text-emerald-600">{showReceipt.id}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Customer</span><span className="font-medium text-slate-700">{showReceipt.customer}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Payment</span><span className="font-medium text-slate-700">{showReceipt.payment}</span>
                            </div>
                            <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5">
                                {showReceipt.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-600">{item.name} × {item.qty}</span>
                                        <span className="font-medium text-slate-800">₦{(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-slate-200 pt-3">
                                <div className="flex justify-between font-bold text-slate-900">
                                    <span>Total</span><span className="text-emerald-600">₦{showReceipt.total.toLocaleString()}</span>
                                </div>
                                {showReceipt.payment === "Cash" && (
                                    <>
                                        <div className="flex justify-between text-sm text-slate-600 mt-1">
                                            <span>Amount Paid</span><span>₦{showReceipt.amountPaid.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-semibold text-blue-600 mt-1">
                                            <span>Change</span><span>₦{showReceipt.change.toLocaleString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className="text-center text-xs text-slate-400 pt-2">Thank you for your business!</p>
                        </div>
                        <div className="p-5 pt-0">
                            <button onClick={() => setShowReceipt(null)} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition-colors">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}