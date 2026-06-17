import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCENARIOS } from '../constants';
import { CheckCircle2, XCircle, AlertCircle, Info, SlidersHorizontal } from 'lucide-react';
import { Language, WasteGroup } from '../types';

interface ScenariosProps {
  onViewScenario: (title: string) => void;
  language: Language;
}

const groupColors: Record<WasteGroup, string> = {
  A: 'bg-waste-a text-white',
  B: 'bg-waste-b text-white',
  C: 'bg-waste-c text-white',
  D: 'bg-waste-d text-white',
  E: 'bg-waste-e text-on-surface',
};

const translations = {
  pt: {
    title: 'Cenários Práticos',
    subtitle: 'Casos rápidos do cotidiano assistencial para treinar condutas de segregação, acondicionamento e destino conforme a RDC 222/2018.',
    wrongLabel: 'Erro comum',
    rightLabel: 'Conduta correta',
    attention: 'Atenção:',
    guideline: 'Baseado na RDC 222/2018 e no PGRSS da unidade.',
    all: 'Todos',
    groupFilter: 'Grupo',
    sectorFilter: 'Setor',
    reference: 'Referência',
    showing: 'casos encontrados',
    clear: 'Limpar filtros',
  },
  en: {
    title: 'Practical Scenarios',
    subtitle: 'Quick healthcare cases to train segregation, packaging, and destination decisions according to RDC 222/2018.',
    wrongLabel: 'Common mistake',
    rightLabel: 'Correct conduct',
    attention: 'Attention:',
    guideline: 'Based on RDC 222/2018 and the facility PGRSS.',
    all: 'All',
    groupFilter: 'Group',
    sectorFilter: 'Sector',
    reference: 'Reference',
    showing: 'cases found',
    clear: 'Clear filters',
  },
  es: {
    title: 'Escenarios Prácticos',
    subtitle: 'Casos rápidos del trabajo asistencial para entrenar la segregación, el acondicionamiento y la destinación conforme a la RDC 222/2018.',
    wrongLabel: 'Error común',
    rightLabel: 'Conducta correcta',
    attention: 'Atención:',
    guideline: 'Basado en la RDC 222/2018 y en el PGRSS de la unidad.',
    all: 'Todos',
    groupFilter: 'Grupo',
    sectorFilter: 'Sector',
    reference: 'Referencia',
    showing: 'casos encontrados',
    clear: 'Limpiar filtros',
  }
};

export const Scenarios: React.FC<ScenariosProps> = ({ onViewScenario, language }) => {
  const t = translations[language];
  const scenarios = SCENARIOS[language];
  const [selectedGroup, setSelectedGroup] = React.useState<'all' | WasteGroup>('all');
  const [selectedSector, setSelectedSector] = React.useState('all');

  React.useEffect(() => {
    onViewScenario(t.title);
  }, [language]);

  React.useEffect(() => {
    setSelectedGroup('all');
    setSelectedSector('all');
  }, [language]);

  const groupOptions = React.useMemo(() => {
    const groups = new Set<WasteGroup>();
    scenarios.forEach((scenario) => scenario.groups?.forEach((group) => groups.add(group)));
    return Array.from(groups).sort();
  }, [scenarios]);

  const sectorOptions = React.useMemo(() => {
    const sectors = new Set<string>();
    scenarios
      .filter((scenario) => selectedGroup === 'all' || scenario.groups?.includes(selectedGroup))
      .forEach((scenario) => sectors.add(scenario.sector || scenario.category));
    return Array.from(sectors).sort((a, b) => a.localeCompare(b));
  }, [scenarios, selectedGroup]);

  React.useEffect(() => {
    if (selectedSector !== 'all' && !sectorOptions.includes(selectedSector)) {
      setSelectedSector('all');
    }
  }, [selectedSector, sectorOptions]);

  const filteredScenarios = scenarios.filter((scenario) => {
    const matchesGroup = selectedGroup === 'all' || scenario.groups?.includes(selectedGroup);
    const scenarioSector = scenario.sector || scenario.category;
    const matchesSector = selectedSector === 'all' || scenarioSector === selectedSector;
    return matchesGroup && matchesSector;
  });

  const clearFilters = () => {
    setSelectedGroup('all');
    setSelectedSector('all');
  };

  return (
    <div id="scenarios-view" className="flex flex-col gap-8 pb-24 md:pb-8">
      <header className="flex flex-col gap-6 border-b border-outline-variant pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.title}</h2>
          <p className="text-on-surface-variant leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-white border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface-variant">
          <SlidersHorizontal size={18} className="text-primary" />
          {filteredScenarios.length} {t.showing}
        </div>
      </header>

      <section className="grid gap-4 rounded-[24px] bg-surface-container-low p-4 md:grid-cols-[1fr_1fr_auto] md:items-end md:rounded-[28px]">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-on-surface-variant">{t.groupFilter}</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedGroup('all');
                setSelectedSector('all');
              }}
              className={`rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest transition-all ${selectedGroup === 'all' ? 'bg-primary text-white' : 'bg-white text-on-surface-variant border border-outline-variant'}`}
            >
              {t.all}
            </button>
            {groupOptions.map((group) => (
              <button
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                  setSelectedSector('all');
                }}
                className={`rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest transition-all ${selectedGroup === group ? groupColors[group] : 'bg-white text-on-surface-variant border border-outline-variant'}`}
              >
                Grupo {group}
              </button>
            ))}
          </div>
        </div>

        <label>
          <span className="mb-2 block text-xs font-black uppercase tracking-widest text-on-surface-variant">{t.sectorFilter}</span>
          <select
            value={selectedSector}
            onChange={(event) => setSelectedSector(event.target.value)}
            disabled={sectorOptions.length === 0}
            className="w-full rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-bold text-on-surface outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="all">{t.all}</option>
            {sectorOptions.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={clearFilters}
          className="w-full rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-black text-primary transition-all hover:border-primary/40 md:w-auto"
        >
          {t.clear}
        </button>
      </section>

      <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredScenarios.map((scenario, index) => (
            <motion.article
              key={scenario.id}
              id={`scenario-card-${scenario.id}`}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="overflow-hidden rounded-[24px] border border-outline-variant bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl md:rounded-[28px]"
            >
              <div className="relative h-28 overflow-hidden sm:h-36">
                <img 
                  src={scenario.imageUrl} 
                  alt={scenario.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/80">{scenario.category}</p>
                  <h3 className="text-base font-black leading-tight text-white sm:text-lg">{scenario.title}</h3>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {(scenario.groups || []).map((group) => (
                    <span key={group} className={`rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-widest ${groupColors[group]}`}>
                      Grupo {group}
                    </span>
                  ))}
                  <span className="rounded-lg bg-surface-container px-2 py-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    {scenario.sector || scenario.category}
                  </span>
                </div>

                <div className="grid gap-3">
                  <div className="flex gap-3 rounded-2xl bg-red-50 p-4">
                    <XCircle className="mt-0.5 shrink-0 text-red-600" size={18} />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-red-900">{t.wrongLabel}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-red-800">{scenario.wrong}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-2xl bg-green-50 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={18} />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-green-900">{t.rightLabel}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-green-800">{scenario.right}</p>
                    </div>
                  </div>
                </div>

                {scenario.attention && (
                  <div className="flex gap-2 rounded-xl bg-surface-container px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    <AlertCircle size={15} className="shrink-0 text-primary" />
                    {t.attention} {scenario.attention}
                  </div>
                )}

                <div className="border-t border-surface-container pt-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Info size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant italic">{t.guideline}</p>
                    {scenario.reference && (
                      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-primary">
                        {t.reference}: {scenario.reference}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
