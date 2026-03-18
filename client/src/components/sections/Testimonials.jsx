export default function Testimonials({data}){

 const testimonials = Array.isArray(data.testimonials)
  ? data.testimonials
  : [
      { name: "John", text: "Amazing experience!" },
      { name: "Sarah", text: "Best service ever." },
      { name: "Mike", text: "Highly recommended." }
    ];
  return(

    <section style={{padding:"60px",textAlign:"center"}}>

      <h2>Testimonials</h2>

      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>

        {items.map((t,i)=>(
          <div key={i} style={{
            background:"#fff",
            padding:"20px",
            borderRadius:"10px",
            width:"250px"
          }}>
            <p>"{t.text}"</p>
            <strong>{t.name}</strong>
          </div>
        ))}

      </div>

    </section>

  )

}