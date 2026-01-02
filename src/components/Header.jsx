import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <div className="mark">JC</div>
        <div>
          <div style={{ fontWeight: 700 }}>Juan Cruz</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            "Developer" • Problem Solver • Funny Potato
          </div>
        </div>
      </div>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
