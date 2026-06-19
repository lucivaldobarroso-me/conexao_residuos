import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ } from '../constants';
import { loadQuizQuestions } from '../services/questionRepository';
import { createParticipant, findParticipantByCpf, loadLeaderboard, loadQuizStats, saveQuizAttempt } from '../services/quizParticipantRepository';
import { BarChart3, CheckCircle2, ChevronRight, GraduationCap, LogIn, Printer, RefreshCw, Target, Trophy, UserPlus, Users, XCircle } from 'lucide-react';
import { Language, QuizLeaderboardEntry, QuizParticipant, QuizQuestion, QuizStats } from '../types';

interface QuizProps {
  onComplete: (score: number, total: number) => void;
  language: Language;
}

const translations = {
  pt: {
    completed: 'Quiz concluído!',
    completedDesc: 'Você demonstrou seus conhecimentos em gestão de resíduos de saúde.',
    scoreLabel: 'Pontuação',
    correctLabel: 'Corretas',
    retryBtn: 'Refazer Desafio',
    challengeTitle: 'Desafio RSS',
    questionLabel: 'Questão',
    ofLabel: 'de',
    explanationTitle: 'Explicação técnica:',
    nextBtn: 'Próxima questão',
    resultBtn: 'Ver Resultado',
    chooseTitle: 'Escolha o tamanho do desafio',
    chooseDesc: 'As quest\u00f5es ser\u00e3o sorteadas aleatoriamente a cada tentativa.',
    allQuestions: 'Todas',
    availableLabel: 'quest\u00f5es dispon\u00edveis',
    identifyTitle: 'Identifica\u00e7\u00e3o do participante',
    identifyDesc: 'Use seu CPF para recuperar um cadastro existente ou crie um novo acesso.',
    existingBtn: 'Já tenho cadastro',
    newBtn: 'Novo cadastro',
    nameLabel: 'Nome',
    professionLabel: 'Profissão',
    cpfLabel: 'CPF',
    findBtn: 'Buscar cadastro',
    createBtn: 'Criar cadastro',
    participantLabel: 'Participante',
    attemptsLabel: 'tentativas anteriores',
    rankingTitle: 'Ranking da modalidade',
    emptyRanking: 'Ainda não há ranking para esta quantidade.',
    saveError: 'Não foi possível salvar o resultado no ranking.',
    statsTitle: 'Comunidade em treinamento',
    statsDesc: 'Acompanhe quantas pessoas já participaram do desafio e como está o desempenho geral.',
    participantsStat: 'participantes',
    attemptsStat: 'respostas enviadas',
    averageStat: 'média geral',
    topModeStat: 'modalidade mais escolhida',
    noTopMode: 'aguardando',
    loadingQuestions: 'Carregando questões...',
    privacyTitle: 'Privacidade dos dados',
    privacyText: 'Usamos nome e profissão para identificar o ranking. O CPF não fica visível: ele é transformado em código de segurança e exibido apenas de forma mascarada.',
    privacyConsent: 'Li e estou ciente do uso dos meus dados para cadastro, recuperação de acesso e ranking do quiz.',
    privacyRequired: 'Marque a ciência sobre privacidade para continuar.',
    rankingPreviewTitle: 'Consulte o ranking antes de começar',
    rankingPreviewDesc: 'Veja os melhores resultados por quantidade de questões e escolha sua modalidade.',
    loadingRanking: 'Carregando ranking...',
    certificateTitle: 'Certificado de participação',
    certificateSubtitle: 'Conexao Residuos | Quiz RSS',
    certificateIntro: 'Certificamos que',
    certificateBody: 'concluiu o desafio de classificação de Resíduos de Serviços de Saúde, com base educativa na RDC 222/2018.',
    certificateModeLabel: 'Modalidade',
    certificateScoreLabel: 'Resultado',
    certificateDateLabel: 'Data',
    certificateCpfLabel: 'CPF',
    certificateProfessionLabel: 'Profissão',
    certificateFooter: 'Documento educativo emitido automaticamente pelo site Conexao Residuos.',
    printCertificate: 'Imprimir certificado'
  },
  en: {
    completed: 'Quiz Completed!',
    completedDesc: 'You have demonstrated your knowledge in healthcare waste management.',
    scoreLabel: 'Score',
    correctLabel: 'Correct',
    retryBtn: 'Retry Challenge',
    challengeTitle: 'RSS Challenge',
    questionLabel: 'Question',
    ofLabel: 'of',
    explanationTitle: 'Technical Explanation:',
    nextBtn: 'Next Question',
    resultBtn: 'See Result',
    chooseTitle: 'Choose challenge size',
    chooseDesc: 'Questions will be randomly selected on each attempt.',
    allQuestions: 'All',
    availableLabel: 'available questions',
    identifyTitle: 'Participant identification',
    identifyDesc: 'Use your CPF to recover an existing record or create a new access.',
    existingBtn: 'I already registered',
    newBtn: 'New registration',
    nameLabel: 'Name',
    professionLabel: 'Profession',
    cpfLabel: 'CPF',
    findBtn: 'Find registration',
    createBtn: 'Create registration',
    participantLabel: 'Participant',
    attemptsLabel: 'previous attempts',
    rankingTitle: 'Mode ranking',
    emptyRanking: 'There is no ranking for this amount yet.',
    saveError: 'Could not save the result to the ranking.',
    statsTitle: 'Training community',
    statsDesc: 'See how many people have joined the challenge and the overall performance.',
    participantsStat: 'participants',
    attemptsStat: 'answers submitted',
    averageStat: 'overall average',
    topModeStat: 'most chosen mode',
    noTopMode: 'waiting',
    loadingQuestions: 'Loading questions...',
    privacyTitle: 'Data privacy',
    privacyText: 'Name and profession are used to identify the ranking. The CPF is not displayed in full: it is converted into a security code and shown only in masked form.',
    privacyConsent: 'I have read and understand how my data will be used for registration, access recovery, and quiz ranking.',
    privacyRequired: 'Please confirm the privacy notice before continuing.',
    rankingPreviewTitle: 'Check the ranking before starting',
    rankingPreviewDesc: 'See the best results by question amount and choose your mode.',
    loadingRanking: 'Loading ranking...',
    certificateTitle: 'Certificate of Participation',
    certificateSubtitle: 'Conexao Residuos | RSS Quiz',
    certificateIntro: 'This certifies that',
    certificateBody: 'completed the Healthcare Waste classification challenge, using RDC 222/2018 as an educational reference.',
    certificateModeLabel: 'Mode',
    certificateScoreLabel: 'Result',
    certificateDateLabel: 'Date',
    certificateCpfLabel: 'CPF',
    certificateProfessionLabel: 'Profession',
    certificateFooter: 'Educational document automatically issued by the Conexao Residuos website.',
    printCertificate: 'Print certificate'
  },
  es: {
    completed: '¡Quiz completado!',
    completedDesc: 'Ha demostrado sus conocimientos sobre la gestión de residuos de servicios de salud.',
    scoreLabel: 'Resultado',
    correctLabel: 'Correctas',
    retryBtn: 'Repetir desafío',
    challengeTitle: 'Desafío RSS',
    questionLabel: 'Pregunta',
    ofLabel: 'de',
    explanationTitle: 'Explicación técnica:',
    nextBtn: 'Siguiente pregunta',
    resultBtn: 'Ver resultado',
    chooseTitle: 'Elija el tamaño del desafío',
    chooseDesc: 'Las preguntas se sortearán aleatoriamente en cada intento.',
    allQuestions: 'Todas',
    availableLabel: 'preguntas disponibles',
    identifyTitle: 'Identificación del participante',
    identifyDesc: 'Use su CPF para recuperar un registro existente o crear un nuevo acceso.',
    existingBtn: 'Ya tengo registro',
    newBtn: 'Nuevo registro',
    nameLabel: 'Nombre',
    professionLabel: 'Profesión',
    cpfLabel: 'CPF',
    findBtn: 'Buscar registro',
    createBtn: 'Crear registro',
    participantLabel: 'Participante',
    attemptsLabel: 'intentos anteriores',
    rankingTitle: 'Ranking de la modalidad',
    emptyRanking: 'Todavía no hay ranking para esta cantidad.',
    saveError: 'No fue posible guardar el resultado en el ranking.',
    statsTitle: 'Comunidad en entrenamiento',
    statsDesc: 'Vea cuántas personas participaron en el desafío y cómo está el desempeño general.',
    participantsStat: 'participantes',
    attemptsStat: 'respuestas enviadas',
    averageStat: 'promedio general',
    topModeStat: 'modalidad más elegida',
    noTopMode: 'en espera',
    loadingQuestions: 'Cargando preguntas...',
    privacyTitle: 'Privacidad de los datos',
    privacyText: 'Usamos el nombre y la profesion para identificar el ranking. El CPF no se muestra completo: se transforma en un codigo de seguridad y se exhibe solo de forma enmascarada.',
    privacyConsent: 'Lei y comprendo el uso de mis datos para registro, recuperacion de acceso y ranking del quiz.',
    privacyRequired: 'Marque la confirmacion de privacidad para continuar.',
    rankingPreviewTitle: 'Consulte el ranking antes de comenzar',
    rankingPreviewDesc: 'Vea los mejores resultados por cantidad de preguntas y elija su modalidad.',
    loadingRanking: 'Cargando ranking...',
    certificateTitle: 'Certificado de Participacion',
    certificateSubtitle: 'Conexao Residuos | Quiz RSS',
    certificateIntro: 'Certificamos que',
    certificateBody: 'concluyo el desafio de clasificacion de Residuos de Servicios de Salud, con base educativa en la RDC 222/2018.',
    certificateModeLabel: 'Modalidad',
    certificateScoreLabel: 'Resultado',
    certificateDateLabel: 'Fecha',
    certificateCpfLabel: 'CPF',
    certificateProfessionLabel: 'Profesion',
    certificateFooter: 'Documento educativo emitido automaticamente por el sitio Conexao Residuos.',
    printCertificate: 'Imprimir certificado'
  }
};

function shuffleQuestions(questions: QuizQuestion[]) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function getLocale(language: Language) {
  if (language === 'en') return 'en-US';
  if (language === 'es') return 'es-ES';
  return 'pt-BR';
}

function formatQuestionMode(count: number, language: Language) {
  if (language === 'en') return `${count} ${count === 1 ? 'question' : 'questions'}`;
  if (language === 'es') return `${count} ${count === 1 ? 'pregunta' : 'preguntas'}`;
  return `${count} ${count === 1 ? 'questão' : 'questões'}`;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete, language }) => {
  const [participant, setParticipant] = React.useState<QuizParticipant | null>(null);
  const [participantMode, setParticipantMode] = React.useState<'lookup' | 'register'>('lookup');
  const [participantName, setParticipantName] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [participantError, setParticipantError] = React.useState('');
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);
  const [isParticipantLoading, setIsParticipantLoading] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [availableQuiz, setAvailableQuiz] = React.useState<QuizQuestion[]>(() => QUIZ[language]);
  const [isQuestionsLoading, setIsQuestionsLoading] = React.useState(false);
  const [currentQuiz, setCurrentQuiz] = React.useState<QuizQuestion[]>([]);
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [completedAt, setCompletedAt] = React.useState<Date | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = React.useState(0);
  const [leaderboard, setLeaderboard] = React.useState<QuizLeaderboardEntry[]>([]);
  const [leaderboardMode, setLeaderboardMode] = React.useState(0);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = React.useState(false);
  const [quizStats, setQuizStats] = React.useState<QuizStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = React.useState(true);
  const [saveError, setSaveError] = React.useState('');
  
  const t = translations[language];
  const certificateDate = React.useMemo(() => {
    const date = completedAt || new Date();

    return new Intl.DateTimeFormat(getLocale(language), {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [completedAt, language]);

  const handlePrintCertificate = () => {
    window.print();
  };

  React.useEffect(() => {
    let isActive = true;

    setIsQuestionsLoading(true);
    setAvailableQuiz(QUIZ[language]);
    setCurrentQuiz([]);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setCompletedAt(null);
    setLeaderboard([]);
    setSaveError('');

    loadQuizQuestions(language).then((questions) => {
      if (isActive) {
        setAvailableQuiz(questions);
        setIsQuestionsLoading(false);
      }
    }).catch(() => {
      if (isActive) setIsQuestionsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [language]);

  const refreshQuizStats = React.useCallback(async () => {
    setIsStatsLoading(true);
    const stats = await loadQuizStats();
    setQuizStats(stats);
    setIsStatsLoading(false);
  }, []);

  React.useEffect(() => {
    refreshQuizStats();
  }, [refreshQuizStats]);

  const questionCountOptions = React.useMemo(() => {
    const preferredOptions = [5, 10, 15, availableQuiz.length];
    return [...new Set(preferredOptions)]
      .filter((count) => count > 0 && count <= availableQuiz.length)
      .sort((a, b) => a - b);
  }, [availableQuiz.length]);

  React.useEffect(() => {
    if (!participant || currentQuiz.length > 0 || showResult || questionCountOptions.length === 0) return;

    const nextMode =
      leaderboardMode && questionCountOptions.includes(leaderboardMode)
        ? leaderboardMode
        : questionCountOptions[0];

    if (nextMode !== leaderboardMode) {
      setLeaderboardMode(nextMode);
      return;
    }

    let isActive = true;
    setIsLeaderboardLoading(true);

    loadLeaderboard(nextMode)
      .then((entries) => {
        if (isActive) setLeaderboard(entries);
      })
      .catch(() => {
        if (isActive) setLeaderboard([]);
      })
      .finally(() => {
        if (isActive) setIsLeaderboardLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [participant, currentQuiz.length, showResult, questionCountOptions, leaderboardMode]);

  const startQuiz = (questionCount: number) => {
    setCurrentQuiz(shuffleQuestions(availableQuiz).slice(0, questionCount));
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setCompletedAt(null);
    setStartedAt(Date.now());
    setSelectedQuestionCount(questionCount);
    setLeaderboard([]);
    setIsLeaderboardLoading(false);
    setSaveError('');
  };

  const handleFindParticipant = async () => {
    setParticipantError('');

    if (!privacyAccepted) {
      setParticipantError(t.privacyRequired);
      return;
    }

    setIsParticipantLoading(true);

    try {
      const nextParticipant = await findParticipantByCpf(cpf);
      if (!nextParticipant) {
        setParticipantError('Cadastro não encontrado. Crie um novo cadastro para continuar.');
        return;
      }
      setParticipant(nextParticipant);
    } catch (error) {
      setParticipantError(error instanceof Error ? error.message : 'Não foi possível buscar o cadastro.');
    } finally {
      setIsParticipantLoading(false);
    }
  };

  const handleCreateParticipant = async () => {
    setParticipantError('');

    if (!privacyAccepted) {
      setParticipantError(t.privacyRequired);
      return;
    }

    setIsParticipantLoading(true);

    try {
      const nextParticipant = await createParticipant({
        participantName,
        profession,
        cpf,
      });
      setParticipant(nextParticipant);
    } catch (error) {
      setParticipantError(error instanceof Error ? error.message : 'Não foi possível criar o cadastro.');
    } finally {
      setIsParticipantLoading(false);
    }
  };

  const refreshLeaderboard = async (questionCount: number) => {
    const entries = await loadLeaderboard(questionCount);
    setLeaderboard(entries);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const durationSeconds = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : 0;
      setShowResult(true);
      setCompletedAt(new Date());
      onComplete(score, currentQuiz.length);

      if (participant) {
        saveQuizAttempt({
          participant,
          questionCount: selectedQuestionCount || currentQuiz.length,
          score,
          totalQuestions: currentQuiz.length,
          durationSeconds,
        })
          .then((updatedParticipant) => {
            setParticipant(updatedParticipant);
            refreshLeaderboard(selectedQuestionCount || currentQuiz.length);
            refreshQuizStats();
          })
          .catch(() => {
            setSaveError(t.saveError);
            refreshLeaderboard(selectedQuestionCount || currentQuiz.length);
          });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz([]);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setCompletedAt(null);
    setStartedAt(null);
    setSelectedQuestionCount(0);
    setSaveError('');
    setLeaderboard([]);
  };

  if (availableQuiz.length === 0) {
    return null;
  }

  if (!participant) {
    const statsCards = [
      {
        label: t.participantsStat,
        value: quizStats?.participantCount ?? 0,
        icon: Users,
      },
      {
        label: t.attemptsStat,
        value: quizStats?.attemptCount ?? 0,
        icon: BarChart3,
      },
      {
        label: t.averageStat,
        value: `${quizStats?.averagePercentage ?? 0}%`,
        icon: Target,
      },
      {
        label: t.topModeStat,
        value: quizStats?.mostUsedQuestionCount ? `${quizStats.mostUsedQuestionCount}` : t.noTopMode,
        icon: Trophy,
      },
    ];

    return (
      <div id="quiz-view" className="max-w-3xl mx-auto flex flex-col gap-8 pb-24 md:pb-8">
        <header className="px-2">
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.identifyTitle}</h2>
          <p className="text-on-surface-variant leading-relaxed">{t.identifyDesc}</p>
        </header>

        <section className="overflow-hidden rounded-[28px] border border-outline-variant bg-white shadow-sm md:rounded-[32px]">
          <div className="border-b border-outline-variant p-5 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">
                  {t.statsTitle}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-on-surface-variant">
                  {t.statsDesc}
                </p>
              </div>
              <div className="hidden rounded-2xl bg-primary/10 p-3 text-primary sm:block">
                <GraduationCap size={28} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-surface p-4 md:grid-cols-4 md:p-5">
            {statsCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.label} className="rounded-2xl border border-outline-variant bg-white p-4 sm:p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <p className="text-xl font-black tracking-tight text-on-surface sm:text-2xl md:text-3xl">
                    {isStatsLoading ? '...' : card.value}
                  </p>
                  <p className="mt-1 min-h-10 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {card.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={() => setParticipantMode('lookup')}
            className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-bold transition-all ${participantMode === 'lookup' ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white text-on-surface'}`}
          >
            <LogIn size={18} />
            {t.existingBtn}
          </button>
          <button
            onClick={() => setParticipantMode('register')}
            className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-bold transition-all ${participantMode === 'register' ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white text-on-surface'}`}
          >
            <UserPlus size={18} />
            {t.newBtn}
          </button>
        </div>

        <div className="rounded-[28px] border border-outline-variant bg-white p-5 shadow-sm md:rounded-[32px] md:p-8">
          <div className="grid gap-4">
            {participantMode === 'register' && (
              <>
                <label className="grid gap-2 text-sm font-bold text-on-surface">
                  {t.nameLabel}
                  <input
                    value={participantName}
                    onChange={(event) => setParticipantName(event.target.value)}
                    className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 font-medium outline-none focus:border-primary"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-on-surface">
                  {t.professionLabel}
                  <input
                    value={profession}
                    onChange={(event) => setProfession(event.target.value)}
                    className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 font-medium outline-none focus:border-primary"
                  />
                </label>
              </>
            )}

            <label className="grid gap-2 text-sm font-bold text-on-surface">
              {t.cpfLabel}
              <input
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                inputMode="numeric"
                placeholder="000.000.000-00"
                className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 font-medium outline-none focus:border-primary"
              />
            </label>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary">
                {t.privacyTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {t.privacyText}
              </p>
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-bold leading-relaxed text-on-surface">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                />
                <span>{t.privacyConsent}</span>
              </label>
            </div>

            {participantError && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {participantError}
              </p>
            )}

            <button
              onClick={participantMode === 'lookup' ? handleFindParticipant : handleCreateParticipant}
              disabled={isParticipantLoading || !privacyAccepted}
              className="mt-2 rounded-2xl bg-primary px-6 py-4 font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {participantMode === 'lookup' ? t.findBtn : t.createBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuiz.length === 0) {
    return (
      <div id="quiz-view" className="max-w-3xl mx-auto flex flex-col gap-8 pb-24 md:pb-8">
        <header className="px-2">
          <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t.chooseTitle}</h2>
          <p className="text-on-surface-variant leading-relaxed">
            {t.chooseDesc}
          </p>
          <p className="mt-2 text-xs font-bold text-primary uppercase tracking-widest">
            {availableQuiz.length} {t.availableLabel}
          </p>
        </header>

        <div className="rounded-2xl border border-outline-variant bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t.participantLabel}</p>
          <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p className="font-bold text-on-surface">
              {participant.participantName} | {participant.profession}
            </p>
            <p className="text-sm font-bold text-primary">
              {participant.cpfMask} | {participant.attemptCount} {t.attemptsLabel}
            </p>
          </div>
        </div>

        {isQuestionsLoading ? (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center text-sm font-bold text-on-surface-variant">
            {t.loadingQuestions}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {questionCountOptions.map((count) => (
              <button
                key={count}
                onClick={() => startQuiz(count)}
                className="rounded-2xl border border-outline-variant bg-white p-6 text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 active:scale-[0.98]"
              >
                <span className="block text-3xl font-black text-primary">
                  {count === availableQuiz.length ? t.allQuestions : count}
                </span>
                <span className="mt-2 block text-sm font-bold text-on-surface-variant">
                  {count === 1 ? t.questionLabel : t.availableLabel.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        )}

        {!isQuestionsLoading && (
          <section className="rounded-[28px] border border-outline-variant bg-white p-5 shadow-sm md:rounded-[32px] md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
                  <Trophy size={14} />
                  {t.rankingTitle}
                </div>
                <h3 className="text-xl font-black leading-tight text-on-surface">{t.rankingPreviewTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t.rankingPreviewDesc}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {questionCountOptions.map((count) => (
                  <button
                    key={count}
                    onClick={() => setLeaderboardMode(count)}
                    className={`rounded-xl px-3 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                      leaderboardMode === count
                        ? 'bg-primary text-white'
                        : 'border border-outline-variant bg-surface text-on-surface-variant hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {count === availableQuiz.length ? t.allQuestions : count}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-outline-variant">
              {isLeaderboardLoading ? (
                <p className="bg-surface-container-low p-5 text-center text-sm font-bold text-on-surface-variant">
                  {t.loadingRanking}
                </p>
              ) : leaderboard.length > 0 ? (
                leaderboard.slice(0, 5).map((entry, index) => (
                  <div
                    key={entry.id}
                    className="grid gap-2 border-b border-outline-variant bg-white p-4 last:border-b-0 md:grid-cols-[40px_1fr_auto] md:items-center"
                  >
                    <div className="text-xl font-black text-primary">{index + 1}</div>
                    <div>
                      <p className="font-bold text-on-surface">{entry.participantName}</p>
                      <p className="text-sm text-on-surface-variant">{entry.profession} | {entry.cpfMask}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-black text-on-surface">{entry.percentage}% ({entry.score}/{entry.totalQuestions})</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{entry.durationSeconds}s</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="bg-surface-container-low p-5 text-center text-sm font-bold text-on-surface-variant">
                  {t.emptyRanking}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-12 px-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white mb-8 shadow-xl shadow-primary/20"
        >
          <GraduationCap size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">{t.completed}</h2>
        <p className="text-on-surface-variant mb-12">{t.completedDesc}</p>
        
      <div className="mb-10 grid w-full grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{t.scoreLabel}</p>
            <p className="text-3xl font-black text-primary sm:text-4xl">{Math.round((score / currentQuiz.length) * 100)}%</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{t.correctLabel}</p>
            <p className="text-3xl font-black text-on-surface sm:text-4xl">{score}/{currentQuiz.length}</p>
          </div>
        </div>

        <section
          id="quiz-certificate"
          className="relative mb-8 aspect-[1.414/1] w-full overflow-hidden rounded-[18px] border border-primary/20 bg-white bg-cover bg-center text-left shadow-xl shadow-surface-container-highest/40"
          style={{ backgroundImage: "url('/images/certificate-background.png')" }}
        >
          <div className="absolute inset-0 bg-white/58" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/76 to-white/64" />

          <div className="relative flex h-full flex-col p-5 sm:p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <img
                src="/images/site-slogan.jpg"
                alt="Conexao Residuos"
                className="h-16 w-32 rounded-xl border border-primary/10 bg-white object-cover shadow-sm sm:h-18 sm:w-36 md:h-24 md:w-48"
              />

              <div className="max-w-[62%] rounded-2xl border border-primary/15 bg-white/92 px-4 py-3 text-right shadow-lg backdrop-blur-sm md:px-6 md:py-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary md:text-xs">{t.certificateSubtitle}</p>
                <h3 className="text-[1.8rem] font-black leading-tight text-on-surface md:text-[2.7rem]">{t.certificateTitle}</h3>
              </div>
            </div>

            <div className="my-3 flex flex-1 flex-col justify-center rounded-3xl border border-primary/15 bg-white/68 p-5 shadow-xl shadow-primary/5 backdrop-blur-[1px] md:my-6 md:p-9">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary md:text-sm">{t.certificateIntro}</p>
              <p className="mt-2 text-[2.2rem] font-black leading-[0.95] text-on-surface drop-shadow-sm sm:text-[2.8rem] md:text-[4.8rem]">
                {participant?.participantName || 'Participante'}
              </p>
              <p className="mt-4 max-w-4xl text-sm font-black leading-relaxed text-on-surface sm:text-base md:mt-6 md:text-[1.3rem]">
                {t.certificateBody}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-8">
                <div className="rounded-xl border border-primary/15 bg-white/94 p-4 shadow-md backdrop-blur-sm md:rounded-2xl md:p-5">
                  <p className="text-[8px] font-black uppercase tracking-widest text-primary md:text-[10px]">{t.certificateProfessionLabel}</p>
                  <p className="mt-1 truncate text-base font-black text-on-surface md:text-[1.1rem]">{participant?.profession || '-'}</p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-white/94 p-4 shadow-md backdrop-blur-sm md:rounded-2xl md:p-5">
                  <p className="text-[8px] font-black uppercase tracking-widest text-primary md:text-[10px]">{t.certificateModeLabel}</p>
                  <p className="mt-1 text-base font-black text-on-surface md:text-[1.1rem]">
                    {formatQuestionMode(selectedQuestionCount || currentQuiz.length, language)}
                  </p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-white/94 p-4 shadow-md backdrop-blur-sm md:rounded-2xl md:p-5">
                  <p className="text-[8px] font-black uppercase tracking-widest text-primary md:text-[10px]">{t.certificateScoreLabel}</p>
                  <p className="mt-1 text-base font-black text-on-surface md:text-[1.1rem]">
                    {Math.round((score / currentQuiz.length) * 100)}% ({score}/{currentQuiz.length})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-primary/15 bg-white/84 px-4 py-3 shadow-md backdrop-blur-sm md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black text-on-surface md:text-base">
                  {t.certificateDateLabel}: {certificateDate}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-on-surface-variant md:text-xs">{t.certificateFooter}</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary md:text-xs">
                RDC 222/2018
              </p>
            </div>
          </div>
        </section>

        <button
          onClick={handlePrintCertificate}
          className="no-print mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-white px-8 py-4 font-bold text-primary shadow-sm transition-all hover:scale-[1.02] hover:border-primary/40 active:scale-[0.98] sm:w-auto"
        >
          <Printer size={20} />
          {t.printCertificate}
        </button>

        <button 
          onClick={resetQuiz}
          className="no-print flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <RefreshCw size={20} />
          {t.retryBtn}
        </button>

        {saveError && (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {saveError}
          </p>
        )}

        <section className="mt-12 w-full text-left">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="text-primary" size={22} />
            <h3 className="text-xl font-bold">{t.rankingTitle} - {selectedQuestionCount || currentQuiz.length}</h3>
          </div>

          {leaderboard.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-outline-variant bg-white">
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="grid gap-2 border-b border-outline-variant p-4 last:border-b-0 md:grid-cols-[48px_1fr_auto] md:items-center">
                  <div className="text-2xl font-black text-primary">{index + 1}</div>
                  <div>
                    <p className="font-bold text-on-surface">{entry.participantName}</p>
                    <p className="text-sm text-on-surface-variant">{entry.profession} | {entry.cpfMask}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-black text-on-surface">{entry.percentage}% ({entry.score}/{entry.totalQuestions})</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{entry.durationSeconds}s</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center text-on-surface-variant">
              {t.emptyRanking}
            </p>
          )}
        </section>
      </div>
    );
  }

  const question = currentQuiz[currentQuestion];

  return (
    <div id="quiz-view" className="max-w-3xl mx-auto flex flex-col gap-8 pb-24 md:pb-8">
      <header className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold">{t.challengeTitle}</h2>
          <p className="text-xs font-bold text-primary uppercase tracking-widest">{question.category}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t.questionLabel}</p>
          <p className="font-black text-lg">{currentQuestion + 1} {t.ofLabel} {currentQuiz.length}</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
          className="h-full bg-primary"
        />
      </div>

      <div className="rounded-[28px] border border-outline-variant bg-white p-5 shadow-xl shadow-surface-container-highest/20 md:rounded-[40px] md:p-12">
        <h3 className="mb-6 text-lg font-bold leading-tight md:mb-8 md:text-2xl">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctAnswer;
            
            let stateClass = 'border-outline-variant hover:border-primary/50';
            if (isAnswered) {
              if (isCorrect) stateClass = 'bg-green-50 border-green-500 text-green-900 shadow-sm shadow-green-100';
              else if (isSelected) stateClass = 'bg-red-50 border-red-500 text-red-900 shadow-sm shadow-red-100';
              else stateClass = 'opacity-50 grayscale border-outline-variant';
            } else if (isSelected) {
              stateClass = 'border-primary ring-2 ring-primary/20';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionClick(idx)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-4 font-medium ${stateClass}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="text-green-600 shrink-0" size={24} />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-600 shrink-0" size={24} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-2xl bg-surface-container-high border border-outline-variant"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${selectedOption === question.correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   {selectedOption === question.correctAnswer ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t.explanationTitle}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleNext}
                className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-on-surface text-white rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                {currentQuestion < currentQuiz.length - 1 ? t.nextBtn : t.resultBtn}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
