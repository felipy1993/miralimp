import { Sofa, Bed, Armchair, Car, Sparkles, ShieldCheck, Droplets, Clock, UserCheck, Phone } from 'lucide-react';
import { ServiceItem, TestimonialItem, ProcessStep, FeatureItem } from './types';

export const COMPANY_NAME = "Miralimp";
export const COMPANY_SUBTITLE = "Higienização de Estofados";
export const WHATSAPP_NUMBER = "5517992265090";
export const WHATSAPP_MESSAGE = "Olá! Gostaria de um orçamento para higienização de estofado.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const REGION = "Mirassol e Região";

export const SERVICES: ServiceItem[] = [
  {
    id: 'sofa',
    title: 'Limpeza de Sofás',
    description: 'Removemos manchas, odores e ácaros, devolvendo a cor e a maciez do seu sofá.',
    icon: Sofa
  },
  {
    id: 'colchao',
    title: 'Higienização de Colchões',
    description: 'Elimine ácaros, bactérias e fungos que prejudicam seu sono e causam alergias.',
    icon: Bed
  },
  {
    id: 'poltrona',
    title: 'Poltronas e Cadeiras',
    description: 'Limpeza detalhada para estofados de jantar, escritório e poltronas decorativas.',
    icon: Armchair
  },
  {
    id: 'automotivo',
    title: 'Bancos Automotivos',
    description: 'Higienização interna completa de bancos, teto e carpetes do seu veículo.',
    icon: Car
  },
  {
    id: 'carpete',
    title: 'Carpetes e Tapetes',
    description: 'Lavagem profunda que remove a sujeira impregnada nas fibras.',
    icon: Sparkles
  },
  {
    id: 'impermeabilizacao',
    title: 'Impermeabilização',
    description: 'Proteção extra contra líquidos e manchas, aumentando a vida útil do estofado.',
    icon: ShieldCheck
  }
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Produtos Certificados",
    description: "Utilizamos produtos biodegradáveis, seguros para pets e crianças.",
    icon: ShieldCheck
  },
  {
    title: "Eliminação de Bactérias",
    description: "Nossa técnica elimina até 99,9% de ácaros, fungos e bactérias dos tecidos.",
    icon: Sparkles
  },
  {
    title: "Secagem Rápida",
    description: "Técnica de extração que permite o uso do estofado em poucas horas após o serviço.",
    icon: Clock
  },
  {
    title: "Equipe Especializada",
    description: "Profissionais uniformizados, treinados e prontos para oferecer o melhor atendimento.",
    icon: UserCheck
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
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
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Contato",
    description: "Chame no WhatsApp (17) 99226-5090 e envie uma foto do seu estofado."
  },
  {
    id: 2,
    title: "Agendamento",
    description: "Combinamos o melhor horário. Atendemos Mirassol e toda a região."
  },
  {
    id: 3,
    title: "Higienização",
    description: "Aplicação de produtos específicos e extração da sujeira profunda."
  },
  {
    id: 4,
    title: "Resultado",
    description: "Seu estofado limpo, higienizado e revitalizado."
  }
];

export const FAQ_ITEMS = [
  {
    question: "Quanto tempo demora o serviço?",
    answer: "O tempo varia de acordo com o tamanho e estado do estofado, mas em média leva de 1h30 a 3 horas."
  },
  {
    question: "Posso usar o sofá logo depois?",
    answer: "A secagem completa leva de 4 a 8 horas, dependendo da ventilação do ambiente e do tecido. Nossa extração remove cerca de 90% da umidade."
  },
  {
    question: "Vocês removem todas as manchas?",
    answer: "Removemos a maioria das manchas de uso comum, gordura e odores. No entanto, manchas de caneta, tintas de cabelo ou tecidos desbotados podem não sair totalmente, mas garantimos a melhor higienização possível."
  },
  {
    question: "Os produtos são seguros?",
    answer: "Sim! Utilizamos produtos profissionais, biodegradáveis e hipoalergênicos, totalmente seguros para crianças e animais de estimação."
  },
  {
    question: "Preciso levar o sofá até vocês?",
    answer: "Não, atendemos inteiramente em domicílio. Levamos todo o equipamento necessário até sua casa ou empresa."
  }
];