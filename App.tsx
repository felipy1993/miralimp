import React from 'react';
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

const App: React.FC = () => {
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

      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
};

export default App;