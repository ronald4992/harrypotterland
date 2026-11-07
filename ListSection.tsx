type ListSectionProps = {
  id: string;
  title: string;
  intro: string;
  items: string[];
  alt?: boolean;
};

export default function ListSection({ id, title, intro, items, alt = false }: ListSectionProps) {
  const headingId = `titulo-${id}`;

  return (
    <section id={id} className={`section${alt ? " section-alt" : ""}`} aria-labelledby={headingId}>
      <div className="container">
        <h2 id={headingId}>{title}</h2>
        <p className="section-intro">{intro}</p>
        <ol className="list-numbered">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
