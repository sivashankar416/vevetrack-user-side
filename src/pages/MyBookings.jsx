import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/userContext";
import { getBookingsRequest } from "../api/bookings";

import StatsCards from "../components/Booking/StatsCards";
import BookingTabs from "../components/Booking/BookingTabs";
import CurrentTripCard from "../components/Booking/CurrentTripCard";
import UpcomingBookingCard from "../components/Booking/UpcomingBookingCard";
import TripHistoryCard from "../components/Booking/TripHistoryCard";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    let ignore = false;

    const loadBookings = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getBookingsRequest({
          userId: user.id,
          customerEmail: user.email,
          type: "online",
        });

        if (!ignore) {
          setBookings(response.bookings || []);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(
            requestError?.response?.data?.message || "Unable to load your bookings right now."
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    if (user.id || user.email) {
      loadBookings();
    } else {
      setIsLoading(false);
    }

    return () => {
      ignore = true;
    };
  }, [user.id, user.email]);

  const upcomingBookings = useMemo(
    () => bookings.filter((booking) => ["Pending", "Scheduled"].includes(booking.status)),
    [bookings]
  );

  const currentBooking = useMemo(
    () => bookings.find((booking) => booking.status === "Ongoing") || null,
    [bookings]
  );

  const tripHistory = useMemo(
    () => bookings.filter((booking) => ["Completed", "Cancelled"].includes(booking.status)),
    [bookings]
  );

  const currentTrip = useMemo(() => {
    if (!currentBooking) return null;

    return {
      id: currentBooking.id,
      date: currentBooking.date,
      timeRange: currentBooking.time,
      pickup: currentBooking.pickup,
      drop: currentBooking.drop,
      driver: {
        name: currentBooking.driver || "To be assigned",
        phone: "-",
        rating: "-",
      },
      vehicle: {
        carId: currentBooking.id,
        type: currentBooking.carType || currentBooking.requestedVehicle || "Not assigned",
        model: currentBooking.vehicleType || "Not assigned",
      },
    };
  }, [currentBooking]);

  const stats = useMemo(() => {
    const totalTrips = bookings.length;
    const completedTrips = tripHistory.filter((trip) => trip.status === "Completed").length;

    return {
      totalTrips,
      completedTrips,
      rating: 4.4,
    };
  }, [bookings, tripHistory]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your current, upcoming and past trips
          </p>
        </div>

        <StatsCards stats={stats} />

        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "current" && (
            <>
              {isLoading ? <p className="text-sm text-gray-500">Loading bookings...</p> : null}
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {!isLoading && !error && !currentTrip ? (
                <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
                  No ongoing trip found.
                </div>
              ) : null}
              {!isLoading && !error && currentTrip ? <CurrentTripCard trip={currentTrip} /> : null}
            </>
          )}

          {activeTab === "upcoming" && (
            <>
              {isLoading ? <p className="text-sm text-gray-500">Loading bookings...</p> : null}
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {!isLoading && !error && upcomingBookings.length === 0 ? (
                <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
                  No upcoming bookings found.
                </div>
              ) : null}
              {!isLoading && !error && upcomingBookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {upcomingBookings.map((booking) => (
                    <UpcomingBookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : null}
            </>
          )}

          {activeTab === "history" && (
            <>
              {isLoading ? <p className="text-sm text-gray-500">Loading bookings...</p> : null}
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {!isLoading && !error && tripHistory.length === 0 ? (
                <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
                  No booking history found.
                </div>
              ) : null}
              {!isLoading && !error && tripHistory.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {tripHistory.map((trip) => (
                    <TripHistoryCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
