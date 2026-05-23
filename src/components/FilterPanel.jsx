import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

const STIPEND_MARKS = [0, 2000, 4000, 6000, 8000, 10000];
const STIPEND_LABELS = ['0', '2K', '4K', '6K', '8K', '10K'];

export default function FilterPanel({ filters, filterOptions, onUpdate, onClear, activeFilterCount }) {
  const [profileInput, setProfileInput] = useState(filters.profile || '');
  const [locationInput, setLocationInput] = useState(
    filters.location === 'Work From Home' ? '' : (filters.location || '')
  );
  const [showMore, setShowMore] = useState(false);
  const [keyword, setKeyword] = useState('');

  const stipendVal = parseInt(filters.minStipend) || 0;
  const sliderPct = (stipendVal / 10000) * 100;

  const isWFH = filters.location === 'Work From Home';

  const applyProfile = (val) => onUpdate('profile', val);
  const applyLocation = (val) => onUpdate('location', val);

  return (
    <aside className={styles.root}>
      {/* ── FILTERS BOX ── */}
      <div className={styles.box}>
        {/* Header */}
        <div className={styles.boxHeader}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="#008BFF" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span className={styles.boxTitle}>Filters</span>
        </div>

        {/* As per my preferences */}
        <label className={styles.prefRow}>
          <input type="checkbox" className={styles.cb} />
          <span className={styles.prefText}>As per my <a href="/" className={styles.link}>preferences</a></span>
        </label>

        {/* Profile */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Profile</div>
          <input
            className={styles.textInput}
            type="text"
            placeholder="e.g. Marketing"
            value={profileInput}
            onChange={e => setProfileInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyProfile(profileInput)}
            onBlur={() => applyProfile(profileInput)}
          />
        </div>

        {/* Location */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Location</div>
          <input
            className={styles.textInput}
            type="text"
            placeholder="e.g. Delhi"
            value={locationInput}
            disabled={isWFH}
            onChange={e => setLocationInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyLocation(locationInput)}
            onBlur={() => !isWFH && applyLocation(locationInput)}
          />
        </div>

        {/* Checkboxes */}
        <div className={styles.cbGroup}>
          <label className={styles.cbRow}>
            <input type="checkbox" className={styles.cb} />
            <span>Internships in my city</span>
          </label>
          <label className={styles.cbRow}>
            <input
              type="checkbox" className={styles.cb}
              checked={isWFH}
              onChange={e => {
                if (e.target.checked) {
                  onUpdate('location', 'Work From Home');
                  setLocationInput('');
                } else {
                  onUpdate('location', '');
                }
              }}
            />
            <span>Work from home</span>
          </label>
          <label className={styles.cbRow}>
            <input type="checkbox" className={styles.cb} />
            <span>Part-time</span>
          </label>
        </div>

        {/* Stipend slider */}
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Desired minimum monthly stipend (₹)</div>
          <div className={styles.sliderTrackWrap}>
            <input
              type="range"
              className={styles.slider}
              min="0" max="10000" step="2000"
              value={stipendVal}
              onChange={e => onUpdate('minStipend', e.target.value === '0' ? '' : e.target.value)}
              style={{ '--pct': `${sliderPct}%` }}
            />
          </div>
          <div className={styles.sliderLabels}>
            {STIPEND_LABELS.map(l => <span key={l}>{l}</span>)}
          </div>
        </div>

        {/* View more filters toggle */}
        {showMore && (
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Max. duration (months)</div>
            <div className={styles.durRow}>
              {['1','2','3','4','6','12'].map(d => (
                <button
                  key={d}
                  className={`${styles.durBtn} ${filters.maxDuration === d ? styles.durActive : ''}`}
                  onClick={() => onUpdate('maxDuration', filters.maxDuration === d ? '' : d)}
                >{d}</button>
              ))}
            </div>
          </div>
        )}

        <button className={styles.viewMore} onClick={() => setShowMore(s => !s)}>
          {showMore ? 'View fewer filters' : 'View more filters'}
          <svg width="10" height="6" viewBox="0 0 10 6" style={{ transform: showMore ? 'rotate(180deg)' : 'none' }}>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {activeFilterCount > 0 && (
          <div className={styles.clearWrap}>
            <button className={styles.clearAll} onClick={onClear}>Clear all</button>
          </div>
        )}
      </div>

      {/* ── KEYWORD SEARCH BOX ── */}
      <div className={styles.box} style={{ marginTop: 14 }}>
        <div className={styles.kwTitle}>Keyword Search</div>
        <div className={styles.kwBar}>
          <input
            className={styles.kwInput}
            type="text"
            placeholder="e.g. Design, Mumbai, Infosys"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <button className={styles.kwBtn}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="white" strokeWidth="2"/>
              <path d="M13 13l4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}