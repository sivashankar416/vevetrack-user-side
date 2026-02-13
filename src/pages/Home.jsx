import { useState } from "react";
import BookingModal from "../components/Booking/BookingModal";
import heroCar from "../assets/hero-car.png";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="bg-[#f5f7fb]">

      {/* ================= HERO SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Book Your Ride Instantly with <br />
              <span className="text-orange-500">VeveTrack</span>
            </h1>

            <p className="mt-5 text-gray-600 text-lg">
              Fast, safe and reliable cab booking at your fingertips.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setShowBooking(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Book Now
              </button>

              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={heroCar} alt="Ride illustration" className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* ================= QUICK BOOKING ================= */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Quick Booking</h3>
              <button
                onClick={() => setShowBooking(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Book Now
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Pickup Location", "Date & Time", "Drop Location", "Car Type"].map(
                (label) => (
                  <div key={label}>
                    <label className="text-sm text-gray-600">{label}</label>
                    <input
                      disabled
                      className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                      placeholder="Use Book Now"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* REMOVED: GPS Tracking */}
          <FeatureCard
            title="Verified Drivers"
            text="Every driver undergoes background verification and professional training."
            bg="bg-green-50"
          />

          {/* REMOVED: Transparent Pricing */}
          <FeatureCard
            title="Premium Experience Guaranteed"
            text="Trusted by hundreds of satisfied customers."
            rating="4.2"
            bg="bg-purple-50"
          />

        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-sm text-blue-600 font-medium">Simple Process</span>
          <h2 className="text-3xl font-bold mt-3">
            Book Your Ride in 3 Easy Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <ProcessCard title="Enter Trip Details" />
            <ProcessCard title="Choose Vehicle" />
            <ProcessCard title="Confirm Ride" />
          </div>

          <button
            onClick={() => setShowBooking(true)}
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
          >
            Start Booking Now
          </button>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {["Rajesh Kumar", "Hari", "Gopal", "Vinoth"].map((name) => (
              <div key={name} className="bg-white p-6 rounded-xl shadow">
                <strong>{name}</strong>
                <p className="text-sm text-gray-600 mt-2">
                  Excellent service and professional drivers.
                </p>
                <div className="mt-2 text-yellow-500">★ 4.3</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">VeveTrack</h4>
            <p>Reliable, fast and safe rides.</p>
          </div>
        </div>
      </footer>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </div>
  );
}

/* SUB COMPONENTS */

function FeatureCard({ title, text, rating, bg }) {
  return (
    <div className={`${bg} p-6 rounded-xl`}>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
      {rating && <div className="mt-3 text-yellow-500">⭐ {rating}</div>}
    </div>
  );
}

function ProcessCard({ title }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}
