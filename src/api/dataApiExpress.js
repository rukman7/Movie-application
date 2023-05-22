import { fetcher } from "./authApiExpress";

 export const getMovies = (page) => fetcher(`/api/movies?page=${page}`)
     .then((res) => res.json())
     .then((json) => json);

 export const getUpcomingMovies = (page) => fetcher(`/api/movies/upcoming?page=${page}`)
     .then((res) => res.json())
     .then((json) => json);

 export const getMovie = async (args) => fetcher(`/api/movies/${args.queryKey[1].id}`)
     .then((res) => res.json())
     .then((json) => json);

 export const getMovieImages = (id) => fetcher(`/api/movies/${id}/images`)
     .then((res) => res.json())
     .then((json) => json);

 export const getMovieReviews = (id) => fetcher(`/api/movies/${id}/reviews`)
     .then((res) => res.json())
     .then((json) => json.results);

 export const getRecommendedMovies = (id) => fetcher(`/api/movies/${id}/recommendations`)
     .then((res) => res.json())
     .then((json) => json.results);

//  export const getSimilarMovies = (id) => fetcher(`/api/movies/${id}/similar`)
//      .then((res) => res.json())
//      .then((json) => json.results);

 export const getMovieCast = (id) => fetcher(`/api/movies/${id}/credits`)
     .then((res) => res.json())
     .then((json) => json.cast);

//  export const getPopularArtists = (page) => fetcher(`/api/artists?page=${page}`)
//      .then((res) => res.json())
//      .then((json) => json);

//  export const getArtistDetails = (id) => fetcher(`/api/artists/${id}`)
//      .then((res) => res.json())
//      .then((json) => json);

 export const getGenres = () => fetcher("/api/genres")
     .then((res) => res.json())
     .then((json) => json);

 export const getLanguages = () => fetcher("/api/languages")
     .then((res) => res.json())
     .then((json) => json);