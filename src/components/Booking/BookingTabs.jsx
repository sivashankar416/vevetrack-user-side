export default function BookingTabs({ activeTab, setActiveTab }) {
  const tab = (key) =>
    activeTab === key
      ? "text-blue-600 border-b-2 border-blue-600 pb-3 font-medium"
      : "text-gray-500 cursor-pointer hover:text-gray-700";

  return (
    <div className="flex gap-10 border-b mb-8 text-sm">
      <div onClick={() => setActiveTab("current")} className={tab("current")}>
        Current Trip
      </div>
      <div onClick={() => setActiveTab("upcoming")} className={tab("upcoming")}>
        Upcoming Bookings
      </div>
      <div onClick={() => setActiveTab("history")} className={tab("history")}>
        Trip History
      </div>
    </div>
  );
}
