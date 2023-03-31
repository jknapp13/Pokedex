import axios from "axios";

export const fetchPokemonList = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
