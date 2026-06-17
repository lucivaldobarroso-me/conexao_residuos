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
    title: 'Historial de actividades',
    subtitle: 'Consulte sus últimas interacciones, búsquedas y accesos a los protocolos del sistema.',
    clearBtn: 'Limpiar historial',
    openBtn: 'Ver nuevamente',
    emptyTitle: 'No se encontró historial',
    emptyDesc: 'Sus actividades aparecerán aquí a medida que navegue por los protocolos y complete los desafíos.',
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
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-50 sm:w-auto sm:py-2"
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
                        <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <h4 className="font-bold text-on-surface sm:truncate">{entry.action}</h4>
                          <span className="flex items-center gap-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
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
              className="flex flex-col items-center rounded-[28px] border-2 border-dashed border-outline-variant bg-surface-container-low px-6 py-16 text-center md:rounded-[40px] md:py-20"
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
