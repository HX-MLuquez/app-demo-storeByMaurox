const maurox = require("maurox-store");
// crear la instancia de este exportando
const store = maurox();
const {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  ORDER,
  FILTER,
  RESET,
} = require("./action_type");

function root_reducer(state, type, payload) {
  switch (type) {
    case ADD_FAVORITES:
      return {
        ...state,
        myFavorites: [...state.myFavoritesOrigin, payload],
        myFavoritesOrigin: [...state.myFavoritesOrigin, payload],
      };
    case DELETE_FAVORITES:
      const filtered = state.myFavorites.filter((ch) => {
        return ch.id !== payload;
      });
      return {
        ...state,
        myFavorites: filtered,
        myFavoritesOrigin: filtered,
      };
    case FILTER:
      const filterCopy = [...state.myFavoritesOrigin];
      const filter = filterCopy.filter((ch) => ch.gender === payload);
      return {
        ...state,
        myFavorites: filter,
      };
    case ORDER:
      const orderCopy = [...state.myFavoritesOrigin];
      // console.log("payload", payload);
      const order = orderCopy.sort((a, b) => {
        if (a.id > b.id) {
          return "Ascendente" === payload ? 1 : -1;
        }
        if (a.id < b.id) {
          return "Descendente" === payload ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        myFavorites: order,
      };
    case RESET:
      return {
        ...state,
        myFavorites: [...state.myFavoritesOrigin],
      };

    default:
      return state;
  }
}

module.exports = {
  store,
  root_reducer,
};
