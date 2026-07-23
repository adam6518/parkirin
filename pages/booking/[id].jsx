import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function BookingDetail() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Booking Detail</h2>

        <p>Booking ID : {id}</p>
      </div>
    </>
  );
}
