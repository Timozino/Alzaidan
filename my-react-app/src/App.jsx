import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ProductManagement from "./components/ProductManagement";
import InventoryManagement from "./components/InventoryManagement";
import SalesManagement from "./components/SalesManagement";
import Reports from "./components/Reports";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");
  // Default open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // Close sidebar by default on small screens; reopen on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = (user) => { setCurrentUser(user); setIsAuthenticated(true); };
  const handleLogout = () => { setIsAuthenticated(false); setCurrentUser(null); setActiveModule("dashboard"); };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  const MODULE_TITLES = {
    dashboard: "Dashboard Overview",
    products:  "Product Management",
    inventory: "Inventory Management",
    sales:     "Sales Management",
    reports:   "Reports & Analytics",
  };

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":  return <Dashboard />;
      case "products":   return <ProductManagement />;
      case "inventory":  return <InventoryManagement />;
      case "sales":      return <SalesManagement />;
      case "reports":    return <Reports />;
      default:           return <Dashboard />;
    }
  };

  return (
      <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
        <Sidebar
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            onLogout={handleLogout}
            currentUser={currentUser}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
        />

        {/* Main content — on mobile no left padding (sidebar is overlay); on md+ shift by sidebar width */}
        <div className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${sidebarOpen ? "md:pl-64" : "md:pl-16"}
        pl-0
      `}>
          {/* Top header */}
          <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm flex-shrink-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — always visible on mobile, toggle on desktop */}
              <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors flex-shrink-0"
                  aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                  {MODULE_TITLES[activeModule]}
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">AlZaidan Global Investment · Minna, Niger State</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Notification bell */}
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
              </button>

              {/* User avatar */}
              <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {currentUser?.name?.[0] || "A"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700 leading-tight">{currentUser?.name || "Admin"}</p>
                  <p className="text-xs text-slate-500 leading-tight">{currentUser?.role || "Administrator"}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderModule()}
          </main>

          {/* Mobile bottom navigation bar */}
          <nav className="md:hidden bg-white border-t border-slate-200 flex items-center justify-around px-2 py-2 flex-shrink-0 safe-area-pb">
            {[
              { id: "dashboard", label: "Home",      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
              { id: "products",  label: "Products",  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
              { id: "inventory", label: "Stock",     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
              { id: "sales",     label: "Sales",     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
              { id: "reports",   label: "Reports",   icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-0 ${
                        activeModule === item.id ? "text-emerald-600" : "text-slate-400"
                    }`}
                >
                  {item.icon}
                  <span className="text-[10px] font-medium truncate">{item.label}</span>
                  {activeModule === item.id && <span className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5" />}
                </button>
            ))}
          </nav>
        </div>
      </div>
  );
}








// import { useState } from "react";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Sidebar from "./components/Sidebar";
// import ProductManagement from "./components/ProductManagement";
// import InventoryManagement from "./components/InventoryManagement";
// // Commented out since they don't exist yet
// // import SalesManagement from "./components/SalesManagement";
// // import Reports from "./components/Reports";
//
// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [activeModule, setActiveModule] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//
//   const handleLogin = (user) => {
//     setCurrentUser(user);
//     setIsAuthenticated(true);
//   };
//
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setCurrentUser(null);
//     setActiveModule("dashboard");
//   };
//
//   if (!isAuthenticated) {
//     return <Login onLogin={handleLogin} />;
//   }
//
//   const renderModule = () => {
//     switch (activeModule) {
//       case "dashboard":
//         return <Dashboard />;
//       case "products":
//         return <ProductManagement />;
//       case "inventory":
//         return <InventoryManagement />;
//         /* case "sales":
//           return <SalesManagement />;
//         case "reports":
//           return <Reports />;
//         */
//       default:
//         return <Dashboard />;
//     }
//   };
//
//   return (
//       <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
//         <Sidebar
//             activeModule={activeModule}
//             setActiveModule={setActiveModule}
//             onLogout={handleLogout}
//             currentUser={currentUser}
//             isOpen={sidebarOpen}
//             setIsOpen={setSidebarOpen}
//         />
//
//         {/* Dynamic margin transition depending on if sidebar is collapsed or open */}
//         <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-16"}`}>
//           <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
//             <div className="flex items-center gap-3">
//               <button
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold text-slate-800 capitalize">
//                   {activeModule === "dashboard" && "Dashboard Overview"}
//                   {activeModule === "products" && "Product Management"}
//                   {activeModule === "inventory" && "Inventory Management"}
//                   {activeModule === "sales" && "Sales Management"}
//                   {activeModule === "reports" && "Reports & Analytics"}
//                 </h1>
//                 <p className="text-xs text-slate-500">AlZaidan Global Investment · Minna, Niger State</p>
//               </div>
//             </div>
//
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 relative">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                   </svg>
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
//                 </button>
//               </div>
//
//               <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
//                 <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
//                   {currentUser?.name?.[0] || "A"}
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-slate-700">{currentUser?.name || "Admin"}</p>
//                   <p className="text-xs text-slate-500">{currentUser?.role || "Administrator"}</p>
//                 </div>
//               </div>
//             </div>
//           </header>
//
//           <main className="flex-1 overflow-y-auto p-6">
//             {renderModule()}
//           </main>
//         </div>
//       </div>
//   );
// }















// import { useState } from "react";



// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Sidebar from "./components/Sidebar";
// import ProductManagement from "./components/ProductManagement";
// import InventoryManagement from "./components/InventoryManagement";
// //import SalesManagement from "./components/SalesManagement";
// //import Reports from "./components/Reports";
//
// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [activeModule, setActiveModule] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//
//   const handleLogin = (user) => {
//     setCurrentUser(user);
//     setIsAuthenticated(true);
//   };
//
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setCurrentUser(null);
//     setActiveModule("dashboard");
//   };
//
//   if (!isAuthenticated) {
//     return <Login onLogin={handleLogin} />;
//   }
//
//   const renderModule = () => {
//     switch (activeModule) {
//       case "dashboard": return <Dashboard />;
//       case "products": return <ProductManagement />;
//       case "inventory": return <InventoryManagement />;
//       //case "sales": return <SalesManagement />;
//       //case "reports": return <Reports />;
//       default: return <Dashboard />;
//     }
//   };
//
//   return (
//       <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
//         <Sidebar
//             activeModule={activeModule}
//             setActiveModule={setActiveModule}
//             onLogout={handleLogout}
//             currentUser={currentUser}
//             isOpen={sidebarOpen}
//             setIsOpen={setSidebarOpen}
//         />
//         <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
//           <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
//             <div className="flex items-center gap-3">
//               <button
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <div>
//                 <h1 className="text-lg font-semibold text-slate-800 capitalize">
//                   {activeModule === "dashboard" ? "Dashboard Overview" :
//                       activeModule === "products" ? "Product Management" :
//                           activeModule === "inventory" ? "Inventory Management" :
//                               activeModule === "sales" ? "Sales Management" : "Reports & Analytics"}
//                 </h1>
//                 <p className="text-xs text-slate-500">AlZaidan Global Investment · Minna, Niger State</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 relative">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                   </svg>
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
//                 </button>
//               </div>
//               <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
//                 <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
//                   {currentUser?.name?.[0] || "A"}
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-slate-700">{currentUser?.name || "Admin"}</p>
//                   <p className="text-xs text-slate-500">{currentUser?.role || "Administrator"}</p>
//                 </div>
//               </div>
//             </div>
//           </header>
//           <main className="flex-1 overflow-y-auto p-6">
//             {renderModule()}
//           </main>
//         </div>
//       </div>
//   );
// }