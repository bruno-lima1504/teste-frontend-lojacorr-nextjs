import Head from "next/head";
import { useRouter } from 'next/router';

import styles from "./home.module.css";

function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/categories');
  };

  const handleNavigationLog = () => {
    router.push('/logica');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        <h1>Teste fullstack Lojacorr</h1>
        <button onClick={handleNavigation} className={styles.button}>
            Categorias
        </button>
        <button onClick={handleNavigationLog} className={styles.button}>
            Teste Lógica
        </button>
      </main>
    </div>
  );
}

export default Home;
