import styles from "./QuestionList.module.css";
import QuestionCard from "./QuestionCard";

export default function QuestionList({
  cards,
  olderCards,
  olderSectionLabel,
  tableHeaders,
  onToggle,
  onSecure,
  onDismiss,
  onReport,
  onWrongCategory,
}) {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.tableHeaders}>
        <div className={`${styles.headerColCategory} ${styles.headerText}`}>
          {tableHeaders.category}
        </div>
        <div className={`${styles.headerColRequester} ${styles.headerText}`}>
          {tableHeaders.requester}
        </div>
        <div className={`${styles.headerColCreated} ${styles.headerText}`}>
          {tableHeaders.created}
        </div>
        <div className={`${styles.headerColPackage} ${styles.headerText}`}>
          {tableHeaders.package}
        </div>
        <div className={`${styles.headerColCompensation} ${styles.headerText}`}>
          {tableHeaders.compensation}
        </div>
        <div className={styles.headerColActions} />
      </div>

      <div className={styles.cardsList}>
        {cards.map((card, i) => (
          <QuestionCard
            key={card.id}
            card={card}
            tableHeaders={tableHeaders}
            onToggle={onToggle}
            onSecure={onSecure}
            onDismiss={onDismiss}
            onReport={onReport}
            onWrongCategory={onWrongCategory}
            isExpanded={card.expanded}
            showNeu={true}
            entranceIndex={i}
          />
        ))}
      </div>

      {olderCards && olderCards.length > 0 && (
        <>
          <div className={styles.sectionDivider}>
            <div className={styles.sectionDividerLine} />
            <span className={styles.sectionDividerLabel}>
              {olderSectionLabel}
            </span>
            <div className={styles.sectionDividerLine} />
          </div>

          <div className={styles.cardsList}>
            {olderCards.map((card, i) => (
              <QuestionCard
                key={card.id}
                card={card}
                tableHeaders={tableHeaders}
                onToggle={onToggle}
                onSecure={onSecure}
                onDismiss={onDismiss}
                onReport={onReport}
                onWrongCategory={onWrongCategory}
                isExpanded={card.expanded}
                showNeu={false}
                entranceIndex={cards.length + i}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
