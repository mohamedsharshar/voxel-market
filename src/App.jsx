import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import GlobalLoader from './components/GlobalLoader';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Creators from './pages/Creators';
import ModelDetail from './pages/ModelDetail';
import CreatorProfile from './pages/CreatorProfile';
import Cart from './pages/Cart';
import About from './pages/About';
import Support from './pages/Support';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';

export default function App() {
  const [modal, setModal] = React.useState(null); // 'login' | 'signup' | null

  return (
    <AppProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar onLoginClick={() => setModal('login')} onSignupClick={() => setModal('signup')} />
        <GlobalLoader />

        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/model/:id" element={<ModelDetail />} />
            <Route path="/creator/:name" element={<CreatorProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />

        {modal && (
          <AuthModal mode={modal} onClose={() => setModal(null)} onSwitch={(m) => setModal(m)} />
        )}

        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}
