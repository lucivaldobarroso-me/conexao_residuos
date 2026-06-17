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
import { AboutProject } from './components/AboutProject';
import { History } from './components/History';
import { AdminPanel } from './components/AdminPanel';
import { WASTE_DATA, UI_STRINGS } from './constants';
import { WasteGroup, HistoryEntry, Language } from './types';
import { loadHistoryEntries, persistHistoryEntries, readLocalHistory } from './services/historyRepository';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, Calendar } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedGroupId, setSelectedGroupId] = React.useState<WasteGroup | null>(null);
  const [headerSearchQuery, setHeaderSearchQuery] = React.useState('');
  const [groupsSearchRequest, setGroupsSearchRequest] = React.useState({ query: '', nonce: 0 });
  const [language, setLanguage] = React.useState<Language>(() => {
    const saved = localStorage.getItem('rss_language');
    return (saved as Language) || 'pt';
  });
  const [history, setHistory] = React.useState<HistoryEntry[]>(() => {
    return readLocalHistory();
  });
  const [isHistoryLoaded, setIsHistoryLoaded] = React.useState(false);

  React.useEffect(() => {
    let isActive = true;

    loadHistoryEntries().then((entries) => {
      if (isActive) {
        setHistory(entries);
        setIsHistoryLoaded(true);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  React.useEffect(() => {
    if (!isHistoryLoaded) return;
    persistHistoryEntries(history);
  }, [history, isHistoryLoaded]);

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
        language === 'pt' ? `Você visualizou o protocolo completo do ${group.title}.` : language === 'en' ? `You viewed the full protocol for ${group.title}.` : `Consultó el protocolo completo de ${group.title}.`,
        'Search',
        'bg-primary/10 text-primary',
        { targetTab: 'groups', targetGroupId: id as WasteGroup }
      );
    }
    setSelectedGroupId(id as WasteGroup);
    setActiveTab('groups');
    window.requestAnimationFrame(scrollToPageTop);
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
      window.requestAnimationFrame(scrollToPageTop);
      return;
    }

    if (entry.targetTab) {
      setSelectedGroupId(null);
      setActiveTab(entry.targetTab);
      window.requestAnimationFrame(scrollToPageTop);
    }
  };

  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'groups') setSelectedGroupId(null);
    window.requestAnimationFrame(scrollToPageTop);
  };

  const handleHeaderSearch = () => {
    const normalizedQuery = headerSearchQuery.trim();
    if (!normalizedQuery) return;

    setSelectedGroupId(null);
    setGroupsSearchRequest((prev) => ({
      query: normalizedQuery,
      nonce: prev.nonce + 1,
    }));
    setActiveTab('groups');

    addHistory(
      language === 'pt' ? 'Busca Global' : language === 'en' ? 'Global Search' : 'Busqueda global',
      language === 'pt'
        ? `Voce buscou por "${normalizedQuery}" na navegacao principal.`
        : language === 'en'
          ? `You searched for "${normalizedQuery}" from the main search.`
          : `Busco "${normalizedQuery}" desde la busqueda principal.`,
      'Search',
      'bg-slate-100 text-slate-700',
      { targetTab: 'groups' }
    );

    window.requestAnimationFrame(scrollToPageTop);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            language={language}
            onSelectGroup={handleSelectGroup}
            onOpenManuals={() => handleSetActiveTab('manuals')}
            onOpenQuiz={() => handleSetActiveTab('quiz')}
          />
        );
      case 'manuals':
        return <ManualLibrary language={language} onBack={() => handleSetActiveTab('dashboard')} />;
      case 'groups':
        if (selectedGroupId && WASTE_DATA[language][selectedGroupId]) {
          return (
            <WasteDetail 
              data={WASTE_DATA[language][selectedGroupId]} 
              language={language}
              onSelectGroup={handleSelectGroup}
              onBack={() => {
                setSelectedGroupId(null);
                window.requestAnimationFrame(scrollToPageTop);
              }} 
            />
          );
        }
        return (
          <GroupsOverview 
            language={language}
            onSelectGroup={handleSelectGroup} 
            externalSearch={groupsSearchRequest}
            onSearch={(query) => {
              addHistory(
                language === 'pt' ? 'Busca Realizada' : language === 'en' ? 'Search Performed' : 'Búsqueda realizada',
                language === 'pt' ? `Você buscou por "${query}" na classificação de resíduos.` : language === 'en' ? `You searched for "${query}" in waste classification.` : `Buscó "${query}" en la clasificación de residuos.`,
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
                language === 'pt' ? `Você acessou a seção de ${title} para estudo prático.` : language === 'en' ? `You accessed the ${title} section for practical study.` : `Accedió a la sección ${title} para estudio práctico.`,
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
                language === 'pt' ? 'Desafio Concluído' : language === 'en' ? 'Challenge Completed' : 'Desafío completado',
                language === 'pt' ? `Você completou o Quiz com uma pontuação de ${Math.round((score / total) * 100)}% (${score}/${total}).` : language === 'en' ? `You completed the Quiz with a score of ${Math.round((score / total) * 100)}% (${score}/${total}).` : `Completó el quiz con un resultado de ${Math.round((score / total) * 100)}% (${score}/${total}).`,
                'GraduationCap',
                score / total >= 0.7 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              );
            }} 
          />
        );
      case 'admin':
        return <AdminPanel />;
      case 'about':
        return (
          <AboutProject
            language={language}
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
            onOpenManuals={() => handleSetActiveTab('manuals')}
            onOpenQuiz={() => handleSetActiveTab('quiz')}
          />
        );
    }
  };

  const locale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES';
  const notificationLabel = language === 'pt' ? 'Notificacoes' : language === 'en' ? 'Notifications' : 'Notificaciones';

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="min-h-screen bg-surface flex">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 overflow-x-hidden px-4 pb-28 pt-24 sm:px-6 md:ml-64 md:p-10 lg:p-12">
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
                aria-label={strings.search}
                value={headerSearchQuery}
                onChange={(event) => setHeaderSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleHeaderSearch();
                  }
                }}
                placeholder={strings.search} 
                className="bg-surface-container-high border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 ring-primary/20 w-64"
              />
            </div>
            <button
              id="notification-button"
              type="button"
              aria-label={notificationLabel}
              className="p-2 rounded-full hover:bg-surface-container-high transition-colors relative"
            >
              <Bell size={20} />
              <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
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
