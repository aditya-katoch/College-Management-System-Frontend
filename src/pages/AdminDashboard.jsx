import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
