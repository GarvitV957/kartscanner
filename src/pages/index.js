// pages/index.js

import Head from "next/head";
import Home from "../components/Home";

export default function Index() {
  return (
    <>
      <Head>
        <title>KartScanner</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/site-logo.png" />
      </Head>
      <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
        <Home />
      </main>
    </>
  );
}