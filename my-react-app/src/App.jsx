import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ProductManagement from "./components/ProductManagement";
import InventoryManagement from "./components/InventoryManagement";
// Commented out since they don't exist yet
// import SalesManagement from "./components/SalesManagement";
// import Reports from "./components/Reports";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveModule("dashboard");
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductManagement />;
      case "inventory":
        return <InventoryManagement />;
        /* case "sales":
          return <SalesManagement />;
        case "reports":
          return <Reports />;
        */
      default:
        return <Dashboard />;
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

        {/* Dynamic margin transition depending on if sidebar is collapsed or open */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-16"}`}>
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-slate-800 capitalize">
                  {activeModule === "dashboard" && "Dashboard Overview"}
                  {activeModule === "products" && "Product Management"}
                  {activeModule === "inventory" && "Inventory Management"}
                  {activeModule === "sales" && "Sales Management"}
                  {activeModule === "reports" && "Reports & Analytics"}
                </h1>
                <p className="text-xs text-slate-500">AlZaidan Global Investment · Minna, Niger State</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>
              </div>

              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                  {currentUser?.name?.[0] || "A"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700">{currentUser?.name || "Admin"}</p>
                  <p className="text-xs text-slate-500">{currentUser?.role || "Administrator"}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {renderModule()}
          </main>
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