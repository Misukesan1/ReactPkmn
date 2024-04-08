import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { AdvancedSearch } from "../AdvancedSearch";
import { TableListOfPokemons } from "../TableListOfPokemons";

export function Main ({pokemons}) {

    const [pokemonsList, setPokemonsList] = useState(pokemons)
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <SearchBar pokemons={pokemons} setPokemonsList={setPokemonsList} setLoading={setLoading}/>
            <AdvancedSearch pokemons={pokemons} setPokemonsList={setPokemonsList} setLoading={setLoading}/>

            {loading ? (
            <span className="loading loading-ring loading-lg"></span>
            ) : (
            <TableListOfPokemons pokemonsList={pokemonsList} />
            )}
        </div>
    )
}