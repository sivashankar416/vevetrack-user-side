import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
