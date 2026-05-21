import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WasteGroup, WasteInfo, Language } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { UI_STRINGS, WASTE_DATA } from '../constants';

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
  },
  en: {
    switchGroup: 'Open another group',
  },
  es: {
    switchGroup: 'Entrar en otro grupo',
  },
};

export const WasteDetail: React.FC<WasteDetailProps> = ({ data, onBack, onSelectGroup, language }) => {
  const [isExamplesExpanded, setIsExamplesExpanded] = useState(true);
  const [expandedSummaryItems, setExpandedSummaryItems] = useState<number[]>([]);
  const strings = UI_STRINGS[language];
  const t = translations[language];
  const groups = Object.values(WASTE_DATA[language]) as WasteInfo[];

  const toggleSummaryItem = (idx: number) => {
    setExpandedSummaryItems(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

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

      <header className="relative p-8 rounded-3xl bg-white border border-outline-variant overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 rounded-full opacity-5 blur-3xl ${bgMap[data.id]}`} />
        
        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
          <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-xl ${bgMap[data.id]}`}>
            {data.id}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{data.title}</h2>
            <p className="text-on-surface-variant font-medium mb-4">{data.subtitle}</p>
            <p className="text-on-surface leading-relaxed max-w-2xl">{data.description}</p>
          </div>
        </div>
      </header>

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
        <h3 className="text-lg font-bold flex items-center gap-2 px-2">
          <Icons.LayoutGrid size={20} className="text-primary" />
          {strings.technicalSummary}
        </h3>
        <div className="flex flex-col gap-2">
          {data.summary.map((item, idx) => {
            const isExpanded = expandedSummaryItems.includes(idx);
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-outline-variant overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleSummaryItem(idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-container transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {item.attribute}
                    </span>
                    <span className="font-bold text-base text-on-surface">
                      {isExpanded ? item.attribute : item.specification}
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-surface-container-high transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
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
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">Especificação</span>
                          <p className="font-bold text-lg text-on-surface">{item.specification}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1 block">Termo Técnico</span>
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
      <section id="tip-section" className="mt-8 p-8 rounded-[32px] bg-gradient-to-br from-primary via-primary to-primary-container text-white shadow-2xl shadow-primary/30 relative overflow-hidden ring-4 ring-primary/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl text-primary-container/20 group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner border border-white/20 relative group">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-pulse" />
            <Lightbulb size={56} className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-white/40" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-white/90">
                {strings.practicalTipTitle}
              </h3>
            </div>
            <p className="text-white text-2xl leading-relaxed italic font-bold tracking-tight">
              "{data.practicalTip}"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
