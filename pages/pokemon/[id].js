/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";


export async function getStaticPaths() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30,
  };
}

export default function Details({ pokemon }) {
  return (
    <div className="bg-[#458E88] min-h-screen">
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div className="">
        <Link href="/">
          <a>
            {" "}
            <p className="font-bold">Back to Home</p>
          </a>
        </Link>
      </div>
      <div className="flex items-center p-2 bg-white w-auto ">
        <div className="">
          <img
            className="w-3/4 h-1/4"
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className="text-2xl font-bold ">{pokemon.name}</div>
          <div className="">{pokemon.type.join(", ")}</div>
          <table>
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className=''>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
