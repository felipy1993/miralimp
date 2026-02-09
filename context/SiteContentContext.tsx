import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { SiteContent, DEFAULT_CONTENT } from '../hooks/useSiteContent';

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Centralizando conexão com Firebase...");
    const contentRef = ref(db, 'site_content');

    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContent(data);
      } else {
        set(contentRef, DEFAULT_CONTENT);
      }
      setLoading(false);
    }, (error) => {
      console.error("Erro na conexão central:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteData deve ser usado dentro de um SiteContentProvider');
  }
  return context;
};
