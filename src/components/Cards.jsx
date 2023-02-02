import Card from "./Card";
import styles from "./Cards.module.css";

export default function Cards(props) {
  const { characters } = props;
  return (
    <div className={styles.cards}>
      {characters.map((c) => {
        return (
          <Card
            key={c.id}
            id={c.id}
            name={c.name}
            species={c.species}
            gender={c.gender}
            image={c.image}
            onClose={() => props.onClose(c.id)}
          />
        );
      })}
    </div>
  );
}
