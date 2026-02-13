export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      {[
        {
          label: "Total Trips",
          value: stats.totalTrips,
        },
        {
          label: "Completed Trips",
          value: stats.completedTrips,
        },
        {
          label: "Average Rating",
          value: `${stats.rating} ⭐`,
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-white border rounded-xl p-5 transition hover:-translate-y-0.5"
        >
          <p className="text-gray-400 text-sm">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
      ))}

      {/* CTA */}
      <div className="flex items-center justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-sm">
          Book New Ride
        </button>
      </div>
    </div>
  );
}
