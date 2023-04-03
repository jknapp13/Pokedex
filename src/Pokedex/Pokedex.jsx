import React, { useState, useEffect } from "react";
import PokemonAutocomplete from "./components/Autocomplete/Autocomplete";
import useSelectedPokemon from "./useSelectedPokemon";
import { fetchPokemonList } from "./api";
import IndicatorLights from "./components/IndicatorLights/IndicatorLights";
import MainScreen from "./components/MainScreen/MainScreen";
import Details from "./components/Details/Details";
import PokemonEvolutions from "./components/EvolutionChain/PokemonEvolutions";
import useStyles from "./Pokedex.styles.js";

function Pokedex() {
  const classes = useStyles();
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
    shouldFlashIndicator,
    handlePokemonSelection,
  } = useSelectedPokemon();

  return (
    <div className={classes.selectedPokemonContainer}>
      <IndicatorLights shouldFlashIndicator={shouldFlashIndicator} />
      <hr className={classes.hr} />
      <div className={classes.autocompleteContainer}>
        <PokemonAutocomplete
          filteredPokemonList={filteredPokemonList}
          handlePokemonSelection={handlePokemonSelection}
          handleSearchInputChange={(event) =>
            setSearchQuery(event.target.value)
          }
        />
      </div>
      <div className={classes.pokedexMainScreen}>
        {selectedPokemon && (
          <div>
            <h2 className={classes.pokemonName}>{selectedPokemon?.name}</h2>
            {selectedPokemon && (
              <MainScreen
                selectedPokemon={selectedPokemon}
                pokemonSpecies={pokemonSpecies}
              />
            )}
          </div>
        )}
      </div>
      <div className={classes.pokemonInfoContainer}>
        {selectedPokemon && (
          <>
            <Details selectedPokemon={selectedPokemon} />
          </>
        )}
      </div>

      {/* {pokemonSpecies && pokemonSpecies?.flavor_text_entries > 0 && (
        <div>
          <h3 className={classes.pokemonInfoItem}>Description</h3>
          {(() => {
            let lastEnglishDescription = null;
            for (const entry of pokemonSpecies?.flavor_text_entries.reverse()) {
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
      )} */}
      {selectedPokemon &&
        pokemonSpecies &&
        evolutionChain &&
        evolutionChain?.evolves_to.length > 0 && (
          <PokemonEvolutions
            pokemonSpecies={pokemonSpecies}
            evolutionChain={evolutionChain}
          />
        )}
    </div>
  );
}

export default Pokedex;
