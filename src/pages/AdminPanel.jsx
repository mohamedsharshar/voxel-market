import React from 'react';
import { useApp } from '../context/AppContext';
import { MODELS, CREATORS } from '../data';
import { Navigate } from 'react-router-dom';
import { Users, Box, DollarSign, Activity, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';

export default function AdminPanel() {
  const { user } = useApp();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
    <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
    </div>
  );

  return (
    <div className="page-container" style={{ background: 'var(--bg-primary)' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} /> Generate Report
        </button>
      </div>

      <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <StatCard title="Total Revenue" value="$24,592.00" change="12.5%" isPositive={true} icon={DollarSign} color="0, 240, 255" />
          <StatCard title="Total Users" value="10,245" change="5.2%" isPositive={true} icon={Users} color="168, 85, 247" />
          <StatCard title="Active Models" value={MODELS.length.toString()} change="2.1%" isPositive={true} icon={Box} color="255, 171, 0" />
          <StatCard title="Sales This Week" value="842" change="1.4%" isPositive={false} icon={ShoppingCart} color="16, 185, 129" />
        </div>

        {/* Charts and Activity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Main Chart Placeholder */}
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Revenue Overview</h3>
              <select style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <option>This Year</option>
                <option>Last 6 Months</option>
                <option>This Month</option>
              </select>
            </div>
            {/* Fake Chart bars */}
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

          {/* Recent Activity */}
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'John Doe', action: 'purchased', item: 'Cyberpunk City Pack', time: '2 mins ago', color: '16, 185, 129' },
                { name: 'Sarah Smith', action: 'uploaded', item: 'Sci-Fi Rifle', time: '1 hour ago', color: '0, 240, 255' },
                { name: 'Mike Ross', action: 'registered', item: 'a new account', time: '3 hours ago', color: '168, 85, 247' },
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
            <button style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', marginTop: '1.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              View All Activity
            </button>
          </div>
          
        </div>

        {/* Top Creators Table */}
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Top Creators</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><MoreVertical size={20} /></button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Creator</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Models</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Rating</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>Total Sales</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: '500', textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {CREATORS.slice(0, 5).map((creator, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={creator.avatar} alt={creator.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{creator.name}</span>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{creator.modelsCount}</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>⭐ {creator.rating}</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{Math.floor(Math.random() * 500) + 100}</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontWeight: '500', color: 'var(--text-primary)' }}>${(Math.random() * 5000 + 1000).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
