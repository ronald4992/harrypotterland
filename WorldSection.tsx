import RevealItem from "@/components/RevealItem";
import { worldCards } from "@/data/content";

export default function WorldSection() {
  return (
    <section id="mundo" className="section" aria-labelledby="titulo-mundo">
      <div className="container">
        <h2 id="titulo-mundo">Un universo para explorar</h2>
        <p className="section-intro">
          La saga nació en los libros y creció hasta convertirse en un fenómeno cultural que sigue sumando lectores y
          espectadores.
        </p>
        <ul className="cards cards-3">
          {worldCards.map((card) => (
            <RevealItem key={card.title} className="card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
