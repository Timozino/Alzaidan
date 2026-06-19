// const NAV_ITEMS = [
//     {
//         id: "dashboard",
//         label: "Dashboard",
//         icon: (
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//         ),
//     },
//     {
//         id: "products",
//         label: "Products",
//         icon: (
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//             </svg>
//         ),
//     },
//     {
//         id: "inventory",
//         label: "Inventory",
//         icon: (
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//             </svg>
//         ),
//     },
//     {
//         id: "sales",
//         label: "Sales",
//         icon: (
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
//         ),
//     },
//     {
//         id: "reports",
//         label: "Reports",
//         icon: (
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//         ),
//     },
// ];
//
// export default function Sidebar({ activeModule, setActiveModule, onLogout, currentUser, isOpen }) {
//     return (
//         <aside className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-16"}`}>
//             {/* Brand */}
//             <div className="px-4 py-5 border-b border-slate-800 flex items-center gap-3 overflow-hidden">
//                 <div className="w-8 h-8 flex-shrink-0 bg-emerald-500 rounded-lg flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                 </div>
//                 {isOpen && (
//                     <div className="min-w-0">
//                         <p className="text-white font-bold text-sm truncate">AlZaidan Global</p>
//                         <p className="text-emerald-500 text-xs truncate">Investment Ltd.</p>
//                     </div>
//                 )}
//             </div>
//
//             {/* Nav */}
//             <nav className="flex-1 py-4 px-2 space-y-1">
//                 {isOpen && (
//                     <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
//                         Main Menu
//                     </p>
//                 )}
//                 {NAV_ITEMS.map((item) => (
//                     <button
//                         key={item.id}
//                         onClick={() => setActiveModule(item.id)}
//                         className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
//                             activeModule === item.id
//                                 ? "bg-emerald-500/15 text-emerald-400"
//                                 : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
//                         }`}
//                         title={!isOpen ? item.label : ""}
//                     >
//             <span className={`flex-shrink-0 ${activeModule === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`}>
//               {item.icon}
//             </span>
//                         {isOpen && <span className="truncate">{item.label}</span>}
//                         {isOpen && activeModule === item.id && (
//                             <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
//                         )}
//                     </button>
//                 ))}
//             </nav>
//
//             {/* User + logout */}
//             <div className="border-t border-slate-800 p-3">
//                 {isOpen ? (
//                     <div className="flex items-center gap-3 px-2 py-2 mb-2">
//                         <div className="w-8 h-8 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
//                             {currentUser?.name?.[0] || "A"}
//                         </div>
//                         <div className="min-w-0 flex-1">
//                             <p className="text-white text-sm font-medium truncate">{currentUser?.name}</p>
//                             <p className="text-slate-500 text-xs truncate">{currentUser?.role}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex justify-center mb-2">
//                         <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
//                             {currentUser?.name?.[0] || "A"}
//                         </div>
//                     </div>
//                 )}
//                 <button
//                     onClick={onLogout}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
//                     title={!isOpen ? "Logout" : ""}
//                 >
//                     <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
//                     {isOpen && "Sign Out"}
//                 </button>
//             </div>
//         </aside>
//     );
// }



const NAV_ITEMS = [
    {
        id: "dashboard", label: "Dashboard",
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
        id: "products", label: "Products",
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    },
    {
        id: "inventory", label: "Inventory",
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    },
    {
        id: "sales", label: "Sales",
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    },
    {
        id: "reports", label: "Reports",
        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    },
];

export default function Sidebar({ activeModule, setActiveModule, onLogout, currentUser, isOpen, setIsOpen }) {
    const handleNavClick = (id) => {
        setActiveModule(id);
        // On mobile, close sidebar after navigating
        if (window.innerWidth < 768) setIsOpen(false);
    };

    return (
        <>
            {/* Mobile overlay backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-800
          flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"}
        `}
            >
                {/* Brand */}
                <div className="px-4 py-5 border-b border-slate-800 flex items-center gap-3 overflow-hidden flex-shrink-0">
                    <div className="w-8 h-8 flex-shrink-0 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className={`min-w-0 transition-all duration-200 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
                        <p className="text-white font-bold text-sm truncate">AlZaidan Global</p>
                        <p className="text-emerald-500 text-xs truncate">Investment Ltd.</p>
                    </div>
                    {/* Close button on mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`ml-auto p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 md:hidden transition-colors ${isOpen ? "flex" : "hidden"}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                    {isOpen && (
                        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3 select-none">
                            Main Menu
                        </p>
                    )}
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            title={!isOpen ? item.label : ""}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                activeModule === item.id
                                    ? "bg-emerald-500/15 text-emerald-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                        >
              <span className={`flex-shrink-0 ${activeModule === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                {item.icon}
              </span>
                            <span className={`truncate transition-all duration-200 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
                {item.label}
              </span>
                            {isOpen && activeModule === item.id && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* User + logout */}
                <div className="border-t border-slate-800 p-3 flex-shrink-0">
                    <div className={`flex items-center gap-3 px-2 py-2 mb-2 overflow-hidden ${isOpen ? "" : "justify-center"}`}>
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                            {currentUser?.name?.[0] || "A"}
                        </div>
                        <div className={`min-w-0 flex-1 transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                            <p className="text-white text-sm font-medium truncate">{currentUser?.name}</p>
                            <p className="text-slate-500 text-xs truncate">{currentUser?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        title={!isOpen ? "Sign Out" : ""}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className={`transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Sign Out
            </span>
                    </button>
                </div>
            </aside>
        </>
    );
}