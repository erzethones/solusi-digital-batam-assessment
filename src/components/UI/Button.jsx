import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  children,
  onClick,
  icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
}) {
  const variantMap = {
    primary: styles.primary,
    outline: styles.outline,
    danger: styles.danger,
    ghost: styles.ghost,
    secure: styles.secure,
    'secure-disabled': styles.secureDisabled,
  };

  const variantClass = variantMap[variant] || styles.primary;
  const isDisabled = disabled || variant === 'secure-disabled';

  return (
    <button
      className={`${styles.btn} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
