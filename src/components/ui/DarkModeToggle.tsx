import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', enabled);
  }, [enabled]);

  return (
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? '🌙' : '☀️'}
    </button>
  );
}
