import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  langFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { MoviesContext } from "../contexts/moviesContext";
import { applySortValues, applyFilterValues } from "../util";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const langFiltering = {
  name: "language",
  value: "0",
  condition: langFilter,
};

const HomePage = (props) => {
  const { pageMovies, setPageMovies } = useContext(MoviesContext);
  const [sortValue, setSortValue] = useState("title_ASC");
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["discover", pageMovies],
    () => getMovies(pageMovies),
    {
      keepPreviousData: true,
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, langFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const handleChangeFilterValues = (...args) =>
  applyFilterValues(filterValues, setFilterValues, ...args);

  const movies = data ? data.results : [];

  const displayedMovies = applySortValues(sortValue, filterFunction(movies));

  return (
    <>
      <PageTemplate
        title="Discover Movies" 
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
        }}
        page={pageMovies}
        pageSetter={setPageMovies}
      />
      <MovieFilterUI
        onFilterValuesChange={handleChangeFilterValues}
        onSortValuesChange={setSortValue}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        langFilter={filterValues[2].value}
        currentSort={sortValue}
      />
    </>
  );
};

export default HomePage;
