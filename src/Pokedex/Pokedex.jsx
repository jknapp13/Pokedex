import React, { useState, useEffect } from "react";
import PokemonAutocomplete from "./components/Autocomplete/Autocomplete";
import EvolutionChain from "./EvolutionChain";
import useSelectedPokemon from "./useSelectedPokemon";
import { fetchPokemonList } from "./api";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const list = await fetchPokemonList();
      setPokemonList(list);
    };
    fetchData();
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchQuery)
  );

  const {
    selectedPokemon,
    pokemonSpecies,
    evolutionChain,
    handlePokemonSelection,
  } = useSelectedPokemon();

  return (
    <div>
      <PokemonAutocomplete
        filteredPokemonList={filteredPokemonList}
        handlePokemonSelection={handlePokemonSelection}
        handleSearchInputChange={(event) => setSearchQuery(event.target.value)}
      />
      {selectedPokemon && (
        <div style={{ marginLeft: "20px" }}>
          <h2>
            {selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)}
          </h2>
          {pokemonSpecies ? (
            <h4 style={{ marginRight: "20px" }}>
              <p>
                {
                  pokemonSpecies.genera.find((g) => g.language.name === "en")
                    .genus
                }
              </p>
            </h4>
          ) : (
            <p>Loading...</p>
          )}
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            style={{ marginRight: "50px" }}
          />
          <img
            src={selectedPokemon.sprites.front_shiny}
            alt={`shiny-${selectedPokemon.name}`}
          />
          <div style={{ marginLeft: "20px" }}>
            <p>Average Height: {selectedPokemon.height / 10} m</p>
            <p>Average Weight: {selectedPokemon.weight / 10} kg</p>
            <p>
              Abilities:{" "}
              {selectedPokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
            <p>
              Type:{" "}
              {selectedPokemon.types
                .map(
                  (type) =>
                    type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)
                )
                .join("/")}
            </p>
          </div>
          {pokemonSpecies && (
            <div>
              <h3>Description</h3>
              {(() => {
                let lastEnglishDescription = null;
                for (const entry of pokemonSpecies.flavor_text_entries.reverse()) {
                  if (entry.language.name === "en") {
                    lastEnglishDescription = entry.flavor_text;
                    break;
                  }
                }
                if (lastEnglishDescription) {
                  // replace the Unicode characters returned from PokeAPI data
                  lastEnglishDescription = lastEnglishDescription
                    .replace(/\u2191/g, "")
                    .replace(/\f/g, "\n")
                    .replace(/\u00ad\n/g, "")
                    .replace(/\u00ad/g, "")
                    .replace(/ -\n/g, " - ")
                    .replace(/-\n/g, "-")
                    .replace(/\n/g, " ");
                  return (
                    <div style={{ marginLeft: "20px" }}>
                      <p>{lastEnglishDescription}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })()}
            </div>
          )}

          {pokemonSpecies && (
            <div>
              <h3>Evolution Chain</h3>
              {pokemonSpecies && <EvolutionChain chain={evolutionChain} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
