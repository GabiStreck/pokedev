import { useEffect, useState } from 'react'
import { Pokemon } from '@/types/pokemon'
import { PokemonEvolution, getEvolutionChain } from '@/services/getEvolutionChain';
import { getGenderName } from '@/utils/helpers';

const usePokemonDetail = (pokemon: Pokemon | undefined | null) => {
    const [genre, setGenre] = useState<string>('');
    const [evolutions, setEvolutions] = useState<PokemonEvolution[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchEvolutionData() {
        if (!pokemon) return
        setLoading(true)
        try {
            const evolution = await getEvolutionChain({ url: pokemon.species.url })
            const evolutions = evolution.length > 0 ? evolution : [];
            const pokemonSpecie = evolutions?.find(item => item.name === pokemon.name)
            if (pokemonSpecie) {
                setGenre(getGenderName(pokemonSpecie.genre));
            }
            setEvolutions(evolutions);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!pokemon) return;
        fetchEvolutionData();
    }, [pokemon]);

    return {
        genre,
        evolutions,
        loading
    }
}

export default usePokemonDetail