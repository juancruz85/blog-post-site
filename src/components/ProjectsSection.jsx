export default function ProjectsSection() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects">
        <article className="project">
          <div>
            <div style={{ fontWeight: 700 }}>The Clicker</div>
            <div style={{ color: "var(--muted)" }}>
              My first ever coding project that I made a final deliverable of.
              Definitely far from perfect but it gives memories.
            </div>
          </div>
        </article>
        <article className="project">
          <div>
            <div style={{ fontWeight: 700 }}>Linear Equation Solver</div>
            <div style={{ color: "var(--muted)" }}>
              A small project my math teacher gave me. Was my introduction into
              the world of MATLAB.
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
