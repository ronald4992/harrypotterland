import RevealItem from "@/components/RevealItem";
import { houses } from "@/data/content";

export default function HousesSection() {
  return (
    <section id="casas" className="section section-alt" aria-labelledby="titulo-casas">
      <div className="container">
        <h2 id="titulo-casas">Las cuatro casas de Hogwarts</h2>
        <p className="section-intro">Cada casa valora algo distinto. ¿Con cuál te identificas?</p>
        <ul className="cards cards-4">
          {houses.map((house) => (
            <RevealItem key={house.id} className={`card house house-${house.id}`}>
              <h3>{house.name}</h3>
              <p>{house.traits}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
