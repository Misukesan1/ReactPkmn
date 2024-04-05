

export function TableListOfPokemons ({ pokemonsList }) {
    return (
        <div className="overflow-x-auto">
            <table className="table">

                {/* head */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NOM</th>
                    <th>TYPES</th>
                    <th>GENERATION</th>
                </tr>
                </thead>
                <tbody>

                {/* body */}
                {pokemonsList.map(pokemon => (
                <tr key={pokemon.pokedex_id}>
                    <th>
                        {'#' + pokemon.pokedex_id}
                    </th>
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={pokemon.sprites.regular} alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{pokemon.name.fr}</div>
                            <div className="text-sm opacity-50">{pokemon.category}</div>
                            </div>
                        </div>
                    </td>
                    <td>

                        {pokemon.types && pokemon.types.map(type => (
                            <div key={type.name} className="avatar">
                                <div className="w-6 rounded-full">
                                    <img src={type.image} />
                                </div>
                            </div>
                        ))}
                        
                    </td>
                    <td>
                        {pokemon.generation}
                    </td>
                    <th>
                    <button className="btn btn-ghost btn-xs">voir fiche</button>
                    </th>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}