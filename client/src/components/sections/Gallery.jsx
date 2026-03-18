export default function Gallery({ data }) {

  const defaultImages = [
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0"
  ];

  const images = Array.isArray(data) && data.length > 0
    ? data.filter(i => typeof i === "string" && i.startsWith("http"))
    : defaultImages;

  const finalImages = images.length ? images : defaultImages;

  return (
    <section style={{ padding: "60px", textAlign: "center" }}>

      <h2>Gallery</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >
        {finalImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="gallery"
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        ))}
      </div>

    </section>
  );
}