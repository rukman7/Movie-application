import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToFavouritesIcon = ({ movie, page = "" }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };

  if (page === "upcoming") {
    return (
      <IconButton aria-label="add to must watch">
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    );
  }
  
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
