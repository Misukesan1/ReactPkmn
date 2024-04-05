import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { SearchBar } from "../SearchBar";
import { AdvancedSearch } from "../AdvancedSearch";

import pokemons from "../../database/pokemon";
import { useState } from "react";
import { TableListOfPokemons } from "../TableListOfPokemons";

export function Master () {

    const [pokemonsList, setPokemonsList] = useState(pokemons)

    return (
        <div>
            <Header />
            <SearchBar />
            <AdvancedSearch 
                pokemons={pokemons}
                setPokemonsList={setPokemonsList}/>
            <TableListOfPokemons
                pokemonsList={pokemonsList} />
            <Outlet />
            <Footer />
        </div>
    )
}