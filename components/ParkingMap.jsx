import { Stage, Layer, Rect, Text, Group } from "react-konva";
import ParkingSlot from "./ParkingSlot";
import { getBookings } from "../services/storage";

export default function ParkingMap({ onSlotSelect, parkingSlots }) {
  const bookings = getBookings();

  const handleSlotClick = (slot) => {
    const isOccupied = bookings.some((booking) => booking.slotId === slot.id);

    if (isOccupied) {
      alert("This parking slot is already occupied.");

      return;
    }

    onSlotSelect(slot);
  };

  return (
    <Stage width={800} height={400}>
      <Layer>
        {parkingSlots.map((slot) => (
          <ParkingSlot
            key={slot.id}
            slot={slot}
            bookings={bookings}
            onClick={handleSlotClick}
          />
        ))}
      </Layer>
    </Stage>
  );
}
