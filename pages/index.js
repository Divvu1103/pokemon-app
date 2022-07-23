/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }) {
  return (
    <div className="bg-[#458E88] min-w-screen ">
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2 className="text-center text-3xl p-5 font-bold">Pokemon List</h2>
      <div className="grid grid-cols-3 md:grid-col-2 sm:grid-cols-4 gap-3 p-2">
        {pokemon.map((pokemon) => (
          <div className="h-4/5 w-4/5 " key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <div className="cursor-pointer bg-white p-2 ">
                <a>
                  <img
                    className="h-full w-full"
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                    alt={pokemon.name}
                  />
                  <h3 className="text-center text-xl font-semibold">{pokemon.name}</h3>
                </a>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
