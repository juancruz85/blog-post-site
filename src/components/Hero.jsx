import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="intro card">
        <h1>Hi — I’m Juan. I do silly things.</h1>
        <p className="lead">I’m a human doing human things.</p>
        <div style={{ display: "flex", gap: 10 }}>
          <Link className="btn" href="/contact">
            Work with me
          </Link>
          <Link className="btn secondary" href="/projects">
            See projects
          </Link>
        </div>
      </div>

      <aside className="card">
        <div className="photo" style={{ height: 260, overflow: "hidden" }}>
          <Image
            src="/images/RED.JPEG"
            alt="Photo"
            width={600}
            height={400}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              borderRadius: 10,
            }}
          />
        </div>
      </aside>
    </section>
  );
}
