import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  ChevronLeft,
  Download,
  Eye,
  Heart,
  Layers3,
  MessageCircle,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tag,
  Zap,
} from 'lucide-react';
import EmptyState from '../components/EmptyState';
import ModelCard from '../components/ModelCard';
import SectionHeader from '../components/SectionHeader';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const tabs = ['Overview', 'Technical', 'License', 'Reviews'];
const Model3DViewer = React.lazy(() => import('../components/Model3DViewer'));

export default function ModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, markViewed, models, toggleWishlist, upsertModel, wishlist } = useApp();
  const [activeTab, setActiveTab] = React.useState('Overview');
  const model = models.find((item) => String(item.id) === String(id));
  const [detailModel, setDetailModel] = React.useState(model);
  const [loadingDetail, setLoadingDetail] = React.useState(false);

  React.useEffect(() => {
    setDetailModel(model);
  }, [model]);

  React.useEffect(() => {
    if (!detailModel) return;

    // External cards may not include modelUrl until we fetch the provider's detail endpoint.
    if (detailModel.source === 'local') return;
    if (detailModel.modelUrl) return;

    let cancelled = false;
    async function loadExternalDetail() {
      try {
        setLoadingDetail(true);
        const base = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');
        const resp = await fetch(`${base}/api/models/${encodeURIComponent(detailModel.id)}?format=card`, {
          headers: { Accept: 'application/json' },
        });
        if (!resp.ok) return;
        const payload = await resp.json();
        if (cancelled) return;
        if (payload && payload.id) {
          setDetailModel(payload);
          upsertModel(payload);
        }
      } catch {
        // Ignore; keep the card info.
      } finally {
        if (!cancelled) setLoadingDetail(false);
      }
    }

    loadExternalDetail();
    return () => {
      cancelled = true;
    };
  }, [detailModel, upsertModel]);

  React.useEffect(() => {
    if (detailModel) markViewed(detailModel);
  }, [markViewed, detailModel]);

  if (!detailModel) {
    return (
      <div className="page">
        <EmptyState
          title="Model not found"
          message="The listing may have moved or is no longer available."
          action={
            <button className="btn-primary" type="button" onClick={() => navigate('/browse')}>
              Browse Models
            </button>
          }
        />
      </div>
    );
  }

  const inCart = cart.some((item) => item.id === detailModel.id);
  const saved = wishlist.some((item) => item.id === detailModel.id);
  const relatedModels = models
    .filter((item) => item.category === detailModel.category && item.id !== detailModel.id)
    .slice(0, 4);

  return (
    <PageTransition className="page detail-page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="detail-shell">
        <motion.section 
          className="detail-viewer-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="model-3d-viewer-wrapper">
            {detailModel.modelUrl ? (
              <React.Suspense
                fallback={
                  <div className="viewer-loading-overlay" role="status">
                    <div className="viewer-loading-inner">
                      <div className="viewer-spinner" aria-hidden />
                      <div className="viewer-loading-text">Preparing 3D viewer</div>
                    </div>
                  </div>
                }
              >
                <Model3DViewer modelUrl={detailModel.modelUrl} model={detailModel} />
              </React.Suspense>
            ) : (
              <div className="viewer-loading-overlay" role="status" aria-live="polite">
                <div className="viewer-loading-inner">
                  <div className="viewer-spinner" aria-hidden />
                  <div className="viewer-loading-text">
                    {loadingDetail ? 'Fetching external model files…' : '3D preview unavailable for this listing.'}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="detail-thumbnail-row" aria-label="Preview images">
            {[detailModel.image, ...relatedModels.slice(0, 3).map((item) => item.image)].map((image, index) => (
              <button key={image} className={index === 0 ? 'active' : ''} type="button" aria-label={`Preview ${index + 1}`}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </motion.section>

        <motion.aside 
          className="detail-purchase-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="detail-category-row">
            <span className="eyebrow">{detailModel.category}</span>
            {detailModel.staffPick && <span className="quality-pill">Staff pick</span>}
          </div>

          <h1 className="model-detail-title">{detailModel.name}</h1>
          <p className="model-detail-summary">{detailModel.description}</p>

          <Link
            to={`/creator/${detailModel.creator.replace(/\s+/g, '-').toLowerCase()}`}
            className="model-detail-creator"
          >
            <span className="creator-avatar-small">{detailModel.creator[0]}</span>
            <span>
              <strong>
                {detailModel.creator}
                {detailModel.verified && <BadgeCheck size={15} />}
              </strong>
              <small>Verified creator support</small>
            </span>
          </Link>

          <div className="model-detail-stats">
            <span>
              <Star size={16} fill="currentColor" /> {detailModel.rating ?? '—'} ({detailModel.reviews ?? 0})
            </span>
            <span>
              <Eye size={16} /> {detailModel.views}
            </span>
            <span>
              <Download size={16} /> {(detailModel.downloads ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="model-detail-price-section">
            <div>
              <span className="price-label">One-time license</span>
              <strong className="model-detail-price">{detailModel.price}</strong>
            </div>
            <div className="delivery-note">
              <ShieldCheck size={15} />
              Commercial use
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-add-to-cart" type="button" onClick={() => addToCart(detailModel)} disabled={inCart}>
              <ShoppingCart size={18} />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button className={`btn-secondary ${saved ? 'is-saved' : ''}`} type="button" onClick={() => toggleWishlist(detailModel)}>
              <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="detail-assurance">
            <span>
              <Download size={15} /> Instant download
            </span>
            <span>
              <MessageCircle size={15} /> Creator support
            </span>
            <span>
              <ShieldCheck size={15} /> Refund review
            </span>
          </div>
        </motion.aside>
      </div>

      <motion.section 
        className="detail-tabs-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tabs" role="tablist" aria-label="Model details">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              type="button"
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-panel">
          {activeTab === 'Overview' && (
            <div className="detail-copy-grid">
              <div>
                <h2>Built for production inspection</h2>
                <p>
                  Preview the model in the browser, test material response, switch wireframe mode,
                  and review the technical metadata before adding it to your project pipeline.
                </p>
              </div>
              <div className="feature-list">
                <span>
                  <Zap size={16} /> Game-ready pivots and naming
                </span>
                <span>
                  <Layers3 size={16} /> PBR material workflow
                </span>
                <span>
                  <Tag size={16} /> {detailModel.license}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'Technical' && (
            <div className="specs-grid enhanced">
              <div className="spec-item">
                <span className="spec-label">Polygons</span>
                <span className="spec-value">{detailModel.polygons.toLocaleString()}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Vertices</span>
                <span className="spec-value">{detailModel.vertices.toLocaleString()}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Textures</span>
                <span className="spec-value">{detailModel.textures ?? '—'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Formats</span>
                <span className="spec-value">{detailModel.formats ?? '—'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Rigged</span>
                <span className="spec-value">{detailModel.rigged ? 'Yes' : 'No'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Animated</span>
                <span className="spec-value">{detailModel.animated ? 'Yes' : 'No'}</span>
              </div>
            </div>
          )}

          {activeTab === 'License' && (
            <div className="detail-copy-grid">
              <div>
                <h2>{model.license}</h2>
                <p>
                  Use this asset in commercial games, realtime apps, cinematics, and internal
                  prototypes. Redistribution of the raw source files as standalone assets is not allowed.
                </p>
              </div>
              <div className="feature-list">
                <span>
                  <ShieldCheck size={16} /> Commercial projects
                </span>
                <span>
                  <ShieldCheck size={16} /> Unlimited prototypes
                </span>
                <span>
                  <ShieldCheck size={16} /> Team handoff allowed
                </span>
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="reviews-grid">
              {['Clean import in Unity', 'Great topology and naming', 'Creator responded quickly'].map((review, index) => (
                <article className="review-card" key={review}>
                  <div>
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                  </div>
                  <strong>{review}</strong>
                  <p>
                    {index === 0
                      ? 'The GLB opened cleanly and materials were already organized.'
                      : 'Exactly the kind of predictable asset handoff our team needed.'}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {relatedModels.length > 0 && (
        <motion.section 
          className="related-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Related"
            title="More From This Category"
            description="Continue browsing comparable assets without returning to search."
          />
          <div className="models-grid models-grid-4">
            {relatedModels.map((item) => (
              <ModelCard key={item.id} model={item} />
            ))}
          </div>
        </motion.section>
      )}
    </PageTransition>
  );
}
