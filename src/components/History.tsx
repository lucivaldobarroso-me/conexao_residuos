import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HistoryEntry, Language } from '../types';
import * as Icons from 'lucide-react';
import { Trash2, Clock, CalendarDays, ArrowUpRight } from 'lucide-react';

interface HistoryProps {
  entries: HistoryEntry[];
  onClear: () => void;
  onOpenEntry: (entry: HistoryEntry) => void;
  language: Language;
}

const translations = {
  pt: {
    title: 'Histórico de Atividades',
    subtitle: 'Acompanhe suas últimas interações e consultas de protocolos no sistema.',
    clearBtn: 'Limpar Histórico',
    openBtn: 'Ver novamente',
    emptyTitle: 'Nenhum histórico encontrado',
    emptyDesc: 'Suas atividades aparecerão aqui conforme você navega pelos protocolos e realiza os desafios.',
    dateFormat: 'pt-BR'
  },
  en: {
    title: 'Activity History',
    subtitle: 'Track your latest interactions and protocol consultations in the system.',
    clearBtn: 'Clear History',
    openBtn: 'View again',
    emptyTitle: 'No history found',
    emptyDesc: 'Your activities will appear here as you browse protocols and complete challenges.',
    dateFormat: 'en-US'
  },
  es: {
    title: 'Historial de Actividades',
    subtitle: 'Siga sus últimas interacciones y consultas de protocolos en el sistema.',
    clearBtn: 'Limpiar Historial',
    openBtn: 'Ver otra vez',
    emptyTitle: 'No se encontró historial',
    emptyDesc: 'Sus actividades aparecerán aquí a medida que navegue por los protocolos y complete desafíos.',
    dateFormat: 'es-ES'
  }
};

export const History: React.FC<HistoryProps> = ({ entries, onClear, onOpenEntry, language }) => {
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  const t = translations[language];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(t.dateFormat, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div id="history-view" className="flex flex-col gap-8 pb-24 md:pb-8 max-w-4xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.title}</h2>
          <p className="text-on-surface-variant leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        {entries.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all font-bold text-sm"
          >
            <Trash2 size={16} />
            {t.clearBtn}
          </button>
        )}
      </header>

      <div className="relative">
        <AnimatePresence mode="popLayout">
          {entries.length > 0 ? (
            <div className="flex flex-col gap-4">
              {sortedEntries.map((entry, index) => {
                const Icon = (Icons as any)[entry.icon] || Clock;
                const canOpen =
                  Boolean(entry.targetTab || entry.targetGroupId) ||
                  /(?:Grupo|Group)\s+[A-E]/i.test(`${entry.action} ${entry.description}`);

                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="p-5 rounded-2xl bg-white border border-outline-variant flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${entry.color || 'bg-primary/10 text-primary'}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <h4 className="font-bold text-on-surface truncate">{entry.action}</h4>
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest whitespace-nowrap flex items-center gap-1">
                            <CalendarDays size={12} />
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>

                    {canOpen && (
                      <button
                        onClick={() => onOpenEntry(entry)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white active:scale-[0.98] sm:ml-auto sm:shrink-0"
                      >
                        {t.openBtn}
                        <ArrowUpRight size={16} />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center text-center px-6 bg-surface-container-low rounded-[40px] border-2 border-dashed border-outline-variant"
            >
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-6">
                <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.emptyTitle}</h3>
              <p className="text-on-surface-variant max-w-xs">
                {t.emptyDesc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
