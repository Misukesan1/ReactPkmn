
import { useParams, NavLink } from 'react-router-dom'

export function PokemonDetail ({pokemons}) {

    const { id } = useParams();
    const pokemonSelect = pokemons.filter(pokemon => pokemon.pokedex_id == id)
    console.log(pokemonSelect)

    function ifEvolutions (pokemonSelect) {
        if (!pokemonSelect.evolution) {
            return false;
        } else {
            return true;
        }
    }
    function ifPreEvolution (pokemonSelect) {
        if (pokemonSelect.evolution.pre && pokemonSelect.evolution.pre.length >= 1) {

            const preEvolution = pokemons.filter(pokemon => pokemon.pokedex_id == pokemonSelect.evolution.pre[0].pokedex_id);

            return (
                <NavLink to={"/"+preEvolution[0].pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={preEvolution[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">{preEvolution[0].name.fr}</h4>
                    </div>
                </NavLink>
            )
        } else {
            return (
                <NavLink to={"/"+pokemonSelect.pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={pokemonSelect.sprites.regular} />
                        </div>
                        <h4 className="text-center">{pokemonSelect.name.fr}</h4>
                    </div>
                </NavLink>
            )
        }
    }
    function if2Evolution (pokemonSelect) {
        if (pokemonSelect.evolution.pre && pokemonSelect.evolution.pre.length >= 1) {
            return (
                <NavLink to={"/"+pokemonSelect.pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={pokemonSelect.sprites.regular} />
                        </div>
                        <h4 className="text-center">{pokemonSelect.name.fr}</h4>
                    </div>
                </NavLink>
            )
        } else if (pokemonSelect.evolution.next && pokemonSelect.evolution.next.length >= 1) {

            const nextEvolution = pokemons.filter(pokemon => pokemon.pokedex_id == pokemonSelect.evolution.next[0].pokedex_id)

            return (
                <NavLink to={"/"+nextEvolution[0].pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={nextEvolution[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">{nextEvolution[0].name.fr}</h4>
                    </div>
                </NavLink>
            )

        }
    }
    function ifNextEvolution (pokemonSelect) {
        // if a 3rd evolution
        if (
            (!pokemonSelect.evolution.pre && pokemonSelect.evolution.next.length == 1) ||
            (!pokemonSelect.evolution.next && pokemonSelect.evolution.pre.length == 1)
        ) {
            return false;
        }
        // else
        else if (!pokemonSelect.evolution.next && pokemonSelect.evolution.pre.length == 2) {
            return (
                <NavLink to={"/"+pokemonSelect.pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={pokemonSelect.sprites.regular} />
                        </div>
                        <h4 className="text-center">{pokemonSelect.name.fr}</h4>
                    </div>
                </NavLink>
            )
        }
        else if (!pokemonSelect.evolution.pre && pokemonSelect.evolution.next.length == 2) {

            const nextEvolution = pokemons.filter(pokemon => pokemon.pokedex_id == pokemonSelect.evolution.next[1].pokedex_id);

            return (
                <NavLink to={"/"+nextEvolution[0].pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={nextEvolution[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">{nextEvolution[0].name.fr}</h4>
                    </div>
                </NavLink>
            )
        }
        else if (pokemonSelect.evolution.pre.length == 1 && pokemonSelect.evolution.next.length == 1) {

            const nextEvolution = pokemons.filter(pokemon => pokemon.pokedex_id == pokemonSelect.evolution.next[0].pokedex_id);

            return (
                <NavLink to={"/"+nextEvolution[0].pokedex_id}>
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={nextEvolution[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">{nextEvolution[0].name.fr}</h4>
                    </div>
                </NavLink>
            )
        }
    }

    return (
        <div>
            {/* Pokemon details */}
            <div className="grid grid-cols-2 min-w-80 flex items-center card bg-base-200 shadow-xl m-8">

                <img className="col" src={pokemonSelect[0].sprites.regular} alt={pokemonSelect[0].name.fr} />
                
                <div className="col">
                    <h2 className="font-bold text-2xl">{pokemonSelect[0].name.fr}</h2>
                    <p>{pokemonSelect[0].category}</p>
                    <div className="grid grid-cols-2 my-4">
                        <p>Taille :</p>
                        <p>Poids :</p>
                    </div>
                    <div className="grid grid-cols-2 my-4">
                        <p className="flex items-center">Types :</p>
                        <div className="">
                            {pokemonSelect[0].types && pokemonSelect[0].types.map(type => {
                                return (
                                    <div key={type.name} className="flex items-center">
                                        <img className="size-8 mr-4" src={type.image} alt={type.name} />
                                        {type.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="grid grid-rows-2 my-4 mr-4">
                        <p>Stats de base :</p>
                        {pokemonSelect[0].stats && Object.entries(pokemonSelect[0].stats).map(([stat, value], index) => {
                            return (
                                <div key={index} className="grid grid-cols-2 flex items-center">
                                    {stat}
                                    <progress className="progress progress-error w-56" value={value} max="100"></progress>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* Evolutions */}
            {ifEvolutions(pokemonSelect[0]) &&
                <div className="grid grid-cols-3 min-w-80 flex justify-center items-center card bg-base-200 shadow-xl p-5 m-8 mt-6">
        
                {/* Evolution 1 */}
                {ifPreEvolution(pokemonSelect[0])}

                {/* Evolution 2 */}
                {if2Evolution(pokemonSelect[0])}

                {/* Evolution 3 */}
                {ifNextEvolution(pokemonSelect[0])}

                {/* {pokemonSelect[0].evolution.pre ? (
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={pokemonSelect[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">pkmn base</h4>
                    </div>
                ) : (
                    <div className="avatar grid grid-rows flex justify-center items-center">
                        <div className="w-40 rounded-full">
                            <img src={pokemonSelect[0].sprites.regular} />
                        </div>
                        <h4 className="text-center">{pokemonSelect[0].name.fr}</h4>
                    </div>
                )} */}

                </div>
            }

        </div>
    )
}