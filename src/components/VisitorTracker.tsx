'use client';

import { useEffect } from 'react';
import axios from 'axios';

const SESSION_STORAGE_KEY = 'nestelligence-visit-tracked';

export default function VisitorTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyTracked = sessionStorage.getItem(SESSION_STORAGE_KEY);
      
      if (!alreadyTracked) {
        axios.post('/api/analytics/track-visit').catch(err => {
            // Silently fail if analytics isn't set up.
        });
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      }
    }
  }, []);

  return null;
}
