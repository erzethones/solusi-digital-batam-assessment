import styles from './Coin.module.css';
import { CoinIcon } from './Icons';

export default function Coin({ amount }) {
  return (
    <div className={styles.coin}>
      <CoinIcon />
      <span className={styles.amount}>{amount} €</span>
    </div>
  );
}
