import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectedPokemonContainer: {
    margin: "10px 0 0 10px",
    backgroundColor: "firebrick",
    maxWidth: "500px",
    borderRadius: "20px",
    height: "700px",
  },
  pokedexMainScreen: {
    backgroundColor: "powderblue",
    width: "350px",
    textAlign: "center",
    margin: "15px 0 0 50px",
    paddingBottom: "10px",
    display: "inline-block",
    border: "20px inset white",
    borderRadius: "2%",
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
    fontSize: "12px",
  },
  pokemonType: {
    fontFamily: "'Robot Mono', monospace",
    fontSize: "12px",
    marginTop: "5px",
  },
  pokemonInfoItem: {
    margin: "0 0 5px 0",
    fontFamily: "'Robot Mono', monospace",
  },
}));

export default useStyles;
