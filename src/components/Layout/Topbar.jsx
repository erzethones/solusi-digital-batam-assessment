import { useState, useRef, useEffect } from "react";
import styles from "./Topbar.module.css";
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  QuestionIcon,
  LogoIcon,
  MenuIcon,
  LogoutIcon,
} from "../UI/Icons";
import Avatar from "../UI/Avatar";

export default function Topbar({
  breadcrumb,
  searchPlaceholder,
  user,
  onMenuToggle,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getIcon = (iconName) => {
    if (iconName === "question") return <QuestionIcon />;
    return null;
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.logoSection}>
        <span className={styles.logoIcon}>
          <LogoIcon />
        </span>
        <button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          aria-label="Menü öffnen"
        >
          <MenuIcon />
        </button>
      </div>

      <nav className={styles.breadcrumb}>
        {breadcrumb.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            {index > 0 && (
              <span className={styles.breadcrumbSeparator}>
                <ChevronRightIcon />
              </span>
            )}
            <span
              className={`${styles.breadcrumbItem} ${index === breadcrumb.length - 1 ? styles.breadcrumbActive : ""}`}
            >
              {item.icon && (
                <span
                  style={
                    item.iconColor
                      ? { color: item.iconColor, display: "inline-flex" }
                      : undefined
                  }
                >
                  {getIcon(item.icon)}
                </span>
              )}
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={searchPlaceholder}
        />
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
      </div>

      <div className={styles.userSection} ref={dropdownRef}>
        <button
          className={styles.userBtn}
          onClick={() => setDropdownOpen((v) => !v)}
        >
          <Avatar
            initials={user.avatarInitials}
            src={user.avatarSrc}
            size="sm"
          />
          <span
            className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
          >
            <ChevronDownIcon />
          </span>
        </button>
        {dropdownOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownName}>{user.name}</div>
            <div className={styles.dropdownDivider} />
            <button className={styles.dropdownItem}>
              Einstellungen Profil
            </button>
            <button
              className={styles.dropdownItem + " " + styles.dropdownItemLogout}
            >
              <LogoutIcon />
              Abmelden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
