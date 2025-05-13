export const PokemonCards = ({pokedata}) => {
    return <li className="pokemon-card">
        <figure>
            <img src={pokedata.sprites.other.dream_world.front_default} alt={pokedata.name} />
        </figure>
    </li>
}