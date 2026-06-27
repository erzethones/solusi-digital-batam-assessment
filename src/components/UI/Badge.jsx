import styles from './Badge.module.css';

export default function Badge({ type = 'nav', count, label }) {
  if (type === 'new') {
    return (
      <span className={`${styles.badge} ${styles.badgeNew}`}>
        {count !== undefined ? count : (label || 'NEU')}
      </span>
    );
  }

  return (
    <span className={`${styles.badge} ${styles.badgeNav}`}>
      {count}
    </span>
  );
}
