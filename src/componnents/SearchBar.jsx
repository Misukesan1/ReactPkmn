import { useState } from "react";

export function SearchBar({ pokemons, setPokemonsList, setLoading }) {

  const [searchInput, setSearchInput] = useState("");


  const handleChange = (e) => {
    const inputValue = e.target.value
    setSearchInput(inputValue)
    
    if (inputValue == '') {
      setLoading(true)
      setTimeout(() => {
        setPokemonsList(pokemons)
        setLoading(false)
      }, 1000)
    } else {
      var pokemonData = pokemons.filter(pokemon => pokemon.name.fr.toLowerCase().startsWith(e.target.value.toLowerCase()))
      setPokemonsList(pokemonData)
      console.log(pokemonData)
    }
  };

  return (
    // <form method="post" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2 mx-20">
        <input
          type="text"
          className="grow"
          placeholder="Entrez le nom d'un pokemon ..."
          value={searchInput}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    // </form>
  );
}
