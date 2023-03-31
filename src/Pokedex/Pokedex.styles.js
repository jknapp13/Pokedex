import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectedPokemonContainer: {
    marginLeft: "20px",
  },
  pokemonName: {
    textTransform: "capitalize",
  },
  pokemonInfoContainer: {
    marginLeft: "20px",
  },
  pokemonInfoItem: {
    marginBottom: "10px",
  },
  pokemonDescriptionContainer: {
    marginLeft: "20px",
  },
}));

export default useStyles;
