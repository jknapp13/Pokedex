import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
// import useStyles from "../../Pokedex.styles";

function PokemonAutocomplete({
  filteredPokemonList,
  handlePokemonSelection,
  handleSearchInputChange,
}) {
  // const classes = useStyles();
  return (
    <Autocomplete
      id="pokemon-search"
      options={filteredPokemonList}
      getOptionLabel={(option) =>
        option.name.charAt(0).toUpperCase() + option.name.slice(1)
      }
      onChange={handlePokemonSelection}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Enter Pokemon name here"
          onChange={handleSearchInputChange}
          // InputProps={{
          //   classes: {
          //     input: classes.textField,
          //   },
          // }}
        />
      )}
      autoHighlight
      clearIcon
      handleHomeEndKeys
      autoComplete
    />
  );
}

export default PokemonAutocomplete;
