import { useParams } from 'react-router-dom'

export function PokemonDetail ({pokemons}) {

    const { id } = useParams();
    const pokemonSelect = pokemons.filter(pokemon => pokemon.pokedex_id == id)
    console.log(pokemonSelect)

    return (
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
    )
}