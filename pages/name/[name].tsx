import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Pokemon, PokemonResponse } from '../../interfaces';
import { pokeApi } from '../../api';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existsInFavorites(pokemon.id));
  }, []);

  const onToggleFavorite = () => {
    setIsInFavorites(!isInFavorites);
    localFavorites.toggleFavorites(pokemon.id);

    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ margin: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  'no-image.png'
                }
                alt="pokemon img"
                width={'100%'}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color={'gradient'}
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>(`/pokemon/?limit=151`);

  return {
    paths: data.results.map(({ name }) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
