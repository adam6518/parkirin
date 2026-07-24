const STORAGE_KEY = "parkingBookings";

export const getBookings = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const saveBooking = (booking) => {
  const bookings = getBookings();

  bookings.push(booking);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const removeBooking = (slotId) => {
  const bookings = getBookings();

  const updatedBookings = bookings.filter(
    (booking) => booking.slotId !== slotId,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
};
