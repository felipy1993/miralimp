import { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';

export interface BeforeAfterProject {
  id: string;
  before: string;
  after: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  text: string;
  rating: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface SiteContent {
  // Informações de Contato
  companyName: string;
  companySubtitle: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phoneDisplay: string;
  email: string;
  region: string;
  instagramLink: string;
  businessHours: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Imagens (salvas como URLs)
  heroImage: string;
  logoImage: string;
  whyChooseUsImage: string;
  whyChooseUsQuote: string;

  // Lista Dinâmica de Projetos
  projects: BeforeAfterProject[];

  // Depoimentos Dinâmicos
  testimonials: Testimonial[];

  // Estatísticas / Números
  stats: StatItem[];

  // Antigos campos (manter temporariamente para evitar erros de tipagem durante a migração)
  beforeAfter1Before?: string;
  beforeAfter1After?: string;
  beforeAfter1Title?: string;
  beforeAfter1Description?: string;
  beforeAfter2Before?: string;
  beforeAfter2After?: string;
  beforeAfter2Title?: string;
  beforeAfter2Description?: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  companyName: "Miralimp",
  companySubtitle: "Higienização de Estofados",
  whatsappNumber: "5517992265090",
  whatsappMessage: "Olá! Gostaria de um orçamento para higienização de estofado.",
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
  
  projects: [
    {
      id: '1',
      before: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Restauração de Sofá Retrátil",
      description: "Remoção total de manchas de uso e recuperação da cor original."
    },
    {
      id: '2',
      before: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Higienização de Conjunto de Jantar",
      description: "Eliminação de ácaros e revitalização profunda do tecido."
    }
  ],

  testimonials: [
    {
      id: '1',
      name: 'Ana Paula Silva',
      service: 'Limpeza de Sofá',
      text: 'A Miralimp salvou meu sofá! Estava pensando em trocar, mas a limpeza deixou novo de novo. Recomendo demais!',
      rating: 5
    },
    {
      id: '2',
      name: 'Carlos Eduardo',
      service: 'Bancos de Carro',
      text: 'Serviço impecável. Atenderam em casa, super pontuais e o carro ficou com cheiro de novo.',
      rating: 5
    },
    {
      id: '3',
      name: 'Juliana Martins',
      service: 'Colchão King',
      text: 'Melhor investimento para a saúde. A quantidade de sujeira que saiu do colchão foi assustadora. Parabéns pelo trabalho!',
      rating: 5
    }
  ],

  stats: [
    { id: '1', value: '500+', label: 'Estofados Higienizados' },
    { id: '2', value: '300+', label: 'Clientes Satisfeitos' },
    { id: '3', value: '5', label: 'Anos de Experiência' },
    { id: '4', value: '100%', label: 'Satisfação Garantida' }
  ]
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
        setLoading(false); // Garante que o loading saia assim que tiver dados
      } else {
        console.log("Banco vazio. Inicializando com padrões...");
        set(contentRef, DEFAULT_CONTENT).catch(err => {
          console.error("Erro ao inicializar banco:", err);
        });
      }
      clearTimeout(timeout);
    }, (error) => {
      console.error("Erro na conexão com Firebase:", error);
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return { content, loading };
};

