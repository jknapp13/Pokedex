import { useState, useEffect } from "react";
import axios from "axios";

function useSelectedPokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [shouldFlashIndicator, setShouldFlashIndicator] = useState(false);

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

    setShouldFlashIndicator(true);
    setTimeout(() => {
      setShouldFlashIndicator(false);
    }, 250);
  };

  return {
    selectedPokemon,
    pokemonSpecies,
    evolutionChain,
    shouldFlashIndicator,
    handlePokemonSelection,
  };
}

export default useSelectedPokemon;
