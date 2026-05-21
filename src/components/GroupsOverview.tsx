import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WASTE_DATA, UI_STRINGS } from '../constants';
import { ChevronRight, Info, ShieldCheck, Search, X } from 'lucide-react';
import { WasteGroup, Language, WasteInfo } from '../types';

interface GroupsOverviewProps {
  onSelectGroup: (groupId: WasteGroup) => void;
  onSearch: (query: string) => void;
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
    title: 'Classificação de Resíduos (RSS)',
    subtitle: 'Selecione uma das categorias abaixo para acessar o protocolo completo de acondicionamento, riscos e descarte seguro.',
    searchPlaceholder: 'Buscar grupo ou termo...',
    viewProtocol: 'Ver Protocolo Completo',
    noResults: 'Nenhum resultado encontrado',
    noResultsText: 'Não encontramos nenhum grupo de resíduos que corresponda a',
    clearSearch: 'Limpar busca',
    guidelineTitle: 'Diretriz Geral de Segregação',
    guidelineText: 'Resíduos devem ser segregados no momento e local de sua geração. É expressamente proibido o transvasamento de resíduos entre recipientes para evitar riscos de acoplamento e perfuração acidental.'
  },
  en: {
    title: 'Waste Classification (RSS)',
    subtitle: 'Select one of the categories below to access the full protocol for packaging, risks, and safe disposal.',
    searchPlaceholder: 'Search for group or term...',
    viewProtocol: 'View Full Protocol',
    noResults: 'No results found',
    noResultsText: 'No waste group matches your search for',
    clearSearch: 'Clear search',
    guidelineTitle: 'General Segregation Guideline',
    guidelineText: 'Waste must be segregated at the time and place of generation. Transferring waste between containers is strictly prohibited to avoid accidental injury risks.'
  },
  es: {
    title: 'Clasificación de Residuos (RSS)',
    subtitle: 'Seleccione una de las categorías a continuación para acceder al protocolo completo de acondicionado, riesgos y eliminación segura.',
    searchPlaceholder: 'Buscar grupo o término...',
    viewProtocol: 'Ver Protocolo Completo',
    noResults: 'No se encontraron resultados',
    noResultsText: 'No encontramos ningún grupo de residuos que coincida con',
    clearSearch: 'Limpiar búsqueda',
    guidelineTitle: 'Directriz General de Segregación',
    guidelineText: 'Los residuos deben segregarse en el momento y lugar de su generación. Está expresamente prohibido el trasvase de residuos entre recipientes para evitar riesgos de pinchazos accidentales.'
  }
};

export const GroupsOverview: React.FC<GroupsOverviewProps> = ({ onSelectGroup, onSearch, language }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const t = translations[language];

  React.useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        onSearch(searchQuery);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, onSearch]);

  const filteredGroups = (Object.values(WASTE_DATA[language]) as WasteInfo[]).filter((group) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      group.title.toLowerCase().includes(searchLower) ||
      group.subtitle.toLowerCase().includes(searchLower) ||
      group.description.toLowerCase().includes(searchLower) ||
      group.id.toLowerCase() === searchLower
    );
  });

  return (
    <div id="groups-overview-view" className="flex flex-col gap-8 pb-24 md:pb-8">
      <header className="border-b border-outline-variant pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.title}</h2>
          <p className="text-on-surface-variant leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
          <input
            id="groups-search-input"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-surface-container-high border-2 border-transparent rounded-2xl focus:border-primary/50 focus:bg-white focus:ring-4 ring-primary/5 transition-all text-sm font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-container-highest rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGroups.length > 0 ? (
            (filteredGroups as WasteInfo[]).map((group, index) => (
              <motion.button
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => onSelectGroup(group.id as WasteGroup)}
                className={`group flex flex-col bg-white rounded-[32px] border ${borderMap[group.id] || 'border-outline-variant'} overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all text-left relative`}
              >
                <div className={`h-3 bg-gradient-to-r from-transparent ${colorMap[group.id]} to-transparent opacity-50`} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${colorMap[group.id]} text-white flex items-center justify-center font-black text-2xl shadow-lg`}>
                      {group.id}
                    </div>
                    <div className="p-2 rounded-full bg-surface-container opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors italic">
                    {group.title.split(':')[1]?.trim() || group.title}
                  </h3>
                  
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                    {group.description}
                  </p>

                  <div className="mt-auto flex items-center gap-3 py-3 px-4 rounded-xl bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-primary">
                    <ShieldCheck size={14} />
                    {t.viewProtocol}
                  </div>
                </div>
              </motion.button>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 flex flex-col items-center text-center px-6"
            >
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-6">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.noResults}</h3>
              <p className="text-on-surface-variant max-w-xs">
                {t.noResultsText} "<strong>{searchQuery}</strong>".
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-primary font-bold hover:underline"
              >
                {t.clearSearch}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 rounded-[32px] bg-surface-container-high border border-outline-variant flex gap-6 items-start mt-8">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
          <Info size={24} />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-lg">{t.guidelineTitle}</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {t.guidelineText}
          </p>
        </div>
      </div>
    </div>
  );
};

