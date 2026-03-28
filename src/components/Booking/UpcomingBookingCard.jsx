export default function UpcomingBookingCard({ booking }) {
  return (
    <div className="bg-white rounded-xl border p-5">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="font-semibold text-lg">
            Upcoming Trip • {booking.id}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Scheduled Booking
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          Upcoming
        </span>
      </div>

      {/* PICKUP → DROP */}
      <div className="flex gap-4 mb-5">
        <div className="flex flex-col items-center mt-1">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          <span className="h-10 border-l border-dashed border-gray-300"></span>
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
        </div>

        <div>
          <p className="text-xs text-gray-400">Pickup Location</p>
          <p className="font-medium mb-3 leading-snug">
            {booking.pickup}
          </p>

          <p className="text-xs text-gray-400">Drop-off Location</p>
          <p className="font-medium leading-snug">
            {booking.drop}
          </p>
        </div>
      </div>

      {/* DATE & TIME */}
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏰</span>
          <span>{booking.time}</span>
        </div>
      </div>

      {/* DRIVER */}
      <p className="text-sm text-gray-600 mb-5">
        Driver: <span className="font-medium">{booking.driver || "To be assigned"}</span>
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">
          Modify
        </button>
        <button className="border border-red-500 hover:bg-red-50 text-red-500 px-5 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
