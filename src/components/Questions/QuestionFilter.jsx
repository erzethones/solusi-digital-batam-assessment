import styles from './QuestionFilter.module.css';
import { ListIcon, SparkleIcon, EuroTripleIcon, SortIcon, FilterIcon, MegaphoneIcon } from '../UI/Icons';

const iconMap = {
  list: ListIcon,
  sparkle: SparkleIcon,
  megaphone: MegaphoneIcon,
  euroTriple: EuroTripleIcon,
};

function TabIcon({ name, euroLevel }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  if (name === 'euroTriple') return <EuroTripleIcon level={euroLevel} />;
  return <Icon />;
}

export default function QuestionFilter({
  filters,
  activeFilterId,
  onFilterChange,
  onSort,
  onFilter,
  pageTitle,
  sortLabel,
  filterLabel,
}) {
  return (
    <div className={styles.filterBar}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>

      <div className={styles.tabs}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.tab} ${activeFilterId === filter.id ? styles.tabActive : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            <TabIcon name={filter.icon} euroLevel={filter.euroLevel} />
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={onSort}>
          <SortIcon />
          {sortLabel}
        </button>
        <button className={styles.actionBtn} onClick={onFilter}>
          <FilterIcon />
          {filterLabel}
        </button>
      </div>
    </div>
  );
}
