import { useState, useEffect } from "react";
import {
  stats,
  currentTrip,
  upcomingBookings,
  tripHistory,
} from "../data/bookings";

import StatsCards from "../components/Booking/StatsCards";
import BookingTabs from "../components/Booking/BookingTabs";
import CurrentTripCard from "../components/Booking/CurrentTripCard";
import UpcomingBookingCard from "../components/Booking/UpcomingBookingCard";
import TripHistoryCard from "../components/Booking/TripHistoryCard";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [dynamicUpcoming, setDynamicUpcoming] = useState(upcomingBookings);

  useEffect(() => {
  const latest = localStorage.getItem("latestBooking");
  if (latest) {
    setDynamicUpcoming((prev) => [
      JSON.parse(latest),
      ...prev,
    ]);
    localStorage.removeItem("latestBooking");
  }
}, []);


  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage your current, upcoming and past trips
          </p>
        </div>

        {/* STATS */}
        <StatsCards stats={stats} />

        {/* TABS */}
        <BookingTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* TAB CONTENT */}
        <div className="mt-6">
          {activeTab === "current" && (
            <CurrentTripCard trip={currentTrip} />
          )}

          {activeTab === "upcoming" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dynamicUpcoming.map((b) => (
                <UpcomingBookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tripHistory.map((t) => (
                <TripHistoryCard key={t.id} trip={t} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
