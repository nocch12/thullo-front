import Head from 'next/head';
import withAuth from '../middleware/withAuth';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>test</main>

      <footer></footer>
    </div>
  );
};

export default withAuth(Home);
