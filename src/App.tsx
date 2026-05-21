/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { WasteDetail } from './components/WasteDetail';
import { GroupsOverview } from './components/GroupsOverview';
import { ManualLibrary } from './components/ManualLibrary';
import { Scenarios } from './components/Scenarios';
import { Quiz } from './components/Quiz';
import { History } from './components/History';
import { WASTE_DATA, UI_STRINGS } from './constants';
import { WasteGroup, HistoryEntry, Language } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, Calendar } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedGroupId, setSelectedGroupId] = React.useState<WasteGroup | null>(null);
  const [language, setLanguage] = React.useState<Language>(() => {
    const saved = localStorage.getItem('rss_language');
    return (saved as Language) || 'pt';
  });
  const [history, setHistory] = React.useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('rss_history');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('rss_history', JSON.stringify(history));
  }, [history]);

  React.useEffect(() => {
    localStorage.setItem('rss_language', language);
  }, [language]);

  const addHistory = (
    action: string,
    description: string,
    icon: string,
    color?: string,
    target?: Pick<HistoryEntry, 'targetTab' | 'targetGroupId'>
  ) => {
    const nextEntry: HistoryEntry = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: Date.now(),
      action,
      description,
      icon,
      color,
      ...target
    };
    setHistory(prev => [nextEntry, ...prev].slice(0, 50)); // Keep last 50
  };

  const handleSelectGroup = (id: string) => {
    const group = WASTE_DATA[language][id];
    if (group) {
      addHistory(
        language === 'pt' ? `Consulta: ${group.title}` : language === 'en' ? `Query: ${group.title}` : `Consulta: ${group.title}`,
        language === 'pt' ? `Você visualizou o protocolo completo do ${group.title}.` : language === 'en' ? `You viewed the full protocol for ${group.title}.` : `Has visto el protocolo completo de ${group.title}.`,
        'Search',
        'bg-primary/10 text-primary',
        { targetTab: 'groups', targetGroupId: id as WasteGroup }
      );
    }
    setSelectedGroupId(id as WasteGroup);
    setActiveTab('groups');
  };

  const strings = UI_STRINGS[language];

  const handleOpenHistoryEntry = (entry: HistoryEntry) => {
    const groupId =
      entry.targetGroupId ||
      (entry.action.match(/(?:Grupo|Group)\s+([A-E])/i)?.[1]?.toUpperCase() as WasteGroup | undefined) ||
      (entry.description.match(/(?:Grupo|Group)\s+([A-E])/i)?.[1]?.toUpperCase() as WasteGroup | undefined);

    if (groupId && WASTE_DATA[language][groupId]) {
      setSelectedGroupId(groupId);
      setActiveTab('groups');
      return;
    }

    if (entry.targetTab) {
      setSelectedGroupId(null);
      setActiveTab(entry.targetTab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            language={language}
            onSelectGroup={handleSelectGroup}
            onOpenManuals={() => setActiveTab('manuals')}
          />
        );
      case 'manuals':
        return <ManualLibrary language={language} onBack={() => setActiveTab('dashboard')} />;
      case 'groups':
        if (selectedGroupId && WASTE_DATA[language][selectedGroupId]) {
          return (
            <WasteDetail 
              data={WASTE_DATA[language][selectedGroupId]} 
              language={language}
              onSelectGroup={handleSelectGroup}
              onBack={() => setSelectedGroupId(null)} 
            />
          );
        }
        return (
          <GroupsOverview 
            language={language}
            onSelectGroup={handleSelectGroup} 
            onSearch={(query) => {
              addHistory(
                language === 'pt' ? 'Busca Realizada' : language === 'en' ? 'Search Performed' : 'Búsqueda Realizada',
                language === 'pt' ? `Você buscou por "${query}" na classificação de resíduos.` : language === 'en' ? `You searched for "${query}" in waste classification.` : `Buscaste "${query}" en la clasificación de residuos.`,
                'Search',
                'bg-slate-100 text-slate-700'
              );
            }} 
          />
        );
      case 'scenarios':
        return (
          <Scenarios 
            language={language}
            onViewScenario={(title) => {
              addHistory(
                language === 'pt' ? 'Navegação' : language === 'en' ? 'Navigation' : 'Navegación',
                language === 'pt' ? `Você acessou a seção de ${title} para estudo prático.` : language === 'en' ? `You accessed the ${title} section for practical study.` : `Accediste a la sección de ${title} para estudio práctico.`,
                'BookOpen',
                'bg-blue-100 text-blue-700'
              );
            }} 
          />
        );
      case 'quiz':
        return (
          <Quiz 
            language={language}
            onComplete={(score, total) => {
              addHistory(
                language === 'pt' ? 'Desafio Concluído' : language === 'en' ? 'Challenge Completed' : 'Desafío Completado',
                language === 'pt' ? `Você completou o Quiz com uma pontuação de ${Math.round((score / total) * 100)}% (${score}/${total}).` : language === 'en' ? `You completed the Quiz with a score of ${Math.round((score / total) * 100)}% (${score}/${total}).` : `Completaste el Cuestionario con una puntuación de ${Math.round((score / total) * 100)}% (${score}/${total}).`,
                'GraduationCap',
                score / total >= 0.7 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              );
            }} 
          />
        );
      case 'history':
        return (
          <History
            language={language}
            entries={history}
            onClear={() => setHistory([])}
            onOpenEntry={handleOpenHistoryEntry}
          />
        );
      default:
        return (
          <Dashboard
            language={language}
            onSelectGroup={handleSelectGroup}
            onOpenManuals={() => setActiveTab('manuals')}
          />
        );
    }
  };

  const locale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';

  return (
    <div className="min-h-screen bg-surface flex">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'groups') setSelectedGroupId(null);
        }} 
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 md:ml-64 p-6 md:p-10 lg:p-12 overflow-x-hidden">
        <header className="flex items-center justify-between mb-10 hidden md:flex">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Calendar size={18} />
            <span className="text-sm font-medium capitalize">
              {new Date().toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
              <input 
                id="search-input"
                type="text" 
                placeholder={strings.search} 
                className="bg-surface-container-high border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 ring-primary/20 w-64"
              />
            </div>
            <button id="notification-button" className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedGroupId || '') + language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
