import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import GlobalLoader from './components/GlobalLoader';
import Navbar from './components/Navbar';
import SkeletonGrid from './components/SkeletonGrid';
import Toast from './components/Toast';
import { AppProvider } from './context/AppContext';

const About = React.lazy(() => import('./pages/About'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Browse = React.lazy(() => import('./pages/Browse'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Collections = React.lazy(() => import('./pages/Collections'));
const Community = React.lazy(() => import('./pages/Community'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Creators = React.lazy(() => import('./pages/Creators'));
const CreatorProfile = React.lazy(() => import('./pages/CreatorProfile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const Home = React.lazy(() => import('./pages/Home'));
const MarketplaceList = React.lazy(() => import('./pages/MarketplaceList'));
const ModelDetail = React.lazy(() => import('./pages/ModelDetail'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Support = React.lazy(() => import('./pages/Support'));
const TopSellers = React.lazy(() => import('./pages/TopSellers'));

const titles = {
  '/': 'Voxel Market - Premium 3D Model Marketplace',
  '/browse': 'Browse 3D Models - Voxel Market',
  '/trending': 'Trending Models - Voxel Market',
  '/featured': 'Featured Models - Voxel Market',
  '/creators': 'Creators - Voxel Market',
  '/collections': 'Collections - Voxel Market',
  '/wishlist': 'Wishlist - Voxel Market',
  '/cart': 'Cart - Voxel Market',
  '/checkout': 'Checkout - Voxel Market',
  '/dashboard': 'Creator Dashboard - Voxel Market',
  '/profile': 'Profile - Voxel Market',
  '/support': 'Support - Voxel Market',
};

function RouteFallback() {
  return (
    <div className="page route-fallback" role="status" aria-live="polite">
      <SkeletonGrid count={3} />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  React.useEffect(() => {
    document.title = titles[location.pathname] || 'Voxel Market';
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/trending" element={<MarketplaceList type="trending" />} />
          <Route path="/featured" element={<MarketplaceList type="featured" />} />
          <Route path="/wishlist" element={<MarketplaceList type="wishlist" />} />
          <Route path="/recently-viewed" element={<MarketplaceList type="recentlyViewed" />} />
          <Route path="/recommendations" element={<MarketplaceList type="recommendations" />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<Collections />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creator/:name" element={<CreatorProfile />} />
          <Route path="/top-sellers" element={<TopSellers />} />
          <Route path="/model/:id" element={<ModelDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  const [modal, setModal] = React.useState(null);

  return (
    <AppProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar onLoginClick={() => setModal('login')} onSignupClick={() => setModal('signup')} />
        <GlobalLoader />

        <main id="main-content" tabIndex={-1}>
          <AppRoutes />
        </main>

        <Footer />

        {modal && (
          <AuthModal mode={modal} onClose={() => setModal(null)} onSwitch={(mode) => setModal(mode)} />
        )}

        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}
