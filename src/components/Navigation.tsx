import React from 'react';
import { Home, ClipboardList, BookOpen, GraduationCap, Clock, Info, ChevronDown, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const strings = UI_STRINGS[language];
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const aboutLabel = language === 'en' ? 'About' : 'Sobre';
  const navigationLabel = language === 'pt' ? 'Navegacao principal' : language === 'en' ? 'Main navigation' : 'Navegacion principal';
  const languageButtonLabel = language === 'pt' ? 'Alterar idioma' : language === 'en' ? 'Change language' : 'Cambiar idioma';
  
  const navItems = [
    { id: 'dashboard', label: strings.dashboard, icon: Home },
    { id: 'groups', label: strings.groups, icon: ClipboardList },
    { id: 'scenarios', label: strings.scenarios, icon: BookOpen },
    { id: 'quiz', label: strings.quiz, icon: GraduationCap },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'about', label: aboutLabel, icon: Info },
    { id: 'history', label: strings.history, icon: Clock },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const statusMap = {
    pt: 'Integridade Ativa',
    en: 'Active Integrity',
    es: 'Integridad Activa'
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant px-4 py-3 flex items-center justify-between md:hidden shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
            <ClipboardList size={18} />
          </div>
          <h1 className="font-bold text-sm text-on-surface">Conexão Resíduos</h1>
        </div>
        
        <div className="relative">
          <button 
            type="button"
            aria-label={languageButtonLabel}
            aria-haspopup="menu"
            aria-expanded={isLangOpen}
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant/30 text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            <span>{currentLang.flag}</span>
            <span className="uppercase tracking-wider">{currentLang.code}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 text-on-surface-variant ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                role="menu"
                className="fixed right-4 top-16 p-2 bg-white rounded-2xl border border-outline-variant shadow-2xl z-[60] w-[min(12rem,calc(100vw-2rem))]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={language === lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-xs font-semibold transition-colors ${
                      language === lang.code ? 'bg-primary text-white shadow-md shadow-primary/20' : 'hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                    {language === lang.code && <Check size={14} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav id="mobile-nav" aria-label={navigationLabel} className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-surface/90 backdrop-blur-md border-t border-outline-variant px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <Icon size={22} className={isActive ? 'fill-primary/10' : ''} />
              <span className="max-w-full truncate text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabMobile"
                  aria-hidden="true"
                  className="absolute -top-3 h-0.5 bg-primary w-8 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <nav id="desktop-sidebar" aria-label={navigationLabel} className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-outline-variant hidden md:flex flex-col p-6 z-40 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ClipboardList size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-on-surface">Conexão Resíduos</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary/70 mt-0.5">Gestão em Saúde</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="relative">
            <button 
              type="button"
              aria-label={languageButtonLabel}
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-full flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant/30 text-sm font-bold transition-all hover:bg-surface-container-highest group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xl shadow-sm border border-outline-variant/20">
                  {currentLang.flag}
                </div>
                <div className="flex flex-col items-start translate-y-[1px]">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold leading-none mb-1">Idioma</span>
                  <span className="text-on-surface">{currentLang.label}</span>
                </div>
              </div>
              <ChevronDown size={18} className={`transition-transform duration-300 text-on-surface-variant group-hover:text-primary ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  role="menu"
                  className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-2xl border border-outline-variant shadow-2xl z-50 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={language === lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                        language === lang.code 
                          ? 'bg-primary text-white shadow-md shadow-primary/20' 
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-xs font-bold leading-none">{lang.label}</span>
                      </div>
                      {language === lang.code && <Check size={16} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-desktop-${item.id}`}
                type="button"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <Icon size={20} />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabDesktop"
                    aria-hidden="true"
                    className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-6 border-t border-outline-variant">
          <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/30">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Monitoramento</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute inset-0 opacity-75" />
                <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-green-500 relative" />
              </div>
              <span className="text-xs font-bold text-on-surface tracking-tight">{statusMap[language]}</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
