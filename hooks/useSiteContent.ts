import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

export interface SiteContent {
  // Informações de Contato
  companyName: string;
  companySubtitle: string;
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  region: string;
  instagramLink: string;
  businessHours: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Imagens
  heroImage: string;
  logoImage: string;
  whyChooseUsImage: string;
  whyChooseUsQuote: string;
  beforeAfter1Before: string;
  beforeAfter1After: string;
  beforeAfter1Title: string;
  beforeAfter1Description: string;
  beforeAfter2Before: string;
  beforeAfter2After: string;
  beforeAfter2Title: string;
  beforeAfter2Description: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  companyName: "Miralimp",
  companySubtitle: "Higienização de Estofados",
  whatsappNumber: "5517992265090",
  phoneDisplay: "(17) 99226-5090",
  email: "contato@miralimp.com.br",
  region: "Mirassol e Região",
  instagramLink: "https://www.instagram.com/miralimpestofadoss?igsh=cTh1NXRuMnJjZml3",
  businessHours: "Seg-Sáb: 08:00 - 18:00",
  
  heroTitle: "Excelência em Higienização de Estofados",
  heroSubtitle: "Referência em Mirassol e Região",
  heroDescription: "Transforme seu ambiente com a limpeza profunda da Miralimp. Métodos exclusivos que eliminam ácaros e devolvem a beleza original do seu móvel com segurança total.",
  
  heroImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  logoImage: "/logo.png",
  whyChooseUsImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  whyChooseUsQuote: "Higienizar é um ato de carinho com sua família.",
  beforeAfter1Before: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  beforeAfter1After: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  beforeAfter1Title: "Restauração de Sofá Retrátil",
  beforeAfter1Description: "Remoção total de manchas de uso e recuperação da cor original.",
  beforeAfter2Before: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  beforeAfter2After: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  beforeAfter2Title: "Higienização de Conjunto de Jantar",
  beforeAfter2Description: "Eliminação de ácaros e revitalização profunda do tecido.",
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Tentando conectar ao Firebase...");
    const contentRef = ref(db, 'site_content');
    
    // Timeout de segurança: se em 5 segundos não carregar nada, usa os padrões
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Firebase demorou muito. Usando dados padrão.");
        setLoading(false);
      }
    }, 5000);

    // Escuta mudanças no Firebase
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Dados recebidos do Firebase:", data);
      
      if (data) {
        setContent(data);
      } else {
        console.log("Banco vazio. Inicializando com padrões...");
        set(contentRef, DEFAULT_CONTENT).catch(err => {
          console.error("Erro ao inicializar banco:", err);
        });
      }
      setLoading(false);
      clearTimeout(timeout);
    }, (error) => {
      console.error("Erro na conexão com Firebase:", error);
      setLoading(false); // Destrava o loading mesmo com erro
      clearTimeout(timeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return { content, loading };
};

