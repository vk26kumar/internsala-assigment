import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo - matches real Internshala with paper plane */}
        <a href="/" className={styles.brand}>
          <svg className={styles.logoIcon} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 14L14 4L24 14" stroke="#008BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 4L24 14L14 24" stroke="#008BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            <circle cx="14" cy="14" r="3" fill="#008BFF"/>
          </svg>
          <span className={styles.logoWord1}>INTERN</span><span className={styles.logoWord2}>SHALA</span>
        </a>

        <nav className={styles.nav}>
          <a href="/" className={`${styles.navLink} ${styles.active}`}>
            Internships <svg className={styles.caret} viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </a>
          <a href="/" className={styles.navLink}>
            Courses <span className={styles.offerPill}>OFFER</span>
            <svg className={styles.caret} viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </a>
          <a href="/" className={styles.navLink}>
            Jobs <svg className={styles.caret} viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </a>
          <a href="/" className={styles.navLink}>IS PRO</a>
        </nav>

        <div className={styles.right}>
          <button className={styles.iconBtn} title="Messages">
            <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
              <path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" stroke="#666" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.avatar}>V</div>
          <svg className={styles.caretAvatar} viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>
    </header>
  );
}