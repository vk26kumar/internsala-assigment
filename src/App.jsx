import React, { useState } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import InternshipCard from './components/InternshipCard';
import { useInternships } from './hooks/useInternships';
import styles from './App.module.css';

function SkeletonCard() {
  return (
    <div className={styles.skCard}>
      <div className={styles.skLeft}>
        <div className={styles.skLine} style={{ width: '50%', height: 15 }} />
        <div className={styles.skLine} style={{ width: '32%', height: 13, marginTop: 7 }} />
        <div className={styles.skLine} style={{ width: '80%', height: 12, marginTop: 10 }} />
        <div className={styles.skLine} style={{ width: '65%', height: 12, marginTop: 7 }} />
        <div className={styles.skLine} style={{ width: '45%', height: 11, marginTop: 10 }} />
      </div>
      <div className={styles.skLogo} />
    </div>
  );
}

export default function App() {
  const { internships, allCount, loading, error, filters, filterOptions, updateFilter, clearFilters, activeFilterCount } = useInternships();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.pageWrap}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href="/" className={styles.breadLink}>Home</a>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCur}>Internships</span>
        </nav>

        {/* Centered count heading */}
        <div className={styles.headingBlock}>
          <h1 className={styles.headingMain}>
            {loading ? '—' : `${allCount} Total Internships`}
          </h1>
          <p className={styles.headingSub}>Latest Summer Internships in India</p>
        </div>

        {/* Mobile filter button */}
        <button className={styles.mobileBtn} onClick={() => setMobileOpen(o => !o)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="#008BFF" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Filters {activeFilterCount > 0 && <span className={styles.mobileBadge}>{activeFilterCount}</span>}
        </button>

        {/* 2-col layout */}
        <div className={styles.body}>

          {/* Sidebar */}
          <div className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}
            onClick={e => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onUpdate={updateFilter}
              onClear={clearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Results */}
          <div className={styles.results}>
            {/* Results bar */}
            {!loading && !error && (
              <div className={styles.resultsBar}>
                <span className={styles.resultsCount}>
                  {internships.length} internship{internships.length !== 1 ? 's' : ''} found
                </span>
                <a href="/" className={styles.saveAlert}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{display:'inline',marginRight:4,verticalAlign:'middle'}}>
                    <path d="M8 1l1.8 4H14l-3.4 2.5 1.3 4L8 9.2 4.1 11.5l1.3-4L2 5h4.2z" stroke="#FF9900" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
                  </svg>
                  Save this search as alert
                </a>
              </div>
            )}

            {error && (
              <div className={styles.errBox}>
                <b>⚠️ Failed to load internships.</b> {error}
              </div>
            )}

            {/* Internship list */}
            <div className={styles.list}>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
                : internships.length === 0
                  ? (
                    <div className={styles.empty}>
                      <div className={styles.emptyIcon}>🔍</div>
                      <h3>No internships match your filters</h3>
                      <p>Try adjusting or clearing your filters.</p>
                      <button className={styles.emptyBtn} onClick={clearFilters}>Clear all filters</button>
                    </div>
                  )
                  : internships.map(item => <InternshipCard key={item.id} internship={item} />)
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}