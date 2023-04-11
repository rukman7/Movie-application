import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { MoviesContext } from "../contexts/moviesContext";

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

const UpcomingMoviesPage = (props) => {
  const { pageUpcomingMovies, setPageUpcomingMovies } =
    useContext(MoviesContext);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["upcoming", pageUpcomingMovies],
    () => getUpcomingMovies(pageUpcomingMovies)
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const newf = { name: type, value: value };
    const newFilters =
      type === "title" ? [newf, filterValues[1]] : [filterValues[0], newf];
    setFilterValues(newFilters);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} page="upcoming" />;
        }}
        page={pageUpcomingMovies}
        pageSetter={setPageUpcomingMovies}
      />
      <MovieFilterUI
        filterInputChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default UpcomingMoviesPage;