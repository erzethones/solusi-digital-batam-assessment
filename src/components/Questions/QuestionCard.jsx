import styles from './QuestionCard.module.css';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, LockIcon, CrossSmallIcon, WarningIcon } from '../UI/Icons';
import Avatar from '../UI/Avatar';
import Coin from '../UI/Coin';

export default function QuestionCard({
  card,
  tableHeaders,
  onToggle,
  onSecure,
  onDismiss,
  onReport,
  onWrongCategory,
  isExpanded,
  showNeu = true,
  entranceIndex = 0,
}) {
  const isDisabled = card.status === 'disabled';

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${entranceIndex * 60}ms` }}
    >
      {card.isNew && showNeu && (
        <div className={styles.neuBadge}>
          <div className={styles.neuRibbon}>NEU</div>
        </div>
      )}

      <div className={styles.cardRow} onClick={() => onToggle(card.id)}>
        <div className={styles.colCategory}>
          <button
            className={`${styles.chevronBtn} ${isExpanded ? styles.chevronBtnActive : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggle(card.id); }}
            aria-label={isExpanded ? 'Einklappen' : 'Ausklappen'}
          >
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
          <span className={styles.categoryText}>{card.category}</span>
        </div>

        <div className={styles.colRequester}>
          <Avatar initials={card.requester.avatarInitials} src={card.requester.avatarSrc} size="sm" />
          <span className={styles.requesterName}>{card.requester.name}</span>
        </div>

        <div className={styles.colCreated}>
          <span className={styles.createdText}>{card.createdAt}</span>
        </div>

        <div className={styles.colPackage}>
          <span className={styles.packageName}>{card.package.name}</span>
          <span className={styles.packageSubtitle}>{card.package.subtitle}</span>
        </div>

        <div className={styles.colCompensation}>
          <Coin amount={card.compensation} />
        </div>

        <div className={styles.colActions}>
          <button
            className={styles.dismissBtn}
            onClick={(e) => { e.stopPropagation(); onDismiss(card.id); }}
            aria-label="Karte entfernen"
          >
            <CloseIcon />
          </button>

          <button
            className={`${styles.secureBtn} ${styles.secureBtnDesktop} ${isDisabled ? styles.secureBtnDisabled : ''}`}
            onClick={(e) => { e.stopPropagation(); !isDisabled && onSecure(card.id); }}
            disabled={isDisabled}
          >
            <LockIcon />
            Sichern
          </button>
        </div>
      </div>

      <div className={`${styles.expandWrapper} ${isExpanded ? styles.expandWrapperOpen : ''}`}>
        <div className={styles.expandInner}>
          <div className={styles.expandedContent}>
            <div className={styles.questionTitle}>Rechtsfrage</div>
            <p className={styles.questionText}>{card.content}</p>
            <div className={styles.expandedActions}>
              <button
                className={`${styles.secureBtn} ${styles.secureBtnMobile} ${isDisabled ? styles.secureBtnDisabled : ''}`}
                onClick={() => !isDisabled && onSecure(card.id)}
                disabled={isDisabled}
              >
                <LockIcon />
                Sichern
              </button>
              <button
                className={styles.wrongCategoryBtn}
                onClick={() => onWrongCategory(card.id)}
              >
                <CrossSmallIcon />
                Falsches Rechtsgebiet
              </button>
              <button
                className={styles.reportBtn}
                onClick={() => onReport(card.id)}
              >
                <WarningIcon />
                Melden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
