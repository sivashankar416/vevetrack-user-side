import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { createBookingRequest } from "../../api/bookings";
import { UserContext } from "../../context/userContext";

const STEPS = ["Location & Time", "Car Type", "Details", "Summary", "Confirm"];
const LOCATIONS = ["Chennai", "Coimbatore", "Madurai", "Trichy"];

export default function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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

  const set = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  const handleConfirmBooking = async () => {
    if (isSubmitting || confirmedBooking) return;

    if (
      !data.pickup ||
      !data.drop ||
      !data.date ||
      !data.time ||
      !data.carType ||
      !data.seater ||
      !data.name ||
      !data.address ||
      !data.phone
    ) {
      setSubmitError("Please complete all booking details before confirming.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const response = await createBookingRequest({
        userId: user.id,
        customerName: data.name,
        customerEmail: user.email,
        phone: data.phone,
        pickup: data.pickup,
        drop: data.drop,
        address: data.address,
        date: data.date,
        time: data.time,
        requestedVehicle: `${data.carType} ${data.seater} Seater`,
        carType: data.carType,
        seater: data.seater,
        type: "online",
        status: "Pending",
      });

      setConfirmedBooking(response.booking);
      setStep(5);
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message || "Unable to confirm booking right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500"
        >
          x
        </button>

        <div className="mb-8">
          <div className="flex justify-between text-sm">
            {STEPS.map((label, index) => (
              <div key={label} className="flex w-full flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                    step >= index + 1
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 ${
                    step >= index + 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 h-1 rounded bg-gray-200">
            <div
              className="h-1 rounded bg-blue-600 transition-all"
              style={{ width: `${(step - 1) * 25}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <>
            <h3 className="mb-4 font-semibold">Pickup & Drop</h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-600">Pickup Location</label>
                <select
                  value={data.pickup}
                  onChange={(event) => set("pickup", event.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                >
                  {LOCATIONS.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Drop Location</label>
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={data.drop}
                  onChange={(event) => set("drop", event.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={data.date}
                  onChange={(event) => set("date", event.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Time (24 hrs)</label>
                <input
                  type="time"
                  value={data.time}
                  onChange={(event) => set("time", event.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>
            </div>

            <Footer>
              <PrimaryBtn onClick={() => setStep(2)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-4 font-semibold">Car Type</h3>

            <div className="mb-6 grid grid-cols-2 gap-4">
              {["AC", "Non-AC"].map((type) => (
                <div
                  key={type}
                  onClick={() => set("carType", type)}
                  className={`cursor-pointer rounded-xl border p-4 ${
                    data.carType === type
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[3, 4, 6].map((seater) => (
                <div
                  key={seater}
                  onClick={() => set("seater", seater)}
                  className={`cursor-pointer rounded-xl border p-3 text-center ${
                    data.seater === seater
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  {seater} Seater
                </div>
              ))}
            </div>

            <Footer between>
              <SecondaryBtn onClick={() => setStep(1)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(3)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-4 font-semibold">Contact Details</h3>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Name"
                value={data.name}
                onChange={(event) => set("name", event.target.value)}
              />
              <input
                className="input"
                placeholder="Phone Number"
                value={data.phone}
                onChange={(event) => set("phone", event.target.value)}
              />
            </div>

            <textarea
              className="input h-24 w-full"
              placeholder="Pickup Address"
              value={data.address}
              onChange={(event) => set("address", event.target.value)}
            />

            <Footer between>
              <SecondaryBtn onClick={() => setStep(2)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(4)}>Next</PrimaryBtn>
            </Footer>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="mb-4 font-semibold">Trip Summary</h3>

            <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
              <Row label="Name" value={data.name} />
              <Row label="Route" value={`${data.pickup} to ${data.drop}`} />
              <Row label="Address" value={data.address} />
              <Row label="Phone" value={data.phone} />
              <Row label="Date & Time" value={`${data.date} ${data.time}`} />
              <Row label="Car" value={`${data.carType} ${data.seater} Seater`} />
            </div>

            {submitError ? <p className="mt-4 text-sm text-red-600">{submitError}</p> : null}

            <Footer between>
              <SecondaryBtn onClick={() => setStep(3)}>Back</SecondaryBtn>
              <PrimaryBtn onClick={handleConfirmBooking} disabled={isSubmitting}>
                {isSubmitting ? "Confirming..." : "Confirm"}
              </PrimaryBtn>
            </Footer>
          </>
        )}

        {step === 5 && (
          <>
            <div className="mb-4 text-center">
              <div className="text-4xl text-green-600">Done</div>
              <h3 className="mt-2 text-xl font-semibold">Booking Confirmed</h3>
            </div>

            <div className="space-y-2 rounded-xl border bg-green-50 p-4 text-sm">
              <Row label="Booking ID" value={confirmedBooking?.id || "-"} />
              <Row label="Name" value={confirmedBooking?.customerName || data.name} />
              <Row
                label="Route"
                value={`${confirmedBooking?.pickup || data.pickup} to ${confirmedBooking?.drop || data.drop}`}
              />
              <Row
                label="Date & Time"
                value={`${confirmedBooking?.date || data.date} ${confirmedBooking?.time || data.time}`}
              />
              <Row
                label="Car"
                value={confirmedBooking?.requestedVehicle || `${data.carType} ${data.seater} Seater`}
              />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <SecondaryBtn onClick={onClose}>Book Another Ride</SecondaryBtn>
              <PrimaryBtn onClick={() => navigate("/my-bookings")}>
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
      className="rounded-lg bg-blue-600 px-6 py-2 text-white disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="rounded-lg border border-blue-600 px-6 py-2 text-blue-600"
    >
      {children}
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="max-w-[60%] text-right font-medium">{value}</span>
    </div>
  );
}
