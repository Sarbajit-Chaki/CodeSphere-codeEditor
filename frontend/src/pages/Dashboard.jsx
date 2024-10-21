import DashboardComponent from "@/components/Dashboard/DashboardComponent";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
