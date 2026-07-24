import { useRouter } from "next/router";
import { getBookings, removeBooking } from "../../services/storage";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { calculateRemainingTime, formatTime } from "../../utils/timer";

export default function BookingDetail() {
  const router = useRouter();

  const { id } = router.query;
  const [booking, setBooking] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!id) return;

    const bookings = getBookings();

    const data = bookings.find((item) => item.slotId === Number(id));

    if (data) {
      setBooking(data);
    }
  }, [id]);

  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime(booking.endTime);

      setRemainingTime(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  const handleEndSession = () => {
    const confirmEnd = window.confirm(
      "Are you sure you want to end this parking session?",
    );

    if (!confirmEnd) return;

    removeBooking(booking.slotId);

    router.push("/");
  };

  if (!booking) {
    return (
      <>
        <Navbar />

        <div className="container mt-4">Loading...</div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <div className="container mt-4">
          <h2>Booking Detail</h2>

          <table className="table">
            <div className="card mt-4">
              <div className="card-body">
                <h4>Parking Session</h4>
                <div
                  className={`card mt-3 border-${
                    remainingTime >= 0 ? "success" : "danger"
                  }`}
                >
                  <div className="card-body text-center">
                    <h5>
                      {remainingTime >= 0 ? "Remaining Time" : "Overtime"}
                    </h5>

                    <h1
                      className={
                        remainingTime >= 0 ? "text-success" : "text-danger"
                      }
                    >
                      {formatTime(remainingTime)}
                    </h1>
                  </div>
                </div>
                <p>
                  Parking Slot :<strong>{booking.slotLabel}</strong>
                </p>

                <p>Started :{new Date(booking.startTime).toLocaleString()}</p>

                <p>Ends :{new Date(booking.endTime).toLocaleString()}</p>
                <div className="mt-4">
                  <button className="btn btn-danger" onClick={handleEndSession}>
                    End Parking Session
                  </button>
                </div>
              </div>
            </div>
          </table>
        </div>
      </>
    );
  }
}
