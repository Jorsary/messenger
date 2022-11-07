import { TextField } from "@mui/material";


const Search = () => {
  return (
      <TextField
        required
        fullWidth
        id="Search"
        label="Поиск..."
        name="search"
        autoFocus
      />
  );
};

export default Search;
