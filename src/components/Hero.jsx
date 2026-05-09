import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="intro card">
        <h1></h1>
        <p className="lead"></p>
        <div style={{ display: "flex", gap: 10 }}>
          <Link className="btn" href="/contact"></Link>
          <Link className="btn secondary" href="/projects"></Link>
        </div>
      </div>

      <aside className="card">
        <div
          className="photo"
          style={{ height: 260, overflow: "hidden" }}
        ></div>
      </aside>
    </section>
  );
}
