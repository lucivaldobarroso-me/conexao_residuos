import React from 'react';
import { motion } from 'motion/react';
import { SCENARIOS } from '../constants';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { Language } from '../types';

interface ScenariosProps {
  onViewScenario: (title: string) => void;
  language: Language;
}

const translations = {
  pt: {
    title: 'Cenários Práticos',
    subtitle: 'Situações reais do cotidiano hospitalar e a conduta recomendada para cada caso.',
    wrongLabel: 'Como costuma-se errar:',
    rightLabel: 'Conduta Correta:',
    attention: 'Atenção:',
    guideline: 'Este cenário baseia-se em diretrizes da RDC 222/2018 da ANVISA.'
  },
  en: {
    title: 'Practical Scenarios',
    subtitle: 'Real situations from hospital daily life and the recommended conduct for each case.',
    wrongLabel: 'Common mistakes:',
    rightLabel: 'Correct Conduct:',
    attention: 'Attention:',
    guideline: 'This scenario is based on standard healthcare guidelines.'
  },
  es: {
    title: 'Escenarios Prácticos',
    subtitle: 'Situaciones reales de la vida diaria del hospital y la conducta recomendada para cada caso.',
    wrongLabel: 'Cómo se suele errar:',
    rightLabel: 'Conducta Correcta:',
    attention: 'Atención:',
    guideline: 'Este escenario se basa en directrices estándar de salud.'
  }
};

export const Scenarios: React.FC<ScenariosProps> = ({ onViewScenario, language }) => {
  const t = translations[language];

  React.useEffect(() => {
    onViewScenario(t.title);
  }, [language]);

  return (
    <div id="scenarios-view" className="flex flex-col gap-8 pb-24 md:pb-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.title}</h2>
        <p className="text-on-surface-variant leading-relaxed max-w-2xl">
          {t.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {SCENARIOS[language].map((scenario, index) => (
          <motion.article
            key={scenario.id}
            id={`scenario-card-${scenario.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white p-6 md:p-8 rounded-[40px] border border-outline-variant shadow-sm"
          >
            <div className="relative group aspect-video lg:aspect-square overflow-hidden rounded-3xl">
              <img 
                src={scenario.imageUrl} 
                alt={scenario.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-primary-container mb-1 uppercase tracking-widest">{scenario.category}</span>
                <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-red-50 border border-red-100">
                  <XCircle className="text-red-600 shrink-0 mt-0.5" size={24} />
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">{t.wrongLabel}</h4>
                    <p className="text-sm text-red-800 leading-relaxed">{scenario.wrong}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-green-50 border border-green-100">
                  <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={24} />
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">{t.rightLabel}</h4>
                    <p className="text-sm text-green-800 leading-relaxed">{scenario.right}</p>
                  </div>
                </div>

                {scenario.attention && (
                  <div className="flex gap-3 px-5 py-3 rounded-xl bg-surface-container border border-outline-variant text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                    <AlertCircle size={16} className="text-primary" />
                    {t.attention} {scenario.attention}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-surface-container flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Info size={16} />
                </div>
                <p className="text-xs text-on-surface-variant italic">
                  {t.guideline}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
