import React from "react";
import { Forward } from "@material-ui/icons";

function EvolutionChain({ chain }) {
  const pokemon = chain?.species;

  return (
    <div
      key={pokemon?.name}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon?.url.match(/(\d+)\/$/)[1]
          }.png`}
          alt={pokemon?.name}
          style={{ width: "75%" }}
        />
        <br />
        <p style={{ margin: 0, padding: 0 }}>
          {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
        </p>
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
