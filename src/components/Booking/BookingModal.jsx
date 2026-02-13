import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const STEPS = ["Location & Time", "Car Type", "Details", "Summary", "Confirm"];
const LOCATIONS = ["Chennai", "Coimbatore", "Madurai", "Trichy"];

export default function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [data, setData] = useState({
    pickup: "Chennai",
    drop: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    carType: "",
    seater: "",
    name: "",
    address: "",
    phone: "",
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500"
        >
          ✕
        </button>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between text-sm">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border
                    ${step >= i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-400"}`}
                >
                  {i + 1}
                </div>
                <span
                  className={`mt-2 ${
                    step >= i + 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 h-1 bg-gray-200 rounded">
            <div
              className="h-1 bg-blue-600 rounded transition-all"
              style={{ width: `${(step - 1) * 25}%` }}
            />
          </div>
        </div>

        {/* ================= STEP 1 — LOCATION & TIME ================= */}
        {step === 1 && (
          <>
            <h3 className="font-semibold mb-4">Pickup & Drop</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup */}
              <div>
                <label className="text-sm text-gray-600">Pickup Location</label>
                <select
                  value={data.pickup}
                  onChange={(e) => set("pickup", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Drop */}
              <div>
                <label className="text-sm text-gray-600">Drop Location</label>
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={data.drop}
                  onChange={(e) => set("drop", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={data.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-sm text-gray-600">Time (24 hrs)</label>
                <input
                  type="time"
                  value={data.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <Footer>
              <PrimaryBtn onClick={() => setStep(2)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {/* ================= STEP 2 — CAR TYPE ================= */}
        {step === 2 && (
          <>
            <h3 className="font-semibold mb-4">Car Type</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {["AC", "Non-AC"].map(type => (
                <div
                  key={type}
                  onClick={() => set("carType", type)}
                  className={`p-4 rounded-xl border cursor-pointer
                    ${data.carType === type
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"}`}
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[3, 4, 6].map(s => (
                <div
                  key={s}
                  onClick={() => set("seater", s)}
                  className={`p-3 text-center rounded-xl border cursor-pointer
                    ${data.seater === s
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"}`}
                >
                  {s} Seater
                </div>
              ))}
            </div>

            <Footer between>
              <SecondaryBtn onClick={() => setStep(1)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(3)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {/* ================= STEP 3 — DETAILS ================= */}
        {step === 3 && (
          <>
            <h3 className="font-semibold mb-4">Contact Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="input"
                placeholder="Name"
                onChange={(e) => set("name", e.target.value)}
              />
              <input
                className="input"
                placeholder="Phone Number"
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>

            <textarea
              className="input w-full h-24"
              placeholder="Pickup Address"
              onChange={(e) => set("address", e.target.value)}
            />

            <Footer between>
              <SecondaryBtn onClick={() => setStep(2)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(4)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {/* ================= STEP 4 — SUMMARY ================= */}
        {step === 4 && (
          <>
            <h3 className="font-semibold mb-4">Trip Summary</h3>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
              <Row label="Name" value={data.name} />
              <Row label="Route" value={`${data.pickup} → ${data.drop}`} />
              <Row label="Address" value={data.address} />
              <Row label="Phone" value={data.phone} />
              <Row label="Date & Time" value={`${data.date} ${data.time}`} />
              <Row label="Car" value={`${data.carType} • ${data.seater} Seater`} />
            </div>

            <Footer between>
              <SecondaryBtn onClick={() => setStep(3)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(5)}>Confirm</PrimaryBtn>
            </Footer>
          </>
        )}

        {/* ================= STEP 5 — CONFIRM ================= */}
        {step === 5 && (
          <>
            <div className="text-center mb-4">
              <div className="text-green-600 text-4xl">✔</div>
              <h3 className="text-xl font-semibold mt-2">Booking Confirmed</h3>
            </div>

            <div className="border rounded-xl p-4 bg-green-50 text-sm space-y-2">
              <Row label="Name" value={data.name} />
              <Row label="Route" value={`${data.pickup} → ${data.drop}`} />
              <Row label="Date & Time" value={`${data.date} ${data.time}`} />
              <Row label="Car" value={`${data.carType} • ${data.seater} Seater`} />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <SecondaryBtn onClick={onClose}>Book Another Ride</SecondaryBtn>
              <PrimaryBtn
                onClick={() => {
                  const newBooking = {
                    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
                    pickup: data.pickup,
                    drop: data.drop,
                    date: data.date,
                    time: data.time,
                    driver: "To be assigned",
                  };

                  localStorage.setItem("latestBooking", JSON.stringify(newBooking));
                  navigate("/my-bookings");
                }}
              >
                Go to My Bookings
              </PrimaryBtn>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ================= UI HELPERS ================= */

function Footer({ children, between }) {
  return (
    <div className={`mt-8 flex ${between ? "justify-between" : "justify-end"}`}>
      {children}
    </div>
  );
}

function PrimaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg"
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg"
    >
      {children}
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}
