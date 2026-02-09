import { useState, useEffect, type FC } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import { useSiteContent } from './hooks/useSiteContent';

const App: FC = () => {
  const { content, loading } = useSiteContent();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <div id="diferenciais">
          <WhyChooseUs />
        </div>
        <BeforeAfter />
        <div id="depoimentos">
          <Testimonials />
        </div>
        <div id="processo">
          <Process />
        </div>
        <FAQ />
        <FinalCTA />
      </main>

      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      <FloatingWhatsApp />
      <ScrollToTop />

      <AdminPanel isOpen={isAdminOpen} onClose={() => {
        setIsAdminOpen(false);
        window.location.hash = '';
      }} />
    </div>
  );
};

export default App;