import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { Language } from '../types';

interface ManualLibraryProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  pt: {
    title: 'Biblioteca de Manuais',
    subtitle: 'Documentos técnicos e normas de referência para consulta sobre gerenciamento de resíduos de serviços de saúde.',
    back: 'Voltar ao início',
    open: 'Abrir PDF',
    download: 'Baixar PDF',
    documents: 'Documentos disponíveis',
  },
  en: {
    title: 'Manual Library',
    subtitle: 'Technical documents and reference standards for healthcare waste management.',
    back: 'Back to home',
    open: 'Open PDF',
    download: 'Download PDF',
    documents: 'Available documents',
  },
  es: {
    title: 'Biblioteca de Manuales',
    subtitle: 'Documentos técnicos y normas de referencia para la gestión de residuos de servicios de salud.',
    back: 'Volver al inicio',
    open: 'Abrir PDF',
    download: 'Descargar PDF',
    documents: 'Documentos disponibles',
  },
};

const manuals = [
  {
    title: 'RDC Nº 222, de 28 de março de 2018',
    description:
      'Regulamenta as Boas Práticas de Gerenciamento dos Resíduos de Serviços de Saúde e dá outras providências.',
    href: '/manuals/rdc-222-2018.pdf',
  },
];

export const ManualLibrary: React.FC<ManualLibraryProps> = ({ language, onBack }) => {
  const t = translations[language];

  return (
    <div id="manual-library-view" className="flex flex-col gap-8 pb-24 md:pb-8">
      <header className="border-b border-outline-variant pb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.title}</h2>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">{t.subtitle}</p>
          </div>
          <span className="text-sm font-bold text-primary uppercase tracking-widest">
            {t.documents}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {manuals.map((manual, index) => (
          <motion.article
            key={manual.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-outline-variant rounded-[32px] p-8 hover:shadow-xl transition-all"
          >
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText size={28} />
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-bold text-on-surface mb-3">{manual.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {manual.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={manual.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <ExternalLink size={18} />
                    {t.open}
                  </a>
                  <a
                    href={manual.href}
                    download
                    className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container-high text-on-surface rounded-2xl text-sm font-bold hover:bg-surface-container-highest transition-all"
                  >
                    <Download size={18} />
                    {t.download}
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
