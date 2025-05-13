import { use, useEffect } from "react";
import "./index.css"


export const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    
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

            const detailedPokemon = await Promise.all(detailedPokemonData);
            console.log(detailedPokemon);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        FetchPokemon();
    }, []);
}