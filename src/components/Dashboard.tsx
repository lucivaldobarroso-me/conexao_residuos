import React from 'react';
import { motion } from 'motion/react';
import { WASTE_DATA, UI_STRINGS } from '../constants';
import { ArrowRight, ChevronRight, AlertCircle, Info, GraduationCap, Trophy, Timer } from 'lucide-react';
import { Language, WasteInfo } from '../types';

interface DashboardProps {
  onSelectGroup: (groupId: string) => void;
  onOpenManuals: () => void;
  onOpenQuiz: () => void;
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
    card1Desc: 'Identificação técnica dos Grupos A, B, C, D e E conforme a RDC 222/2018 da ANVISA e o PGRSS da unidade.',
    card2Title: 'Segregação',
    card2Desc: 'Orientações sobre a separação correta na fonte de geração para evitar contaminação e reduzir custos.',
    card3Title: 'Aferição',
    card3Desc: 'Testes de conhecimento (Quiz) e validação de procedimentos para certificação interna da equipe.',
    groupsSubtitle: 'RDC 222/2018'
  },
  en: {
    heroTag: 'RDC No. 222, March 28, 2018',
    heroTitle: 'Efficient Healthcare Waste Management',
    heroDesc: 'Interactive guide for classifying, handling, and safely disposing of healthcare waste. The focus is biosafety, regulatory compliance, and protection for healthcare teams.',
    heroBtn: 'Start Reading',
    heroManual: 'Open Full Manual',
    card1Title: 'Classification',
    card1Desc: 'Technical identification of Groups A, B, C, D, and E according to ANVISA RDC 222/2018 and the facility PGRSS.',
    card2Title: 'Segregation',
    card2Desc: 'Guidelines for separating waste at the point of generation, preventing cross-contamination, and reducing operational risks.',
    card3Title: 'Assessment',
    card3Desc: 'Quiz and procedure validation to reinforce learning and support internal team training.',
    groupsSubtitle: 'RDC 222/2018'
  },
  es: {
    heroTag: 'RDC n.º 222, de 28 de marzo de 2018',
    heroTitle: 'Gestión eficiente de residuos de servicios de salud',
    heroDesc: 'Guía digital interactiva para clasificar, manejar y desechar RSS de forma segura. El enfoque está en la bioseguridad, el cumplimiento normativo y la protección de los equipos de salud.',
    heroBtn: 'Comenzar lectura',
    heroManual: 'Abrir manual completo',
    card1Title: 'Clasificación',
    card1Desc: 'Identificación técnica de los Grupos A, B, C, D y E conforme a la RDC 222/2018 de ANVISA y al PGRSS de la unidad.',
    card2Title: 'Segregación',
    card2Desc: 'Orientaciones para separar los residuos en el punto de generación, evitar contaminación cruzada y reducir riesgos operativos.',
    card3Title: 'Evaluación',
    card3Desc: 'Quiz y validación de procedimientos para reforzar el aprendizaje y apoyar la capacitación interna del equipo.',
    groupsSubtitle: 'RDC 222/2018'
  }
};

const quizCallout = {
  pt: {
    eyebrow: 'Desafio com ranking',
    title: 'Teste sua classifica\u00e7\u00e3o RSS na pr\u00e1tica',
    desc: 'Responda quest\u00f5es sorteadas, escolha entre 5, 10, 15 ou todas, e acompanhe sua posi\u00e7\u00e3o no ranking por modalidade.',
    button: 'Acessar Quiz',
    random: 'Quest\u00f5es aleat\u00f3rias',
    ranking: 'Ranking por desempenho',
    time: 'Tempo de resposta',
  },
  en: {
    eyebrow: 'Ranked challenge',
    title: 'Test your RSS classification skills',
    desc: 'Answer randomized questions, choose 5, 10, 15 or all, and track your position in the ranking by mode.',
    button: 'Open Quiz',
    random: 'Random questions',
    ranking: 'Performance ranking',
    time: 'Response time',
  },
  es: {
    eyebrow: 'Desaf\u00edo con ranking',
    title: 'Ponga a prueba su clasificación de RSS',
    desc: 'Responda preguntas sorteadas, elija entre 5, 10, 15 o todas, y consulte su posición en el ranking por modalidad.',
    button: 'Acceder al quiz',
    random: 'Preguntas aleatorias',
    ranking: 'Ranking por desempeño',
    time: 'Tiempo de respuesta',
  },
};

export const Dashboard: React.FC<DashboardProps> = ({ onSelectGroup, onOpenManuals, onOpenQuiz, language }) => {
  const strings = UI_STRINGS[language];
  const t = translations[language];
  const quiz = quizCallout[language];

  return (
    <div id="dashboard-view" className="flex flex-col gap-8 pb-20 md:gap-12 md:pb-8">
      {/* Hero Section */}
      <section id="hero-section" className="relative group overflow-hidden rounded-[28px] bg-primary text-white p-5 sm:p-8 md:rounded-[40px] md:p-16">
        <div className="absolute right-0 top-0 hidden h-96 w-96 rounded-full bg-white/10 -mr-32 -mt-32 blur-3xl md:block" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs mb-5 md:mb-6"
            >
              {t.heroTag}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-5 md:mb-6"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-white/80 leading-relaxed mb-6 md:mb-8"
            >
              {t.heroDesc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-4"
            >
              <button 
                onClick={() => onSelectGroup('A')}
                className="w-full rounded-2xl bg-white px-6 py-4 font-bold text-primary shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 sm:w-auto md:px-8"
              >
                {t.heroBtn}
              </button>
              <button
                onClick={onOpenManuals}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition-all hover:bg-white/20 sm:w-auto md:px-8"
              >
                {t.heroManual}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-[24px] border border-white/20 bg-white p-3 shadow-2xl shadow-black/20 sm:p-4"
          >
            <img
              src="/images/site-slogan.jpg"
              alt="Conexao Residuos - descarte consciente, saude garantida"
              className="aspect-[16/9] w-full rounded-[18px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-xl shadow-surface-container-highest/30 md:rounded-[32px]">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(320px,0.86fr)]">
          <div className="min-w-0 p-5 md:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
              <Trophy size={14} />
              {quiz.eyebrow}
            </div>
            <h2 className="max-w-xl text-2xl font-black leading-tight text-on-surface sm:text-3xl md:text-[2.4rem]">
              {quiz.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant">
              {quiz.desc}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-3 py-2 text-xs font-bold text-on-surface-variant">
                <GraduationCap size={16} className="text-primary" />
                {quiz.random}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-3 py-2 text-xs font-bold text-on-surface-variant">
                <Trophy size={16} className="text-primary" />
                {quiz.ranking}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-3 py-2 text-xs font-bold text-on-surface-variant">
                <Timer size={16} className="text-primary" />
                {quiz.time}
              </span>
            </div>

            <button
              onClick={onOpenQuiz}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-4 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              {quiz.button}
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-primary p-5 text-white md:p-8">
            <div className="mx-auto max-w-sm rounded-[28px] bg-white/10 p-5 backdrop-blur">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-xl shadow-black/10">
              <GraduationCap size={34} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[5, 10, 15].map((count) => (
                <div key={count} className="rounded-2xl bg-white/15 p-4">
                  <p className="text-3xl font-black">{count}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/75">Quiz</p>
                </div>
              ))}
              <div className="rounded-2xl bg-white p-4 text-primary">
                <p className="text-3xl font-black">Top</p>
                <p className="text-xs font-bold uppercase tracking-widest">Ranking</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section id="overview-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all md:p-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card1Title}</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.card1Desc}
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all md:p-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <Info size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">{t.card2Title}</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.card2Desc}
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-outline-variant hover:shadow-lg transition-all md:p-8">
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
        <div className="mb-6 flex flex-col gap-2 px-2 sm:flex-row sm:items-center sm:justify-between md:mb-8">
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
