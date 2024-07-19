import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './Logica.module.css';

export default function Logica() {
  const [quantidadeCasas, setQuantidadeCasas] = useState('');
  const [valorCasas, setValorCasas] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [resultado, setResultado] = useState(null);
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/');
  };

  const calcularCasasCompraveis = () => {
    const X = parseFloat(quantidadeCasas);
    const Y = parseFloat(valorCasas);
    const B = parseFloat(orcamento);

    if (isNaN(X) || isNaN(Y) || isNaN(B) || X <= 0 || Y <= 0 || B <= 0) {
      setResultado('Todos os campos devem ter valores válidos');
      return;
    }

    const custoPorCasa = Y / X;
    const casasCompraveis = Math.floor(B / custoPorCasa);
    const maxCasas = Math.min(casasCompraveis, X);

    setResultado(`Você pode comprar até ${maxCasas} casas com o orçamento disponível.`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        <h1>Teste de Lógica</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="quantidadeCasas">Quantidade de casas</label>
          <input
            type="text"
            id="quantidadeCasas"
            value={quantidadeCasas}
            onChange={(e) => setQuantidadeCasas(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="valorCasas">Valor total das casas</label>
          <input
            type="text"
            id="valorCasas"
            value={valorCasas}
            onChange={(e) => setValorCasas(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="orcamento">Orçamento</label>
          <input
            type="text"
            id="orcamento"
            value={orcamento}
            onChange={(e) => setOrcamento(e.target.value)}
            className={styles.input}
          />
        </div>
        {resultado && <div className={styles.resultado}>{resultado}</div>}
        <button onClick={calcularCasasCompraveis} className={styles.button}>
          Calcular
        </button>
        <button onClick={handleNavigation} className={styles.button}>
          Voltar
        </button>
      </main>
    </div>
  );
}
