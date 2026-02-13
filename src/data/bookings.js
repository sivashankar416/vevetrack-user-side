// ================= STATS =================
export const stats = {
  totalTrips: 6,
  completedTrips: 4,
  rating: 4.4,
};

// ================= CURRENT TRIP =================
export const currentTrip = {
  id: "BK-1201",
  date: "04-02-2026",
  timeRange: "09:30 – 11:00",
  pickup: "T. Nagar, Chennai",
  drop: "Chennai International Airport",
  driver: {
    name: "Arun Kumar",
    phone: "+91 98421 33210",
    rating: 4.5,
  },
  vehicle: {
    carId: "TN-09-AX-2211",
    type: "AC",
    model: "Toyota Etios",
  },
};

// ================= UPCOMING BOOKINGS =================
export const upcomingBookings = [
  {
    id: "BK-1202",
    pickup: "Velachery",
    drop: "Guindy Industrial Estate",
    date: "06-02-2026",
    time: "08:15",
    driver: "Suresh",
  },
  {
    id: "BK-1203",
    pickup: "Tambaram",
    drop: "Anna University",
    date: "08-02-2026",
    time: "07:45",
    driver: "Imran",
  },
];

// ================= TRIP HISTORY =================
export const tripHistory = [
  {
    id: "BK-1199",
    pickup: "Marina Beach",
    drop: "Mylapore",
    date: "28-01-2026",
    time: "18:10",
    rating: 4.6,
    status: "Completed",
  },
  {
    id: "BK-1198",
    pickup: "Phoenix Mall",
    drop: "OMR, Sholinganallur",
    date: "21-01-2026",
    time: "20:30",
    rating: 4.2,
    status: "Completed",
  },
  {
    id: "BK-1195",
    pickup: "Koyambedu Bus Stand",
    drop: "Egmore Railway Station",
    date: "14-01-2026",
    time: "06:45",
    status: "Cancelled",
  },
];
