import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No results found',
  message = 'Try adjusting your filters or search terms.',
  action,
}) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden>
        <Icon size={34} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}
