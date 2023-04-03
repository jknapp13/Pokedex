import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectedPokemonContainer: {
    margin: "10px 0 0 10px",
    backgroundColor: "firebrick",
    maxWidth: "500px",
    borderRadius: "20px",
    height: "700px",
  },
  indicatorLightsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "15px",
    margin: "0 0 15px 30px",
  },
  mainIndicatorLight: {
    fontSize: "75px !important",
    color: "#00BFFF",
    backgroundColor: "rgba(86, 184, 245, .7)",
    borderRadius: "100%",
    border: "4px solid white",
    boxSizing: "border-box",
  },
  miniIndicatorLightsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "85px",
    padding: "7px 0 0 10px",
  },
  miniIndicatorLight: {
    color: (props) => props.color + "!important" || "red",
    borderRadius: "100%",
    border: "1px solid black",
  },
  textField: {
    fontSize: "12px !important",
  },
  hr: {
    height: "5px",
    borderTop: "1px solid black",
    borderBottom: "2px outset black",
    paddingTop: "5px",
  },
  autocompleteContainer: {
    backgroundColor: "powderblue",
    width: "65%",
    margin: "0 0 0 83px",
  },
  pokedexMainScreen: {
    backgroundColor: "powderblue",
    width: "350px",
    height: "197px",
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
    margin: "5px 0 0 0",
  },
  pokemonInfoItem: {
    margin: "0 0 5px 0",
    fontFamily: "'Robot Mono', monospace",
  },
  pokemonEvolutionContainer: {
    width: "500px",
    display: "inline-block",
    textAlign: "center",
  },
  h3: { margin: 0 },
}));

export default useStyles;
