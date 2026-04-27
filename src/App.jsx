import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Creators from './pages/Creators';
import ModelDetail from './pages/ModelDetail';
import CreatorProfile from './pages/CreatorProfile';
import Cart from './pages/Cart';

export default function App() {
  const [modal, setModal] = React.useState(null); // 'login' | 'signup' | null

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar
          onLoginClick={() => setModal('login')}
          onSignupClick={() => setModal('signup')}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/model/:id" element={<ModelDetail />} />
          <Route path="/creator/:name" element={<CreatorProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />

        {modal && (
          <AuthModal
            mode={modal}
            onClose={() => setModal(null)}
            onSwitch={(m) => setModal(m)}
          />
        )}

        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}
