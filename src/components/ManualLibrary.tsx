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
    title: 'Biblioteca Normativa',
    subtitle: 'Referências técnicas usadas para classificação, identificação, manejo e destinação dos Resíduos de Serviços de Saúde.',
    back: 'Voltar ao início',
    open: 'Abrir PDF',
    download: 'Baixar PDF',
    documents: 'Documentos disponíveis',
    manualTitle: 'RDC Nº 222, de 28 de março de 2018',
    manualDescription:
      'Norma da ANVISA que regulamenta as Boas Práticas de Gerenciamento dos Resíduos de Serviços de Saúde, incluindo grupos A, B, C, D e E, PGRSS, segregação, acondicionamento, identificação, armazenamento, transporte e destinação.',
  },
  en: {
    title: 'Manual Library',
    subtitle: 'Technical documents and reference standards for healthcare waste management.',
    back: 'Back to home',
    open: 'Open PDF',
    download: 'Download PDF',
    documents: 'Available documents',
    manualTitle: 'RDC No. 222, March 28, 2018',
    manualDescription:
      'ANVISA standard that regulates good practices for healthcare waste management, including Groups A, B, C, D, and E, PGRSS, segregation, packaging, identification, storage, transport, and final destination.',
  },
  es: {
    title: 'Biblioteca normativa',
    subtitle: 'Documentos técnicos y referencias normativas utilizados para clasificar, identificar, manejar y destinar residuos de servicios de salud.',
    back: 'Volver al inicio',
    open: 'Abrir PDF',
    download: 'Descargar PDF',
    documents: 'Documentos disponibles',
    manualTitle: 'RDC n.º 222, de 28 de marzo de 2018',
    manualDescription:
      'Norma de ANVISA que reglamenta las buenas prácticas de gestión de los residuos de servicios de salud, incluidos los grupos A, B, C, D y E, el PGRSS, la segregación, el acondicionamiento, la identificación, el almacenamiento, el transporte y la destinación.',
  },
};

const manuals = [
  {
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
            className="rounded-[28px] border border-outline-variant bg-white p-5 transition-all hover:shadow-xl md:rounded-[32px] md:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText size={28} />
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-bold text-on-surface mb-3">{t.manualTitle || 'RDC Nº 222, de 28 de março de 2018'}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {t.manualDescription || 'Norma da ANVISA que regulamenta as Boas Práticas de Gerenciamento dos Resíduos de Serviços de Saúde, incluindo grupos A, B, C, D e E, PGRSS, segregação, acondicionamento, identificação, armazenamento, transporte e destinação.'}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={manual.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink size={18} />
                    {t.open}
                  </a>
                  <a
                    href={manual.href}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface transition-all hover:bg-surface-container-highest"
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
