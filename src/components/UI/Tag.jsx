import styles from './Tag.module.css';

export default function Tag({ label, variant = 'default' }) {
  const variantClass = variant === 'package' ? styles.tagPackage : styles.tagDefault;

  return (
    <span className={`${styles.tag} ${variantClass}`}>
      {label}
    </span>
  );
}
