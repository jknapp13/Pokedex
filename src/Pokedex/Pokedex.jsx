import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Forward } from "@material-ui/icons";

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

  const renderEvolutionChain = (chain) => {
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
              {renderEvolutionChain(evolution)}
            </React.Fragment>
          ))}
      </div>
    );
  };

  return (
    <div>
      <Autocomplete
        id="pokemon-search"
        options={filteredPokemonList}
        getOptionLabel={(option) =>
          option.name.charAt(0).toUpperCase() + option.name.slice(1)
        }
        onChange={handlePokemonSelection}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Enter Pokemon name here"
            onChange={handleSearchInputChange}
          />
        )}
      />
      {selectedPokemon && (
        <div>
          <h2>
            {selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)}
          </h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <img
            src={selectedPokemon.sprites.front_shiny}
            alt={`shiny-${selectedPokemon.name}`}
          />
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
                  return <p>{lastEnglishDescription}</p>;
                } else {
                  return null;
                }
              })()}
            </div>
          )}

          {pokemonSpecies && (
            <div>
              <h3>Evolution Chain</h3>
              {evolutionChain && renderEvolutionChain(evolutionChain)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Pokedex;
