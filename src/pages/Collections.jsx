import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Boxes, ChevronLeft } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { COLLECTIONS } from '../data';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Collections() {
  const { id } = useParams();
  const { models } = useApp();
  const collection = id ? COLLECTIONS.find((item) => item.id === id) : null;

  if (id && !collection) {
    return (
      <PageTransition className="page">
        <EmptyState
          icon={Boxes}
          title="Collection not found"
          message="Browse all collections to find curated packs for your workflow."
          action={
            <Link className="btn-primary" to="/collections">
              All Collections
            </Link>
          }
        />
      </PageTransition>
    );
  }

  if (collection) {
    const collectionModels = models.filter((model) => collection.modelIds.includes(model.id));
    return (
      <PageTransition className="page">
        <Link className="back-button" to="/collections">
          <ChevronLeft size={18} /> Collections
        </Link>
        <motion.section 
          className="collection-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={collection.image} alt="" />
          <div>
            <div className="page-kicker">
              <Boxes size={15} /> Curated collection
            </div>
            <h1>{collection.name}</h1>
            <p>{collection.description}</p>
          </div>
        </motion.section>
        <motion.div 
          className="models-grid"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
        >
          {collectionModels.map((model) => (
            <motion.div key={model.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <ModelCard model={model} />
            </motion.div>
          ))}
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="page">
      <div className="page-kicker">
        <Boxes size={15} /> Collections
      </div>
      <SectionHeader
        title="Curated Production Packs"
        description="Ready-made asset groups organized for common gameplay, environment, and prototype needs."
      />
      <motion.div 
        className="collections-grid large"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {COLLECTIONS.map((item) => (
          <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Link className="collection-card" to={`/collections/${item.id}`}>
              <img src={item.image} alt="" />
              <span className="collection-card-shade" />
              <div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <small>{item.modelIds.length} models</small>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
}
