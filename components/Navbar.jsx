import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Parking Management
        </Link>
      </div>
    </nav>
  );
}
