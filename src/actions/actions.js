export const setFilter = (genre) => ({
  type: `SET_FILTER`,
  genre,
});

export const filterFilms = (isFiltered = false) => ({
  type: `FILTER_FILMS`,
  isFiltered,
});
