export default function Services({ data }) {

  if (!data) return null;

  return (
    <section style={{ padding: "60px", textAlign: "center" }}>

      <h2>Services</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >
        {data.items?.map((item, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "20px",
              width: "220px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </div>

    </section>
  );
}