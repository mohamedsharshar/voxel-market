import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="page faq-page">
      <div className="page-kicker">
        <HelpCircle size={15} /> FAQ
      </div>
      <h1>Frequently Asked Questions</h1>
      <p className="page-lead">Answers for buyers and creators evaluating licensing, formats, support, and uploads.</p>

      <div className="faq-list">
        {FAQS.map((item, index) => (
          <article className={`faq-item ${open === index ? 'open' : ''}`} key={item.question}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{item.question}</span>
              <ChevronDown size={18} />
            </button>
            {open === index && <p>{item.answer}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
