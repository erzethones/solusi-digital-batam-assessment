import styles from './Sidebar.module.css';
import { HomeIcon, ScaleIcon, QuestionIcon, PersonIcon, CalendarIcon, BookIcon, LogoIcon } from '../UI/Icons';
import Badge from '../UI/Badge';

const iconMap = {
  home: HomeIcon,
  scale: ScaleIcon,
  question: QuestionIcon,
  person: PersonIcon,
  calendar: CalendarIcon,
  book: BookIcon,
};

function NavIcon({ name }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon />;
}

export default function Sidebar({ navigation, navigationSpecial, specialLabel, activeNavId, onNavClick }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.drawerHeader}>
        <LogoIcon />
      </div>
      <nav className={styles.nav}>
        {navigation.map((item) => (
          <div key={item.id}>
            <div
              className={`${styles.navItem} ${activeNavId === item.id ? styles.navItemActive : ''}`}
              onClick={() => onNavClick(item.id)}
              title={item.label}
            >
              <span className={styles.navIcon} style={item.iconColor ? { color: item.iconColor } : undefined}>
                <NavIcon name={item.icon} />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span className={styles.navBadge}>
                  <Badge type={item.badgeVariant || 'nav'} count={item.badge} label={String(item.badge)} />
                </span>
              )}
            </div>

            {activeNavId === item.id && item.subItems && item.subItems.length > 0 && (
              <div className={styles.subItems}>
                {item.subItems.map((sub) => (
                  <div
                    key={sub.id}
                    className={`${styles.subItem} ${sub.active ? styles.subItemActive : ''}`}
                  >
                    {sub.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className={styles.divider} />
        <div className={styles.sectionLabel}>{specialLabel}</div>

        {navigationSpecial.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeNavId === item.id ? styles.navItemActive : ''}`}
            onClick={() => onNavClick(item.id)}
            title={item.label}
          >
            <span className={styles.navIcon}>
              <NavIcon name={item.icon} />
            </span>
            <span className={styles.navLabel}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
