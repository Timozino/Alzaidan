// import { useState } from "react";
//
// const DEMO_USERS = [
//     { id: 1, name: "Abubakar Zaidan", role: "Administrator", username: "admin", password: "admin123" },
//     { id: 2, name: "Fatima Bello", role: "Sales Manager", username: "sales", password: "sales123" },
//     { id: 3, name: "Ibrahim Musa", role: "Inventory Officer", username: "inventory", password: "inv123" },
// ];
//
// export default function Login({ onLogin }) {
//     const [form, setForm] = useState({ username: "", password: "" });
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//
//     const handleSubmit = () => {
//         if (!form.username || !form.password) {
//             setError("Both fields are required.");
//             return;
//         }
//         setLoading(true);
//         setError("");
//         setTimeout(() => {
//             const user = DEMO_USERS.find(
//                 (u) => u.username === form.username && u.password === form.password
//             );
//             if (user) {
//                 onLogin(user);
//             } else {
//                 setError("Invalid username or password. Try admin / admin123");
//                 setLoading(false);
//             }
//         }, 900);
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center p-4">
//             {/* Background pattern */}
//             <div className="absolute inset-0 opacity-5">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: "repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 50%)",
//                     backgroundSize: "20px 20px"
//                 }} />
//             </div>
//
//             <div className="relative w-full max-w-md">
//                 {/* Logo / Branding */}
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-xl shadow-emerald-900/50">
//                         <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
//                                   d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                         </svg>
//                     </div>
//                     <h1 className="text-2xl font-bold text-white tracking-tight">AlZaidan Global</h1>
//                     <p className="text-emerald-400 text-sm mt-1 font-medium">Sales & Inventory Management System</p>
//                     <p className="text-slate-500 text-xs mt-1">Minna, Niger State</p>
//                 </div>
//
//                 {/* Login Card */}
//                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
//                     <h2 className="text-lg font-semibold text-white mb-1">Sign in to your account</h2>
//                     <p className="text-slate-400 text-sm mb-6">Enter your credentials to access the system</p>
//
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
//                             <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </span>
//                                 <input
//                                     type="text"
//                                     value={form.username}
//                                     onChange={(e) => setForm({ ...form, username: e.target.value })}
//                                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                                     placeholder="e.g. admin"
//                                     className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
//                                 />
//                             </div>
//                         </div>
//
//                         <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
//                             <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </span>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     value={form.password}
//                                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                                     placeholder="••••••••"
//                                     className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-10 pr-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
//                                 />
//                                 <button
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
//                                 >
//                                     {showPassword ? (
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                                         </svg>
//                                     ) : (
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//
//                         {error && (
//                             <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
//                                 <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <p className="text-red-400 text-sm">{error}</p>
//                             </div>
//                         )}
//
//                         <button
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 mt-2"
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                     </svg>
//                                     Signing in…
//                                 </>
//                             ) : "Sign In"}
//                         </button>
//                     </div>
//
//                     {/* Demo credentials */}
//                     <div className="mt-6 p-3 bg-emerald-900/30 border border-emerald-800/40 rounded-xl">
//                         <p className="text-xs text-emerald-400 font-medium mb-2">Demo credentials:</p>
//                         <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
//                             {DEMO_USERS.map(u => (
//                                 <button key={u.id} onClick={() => setForm({ username: u.username, password: u.password })}
//                                         className="text-left hover:text-emerald-400 transition-colors p-1 rounded">
//                                     <span className="block font-medium text-slate-300">{u.username}</span>
//                                     <span className="text-slate-500">{u.role}</span>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//
//                 <p className="text-center text-slate-600 text-xs mt-6">
//                     © {new Date().getFullYear()} AlZaidan Global Investment. All rights reserved.
//                 </p>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";

const DEMO_USERS = [
    { id: 1, name: "Amina A Ahmad", role: "Administrator", username: "admin", password: "admin123" },
    { id: 2, name: "Fatima Bello", role: "Sales Manager", username: "sales", password: "sales123" },
    { id: 3, name: "Ibrahim Musa", role: "Inventory Officer", username: "inventory", password: "inv123" },
];

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!form.username || !form.password) {
            setError("Both fields are required.");
            return;
        }
        setLoading(true);
        setError("");
        setTimeout(() => {
            const user = DEMO_USERS.find(
                (u) => u.username === form.username && u.password === form.password
            );
            if (user) {
                onLogin(user);
            } else {
                setError("Invalid username or password. Try admin / admin123");
                setLoading(false);
            }
        }, 900);
    };

    // Fast-track bypass function for testing modules
    const handleBypassLogin = (user) => {
        onLogin(user);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center p-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 0, transparent 50%)",
                    backgroundSize: "20px 20px"
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-xl shadow-emerald-900/50">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">AlZaidan Global</h1>
                    <p className="text-emerald-400 text-sm mt-1 font-medium">Sales & Inventory Management System</p>
                    <p className="text-slate-500 text-xs mt-1">Minna, Niger State</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-lg font-semibold text-white mb-1">Sign in to your account</h2>
                    <p className="text-slate-400 text-sm mb-6">Enter your credentials to access the system</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    placeholder="e.g. admin"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    placeholder="••••••••"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pl-10 pr-10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 mt-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : "Sign In"}
                        </button>
                    </div>

                    {/* Quick Access Click-to-Login Bypass */}
                    <div className="mt-6 p-3 bg-emerald-900/20 border border-emerald-800/30 rounded-xl">
                        <p className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase mb-2">⚡ Quick Dev Bypass (Click to log in):</p>
                        <div className="grid grid-cols-3 gap-2">
                            {DEMO_USERS.map(u => (
                                <button
                                    key={u.id}
                                    onClick={() => handleBypassLogin(u)}
                                    className="text-left bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/30 transition-all p-2 rounded-xl group"
                                >
                                    <span className="block font-semibold text-slate-200 text-xs group-hover:text-emerald-400 transition-colors">{u.username}</span>
                                    <span className="text-slate-500 text-[10px] block truncate">{u.role}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-600 text-xs mt-6">
                    © {new Date().getFullYear()} AlZaidan Global Investment. All rights reserved.
                </p>
            </div>
        </div>
    );
}