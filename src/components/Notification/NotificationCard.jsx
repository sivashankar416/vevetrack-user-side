export default function NotificationCard({ data }) {
  return (
    <div
      className={`flex gap-5 rounded-2xl border p-6 bg-white transition ${
        data.unread
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200"
      }`}
    >
      {/* ICON / BADGE */}
      <div className="flex items-start pt-1">
        {data.type === "completed" && (
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg">
            ✓
          </div>
        )}

        {data.type === "confirmed" && (
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
            📘
          </div>
        )}

        {data.type === "approaching" && (
          <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-lg">
            🚗
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between items-start gap-6">
          <div>
            <h4 className="text-lg font-semibold">
              {data.title}
            </h4>
            <p className="text-gray-600 mt-1">
              {data.description}
            </p>
          </div>

          <span className="text-sm text-gray-400 whitespace-nowrap">
            {data.time}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-6 mt-5 text-sm">
          {data.type === "completed" && (
            <>
              <button className="text-blue-600 font-medium hover:underline">
                Rate now
              </button>
              <button className="text-blue-600 font-medium hover:underline">
                Mark as read
              </button>
            </>
          )}

          {data.type === "approaching" && (
            <button className="text-blue-600 font-medium hover:underline">
              Track now
            </button>
          )}

          <button className="ml-auto text-red-500 font-medium hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
