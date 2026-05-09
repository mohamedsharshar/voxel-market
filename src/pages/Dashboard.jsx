import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Box,
  DollarSign,
  Eye,
  Layers3,
  PackageCheck,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import UploadDropzone from '../components/UploadDropzone';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { models, user } = useApp();
  const ownedModels = models.slice(0, 5);

  return (
    <div className="page dashboard-page">
      <div className="dashboard-header">
        <div>
          <div className="page-kicker">
            <Sparkles size={15} /> Creator dashboard
          </div>
          <h1>{user ? `Welcome back, ${user.name}` : 'Creator Dashboard'}</h1>
          <p>Manage uploads, inspect performance, review feedback, and track sales from one workspace.</p>
        </div>
        <Link className="btn-primary" to="/support">
          Upload Guidelines
        </Link>
      </div>

      <section className="dashboard-metrics">
        <div className="metric-card">
          <DollarSign size={20} />
          <strong>$24,592</strong>
          <span>Revenue</span>
          <small>
            <ArrowUpRight size={13} /> 12.5%
          </small>
        </div>
        <div className="metric-card">
          <Box size={20} />
          <strong>{ownedModels.length}</strong>
          <span>Active listings</span>
          <small>
            <ArrowUpRight size={13} /> 3 new
          </small>
        </div>
        <div className="metric-card">
          <Eye size={20} />
          <strong>148k</strong>
          <span>Views</span>
          <small>
            <ArrowUpRight size={13} /> 8.4%
          </small>
        </div>
        <div className="metric-card">
          <PackageCheck size={20} />
          <strong>96%</strong>
          <span>Asset health</span>
          <small>
            <Activity size={13} /> stable
          </small>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Upload Management</h2>
            <UploadCloud size={18} />
          </div>
          <UploadDropzone />
          <div className="upload-checklist">
            <span>
              <Layers3 size={15} /> Required: preview renders
            </span>
            <span>
              <Box size={15} /> Recommended: GLB and FBX
            </span>
            <span>
              <PackageCheck size={15} /> Review target: 24 hours
            </span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Revenue Overview</h2>
            <BarChart3 size={18} />
          </div>
          <div className="bar-chart" aria-label="Monthly revenue chart">
            {[38, 54, 42, 74, 61, 88, 96, 72, 105, 118, 94, 132].map((height, index) => (
              <span key={index} style={{ '--bar-height': `${height}px` }} />
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <h2>Listing Health</h2>
          <Activity size={18} />
        </div>
        <div className="asset-table" role="table" aria-label="Asset health table">
          <div className="asset-table-row header" role="row">
            <span>Asset</span>
            <span>Status</span>
            <span>Views</span>
            <span>Conversion</span>
          </div>
          {ownedModels.map((model) => (
            <div className="asset-table-row" role="row" key={model.id}>
              <span>
                <img src={model.image} alt="" />
                {model.name}
              </span>
              <span className="quality-pill">Healthy</span>
              <span>{model.views}</span>
              <span>{(model.rating * 1.7).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
