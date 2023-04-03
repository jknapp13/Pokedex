import useStyles from "../../Pokedex.styles";

function Details({ selectedPokemon }) {
  const classes = useStyles();
  return (
    <>
      <p className={classes.pokemonInfoItem}>
        Average Height: {selectedPokemon?.height / 10}m
      </p>
      <p className={classes.pokemonInfoItem}>
        Average Weight: {selectedPokemon?.weight / 10}kg
      </p>
      <p className={classes.pokemonInfoItem}>
        Abilities:{" "}
        {selectedPokemon?.abilities
          .map(
            (ability) =>
              ability.ability.name.charAt(0).toUpperCase() +
              ability.ability.name.slice(1)
          )
          .join(", ")}
      </p>
    </>
  );
}
export default Details;
