import Navbar from "../components/Navbar";
import ParkingMap from "../components/ParkingMap";
import BookingForm from "../components/BookingForm";
import { useState, useEffect } from "react";
import { getBookings } from "../services/storage";

export default function Home() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const createParkingSlots = () => {
    const rows = 3;
    const cols = 4;

    const slots = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        slots.push({
          id: row * cols + col + 1,
          label: `${String.fromCharCode(65 + row)}${col + 1}`,
          x: 50 + col * 130,
          y: 50 + row * 130,
        });
      }
    }

    return slots;
  };

  const [parkingSlots, setParkingSlots] = useState(createParkingSlots);

  return (
    <div className="text-center">
      <Navbar />

      <div className="container mt-4 text-center">
        <h2>Parkirin - Parking Management System</h2>

        {/* Legend */}
        <div className="d-flex gap-4 mb-3">
          <div className="d-flex align-items-center">
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#198754",
                marginRight: 8,
              }}
            ></div>
            <span>Available</span>
          </div>

          <div className="d-flex align-items-center">
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#dc3545",
                marginRight: 8,
              }}
            ></div>
            <span>Occupied</span>
          </div>
        </div>

        {/* Parking Map */}
        <div
          className="p-4 rounded"
          style={{
            border: "2px solid #6c757d",
            width: "fit-content",
          }}
        >
          <ParkingMap
            parkingSlots={parkingSlots}
            onSlotSelect={setSelectedSlot}
          />
        </div>
        {/* Booking Form */}
        <BookingForm selectedSlot={selectedSlot} />
      </div>
    </div>
  );
}
