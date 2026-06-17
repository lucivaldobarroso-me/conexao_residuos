import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WasteGroup, WasteInfo, Language } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { UI_STRINGS, WASTE_DATA } from '../constants';
import { GroupQuestionBox } from './GroupQuestionBox';

interface WasteDetailProps {
  data: WasteInfo;
  onBack: () => void;
  onSelectGroup: (groupId: WasteGroup) => void;
  language: Language;
}

const colorMap: Record<string, string> = {
  A: 'text-waste-a border-waste-a bg-waste-a/5',
  B: 'text-waste-b border-waste-b bg-waste-b/5',
  C: 'text-waste-c border-waste-c bg-waste-c/5',
  D: 'text-waste-d border-waste-d bg-waste-d/5',
  E: 'text-waste-e border-waste-e bg-waste-e/5',
};

const bgMap: Record<string, string> = {
  A: 'bg-waste-a',
  B: 'bg-waste-b',
  C: 'bg-waste-c',
  D: 'bg-waste-d',
  E: 'bg-waste-e',
};

const translations = {
  pt: {
    switchGroup: 'Entrar em outro grupo',
    summaryIntro: 'Filtre os pontos da RDC 222/2018 por objetivo de consulta.',
    all: 'Todos',
    identification: 'Identifica\u00e7\u00e3o',
    packaging: 'Acondicionamento',
    destination: 'Destino/Tratamento',
    details: 'Detalhe normativo',
    reference: 'Refer\u00eancia',
    noItems: 'Nenhum item nesta categoria para este grupo.',
  },
  en: {
    switchGroup: 'Open another group',
    summaryIntro: 'Filter RDC 222/2018 points by consultation goal.',
    all: 'All',
    identification: 'Identification',
    packaging: 'Packaging',
    destination: 'Destination/Treatment',
    details: 'Regulatory detail',
    reference: 'Reference',
    noItems: 'No items in this category for this group.',
  },
  es: {
    switchGroup: 'Abrir otro grupo',
    summaryIntro: 'Filtre los puntos de la RDC 222/2018 según el objetivo de la consulta.',
    all: 'Todos',
    identification: 'Identificaci\u00f3n',
    packaging: 'Acondicionamiento',
    destination: 'Destinación/Tratamiento',
    details: 'Detalle normativo',
    reference: 'Referencia',
    noItems: 'No hay elementos en esta categoría para este grupo.',
  },
};

type SummaryFilter = 'all' | 'identification' | 'packaging' | 'destination';

function getSummaryCategory(item: WasteInfo['summary'][number]): Exclude<SummaryFilter, 'all'> {
  const text = `${item.attribute} ${item.specification} ${item.term}`.toLowerCase();

  if (
    /identifica|symbol|s[íi]mbolo|r[óo]tulo|rotulo|reference|refer[êe]ncia|referencia/.test(text)
  ) {
    return 'identification';
  }

  if (
    /acondicion|packag|recipiente|saco|coletor|collector|container|segrega|limite|substituir|decaimento|armazen/.test(text)
  ) {
    return 'packaging';
  }

  return 'destination';
}

export const WasteDetail: React.FC<WasteDetailProps> = ({ data, onBack, onSelectGroup, language }) => {
  const [isExamplesExpanded, setIsExamplesExpanded] = useState(true);
  const [expandedSummaryItems, setExpandedSummaryItems] = useState<number[]>([]);
  const [summaryFilter, setSummaryFilter] = useState<SummaryFilter>('all');
  const strings = UI_STRINGS[language];
  const t = translations[language];
  const groups = Object.values(WASTE_DATA[language]) as WasteInfo[];
  const summaryFilters: { id: SummaryFilter; label: string; icon: keyof typeof Icons }[] = [
    { id: 'all', label: t.all, icon: 'LayoutGrid' },
    { id: 'identification', label: t.identification, icon: 'BadgeCheck' },
    { id: 'packaging', label: t.packaging, icon: 'PackageCheck' },
    { id: 'destination', label: t.destination, icon: 'Route' },
  ];
  const filteredSummaryItems = data.summary
    .map((item, originalIndex) => ({
      item,
      originalIndex,
      category: getSummaryCategory(item),
    }))
    .filter(({ category }) => summaryFilter === 'all' || category === summaryFilter);

  const toggleSummaryItem = (idx: number) => {
    setExpandedSummaryItems(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  React.useEffect(() => {
    setExpandedSummaryItems([]);
    setSummaryFilter('all');
  }, [data.id]);

  return (
    <div id={`detail-view-${data.id}`} className="flex flex-col gap-6 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
        <button
          id="detail-back-button"
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">{strings.back}</span>
        </button>

        <div className="relative w-full sm:w-72">
          <select
            id="detail-group-switcher"
            value={data.id}
            onChange={(event) => onSelectGroup(event.target.value as WasteGroup)}
            className="w-full appearance-none rounded-2xl border border-outline-variant bg-white py-3 pl-4 pr-11 text-sm font-bold text-on-surface shadow-sm transition-all hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
            aria-label={t.switchGroup}
          >
            <option value="" disabled>
              {t.switchGroup}
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                Grupo {group.id} - {group.subtitle}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
        </div>
      </div>

      <header className="relative overflow-hidden rounded-3xl border border-outline-variant bg-white p-5 md:p-8">
        <div className={`absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 rounded-full opacity-5 blur-3xl ${bgMap[data.id]}`} />
        
        <div className="relative z-10 flex flex-col items-start gap-5 md:flex-row md:gap-6">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-xl md:h-20 md:w-20 md:text-3xl ${bgMap[data.id]}`}>
            {data.id}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">{data.title}</h2>
            <p className="text-on-surface-variant font-medium mb-4">{data.subtitle}</p>
            <p className="text-on-surface leading-relaxed max-w-2xl">{data.description}</p>
          </div>
        </div>
      </header>

      <GroupQuestionBox group={data.id} language={language} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Examples Section */}
        <section id="examples-section" className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <button 
              onClick={() => setIsExamplesExpanded(!isExamplesExpanded)}
              className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors group"
            >
              <Icons.Layers size={20} className="text-primary" />
              {strings.examplesTitle}
              {isExamplesExpanded ? <ChevronUp size={20} className="text-on-surface-variant group-hover:text-primary" /> : <ChevronDown size={20} className="text-on-surface-variant group-hover:text-primary" />}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.alert(strings.share);
              }}
              className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors"
              title="Compartilhar"
            >
              <Icons.Share size={20} />
            </button>
          </div>

          <AnimatePresence>
            {isExamplesExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {data.examples.map((example, idx) => {
                    const Icon = (Icons as any)[example.icon] || Icons.Circle;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 rounded-2xl bg-white border border-outline-variant flex gap-3 items-center hover:shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-tight">{example.label}</p>
                          <p className="text-[10px] text-on-surface-variant line-clamp-1">{example.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Disposal Section */}
        <section id="disposal-section" className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 px-2">
            <Icons.Trash2 size={20} className="text-primary" />
            {strings.instructions}
          </h3>
          <div className="p-6 rounded-3xl bg-white border border-outline-variant flex flex-col md:flex-row gap-6 items-center">
            <div className="relative group shrink-0">
               <img 
                src={data.disposal.image} 
                alt={data.disposal.container}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl bg-surface-container"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{strings.container}</p>
              <h4 className="text-xl font-bold mb-2">{data.disposal.container}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {data.disposal.instructions}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Risks and Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 rounded-3xl bg-red-50 border border-red-100">
          <h3 className="text-red-900 font-bold flex items-center gap-2 mb-4">
            <AlertTriangle size={20} />
            {strings.risks}
          </h3>
          <ul className="space-y-3">
            {data.risks.map((risk, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-red-800 leading-tight">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 grow-0 shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-amber-50 border border-amber-100">
          <h3 className="text-amber-900 font-bold flex items-center gap-2 mb-4">
            <Icons.XCircle size={20} />
            {strings.mistakes}
          </h3>
          <ul className="space-y-3">
            {data.mistakes.map((mistake, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-amber-800 leading-tight">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 grow-0 shrink-0" />
                {mistake}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Summary Accordion */}
      <section id="summary-section" className="space-y-4">
        <div className="flex flex-col gap-4 px-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Icons.LayoutGrid size={20} className="text-primary" />
              {strings.technicalSummary}
            </h3>
            <p className="mt-1 text-sm text-on-surface-variant">
              {t.summaryIntro}
            </p>
          </div>

          <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-1">
            {summaryFilters.map((filter) => {
              const Icon = (Icons as any)[filter.icon] || Icons.Circle;
              const isActive = summaryFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  onClick={() => setSummaryFilter(filter.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <Icon size={14} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {filteredSummaryItems.length === 0 && (
            <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center text-sm font-bold text-on-surface-variant">
              {t.noItems}
            </div>
          )}

          {filteredSummaryItems.map(({ item, originalIndex, category }) => {
            const isExpanded = expandedSummaryItems.includes(originalIndex);
            const categoryInfo = summaryFilters.find((filter) => filter.id === category);
            const CategoryIcon = categoryInfo ? (Icons as any)[categoryInfo.icon] || Icons.Circle : Icons.Circle;
            return (
              <div 
                key={originalIndex} 
                className="bg-white rounded-2xl border border-outline-variant overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleSummaryItem(originalIndex)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-surface-container md:p-5"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                        <CategoryIcon size={12} />
                        {categoryInfo?.label}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {item.attribute}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-on-surface sm:text-base">
                      {isExpanded ? item.attribute : item.specification}
                    </span>
                  </div>
                  <div className="shrink-0 rounded-full bg-surface-container-high p-2 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <ChevronDown size={18} className="text-on-surface-variant" />
                  </div>
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 border-t border-outline-variant/50 pt-4 bg-surface-container-low"
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{t.details}</span>
                          <p className="font-bold text-lg text-on-surface">{item.specification}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 block">{t.reference}</span>
                          <p className="text-sm text-outline italic">{item.term}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Practical Tip */}
      <section id="tip-section" className="relative mt-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-primary via-primary to-primary-container p-5 text-white shadow-2xl shadow-primary/30 ring-4 ring-primary/20 md:mt-8 md:rounded-[32px] md:p-8">
        <div className="relative z-10 flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-inner backdrop-blur-md md:h-24 md:w-24 md:rounded-3xl">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-pulse" />
            <Lightbulb size={36} className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:size-14" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-white/40" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 md:text-xl">
                {strings.practicalTipTitle}
              </h3>
            </div>
            <p className="text-lg font-bold italic leading-relaxed tracking-tight text-white md:text-2xl">
              "{data.practicalTip}"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
