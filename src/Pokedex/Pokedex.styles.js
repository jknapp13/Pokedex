import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectedPokemonContainer: {
    marginLeft: "20px",
    backgroundColor: "red",
    maxWidth: "500px",
    borderRadius: "20px",
    height: "100%",
  },
  pokedexMainScreen: {
    backgroundColor: "powderblue",
    width: "350px",
    textAlign: "center",
    margin: "50px 0 0 50px",
    paddingBottom: "10px",
    display: "inline-block",
    border: "20px inset white",
    borderRadius: "25px",
  },
  pokemonName: {
    textTransform: "capitalize",
    fontFamily: "'Robot Mono', monospace",
    textDecoration: "underline",
    marginBottom: "5px",
    paddingBottom: "3px",
    backgroundColor: "rgba(255, 255, 255, .4)",
  },
  pokemonInfoContainer: {
    margin: "20px 0 0 20px",
  },
  pokemonType: {
    fontFamily: "'Robot Mono', monospace",
    fontSize: "12px",
    marginTop: "5px",
  },
  pokemonInfoItem: {
    textTransform: "capitalize",
    margin: "0 0 5px 0",
    fontFamily: "'Robot Mono', monospace",
  },
}));

export default useStyles;
