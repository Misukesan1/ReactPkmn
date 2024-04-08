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
    const [loading, setLoading] = useState(false);

    return (
      <div>
        <Header />
        {/* <SearchBar pokemons={pokemons} setPokemonsList={setPokemonsList} setLoading={setLoading} /> 
        <AdvancedSearch pokemons={pokemons} setPokemonsList={setPokemonsList} setLoading={setLoading} />

        {loading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <TableListOfPokemons pokemonsList={pokemonsList} />
        )} */}

        <Outlet />
        <Footer />
      </div>
    );
}