
import React, { useState } from 'react';

interface QuizViewProps {
  onComplete: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    text: "Are you at least 18 years of age?",
    options: ["Yes, I am 18+", "No, I am younger"]
  },
  {
    id: 2,
    text: "What is your primary goal for chatting?",
    options: ["Casual Conversation", "Making Friends", "Dating/Romance", "Just Bored"]
  },
  {
    id: 3,
    text: "Do you agree to respect other users' privacy and follow our community guidelines?",
    options: ["I Agree", "Tell me more"]
  }
];

const QuizView: React.FC<QuizViewProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionClick = (option: string) => {
    if (isTransitioning) return;

    // Logic for "No" or "Tell me more" could be added here, but for a funnel we usually just proceed
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        onComplete();
      }
    }, 400);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden w-full border border-gray-100 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="whatsapp-teal p-6 text-center text-white">
        <h2 className="text-xl font-bold">Quick Verification</h2>
        <p className="text-teal-50/70 text-xs mt-1">Step {currentQuestion + 1} of {QUESTIONS.length}</p>
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
            {QUESTIONS[currentQuestion].text}
          </h3>
        </div>

        <div className="space-y-3">
          {QUESTIONS[currentQuestion].options.map((option, index) => (
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
          <i className="fa-solid fa-lock mr-1"></i> Your answers are anonymous
        </p>
      </div>
    </div>
  );
};

export default QuizView;
