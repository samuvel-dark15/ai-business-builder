import heroImg from "../../assets/1img.avif";

export default function Hero({ data }) {

  if (!data) return null;

  return (
    <section
      style={{
        height: "80vh",
        backgroundImage: `url(${heroImg})`, // ✅ comma added
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
        <h1 style={{ fontSize: "50px" }}>{data.title}</h1>
        <p style={{ fontSize: "22px" }}>{data.subtitle}</p>
      </div>
    </section>
  );
}