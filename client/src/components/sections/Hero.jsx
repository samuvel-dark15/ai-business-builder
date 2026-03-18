export default function Hero({ data }) {

  // ✅ FORCE IMAGE (ignore backend for now)
  const image = "/1img.avif";

  return (
    <section
      style={{
        height: "80vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "50px" }}>
          {data?.title || "AI Business Builder"}
        </h1>

        <p style={{ fontSize: "22px" }}>
          {data?.subtitle || "Build your startup"}
        </p>
      </div>
    </section>
  );
}