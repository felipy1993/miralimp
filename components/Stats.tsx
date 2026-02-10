import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContentContext';

const AnimatedValue: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [display, setDisplay] = useState('0');
  
  useEffect(() => {
    if (!inView) return;
    
    // Extrair número e sufixo (ex: "500+" -> 500, "+")
    const numMatch = value.match(/^(\d+)/);
    if (!numMatch) {
      setDisplay(value);
      return;
    }
    
    const target = parseInt(numMatch[1]);
    const suffix = value.replace(numMatch[1], '');
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplay(`${current}${suffix}`);
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, inView]);
  
  return <span>{display}</span>;
};

const Stats: React.FC = () => {
  const { content } = useSiteData();
  const stats = content.stats || [];
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (stats.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 bg-brand-navy-900 relative overflow-hidden border-y border-brand-gold/10">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-${stats.length > 4 ? 4 : stats.length} gap-8 md:gap-12 max-w-5xl mx-auto`}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gold-gradient mb-2 font-serif">
                <AnimatedValue value={stat.value} inView={inView} />
              </div>
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
