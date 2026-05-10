import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <PageTransition className="page faq-page">
      <div className="page-kicker">
        <HelpCircle size={15} /> FAQ
      </div>
      <h1>Frequently Asked Questions</h1>
      <p className="page-lead">Answers for buyers and creators evaluating licensing, formats, support, and uploads.</p>

      <motion.div 
        className="faq-list"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
      >
        {FAQS.map((item, index) => (
          <motion.article 
            className={`faq-item ${open === index ? 'open' : ''}`} 
            key={item.question}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{item.question}</span>
              <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </motion.div>
    </PageTransition>
  );
}
