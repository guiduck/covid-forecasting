import Head from 'next/head';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <main >
        <h1>
          hello world
        </h1>
      </main>
    </div>
  )
}

export default Home;