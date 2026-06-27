import styles from './Layout.module.css';

export default function Layout({ children, sidebar, topbar, sidebarOpen, onCloseSidebar }) {
  return (
    <div className={`${styles.layout} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebar}>
        {sidebar}
      </div>

      {sidebarOpen && (
        <div className={styles.overlay} onClick={onCloseSidebar} />
      )}

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.topbarWrapper}>
        {topbar}
      </div>

      <div className={styles.gapCover} />
    </div>
  );
}
