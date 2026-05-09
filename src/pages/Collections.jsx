import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Boxes, ChevronLeft } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { COLLECTIONS } from '../data';
import { useApp } from '../context/AppContext';

export default function Collections() {
  const { id } = useParams();
  const { models } = useApp();
  const collection = id ? COLLECTIONS.find((item) => item.id === id) : null;

  if (id && !collection) {
    return (
      <div className="page">
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
      </div>
    );
  }

  if (collection) {
    const collectionModels = models.filter((model) => collection.modelIds.includes(model.id));
    return (
      <div className="page">
        <Link className="back-button" to="/collections">
          <ChevronLeft size={18} /> Collections
        </Link>
        <section className="collection-hero">
          <img src={collection.image} alt="" />
          <div>
            <div className="page-kicker">
              <Boxes size={15} /> Curated collection
            </div>
            <h1>{collection.name}</h1>
            <p>{collection.description}</p>
          </div>
        </section>
        <div className="models-grid">
          {collectionModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-kicker">
        <Boxes size={15} /> Collections
      </div>
      <SectionHeader
        title="Curated Production Packs"
        description="Ready-made asset groups organized for common gameplay, environment, and prototype needs."
      />
      <div className="collections-grid large">
        {COLLECTIONS.map((item) => (
          <Link className="collection-card" key={item.id} to={`/collections/${item.id}`}>
            <img src={item.image} alt="" />
            <span className="collection-card-shade" />
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <small>{item.modelIds.length} models</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
