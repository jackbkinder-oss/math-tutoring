import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Courses from './components/Courses';
import AnimationGallery from './components/AnimationGallery';
import Footer from './components/Footer';
import LenisWrapper from './components/LenisWrapper';
import BookingModal from './components/BookingModal';
import { animations, selectedPair } from './components/MathAnimations';

const selected = [animations[selectedPair[0]], animations[selectedPair[1]]];

function App() {
  const [appReady, setAppReady] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [paymentPreselect, setPaymentPreselect] = useState('card');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Lock scroll until hero text animations finish (7.5s from page load)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setScrollUnlocked(true);
      document.body.style.overflow = '';
    }, 7500);
    return () => { clearTimeout(timer); document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('routeChange', handleRouteChange);

    const handleOpen = (e) => {
      setBookingOpen(true);
      if (e.detail?.payment) setPaymentPreselect(e.detail.payment);
    };
    window.addEventListener('openBooking', handleOpen);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('routeChange', handleRouteChange);
      window.removeEventListener('openBooking', handleOpen);
    };
  }, []);

  const renderPage = () => {
    if (currentPath === '/courses') return <Courses />;
    if (currentPath === '/animations') return <AnimationGallery />;
    if (currentPath === '/tutoring') return (
      <section style={{ padding: '6rem 2rem', minHeight: '60vh' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-brown-dark)', marginBottom: '1rem' }}>How Tutoring Works</h2>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem' }}>Details coming soon.</p>
        </div>
      </section>
    );
    return (
      <>
        <Hero appReady={appReady} selected={selected} />
        <About />
        <Services />
        <Pricing />
      </>
    );
  };

  return (
    <LenisWrapper enabled={scrollUnlocked}>
      <Preloader onComplete={() => setAppReady(true)} selected={selected} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} paymentPreselect={paymentPreselect} />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationBar appReady={appReady} />
        <main style={{ flex: '1' }}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </LenisWrapper>
  );
}

export default App;
