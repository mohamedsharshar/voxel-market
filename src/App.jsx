import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Creators from './pages/Creators';

export default function App() {
  const [modal, setModal] = React.useState(null); // 'login' | 'signup' | null

  return (
    <BrowserRouter>
      <Navbar
        onLoginClick={() => setModal('login')}
        onSignupClick={() => setModal('signup')}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/creators" element={<Creators />} />
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
    </BrowserRouter>
  );
}
