import React from "react";
import SearchBar from "./SearchBar";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className={styles.nav}>
      <div className={styles.bttn}>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <div className={styles.bttn}>
      <Link to="/about">
        <button>About</button>
        </Link>
      </div>
      <div className={styles.bttn}>
      <Link to="/favorites">
        <button>Favorites</button>
        </Link>
      </div>
      <div className={styles.bttn}>
      <Link to="/portfolio">
        <button>PORTFOLIO</button>
        </Link>
      </div>
      <div className={styles.bttn}>
        <SearchBar onSearch={props.onSearch} />
      </div>
      <Link to="/">
        <button onClick={props.logout}>Log Out</button>
        </Link>
    </div>
  );
}
