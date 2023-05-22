import { useQuery } from "react-query";
import Spinner from "../spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { getGenres } from "../../api/tmdb-api";
import { getLanguages } from "../../api/dataApiExpress";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

const sortTypes = [
  {
    value: "title_ASC",
    display: "Title (A-Z)",
  },
  {
    value: "title_DESC",
    display: "Title (Z-A)",
  },
  {
    value: "release_date_ASC",
    display: "Old Released",
  },
  {
    value: "release_date_DESC",
    display: "Recently Released",
  },
  {
    value: "vote_average_ASC",
    display: "Low Rating",
  },
  {
    value: "vote_average_DESC",
    display: "High Rating",
  },
];

const FilterMoviesCard = ({
  onUserInput,
  onUserSort,
  titleFilter,
  genreFilter,
  langFilter,
  currentSort,
}) => {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const {
    data: languages,
    error: error2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery("languages", getLanguages);

  if (isLoading || isLoading2) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (isError2) return <h1>{error2.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  if (languages[0].english_name !== "All") {
    languages.unshift({ iso_639_1: "0", english_name: "All" });
  }

  const handleInput = (e, type, value) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e) => handleInput(e, "title", e.target.value);
  const handleGenreChange = (e) => handleInput(e, "genre", e.target.value);
  const handleLangChange = (e) => handleInput(e, "language", e.target.value);
  const handleSortChange = (e) => onUserSort(e.target.value);

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search movie"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              defaultValue=""
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={styles.formControl}>
            <InputLabel id="lang-label">Language</InputLabel>
            <Select
              defaultValue="0"
              labelId="lang-label"
              id="lang-select"
              value={langFilter}
              onChange={handleLangChange}
            >
              {languages.map((lang) => {
                return (
                  <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                    {lang.english_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies
            <FormControl sx={styles.formControl}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                defaultValue={sortTypes[0].value}
                labelId="sort-label"
                id="sort-select"
                value={currentSort}
                onChange={handleSortChange}
              >
                {sortTypes.map((sortType) => {
                  return (
                    <MenuItem key={sortType.value} value={sortType.value}>
                      {sortType.display}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;