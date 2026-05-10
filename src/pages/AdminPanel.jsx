import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { Users, Box, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, Edit, Trash2, Plus, X, Save } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const { user, models, setModels, creators, setCreators, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modals state
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [currentCreator, setCurrentCreator] = useState(null);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const handleDeleteModel = (id) => {
    if(window.confirm('Are you sure you want to delete this model?')) {
      setModels(models.filter(m => m.id !== id));
      showToast('Model deleted successfully', 'success');
    }
  };

  const handleSaveModel = (e) => {
    e.preventDefault();
    if(currentModel.id) {
      setModels(models.map(m => m.id === currentModel.id ? currentModel : m));
      showToast('Model updated successfully', 'success');
    } else {
      setModels([{ ...currentModel, id: Date.now().toString() }, ...models]);
      showToast('Model added successfully', 'success');
    }
    setIsModelModalOpen(false);
  };

  const handleDeleteCreator = (id) => {
    if(window.confirm('Are you sure you want to delete this creator?')) {
      setCreators(creators.filter(c => c.id !== id));
      showToast('Creator deleted successfully', 'success');
    }
  };

  const handleSaveCreator = (e) => {
    e.preventDefault();
    if(currentCreator.id) {
      setCreators(creators.map(c => c.id === currentCreator.id ? currentCreator : c));
      showToast('Creator updated successfully', 'success');
    } else {
      setCreators([{ ...currentCreator, id: Date.now().toString() }, ...creators]);
      showToast('Creator added successfully', 'success');
    }
    setIsCreatorModalOpen(false);
  };

  const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
    <motion.div 
      style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{value}</h3>
        </div>
        <div style={{ padding: '0.75rem', background: `rgba(${color}, 0.1)`, borderRadius: 'var(--radius-sm)', color: `rgb(${color})` }}>
          <Icon size={24} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '500' }}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
      </div>
    </motion.div>
  );

  return (
    <PageTransition className="page-container" style={{ background: 'var(--bg-primary)', display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Admin Sidebar */}
      <div style={{ flex: '0 0 250px', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>Admin Panel</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: activeTab === 'dashboard' ? 'var(--bg-card-hover)' : 'transparent', color: activeTab === 'dashboard' ? 'var(--cyan)' : 'var(--text-secondary)', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontWeight: activeTab === 'dashboard' ? '600' : '400' }}
          >
            <Activity size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('models')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: activeTab === 'models' ? 'var(--bg-card-hover)' : 'transparent', color: activeTab === 'models' ? 'var(--cyan)' : 'var(--text-secondary)', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontWeight: activeTab === 'models' ? '600' : '400' }}
          >
            <Box size={18} /> Manage Models
          </button>
          <button 
            onClick={() => setActiveTab('creators')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: activeTab === 'creators' ? 'var(--bg-card-hover)' : 'transparent', color: activeTab === 'creators' ? 'var(--cyan)' : 'var(--text-secondary)', borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontWeight: activeTab === 'creators' ? '600' : '400' }}
          >
            <Users size={18} /> Manage Creators
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
        <AnimatePresence mode="wait">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Admin. Here's what's happening today.</p>
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} /> Generate Report
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <StatCard title="Total Revenue" value="$24,592" change="12.5%" isPositive={true} icon={DollarSign} color="0, 240, 255" />
              <StatCard title="Total Creators" value={creators.length.toString()} change="5.2%" isPositive={true} icon={Users} color="168, 85, 247" />
              <StatCard title="Active Models" value={models.length.toString()} change="2.1%" isPositive={true} icon={Box} color="255, 171, 0" />
              <StatCard title="Sales This Week" value="842" change="1.4%" isPositive={false} icon={ShoppingCart} color="16, 185, 129" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', alignItems: 'start' }}>
              <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Revenue Overview</h3>
                  <select style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    <option>This Year</option>
                    <option>Last 6 Months</option>
                  </select>
                </div>
                <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  {[40, 70, 45, 90, 65, 85, 110, 80, 95, 120, 100, 130].map((h, i) => (
                    <div key={i} style={{ width: '100%', background: 'linear-gradient(180deg, var(--cyan) 0%, rgba(0,240,255,0.2) 100%)', height: `${h}px`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'John Doe', action: 'purchased', item: 'Cyberpunk City Pack', time: '2 mins ago', color: '16, 185, 129' },
                    { name: 'Sarah Smith', action: 'uploaded', item: 'Sci-Fi Rifle', time: '1 hour ago', color: '0, 240, 255' },
                    { name: 'Emily Chen', action: 'purchased', item: 'Low Poly Trees', time: '5 hours ago', color: '16, 185, 129' },
                    { name: 'Alex Wong', action: 'updated', item: 'Fantasy Character', time: '1 day ago', color: '255, 171, 0' }
                  ].map((act, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: `rgb(${act.color})`, marginTop: '0.4rem', flexShrink: 0, boxShadow: `0 0 10px rgba(${act.color}, 0.5)` }}></div>
                      <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          <span style={{ fontWeight: '600' }}>{act.name}</span> {act.action} <span style={{ color: 'var(--cyan)' }}>{act.item}</span>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODELS TAB */}
        {activeTab === 'models' && (
          <motion.div 
            key="models"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '2rem' }}>Manage Models</h1>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setCurrentModel({ title: '', price: 0, creator: '', category: 'Characters', formats: ['FBX'] }); setIsModelModalOpen(true); }}>
                <Plus size={18} /> Add Model
              </button>
            </div>
            
            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Model Name</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Creator</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Category</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Price</th>
                    <th style={{ padding: '1rem', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', backgroundImage: `url(${model.images?.[0] || model.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        {model.title}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{model.creator}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{model.category}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>${model.price}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => { setCurrentModel(model); setIsModelModalOpen(true); }} style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--cyan)', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><Edit size={16} /></button>
                          <button onClick={() => handleDeleteModel(model.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* CREATORS TAB */}
        {activeTab === 'creators' && (
          <motion.div 
            key="creators"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '2rem' }}>Manage Creators</h1>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setCurrentCreator({ name: '', handle: '', rating: 5, modelsCount: 0 }); setIsCreatorModalOpen(true); }}>
                <Plus size={18} /> Add Creator
              </button>
            </div>
            
            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Creator</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Handle</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Models</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Rating</th>
                    <th style={{ padding: '1rem', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map((creator) => (
                    <tr key={creator.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={creator.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} alt={creator.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        {creator.name}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{creator.handle}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{creator.modelsCount}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>⭐ {creator.rating}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => { setCurrentCreator(creator); setIsCreatorModalOpen(true); }} style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--cyan)', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><Edit size={16} /></button>
                          <button onClick={() => handleDeleteCreator(creator.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Model Modal */}
      {isModelModalOpen && currentModel && (
        <div className="modal-overlay" onClick={() => setIsModelModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{currentModel.id ? 'Edit Model' : 'Add New Model'}</h2>
              <button onClick={() => setIsModelModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveModel} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="modal-field">
                <label>Title</label>
                <input type="text" value={currentModel.title} onChange={e => setCurrentModel({...currentModel, title: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="modal-field">
                  <label>Price ($)</label>
                  <input type="number" step="0.01" value={currentModel.price} onChange={e => setCurrentModel({...currentModel, price: parseFloat(e.target.value)})} required />
                </div>
                <div className="modal-field">
                  <label>Category</label>
                  <select style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }} value={currentModel.category} onChange={e => setCurrentModel({...currentModel, category: e.target.value})}>
                    <option>Characters</option>
                    <option>Vehicles</option>
                    <option>Weapons</option>
                    <option>Environment</option>
                    <option>Creatures</option>
                  </select>
                </div>
              </div>
              <div className="modal-field">
                <label>Creator Name</label>
                <input type="text" value={currentModel.creator} onChange={e => setCurrentModel({...currentModel, creator: e.target.value})} required />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
                <Save size={18} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}/> Save Model
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Creator Modal */}
      {isCreatorModalOpen && currentCreator && (
        <div className="modal-overlay" onClick={() => setIsCreatorModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{currentCreator.id ? 'Edit Creator' : 'Add New Creator'}</h2>
              <button onClick={() => setIsCreatorModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveCreator} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="modal-field">
                <label>Name</label>
                <input type="text" value={currentCreator.name} onChange={e => setCurrentCreator({...currentCreator, name: e.target.value})} required />
              </div>
              <div className="modal-field">
                <label>Handle (@username)</label>
                <input type="text" value={currentCreator.handle} onChange={e => setCurrentCreator({...currentCreator, handle: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="modal-field">
                  <label>Models Count</label>
                  <input type="number" value={currentCreator.modelsCount} onChange={e => setCurrentCreator({...currentCreator, modelsCount: parseInt(e.target.value)})} required />
                </div>
                <div className="modal-field">
                  <label>Rating (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={currentCreator.rating} onChange={e => setCurrentCreator({...currentCreator, rating: parseFloat(e.target.value)})} required />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
                <Save size={18} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}/> Save Creator
              </button>
            </form>
          </div>
        </div>
      )}

    </PageTransition>
  );
}
