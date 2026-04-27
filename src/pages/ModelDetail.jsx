import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, BadgeCheck, Eye, Download, Share2, ChevronLeft, Star } from 'lucide-react';
import { MODELS } from '../data';
import { useApp } from '../context/AppContext';
import ModelCard from '../components/ModelCard';

export default function ModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, showToast } = useApp();
  
  const model = MODELS.find(m => m.id === parseInt(id));
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(model?.likes || 0);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  if (!model) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Model not found</h2>
        <button className="btn-primary" onClick={() => navigate('/browse')}>
          Browse Models
        </button>
      </div>
    );
  }

  const relatedModels = MODELS.filter(m => 
    m.category === model.category && m.id !== model.id
  ).slice(0, 4);

  const images = [model.image, model.image, model.image]; // Mock multiple images

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    showToast(liked ? 'Removed from favorites' : 'Added to favorites', 'success');
  };

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(model);
      setLoading(false);
    }, 500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'success');
  };

  const inCart = cart.some(item => item.id === model.id);

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="model-detail-layout">
        {/* LEFT: Images */}
        <div className="model-detail-images">
          <div className="model-main-image">
            <img src={images[selectedImage]} alt={model.name} />
            <div className="model-image-actions">
              <button className="image-action-btn" onClick={toggleLike}>
                <Heart size={20} fill={liked ? '#f43f5e' : 'none'} 
                  style={{ color: liked ? '#f43f5e' : 'white' }} />
              </button>
              <button className="image-action-btn" onClick={handleShare}>
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="model-thumbnails">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`model-thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="model-detail-info">
          <div className="model-detail-category">{model.category}</div>
          <h1 className="model-detail-title">{model.name}</h1>
          
          <Link to={`/creator/${model.creator.replace(/\s+/g, '-').toLowerCase()}`} 
            className="model-detail-creator">
            <div className="creator-avatar-small">{model.creator[0]}</div>
            <div>
              <div className="creator-name-small">
                {model.creator}
                {model.verified && <BadgeCheck size={14} />}
              </div>
              <div className="creator-handle-small">@{model.creator.toLowerCase().replace(/\s+/g, '')}</div>
            </div>
          </Link>

          <div className="model-detail-stats">
            <div className="stat-item">
              <Heart size={16} />
              <span>{likes} likes</span>
            </div>
            <div className="stat-item">
              <Eye size={16} />
              <span>{model.views} views</span>
            </div>
            <div className="stat-item">
              <Download size={16} />
              <span>234 downloads</span>
            </div>
          </div>

          <div className="model-detail-price-section">
            <div>
              <div className="price-label">Price</div>
              <div className="model-detail-price">{model.price}</div>
            </div>
            <button 
              className={`btn-add-to-cart ${loading ? 'loading' : ''} ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={loading || inCart}
            >
              {loading ? (
                <span className="spinner" />
              ) : inCart ? (
                <>
                  <ShoppingCart size={18} />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="model-detail-description">
            <h3>Description</h3>
            <p>
              High-quality {model.category.toLowerCase()} asset perfect for game development, 
              animation, and 3D projects. This model features clean topology, optimized geometry, 
              and professional texturing. Ready to use in Unity, Unreal Engine, Blender, and other 
              major 3D software.
            </p>
          </div>

          <div className="model-detail-specs">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Polygons</span>
                <span className="spec-value">12,450</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Vertices</span>
                <span className="spec-value">8,320</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Textures</span>
                <span className="spec-value">4K PBR</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Format</span>
                <span className="spec-value">.FBX, .OBJ</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Rigged</span>
                <span className="spec-value">Yes</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Animated</span>
                <span className="spec-value">No</span>
              </div>
            </div>
          </div>

          <div className="model-detail-tags">
            <span className="tag">3D Model</span>
            <span className="tag">{model.category}</span>
            <span className="tag">Game Ready</span>
            <span className="tag">PBR</span>
            <span className="tag">Low Poly</span>
          </div>
        </div>
      </div>

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <div className="related-section">
          <h2 className="section-title">More from this category</h2>
          <div className="models-grid models-grid-4">
            {relatedModels.map(m => <ModelCard key={m.id} model={m} />)}
          </div>
        </div>
      )}
    </div>
  );
}
