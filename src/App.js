import { useState, useEffect } from "react"; // paso 1
import styles from "./App.module.css";
import Cards from "./components/Cards.jsx";
import Form from "./components/Form.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Detail from "./components/Detail.jsx";
import Favorites from "./components/Favorites.jsx";
import Portfolio from "./components/Portfolio.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { store, root_reducer } from "./store/index";

const initialState = {
  myFavorites: [],
  myFavoritesOrigin: [],
};

store.initialState(initialState, root_reducer);

function App() {
  const [access, setAccess] = useState(false);
  const username = "33b@soyHenry.com";
  const password = "@Model101";
  const navigate = useNavigate();

  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
      alert("Bienvenidos a nuestra app");
    } else {
      alert("username y password incorrectos");
    }
  }
  function logout() {
    setAccess(false);
    navigate("/");
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const location = useLocation();
  // console.log("location ->", location);
  const [characters, setCharacters] = useState([]);
  function onSearch(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          let exist = characters.find((e) => e.id === data.id);
          if (exist) {
            alert("ese personaje ya existe");
          } else {
            setCharacters((oldChars) => [...oldChars, data]);
          }
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  }

  function onClose(id) {
    setCharacters((data) => {
      return data.filter((e) => e.id !== id);
    });
  }
  return (
    // console.log("chars", characters),
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.top}></div>

        <div>
          {location.pathname === "/" ? null : (
            <NavBar logout={logout} onSearch={onSearch} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Form login={login} />}></Route>
          <Route
            path="/home"
            element={<Cards characters={characters} onClose={onClose} />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route
            path="/favorites"
            element={<Favorites characters={characters} onClose={onClose} />}
          ></Route>
          <Route path="/detail/:detailId" element={<Detail />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
