import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ eyebrow, title, description, actionLabel, actionTo }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="view-all">
          {actionLabel}
          <ChevronRight size={17} />
        </Link>
      )}
    </div>
  );
}
