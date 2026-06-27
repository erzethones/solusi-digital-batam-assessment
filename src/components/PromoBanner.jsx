import { useState } from 'react';
import styles from './PromoBanner.module.css';
import { CloseIcon } from './UI/Icons';

export default function PromoBanner({ title, subtitle, dismissible, onDismiss }) {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(onDismiss, 320);
  };

  return (
    <div className={`${styles.banner} ${dismissing ? styles.bannerDismissing : ''}`}>
      <div className={styles.illustration}>
        <span>€</span>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {dismissible && (
        <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Banner schließen">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
