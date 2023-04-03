import React, { useState, useEffect } from "react";
import PokemonAutocomplete from "./components/Autocomplete/Autocomplete";
import { Circle } from "@mui/icons-material";
import EvolutionChain from "./EvolutionChain";
import useSelectedPokemon from "./useSelectedPokemon";
import { fetchPokemonList } from "./api";
import Sparkles from "./components/Sparkles/Sparkles";
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
    setSelectedEvolution,
    handlePokemonSelection,
  } = useSelectedPokemon();

  const handleEvolutionSelection = (evolution) => {
    setSelectedEvolution(evolution);
  };

  return (
    <div>
      <PokemonAutocomplete
        filteredPokemonList={filteredPokemonList}
        handlePokemonSelection={handlePokemonSelection}
        handleSearchInputChange={(event) => setSearchQuery(event.target.value)}
      />
      <div
        className={classes.selectedPokemonContainer}
        style={{ height: "663px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "15px",
            marginLeft: "15px",
          }}
        >
          <Circle
            sx={{}}
            style={{
              fontSize: "75px",
              color: "#00BFFF",
              backgroundColor: "rgba(86, 184, 245, .7)",
              borderRadius: "100%",
              border: "4px solid white",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "75px",
              paddingTop: "5px",
            }}
          >
            <Circle style={{ color: "darkred" }} />
            <Circle style={{ color: "yellow" }} />
            <Circle style={{ color: "green" }} />
          </div>
        </div>

        <div className={classes.pokedexMainScreen} style={{ height: "197px" }}>
          {selectedPokemon && (
            <div>
              <h2 className={classes.pokemonName}>{selectedPokemon?.name}</h2>
              {selectedPokemon && (
                <div>
                  {pokemonSpecies ? (
                    <h4 className={classes.pokemonInfoItem}>
                      {
                        pokemonSpecies?.genera.find(
                          (g) => g.language.name === "en"
                        )?.genus
                      }
                    </h4>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <h5 className={classes.pokemonType}>
                    {selectedPokemon?.types
                      .map((type) => type.type.name)
                      .join(" / ")}
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
              )}
            </div>
          )}
        </div>

        <div className={classes.pokemonInfoContainer}>
          {selectedPokemon && (
            <>
              <p className={classes.pokemonInfoItem}>
                Average Height: {selectedPokemon?.height / 10} m
              </p>
              <p className={classes.pokemonInfoItem}>
                Average Weight: {selectedPokemon?.weight / 10} kg
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
          )}
        </div>
        {pokemonSpecies && pokemonSpecies?.flavor_text_entries > 0 && (
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
        )}
        {selectedPokemon &&
          pokemonSpecies &&
          evolutionChain &&
          evolutionChain?.evolves_to.length > 0 && (
            <div style={{ width: "500px", display: "inline-block" }}>
              <div
                style={{ textAlign: "center" }}
                className={classes.pokemonInfoItem}
              >
                <h3>Evolutions</h3>
                {pokemonSpecies && (
                  <EvolutionChain
                    chain={evolutionChain}
                    onClick={handleEvolutionSelection}
                  />
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Pokedex;
