import React from "react";
 import { useQuery } from "react-query";

 import MovieCard from "../movieCard";
 import Spinner from "../spinner";
 import AddToFavouritesIcon from "../cardIcons/addToFavourites";

 import { getRecommendedMovies } from "../../api/dataApiExpress";

 const styles = {
   container: {
     overflowX: "scroll",
     display: "flex",
     flexDirection: "row",
   },
   card: {
     marginLeft: "20px",
     minWidth: "275px",
   },
 };

 const RecommendedMovies = ({ movie }) => {
   const { isLoading, isError, error, data } = useQuery(
     ["recommended movies", movie],
     () => getRecommendedMovies(movie.id)
   );

   if (isLoading) {
     return <Spinner />;
   }

   if (isError) {
     return <h1>{error.message}</h1>;
   }

   return (
     <div style={styles.container}>
       {data.map((m) => (
         <div key={m.id} style={styles.card}>
           <MovieCard
             movie={m}
             action={(movie) => {
               return <AddToFavouritesIcon movie={movie} />;
             }}
           />
         </div>
       ))}
     </div>
   );
 };

 export default RecommendedMovies;