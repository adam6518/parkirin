import { useState } from "react";
import { saveBooking } from "../services/storage";
import { useRouter } from "next/router";

export default function BookingForm({ selectedSlot }) {
  const [name, setName] = useState("");

  const [vehicleNumber, setVehicleNumber] = useState("");

  const [duration, setDuration] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Name is required.");

      return;
    }

    if (!vehicleNumber.trim()) {
      alert("Vehicle number is required.");

      return;
    }

    if (duration <= 0) {
      alert("Duration must be greater than zero.");

      return;
    }

    const now = new Date();

    const booking = {
      slotId: selectedSlot.id,
      slotLabel: selectedSlot.label,
      name,
      vehicleNumber,
      duration: Number(duration),
      startTime: now.toISOString(),
      endTime: new Date(
        now.getTime() + Number(duration) * 60 * 60 * 1000,
      ).toISOString(),
    };
    saveBooking(booking);

    router.push(`/booking/${selectedSlot.id}`);

    alert("Booking successful!");
  };

  if (!selectedSlot) {
    return (
      <div className="alert alert-info mt-4">
        Please select an available parking slot.
      </div>
    );
  }

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4>Booking Form</h4>

        <p>
          Selected Slot :<strong> {selectedSlot.label}</strong>
        </p>

        <div className="mb-3">
          <label className="form-label">Name</label>

          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Vehicle Number</label>

          <input
            className="form-control"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (Hour)</label>

          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Book Parking
        </button>
      </div>
    </div>
  );
}
