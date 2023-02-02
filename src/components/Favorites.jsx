import React, { useState, useEffect } from "react";
import Card from "./Card";
import styles from "./Favorites.module.css";
import { filterCards, orderCards, reset } from "../store/actions";
import { FILTER, ORDER, RESET } from "../store/action_type";
import { store } from "../store/index";

export default function Favorites(props) {
  const [renderAction, setRenderAction] = useState(true);
  const myFavorites = store.getState().myFavorites;

  function handleClick(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "filter") {
      store.dispatch(FILTER, filterCards(value));
      setRenderAction(!renderAction);
    }
    if (name === "order") {
      store.dispatch(ORDER, orderCards(value));
      setRenderAction(!renderAction);
    }
  }

  function renderActionExport(){
    setRenderAction(!renderAction)
  }

  return (
    <>
      <div className={styles.cards}>
        <div>
          <select name="order" defaultValue={"DEFAULT"} onChange={handleClick}>
            <option value="DEFAULT" disabled>
              Select Order
            </option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
          <select name="filter" defaultValue={"DEFAULT"} onChange={handleClick}>
            <option value="DEFAULT" disabled>
              Select Filter
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
          <div>
            <button
              onClick={() => {
                setRenderAction(!renderAction);
                store.dispatch(RESET, reset());
              }}
            >
              RESET
            </button>
          </div>
        </div>
        {myFavorites?.map((c) => {
          return (
            <Card
              setRenderAction={renderActionExport}
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
    </>
  );
}
