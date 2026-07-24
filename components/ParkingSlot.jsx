import { Group, Rect, Text } from "react-konva";

export default function ParkingSlot({ slot, bookings, onClick }) {
  const isOccupied = bookings.some((booking) => booking.slotId === slot.id);
  return (
    <Group
      key={slot.id}
      onClick={() => onClick(slot)}
      style={{ cursor: "pointer" }}
    >
      <Rect
        x={slot.x}
        y={slot.y}
        width={100}
        height={100}
        cornerRadius={8}
        fill={isOccupied ? "#dc3545" : "#198754"}
        stroke="#333"
        strokeWidth={2}
        shadowBlur={5}
        shadowOpacity={0.2}
      />

      <Text
        x={slot.x}
        y={slot.y + 40}
        width={100}
        align="center"
        text={slot.label}
        fontSize={20}
        fontStyle="bold"
        fill="white"
      />
    </Group>
  );
}
