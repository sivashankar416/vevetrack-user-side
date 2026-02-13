import NotificationCard from "../components/Notification/NotificationCard";
import { notifications } from "../data/notifications";

export default function Notifications() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Notifications</h2>
          <p className="text-gray-500 mt-2">
            Stay updated with your trips and account activity
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {notifications.map((item) => (
            <NotificationCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
