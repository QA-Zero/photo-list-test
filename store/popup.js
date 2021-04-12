const state = () => ({
  titles: [],
  albums: [],
  favorites: [],
  filter: '',
});

const mutations = {
  initState(state, { titles, albums, favorites, filter }) {
    state.titles = titles;
    state.albums = albums;
    state.favorites = favorites;
    state.filter = filter;
  },
  updateTitles(state, titles) {
    state.titles = titles;
  },
  updateAlbums(state, albums) {
    state.albums = albums;
  },
  updateFavorites(state, favorites) {
    state.favorites = favorites;
  },
  updateFilter(state, filter) {
    state.filter = filter;
  },
};

const getters = {
  getTitles: state => state.titles,
  getAlbums: state => state.albums,
  getFavorites: state => state.favorites,
  getFilter: state => state.filter,
};

export default {
  state,
  mutations,
  getters,
};
