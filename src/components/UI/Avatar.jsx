import styles from './Avatar.module.css';

export default function Avatar({ initials, size = 'sm', src }) {
  const sizeClass = size === 'md' ? styles.avatarMd : styles.avatarSm;

  return (
    <div className={`${styles.avatar} ${sizeClass}`}>
      {src ? <img src={src} alt={initials} /> : initials}
    </div>
  );
}
