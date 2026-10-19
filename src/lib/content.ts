import { useEffect, useState } from 'react';

export function useSiteContent<T>(type: 'clients' | 'gallery' | 'testimonials', fallback: T[]): T[] {
  const [items, setItems] = useState(fallback);
  useEffect(() => {
    let alive = true;
    fetch(`/api/content/${type}`).then(async (response) => {
      if (!response.ok) return;
      const result = await response.json();
      if (alive && result.success && Array.isArray(result.data)) setItems(result.data);
    }).catch(() => undefined);
    return () => { alive = false; };
  }, [type]);
  return items;
}
