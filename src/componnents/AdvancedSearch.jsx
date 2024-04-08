import { useState } from "react";
import types from "../database/types";

export function AdvancedSearch({ pokemons, setPokemonsList, setLoading }) {
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [handleGeneration, setHandleGeneration] = useState(false);
  const [checkboxTypesValue, setCheckboxTypesValue] = useState([]);

  /**
   * Add/Remove selected types
   * @param {*} e
   */
  const handleCheckbox = (e) => {
    const typeId = e.target.id; // the name of type
    const checked = e.target.checked;

    if (checked) {
      if (!checkboxTypesValue.includes(typeId)) {
        setCheckboxTypesValue((items) => [...items, typeId]);
      }
    } else {
      setCheckboxTypesValue((items) => items.filter((item) => item !== typeId));
    }
  };

  /**
   * Submit form advanced filter
   * @param {*} e
   */
  const handleSubmit = (e) => {
    let formData = new FormData(e.target);
    formData.append("types", JSON.stringify(checkboxTypesValue));
    // console.log(formData)

    // Inputs details
    let filterData = {
      selectedTypes: JSON.parse(formData.get("types")),
      height: parseFloat(formData.get("height")),
      weight: parseFloat(formData.get("weight")),
      generation:
        formData.get("generation") == null
          ? ""
          : formData.get("generation").slice(-1),
    };

    // filter => new list of pokemons
    var newPokemonList = pokemons.filter((pokemon) => {
      if (filterData.generation !== "") {
        if (parseInt(filterData.generation) !== pokemon.generation) {
          return false;
        }
      }

      const height = pokemon.height
        ? parseFloat(pokemon.height.slice(0, -2))
        : 0;
      const weight = pokemon.weight
        ? parseFloat(pokemon.weight.slice(0, -3))
        : 0;
      const types =
        pokemon.types !== null ? pokemon.types.map((type) => type.name) : [];

      return (
        height >= filterData.height &&
        weight >= filterData.weight &&
        filterData.selectedTypes.every((type) => types.includes(type))
      );
    });

    // save the new list
    setPokemonsList(newPokemonList);
    // console.log(newPokemonList)

    e.preventDefault();
  };

  /**
   * Reset filter
   * @param {*} e
   */
  const resetFilter = (e) => {
    setHeightValue(0);
    setWeightValue(0);
    setCheckboxTypesValue([]);
    setHandleGeneration(false);

    // reset de state of checkbox types
    const checkboxState = document.getElementsByClassName('checkbox type');
    for (let i=0;i<checkboxState.length;i++) 
      checkboxState[i].checked = false;
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <details className="collapse collapse-arrow bg-base-200 rounded-none my-4">
        <summary className="collapse-title text-sm text-center">
          Afficher la recherche avancée
        </summary>

        <div className="collapse-content">
          {/* Types display */}
          <div className="grid grid-cols-12 my-4">
            <label className="col-span-4" htmlFor="types">
              Sélectionnez un ou deux types :
            </label>
            <div className="grid grid-cols-12 col-span-8">
              {types.map((e) => {
                return (
                  <div key={e.name.fr} className="flex col-span-3 items-center">
                    <input
                      id={e.name.fr}
                      name="type"
                      type="checkbox"
                      className="checkbox type checkbox-sm mx-3"
                      onChange={handleCheckbox}
                    />
                    <div className="flex items-center">
                      <img className="size-7" src={e.sprites} alt="" />
                      {e.name.fr}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error types */}
          {checkboxTypesValue.length >= 3 && (
            <div className="grid grid-cols-12 my-4">
              <div role="alert" className="col-span-12 alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Veuillez choisir 2 types maximum.</span>
              </div>
            </div>
          )}

          {/* Height and Weight display */}
          <div className="grid grid-cols-12 gap-8 my-4">
            {/* Height */}
            <div className="col-span-6">
              <div className="flex items-center mb-2">
                <label htmlFor="height">Taille (m) :</label>
                <input
                  name="height"
                  type="text"
                  placeholder=""
                  className="input input-sm input-ghost w-full max-w-xs ms-2"
                  value={heightValue}
                  onChange={(e) => setHeightValue(e.target.value)}
                />
              </div>
              <input
                id="height"
                type="range"
                min="0"
                max="100"
                className="range range-sm"
                value={heightValue}
                onChange={(e) => setHeightValue(e.target.value)}
              />
            </div>
            {/* Weight */}
            <div className="col-span-6">
              <div className="flex items-center mb-2">
                <label htmlFor="weight">Poids (kg) :</label>
                <input
                  name="weight"
                  type="text"
                  placeholder=""
                  className="input input-sm input-ghost w-full max-w-xs ms-2"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                />
              </div>
              <input
                id="weight"
                type="range"
                min="0"
                max="1000"
                className="range range-sm"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
              />
            </div>
          </div>

          {/* Generation display */}
          <div className="grid grid-cols-12 gap-8 my-4">
            <div className="flex items-center col-span-12">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mx-3"
                checked={handleGeneration}
                onChange={(e) => setHandleGeneration(e.target.checked)}
              />
              Sélectionner une génération :
            </div>
            {handleGeneration && (
              <div className="col-span-12">
                <select
                  name="generation"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option>Génération 1</option>
                  <option>Génération 2</option>
                  <option>Génération 3</option>
                  <option>Génération 4</option>
                  <option>Génération 5</option>
                  <option>Génération 6</option>
                  <option>Génération 7</option>
                  <option>Génération 8</option>
                  <option>Génération 9</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions display */}
          <div className="grid grid-cols-12 gap-8 my-4">
            <div className="col-span-8"></div>
            <div className="col-span-4">
              <button type="submit" className="btn btn-outline btn-primary">
                Rechercher
              </button>
              <button
                type="button"
                onClick={resetFilter}
                className="btn btn-outline btn-secondary"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </details>
    </form>
  );
}
