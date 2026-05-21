import React from 'react';
import { motion } from 'motion/react';
import { WASTE_DATA, UI_STRINGS } from '../constants';
import { ChevronRight, AlertCircle, Info } from 'lucide-react';
import { Language, WasteInfo } from '../types';

interface DashboardProps {
  onSelectGroup: (groupId: string) => void;
  onOpenManuals: () => void;
  language: Language;
}

const colorMap: Record<string, string> = {
  A: 'bg-waste-a',
  B: 'bg-waste-b',
  C: 'bg-waste-c',
  D: 'bg-waste-d',
  E: 'bg-waste-e',
};

const borderMap: Record<string, string> = {
  A: 'border-waste-a/20',
  B: 'border-waste-b/20',
  C: 'border-waste-c/20',
  D: 'border-waste-d/20',
  E: 'border-waste-e/20',
};

const translations = {
  pt: {
    heroTag: 'RDC Nº 222, de 28 de março de 2018',
    heroTitle: 'Gestão Eficiente de Resíduos de Saúde',
    heroDesc: 'Bem-vindo ao guia digital interativo para classificação, manejo e descarte seguro de RSS. Nosso compromisso é com a biossegurança e a saúde coletiva.',
    heroBtn: 'Começar Leitura',
    heroManual: 'Baixar Manual Completo',
    card1Title: 'Classificação',
    card1Desc: 'Identificação técnica dos Grupos A, B, C, D e E conforme as normas da ANVISA e CONAMA vigentes.',
    card2Title: 'Segregação',
    card2Desc: 'Orientações sobre a separação correta na fonte de geração para evitar contaminação e reduzir custos.',
    card3Title: 'Aferição',
    card3Desc: 'Testes de conhecimento (Quiz) e validação de procedimentos para certificação interna da equipe.',
    groupsSubtitle: 'RDC 222/2018'
  },
  en: {
    heroTag: 'Institutional Protocol 2024',
    heroTitle: 'Efficient Healthcare Waste Management',
    heroDesc: 'Welcome to the interactive digital guide for classification, handling, and safe disposal of healthcare waste. Our commitment is to biosafety and public health.',
    heroBtn: 'Start Reading',
    heroManual: 'Download Full Manual',
    card1Title: 'Classification',
    card1Desc: 'Technical identification of Groups A, B, C, D, and E according to current health and environmental standards.',
    card2Title: 'Segregation',
    card2Desc: 'Guidelines on correct separation at the generation source to avoid contamination and reduce costs.',
    card3Title: 'Assessment',
    card3Desc: 'Knowledge tests (Quiz) and procedures validation for internal team certification.',
    groupsSubtitle: 'Standard Guidelines'
  },
  es: {
    heroTag: 'Protocolo Institucional 2024',
    heroTitle: 'Gestión Eficiente de Residuos de Salud',
    heroDesc: 'Bienvenido a la guía digital interactiva para la clasificación, manejo y eliminación segura de residuos de salud. Nuestro compromiso es con la bioseguridad y la salud colectiva.',
    heroBtn: 'Comenzar Lectura',
    heroManual: 'Descargar Manual Completo',
    card1Title: 'Clasificación',
    card1Desc: 'Identificación técnica de los Grupos A, B, C, D y E según las normas vigentes de salud y medio ambiente.',
    card2Title: 'Segregación',
    card2Desc: 'Orientaciones sobre la separación correcta en la fuente de generación para evitar la contaminación y reducir costos.',
    card3Title: 'Evaluación',
    card3Desc: 'Pruebas de conocimiento (Quiz) y validación de procedimientos para la certificación interna del equipo.',
    groupsSubtitle: 'Normas Estándar'
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectGroup, onOpenManuals, language }) => {
  const strings = UI_STRINGS[language];
  const t = translations[language];

  return (
    <div id="dashboard-view" className="flex flex-col gap-12 pb-20 md:pb-8">
      {/* Hero Section */}
      <section id="hero-section" className="relative group overflow-hidden rounded-[40px] bg-primary text-white p-8 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          >
            {t.heroTag}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
          >
            {t.heroDesc}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => onSelectGroup('A')}
              className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
            >
              {t.heroBtn}
            </button>
            <button
              onClick={onOpenManuals}
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
            >
              {t.heroManual}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Overview Cards */}
      <section id="overview-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card1Title}</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.card1Desc}
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <Info size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card2Title}</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.card2Desc}
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <ChevronRight size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card3Title}</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.card3Desc}
          </p>
        </div>
      </section>

      {/* Waste Groups Preview */}
      <section id="groups-preview">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold">{strings.groups}</h2>
          <span className="text-sm font-bold text-primary uppercase tracking-widest">{t.groupsSubtitle}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(Object.values(WASTE_DATA[language]) as WasteInfo[]).map((group, index) => (
            <motion.button
              key={group.id}
              id={`group-card-${group.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectGroup(group.id)}
              className={`group flex flex-col p-6 rounded-3xl bg-white border ${borderMap[group.id]} hover:shadow-xl transition-all text-left overflow-hidden`}
            >
              <div className={`w-10 h-10 rounded-xl ${colorMap[group.id]} text-white flex items-center justify-center font-bold text-lg shadow-lg mb-4`}>
                {group.id}
              </div>
              <h3 className="font-bold text-sm mb-1 leading-tight line-clamp-1">
                {group.title.split(':')[1]?.trim() || group.title}
              </h3>
              <p className="text-[10px] text-on-surface-variant line-clamp-2">
                {group.description}
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
};
