export default function TripHistoryCard({ trip }) {
  return (
    <div className="bg-white rounded-xl border p-5">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            Trip • {trip.id}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Past Ride
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            trip.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trip.status}
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
            {trip.pickup}
          </p>

          <p className="text-xs text-gray-400">Drop-off Location</p>
          <p className="font-medium leading-snug">
            {trip.drop}
          </p>
        </div>
      </div>

      {/* DATE & TIME */}
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{trip.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏰</span>
          <span>{trip.time}</span>
        </div>
      </div>

      {/* RATING */}
      {trip.rating && (
        <div className="text-sm flex items-center gap-1 text-gray-700">
          ⭐ <span className="font-medium">{trip.rating}</span>
        </div>
      )}
    </div>
  );
}
