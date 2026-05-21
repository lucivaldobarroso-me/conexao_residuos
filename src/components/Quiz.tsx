import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ } from '../constants';
import { CheckCircle2, XCircle, RefreshCw, ChevronRight, GraduationCap } from 'lucide-react';
import { Language } from '../types';

interface QuizProps {
  onComplete: (score: number, total: number) => void;
  language: Language;
}

const translations = {
  pt: {
    completed: 'Quiz Completado!',
    completedDesc: 'Você demonstrou seus conhecimentos em gestão de resíduos de saúde.',
    scoreLabel: 'Pontuação',
    correctLabel: 'Corretas',
    retryBtn: 'Refazer Desafio',
    challengeTitle: 'Desafio RSS',
    questionLabel: 'Questão',
    ofLabel: 'de',
    explanationTitle: 'Explicação Técnica:',
    nextBtn: 'Próxima Questão',
    resultBtn: 'Ver Resultado'
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
    resultBtn: 'See Result'
  },
  es: {
    completed: '¡Cuestionario Completado!',
    completedDesc: 'Ha demostrado sus conocimientos en la gestión de residuos sanitarios.',
    scoreLabel: 'Puntuación',
    correctLabel: 'Correctas',
    retryBtn: 'Rehacer Desafío',
    challengeTitle: 'Desafío RSS',
    questionLabel: 'Pregunta',
    ofLabel: 'de',
    explanationTitle: 'Explicación Técnica:',
    nextBtn: 'Siguiente Pregunta',
    resultBtn: 'Ver Resultado'
  }
};

export const Quiz: React.FC<QuizProps> = ({ onComplete, language }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  
  const currentQuiz = QUIZ[language];
  const t = translations[language];

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
      setShowResult(true);
      onComplete(score, currentQuiz.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center py-12 px-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white mb-8 shadow-xl shadow-primary/20"
        >
          <GraduationCap size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">{t.completed}</h2>
        <p className="text-on-surface-variant mb-12">{t.completedDesc}</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{t.scoreLabel}</p>
            <p className="text-4xl font-black text-primary">{Math.round((score / currentQuiz.length) * 100)}%</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{t.correctLabel}</p>
            <p className="text-4xl font-black text-on-surface">{score}/{currentQuiz.length}</p>
          </div>
        </div>

        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <RefreshCw size={20} />
          {t.retryBtn}
        </button>
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

      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-outline-variant shadow-xl shadow-surface-container-highest/20">
        <h3 className="text-xl md:text-2xl font-bold leading-tight mb-8">
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
