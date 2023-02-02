import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorites, deleteFavorites } from "../store/actions";
import { ADD_FAVORITES, DELETE_FAVORITES } from "../store/action_type";

import { store } from '../store/index.js'

export default function Card(props) {
  const [isFav, setIsFav] = useState(false);
 
  const myFavorites = store.getState().myFavorites;

  function handleFavorite(ch) {
    if (isFav) {
      setIsFav(false);
      store.dispatch(DELETE_FAVORITES, deleteFavorites(ch.id));
      props.setRenderAction()
    } else {
      setIsFav(true);
      store.dispatch(ADD_FAVORITES, addFavorites(ch));
    }
  }

  useEffect(() => {
    myFavorites.forEach((ch) => {
      if (ch.id === props.id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={styles.card}>
      <div className={styles.upbar_card}>
        {isFav ? (
          <button onClick={() => handleFavorite(props)}>❤️</button>
        ) : (
          <button onClick={() => handleFavorite(props)}>🤍</button>
        )}
        <button className={styles.bttn} onClick={props.onClose}>
          X
        </button>
      </div>
      <div className={styles.txt}>
        <Link className={styles.linki} to={`/detail/${props.id}`}>
          <h2>{props.name}</h2>
          <p>{props.species}</p>
          <p>{props.gender}</p>
          <img src={props.image} alt={props.image} />
        </Link>
      </div>
    </div>
  );
}
