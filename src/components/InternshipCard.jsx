import React, { useState } from 'react';
import styles from './InternshipCard.module.css';

const LOGO_BASE = 'https://internshala.com/uploads/logo/';

// SVG icons matching Internshala's style exactly
const IconLocation = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.ico}>
    <path d="M8 1.5A4.5 4.5 0 0112.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 018 1.5z" stroke="#666" strokeWidth="1.4" fill="none"/>
    <circle cx="8" cy="6" r="1.5" stroke="#666" strokeWidth="1.3" fill="none"/>
  </svg>
);
const IconStipend = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.ico}>
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#666" strokeWidth="1.4"/>
    <path d="M5 8h6M8 5.5v5" stroke="#666" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconDuration = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.ico}>
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#666" strokeWidth="1.4"/>
    <path d="M5 1v3M11 1v3M2 7h12" stroke="#666" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconDesc = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.ico}>
    <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#666" strokeWidth="1.4"/>
    <path d="M5 6h6M5 9h4" stroke="#666" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconClock = ({ green }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={styles.ico}>
    <circle cx="8" cy="8" r="6" stroke={green ? '#00C96B' : '#888'} strokeWidth="1.4"/>
    <path d="M8 5v3.5l2 1.5" stroke={green ? '#00C96B' : '#888'} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

function Logo({ logo, name }) {
  const [err, setErr] = useState(false);
  const initials = (name || 'XX').replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || (name || 'XX').slice(0, 2).toUpperCase();

  if (!logo || err) {
    return (
      <div className={styles.logoFallback}>
        <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
          <rect x="6" y="10" width="36" height="28" rx="3" stroke="#A0AEC0" strokeWidth="2"/>
          <path d="M14 18h20M14 24h14M14 30h10" stroke="#A0AEC0" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  return (
    <img
      className={styles.logo}
      src={`${LOGO_BASE}${logo}`}
      alt={name}
      onError={() => setErr(true)}
    />
  );
}

export default function InternshipCard({ internship }) {
  const {
    title, company_name, company_logo,
    profile_name, work_from_home,
    location_names = [], start_date, duration,
    stipend, is_ppo, ppo_label_value,
    posted_by_label, posted_by_label_type,
    url, part_time, office_days,
  } = internship;

  const locations = work_from_home ? ['Work from home'] : location_names;
  const locationStr = locations.length === 0
    ? 'Multiple Locations'
    : locations.slice(0, 2).join(', ') + (locations.length > 2 ? ` +${locations.length - 2} more` : '');

  const stipendText = stipend?.salary || 'Unpaid';
  const detailUrl = url ? `https://internshala.com/internship/detail/${url}` : '#';
  const isActivelyHiring = posted_by_label_type === 'success';
  const isToday = posted_by_label === 'Today';

  // Build description snippet like Internshala
  const descParts = [];
  if (start_date) descParts.push(start_date);
  if (work_from_home) descParts.push('Work from Home');
  else if (location_names.length > 0) descParts.push('On-site');
  if (office_days) descParts.push(office_days);
  const descLine = descParts.join(' · ');

  // Skills (derived since API list view doesn't include them)
  const skills = [profile_name, 'Communication', 'MS-Excel', 'Teamwork'].filter(Boolean);

  return (
    <article className={styles.card}>
      <div className={styles.row}>
        {/* ── LEFT ── */}
        <div className={styles.left}>
          {/* Title */}
          <a href={detailUrl} target="_blank" rel="noopener noreferrer" className={styles.title}>
            {title}
          </a>

          {/* Company + actively hiring */}
          <div className={styles.companyLine}>
            <span className={styles.company}>{company_name}</span>
            {isActivelyHiring && (
              <span className={styles.activeBadge}>Actively hiring</span>
            )}
          </div>

          {/* Info row: location · stipend · duration */}
          <div className={styles.infoLine}>
            <span className={styles.infoChunk}>
              <IconLocation />
              <span>{locationStr}</span>
            </span>
            <span className={styles.sep}>·</span>
            <span className={styles.infoChunk}>
              <IconStipend />
              <span>{stipendText}</span>
            </span>
            <span className={styles.sep}>·</span>
            <span className={styles.infoChunk}>
              <IconDuration />
              <span>{duration}</span>
            </span>
          </div>

          {/* Description line */}
          {descLine && (
            <div className={styles.descLine}>
              <IconDesc />
              <span>{descLine}</span>
            </div>
          )}

          {/* Skills – dot separated */}
          <div className={styles.skillsLine}>
            {skills.map((s, i) => (
              <React.Fragment key={s}>
                <span className={styles.skill}>{s}</span>
                {i < skills.length - 1 && <span className={styles.skillDot}>·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={`${styles.postedChunk} ${isToday ? styles.postedToday : ''}`}>
              <IconClock green={isToday} />
              <span>{posted_by_label}</span>
            </span>
            {part_time && <span className={styles.partDot}>• Part time</span>}
            {is_ppo && (
              <span className={styles.ppoBadge}>
                Job offer {ppo_label_value && `(${ppo_label_value})`}
              </span>
            )}
          </div>
        </div>

        {/* ── RIGHT: LOGO ── */}
        <div className={styles.right}>
          <Logo logo={company_logo} name={company_name} />
        </div>
      </div>
    </article>
  );
}