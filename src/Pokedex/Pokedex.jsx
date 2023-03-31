import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonAutocomplete from "./components/Autocomplete/Autocomplete";
import EvolutionChain from "./EvolutionChain";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((response) => setPokemonList(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      axios
        .get(selectedPokemon.species.url)
        .then((response) => {
          setPokemonSpecies(response.data);
          axios
            .get(response.data.evolution_chain.url)
            .then((response) => setEvolutionChain(response.data.chain))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [selectedPokemon]);

  const handlePokemonSelection = async (event, value) => {
    if (value) {
      const response = await axios.get(value.url);
      setSelectedPokemon(response.data);
    } else {
      setSelectedPokemon(null);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PokemonAutocomplete
        filteredPokemonList={filteredPokemonList}
        handlePokemonSelection={handlePokemonSelection}
        handleSearchInputChange={handleSearchInputChange}
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
