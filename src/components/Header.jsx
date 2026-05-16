import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <div className="mark">CI</div>
        <div>
          <div style={{ fontWeight: 700 }}>company, inc.</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}></div>
        </div>
      </div>
      <nav>
        <Link href="/home">Home</Link>
        <Link href="/stats">Stats</Link>
        <Link href="/info">Account Info</Link>
      </nav>
    </header>
  );
}
