import React from "react";
import { Forward } from "@material-ui/icons";

function EvolutionChain({ chain }) {
  const pokemon = chain.species;
  return (
    <div key={pokemon.name} style={{ display: "flex", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.match(/(\d+)\/$/)[1]
          }.png`}
          alt={pokemon.name}
        />
        <br />
        <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
      </div>
      {chain.evolves_to.length > 0 &&
        chain.evolves_to.map((evolution) => (
          <React.Fragment key={evolution.species.name}>
            <Forward style={{ margin: "0 10px" }} />
            <EvolutionChain chain={evolution} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default EvolutionChain;
