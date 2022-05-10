import React, { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from './';

interface Props {
  pokemons: number[];
}

export const FavoritesPokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((pokemonId) => {
        return <FavoriteCardPokemon pokemonId={pokemonId} key={pokemonId} />;
      })}
    </Grid.Container>
  );
};
