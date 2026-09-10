
import React, { useState } from 'react';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface QuizViewProps {
  onComplete: () => void;
  lang?: SupportedLanguage;
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete, lang = 'en' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const questions = t.quiz.questions;

  const handleOptionClick = (_option: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        onComplete();
      }
    }, 400);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const stepText = t.quiz.stepOf
    .replace('{current}', String(currentQuestion + 1))
    .replace('{total}', String(questions.length));

  return (
    <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden w-full border border-gray-100 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="whatsapp-teal p-6 text-center text-white">
        <h2 className="text-xl font-bold">{t.quiz.headerTitle}</h2>
        <p className="text-teal-50/70 text-xs mt-1">{stepText}</p>
      </div>

      <div className="p-8">
        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="whatsapp-green h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="min-h-[120px] flex items-center justify-center text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {questions[currentQuestion].text}
          </h3>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 hover:border-teal-500 hover:bg-teal-50 text-gray-700 font-bold transition-all text-left flex items-center justify-between group"
            >
              <span>{option}</span>
              <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-teal-500 transition-colors"></i>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <i className="fa-solid fa-lock mr-1"></i> {t.quiz.anonymous}
        </p>
      </div>
    </div>
  );
};

export default QuizView;
