import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);

  const [locations, setLocations] = useState([
    { label: "Home", address: "123 Indiranagar, 100 Feet Road, Chennai - 600020" },
    { label: "Office", address: "456 Business Park, Andheri East, Velachery" },
    { label: "Airport", address: "Madras International Meenambakkam Airport" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ label: "", address: "" });

  /* ================= IMAGE ================= */
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  }

  /* ================= PROFILE DATA ================= */
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  /* ================= LOCATIONS ================= */
  function openAddForm() {
    setFormData({ label: "", address: "" });
    setEditIndex(null);
    setShowForm(true);
  }

  function openEditForm(index) {
    setFormData(locations[index]);
    setEditIndex(index);
    setShowForm(true);
  }

  function saveLocation() {
    if (!formData.label || !formData.address) return;

    if (editIndex !== null) {
      const copy = [...locations];
      copy[editIndex] = formData;
      setLocations(copy);
    } else {
      setLocations([...locations, formData]);
    }

    setShowForm(false);
    setEditIndex(null);
  }

  function removeLocation(index) {
    setLocations(locations.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-10">

      {/* ================= TOP ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PROFILE CARD */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex items-start gap-6">

            {/* IMAGE */}
            <div className="relative">
              <img
                src={user.image}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer text-sm">
                📷
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">Member</p>

              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                  <p className="text-lg font-semibold">3</p>
                  <span className="text-xs text-gray-500">Total Trips</span>
                </div>
                <div>
                  <p className="text-lg font-semibold">₹580</p>
                  <span className="text-xs text-gray-500">Total Spent</span>
                </div>
                <div>
                  <p className="text-lg font-semibold">4.3</p>
                  <span className="text-xs text-gray-500">Avg Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {["name", "pickupAddress", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="text-sm text-gray-500">
                  {field === "pickupAddress"
                    ? "Pickup Address"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {editing ? (
                  <input
                    name={field}
                    value={user[field] || ""}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  />
                ) : (
                  <p className="mt-1 font-medium">
                    {user[field] || "-"}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            {editing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* SAVED LOCATIONS */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Saved Locations</h3>
            <button
              onClick={openAddForm}
              className="text-blue-600 text-sm font-medium"
            >
              Add Location
            </button>
          </div>

          {showForm && (
            <div className="space-y-3 mb-4">
              <input
                placeholder="Label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />

              <div className="flex gap-3">
                <button
                  onClick={saveLocation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {locations.map((loc, i) => (
            <div key={i} className="border rounded-lg p-3 mb-3">
              <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {loc.label}
              </span>
              <p className="text-sm mt-2">{loc.address}</p>

              <div className="flex gap-4 text-sm mt-2">
                <button
                  onClick={() => openEditForm(i)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeLocation(i)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">My Reviews</h3>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <strong>BK-0109</strong>
            <p className="text-sm mt-1">
              “Excellent service! Very professional and punctual driver.”
            </p>
            <small className="text-gray-500">Driver: Ravi Kumar</small>
          </div>

          <div className="border rounded-lg p-4">
            <strong>BK-003</strong>
            <p className="text-sm mt-1">
              “Good experience, car was clean and comfortable.”
            </p>
            <small className="text-gray-500">Driver: Amit</small>
          </div>
        </div>
      </div>
    </div>
  );
}
