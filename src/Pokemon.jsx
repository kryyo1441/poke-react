import { useEffect, useState } from "react";
import "./index.css"
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=400";

    const [pokemon, setpokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const FetchPokemon  = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);
            
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setpokemon(detailedResponses)
            setLoading(false);
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        FetchPokemon();
    }, []);

    const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if (loading){
        return(
            <div>
                <h1>Loading.......</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h3>{error.message}</h3>
            </div>
        )
    }
    return (
    <>
    <section className="container">
        <header>
            <h1>Lets Catch 'em all!!</h1>
        </header>

        <div className="pokemon-search">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div>
            <ul className="cards">
                {searchData.map((curPokemon) => {
                    return <PokemonCards key = {curPokemon.id} pokedata={curPokemon}/>
                })}
            </ul>
        </div>
    </section>
    </>
);


}





