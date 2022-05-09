import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { PokemonResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Home">
      <h1>Hola !</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (_ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map(
    (pokemon, index): SmallPokemon => {
      return {
        ...pokemon,
        id: index + 1 + '',
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          index + 1
        }.svg`,
      };
    }
  );

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
