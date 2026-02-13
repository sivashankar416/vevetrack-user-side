export default function CurrentTripCard({ trip }) {
  return (
    <div className="bg-white rounded-xl border p-6">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-lg">
            Current Trip • {trip.id}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {trip.date} • {trip.timeRange}
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          Ongoing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* PICKUP → DROP */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center mt-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span className="h-12 border-l border-dashed border-gray-300"></span>
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          </div>

          <div>
            <p className="text-xs text-gray-400">Pickup Location</p>
            <p className="font-medium mb-4 leading-snug">
              {trip.pickup}
            </p>

            <p className="text-xs text-gray-400">Drop-off Location</p>
            <p className="font-medium leading-snug">
              {trip.drop}
            </p>
          </div>
        </div>

        {/* DRIVER DETAILS */}
        <div>
          <h4 className="font-semibold mb-3">Driver Details</h4>

          <p className="text-xs text-gray-400">Name</p>
          <p className="mb-2">{trip.driver.name}</p>

          <p className="text-xs text-gray-400">Phone</p>
          <p className="mb-2">{trip.driver.phone}</p>

          <p className="text-xs text-gray-400">Rating</p>
          <p>⭐ {trip.driver.rating}</p>
        </div>

        {/* VEHICLE DETAILS */}
        <div>
          <h4 className="font-semibold mb-3">Vehicle Details</h4>

          <p className="text-xs text-gray-400">Car ID</p>
          <p className="mb-2">{trip.vehicle.carId}</p>

          <p className="text-xs text-gray-400">Type</p>
          <p className="mb-2">{trip.vehicle.type}</p>

          <p className="text-xs text-gray-400">Model</p>
          <p>{trip.vehicle.model}</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end mt-6 pt-4 border-t">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Track Now
        </button>
      </div>
    </div>
  );
}
