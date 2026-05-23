import { useState, useEffect, useMemo } from 'react';

const API_URL = 'https://internshala.com/hiring/search';

// Duration parsing: convert "3 Months" -> 3
function parseDuration(str = '') {
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Stipend parsing: get numeric value
function parseStipend(stipend) {
  return stipend?.salaryValue1 ?? 0;
}

export function useInternships() {
  const [allInternships, setAllInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    profile: '',
    location: '',
    maxDuration: '',   // max months
    minStipend: '',    // min ₹/month
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = Object.values(json.internships_meta || {});
        setAllInternships(list);
      } catch (err) {
        setError(err.message || 'Failed to fetch internships');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Derived filter options from data
  const filterOptions = useMemo(() => {
    const profiles = [...new Set(allInternships.map(i => i.profile_name).filter(Boolean))].sort();
    const locations = [...new Set(allInternships.flatMap(i => i.location_names || []))].sort();
    return { profiles, locations };
  }, [allInternships]);

  // Filtered list
  const internships = useMemo(() => {
    return allInternships.filter(item => {
      if (filters.profile && item.profile_name !== filters.profile) return false;

      if (filters.location) {
        const locs = item.work_from_home
          ? ['Work From Home']
          : (item.location_names || []);
        if (!locs.includes(filters.location)) return false;
      }

      if (filters.maxDuration) {
        const dur = parseDuration(item.duration);
        if (dur > parseInt(filters.maxDuration, 10)) return false;
      }

      if (filters.minStipend) {
        const stip = parseStipend(item.stipend);
        if (stip < parseInt(filters.minStipend, 10)) return false;
      }

      return true;
    });
  }, [allInternships, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ profile: '', location: '', maxDuration: '', minStipend: '' });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return {
    internships,
    allCount: allInternships.length,
    loading,
    error,
    filters,
    filterOptions,
    updateFilter,
    clearFilters,
    activeFilterCount,
  };
}