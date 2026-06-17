import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpenCheck, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import { Language } from '../types';

interface AboutProjectProps {
  language: Language;
}

const translations = {
  pt: {
    eyebrow: 'Projeto educativo',
    title: 'Sobre o Conexao Residuos',
    subtitle:
      'Uma plataforma de apoio ao estudo, consulta e treinamento sobre classificacao de Residuos de Servicos de Saude, com base na RDC 222/2018.',
    purposeTitle: 'Objetivo',
    purposeText:
      'Organizar informacoes tecnicas em uma experiencia simples para equipes de saude, estudantes e gestores consultarem grupos RSS, cenarios praticos, quiz e materiais normativos.',
    baseTitle: 'Base normativa',
    baseText:
      'O conteudo foi estruturado a partir da RDC 222/2018 da ANVISA e deve ser usado como apoio educativo. A aplicacao pratica deve sempre observar o PGRSS da unidade e normas locais.',
    privacyTitle: 'Privacidade',
    privacyText:
      'No quiz, o CPF nao e exibido completo. Ele e usado apenas para recuperar cadastro e ranking, sendo mostrado de forma mascarada ao publico.',
    audienceTitle: 'Publico-alvo',
    audienceText:
      'Profissionais de saude, equipes de apoio, estudantes, docentes, gestores, responsaveis por PGRSS e pessoas que atuam com biosseguranca.',
    featuresTitle: 'O que o site oferece',
    features: [
      'Classificacao dos grupos A, B, C, D e E.',
      'Resumo tecnico filtravel por identificacao, acondicionamento e destino.',
      'Cenarios praticos com condutas corretas e erros comuns.',
      'Quiz com ranking, certificado e recuperacao de cadastro.',
      'Biblioteca normativa com acesso ao PDF da RDC 222/2018.',
    ],
    noticeTitle: 'Aviso importante',
    noticeText:
      'Este site nao substitui treinamento institucional, parecer tecnico, licenciamento ambiental ou procedimentos internos. Use como ferramenta de estudo e apoio a decisao.',
  },
  en: {
    eyebrow: 'Educational project',
    title: 'About Conexao Residuos',
    subtitle:
      'A platform for study, consultation, and training on Healthcare Waste classification, based on RDC 222/2018.',
    purposeTitle: 'Purpose',
    purposeText:
      'To organize technical information in a simple experience so healthcare teams, students, and managers can consult RSS groups, practical scenarios, quizzes, and regulatory materials.',
    baseTitle: 'Regulatory basis',
    baseText:
      'The content is structured from ANVISA RDC 222/2018 and should be used as educational support. Practical application must always follow the facility PGRSS and local rules.',
    privacyTitle: 'Privacy',
    privacyText:
      'In the quiz, the CPF is not displayed in full. It is used only for registration recovery and ranking, and is shown publicly only in masked form.',
    audienceTitle: 'Target audience',
    audienceText:
      'Healthcare professionals, support teams, students, teachers, managers, PGRSS leaders, and people working with biosafety.',
    featuresTitle: 'What the site offers',
    features: [
      'Classification of Groups A, B, C, D, and E.',
      'Technical summary filtered by identification, packaging, and destination.',
      'Practical scenarios with correct conduct and common mistakes.',
      'Quiz with ranking, certificate, and registration recovery.',
      'Regulatory library with access to the RDC 222/2018 PDF.',
    ],
    noticeTitle: 'Important notice',
    noticeText:
      'This site does not replace institutional training, technical opinions, environmental licensing, or internal procedures. Use it as a study and decision-support tool.',
  },
  es: {
    eyebrow: 'Proyecto educativo',
    title: 'Sobre Conexao Residuos',
    subtitle:
      'Una plataforma de apoyo al estudio, consulta y capacitacion sobre clasificacion de Residuos de Servicios de Salud, basada en la RDC 222/2018.',
    purposeTitle: 'Objetivo',
    purposeText:
      'Organizar informacion tecnica en una experiencia simple para que equipos de salud, estudiantes y gestores consulten grupos RSS, escenarios practicos, quiz y materiales normativos.',
    baseTitle: 'Base normativa',
    baseText:
      'El contenido fue estructurado a partir de la RDC 222/2018 de ANVISA y debe usarse como apoyo educativo. La aplicacion practica debe observar siempre el PGRSS de la unidad y las normas locales.',
    privacyTitle: 'Privacidad',
    privacyText:
      'En el quiz, el CPF no se muestra completo. Se usa solo para recuperar registro y ranking, y se exhibe publicamente solo de forma enmascarada.',
    audienceTitle: 'Publico objetivo',
    audienceText:
      'Profesionales de salud, equipos de apoyo, estudiantes, docentes, gestores, responsables de PGRSS y personas que trabajan con bioseguridad.',
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      'Clasificacion de los grupos A, B, C, D y E.',
      'Resumen tecnico filtrado por identificacion, acondicionamiento y destino.',
      'Escenarios practicos con conductas correctas y errores comunes.',
      'Quiz con ranking, certificado y recuperacion de registro.',
      'Biblioteca normativa con acceso al PDF de la RDC 222/2018.',
    ],
    noticeTitle: 'Aviso importante',
    noticeText:
      'Este sitio no sustituye capacitacion institucional, parecer tecnico, licenciamiento ambiental ni procedimientos internos. Uselo como herramienta de estudio y apoyo a la decision.',
  },
};

export const AboutProject: React.FC<AboutProjectProps> = ({ language }) => {
  const t = translations[language];
  const cards = [
    { title: t.purposeTitle, text: t.purposeText, icon: BookOpenCheck },
    { title: t.baseTitle, text: t.baseText, icon: ShieldCheck },
    { title: t.privacyTitle, text: t.privacyText, icon: Award },
    { title: t.audienceTitle, text: t.audienceText, icon: Users },
  ];

  return (
    <div id="about-project-view" className="flex flex-col gap-8 pb-24 md:pb-8">
      <section className="overflow-hidden rounded-[28px] bg-primary p-6 text-white shadow-xl shadow-primary/20 md:rounded-[40px] md:p-10">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-widest text-white/80">
            <GraduationCap size={14} />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{t.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{t.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="rounded-[24px] border border-outline-variant bg-white p-5 shadow-sm md:rounded-[28px] md:p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-black text-on-surface">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{card.text}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="grid gap-5 rounded-[28px] border border-outline-variant bg-white p-5 md:rounded-[32px] md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-primary">{t.featuresTitle}</p>
          <h3 className="mt-3 text-2xl font-black leading-tight text-on-surface">Conexao Residuos</h3>
        </div>

        <div className="grid gap-3">
          {t.features.map((feature) => (
            <div key={feature} className="flex gap-3 rounded-2xl bg-surface p-4">
              <CheckMark />
              <p className="text-sm font-bold leading-relaxed text-on-surface">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-primary/15 bg-primary/5 p-5 md:rounded-[28px] md:p-6">
        <p className="text-xs font-black uppercase tracking-widest text-primary">{t.noticeTitle}</p>
        <p className="mt-2 text-sm font-bold leading-relaxed text-on-surface">{t.noticeText}</p>
      </section>
    </div>
  );
};

function CheckMark() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
      <ShieldCheck size={14} />
    </span>
  );
}
