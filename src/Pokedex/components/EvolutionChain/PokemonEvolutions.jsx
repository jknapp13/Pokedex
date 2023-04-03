import useStyles from "../../Pokedex.styles";
import EvolutionChain from "./EvolutionChain";

function PokemonEvolutions({ pokemonSpecies, evolutionChain }) {
  const classes = useStyles();
  return (
    <div className={classes.pokemonEvolutionContainer}>
      <div className={classes.pokemonInfoItem}>
        <h3 className={classes.h3}>Evolutions</h3>
        {pokemonSpecies && <EvolutionChain chain={evolutionChain} />}
      </div>
    </div>
  );
}
export default PokemonEvolutions;
