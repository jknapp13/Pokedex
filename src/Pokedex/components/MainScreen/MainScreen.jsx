import useStyles from "../../Pokedex.styles.js";
import Sparkles from "../Sparkles/Sparkles.jsx";

function MainScreen({ selectedPokemon, pokemonSpecies }) {
  const classes = useStyles();

  return (
    <div>
      {pokemonSpecies ? (
        <h4 className={classes.pokemonInfoItem}>
          {pokemonSpecies?.genera.find((g) => g.language.name === "en")?.genus}
        </h4>
      ) : (
        <p>Loading...</p>
      )}
      <h5 className={classes.pokemonType}>
        {selectedPokemon?.types.map((type) => type.type.name).join(" / ")}
      </h5>
      <img
        src={selectedPokemon?.sprites.front_default}
        alt={selectedPokemon?.name}
      />
      <Sparkles>
        <img
          src={selectedPokemon?.sprites.front_shiny}
          alt={`shiny-${selectedPokemon?.name}`}
        />
      </Sparkles>
    </div>
  );
}

export default MainScreen;
