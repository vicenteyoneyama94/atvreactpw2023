import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Bem-vindo à Página Inicial da sua Loja Virtual</h1>
    
    <div className={styles.conteudo}>
	  <div className={styles.card}></div>
    <div className={styles.card}></div>
    <div className={styles.card}></div>
    </div>
    </div>
  );
};

export default Home;
