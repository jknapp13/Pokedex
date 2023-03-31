import React from "react";
import { Forward } from "@material-ui/icons";

function EvolutionChain({ chain }) {
  const pokemon = chain?.species;
  return (
    <div key={pokemon?.name} style={{ display: "flex", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon?.url.match(/(\d+)\/$/)[1]
          }.png`}
          alt={pokemon?.name}
        />
        <br />
        <p>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</p>
      </div>
      {chain?.evolves_to && chain?.evolves_to.length > 0 ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Forward />
          <EvolutionChain chain={chain?.evolves_to[0]} />
        </div>
      ) : null}
    </div>
  );
}

export default EvolutionChain;
