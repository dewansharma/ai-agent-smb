import Sidebar from "../components/sidebar/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020817] text-white">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;