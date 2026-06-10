import React, { useState } from 'react';
import { getResultFromScore } from '../utils/quizUtils';
import type { QuizResult } from '../utils/quizUtils';
import { useTranslation } from '../contexts/TranslationContext';
import type { TranslationKey } from '../utils/translations';

interface ReflectiveQuizProps {
  onComplete: (result: QuizResult) => void;
  onReset: () => void;
  savedResult: QuizResult | null;
}

export const ReflectiveQuiz: React.FC<ReflectiveQuizProps> = ({ onComplete, onReset, savedResult }) => {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  // We map the questions using the translation function so they update reactively
  const QUESTIONS = [
    {
      id: 1,
      text: t('quiz.q1Text'),
      options: [
        { text: t('quiz.q1a1'), score: 1 },
        { text: t('quiz.q1a2'), score: 2 },
        { text: t('quiz.q1a3'), score: 3 },
        { text: t('quiz.q1a4'), score: 4 }
      ]
    },
    {
      id: 2,
      text: t('quiz.q2Text'),
      options: [
        { text: t('quiz.q2a1'), score: 1 },
        { text: t('quiz.q2a2'), score: 2 },
        { text: t('quiz.q2a3'), score: 3 },
        { text: t('quiz.q2a4'), score: 4 }
      ]
    },
    {
      id: 3,
      text: t('quiz.q3Text'),
      options: [
        { text: t('quiz.q3a1'), score: 1 },
        { text: t('quiz.q3a2'), score: 2 },
        { text: t('quiz.q3a3'), score: 3 },
        { text: t('quiz.q3a4'), score: 4 }
      ]
    },
    {
      id: 4,
      text: t('quiz.q4Text'),
      options: [
        { text: t('quiz.q4a1'), score: 1 },
        { text: t('quiz.q4a2'), score: 2 },
        { text: t('quiz.q4a3'), score: 3 },
        { text: t('quiz.q4a4'), score: 4 }
      ]
    },
    {
      id: 5,
      text: t('quiz.q5Text'),
      options: [
        { text: t('quiz.q5a1'), score: 1 },
        { text: t('quiz.q5a2'), score: 2 },
        { text: t('quiz.q5a3'), score: 3 },
        { text: t('quiz.q5a4'), score: 4 }
      ]
    }
  ];

  const handleNext = () => {
    if (selectedScore === null) return;
    
    const newScores = [...scores, selectedScore];
    
    if (currentIdx < QUESTIONS.length - 1) {
      setScores(newScores);
      setSelectedScore(null);
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final
      const totalScore = newScores.reduce((a, b) => a + b, 0);
      onComplete(getResultFromScore(totalScore));
    }
  };

  if (savedResult) {
    return (
      <div className="quiz-results fade-in">
        <span className="lib-concept">{t('quiz.uiTag')}</span>
        <h3>{t(savedResult.titleKey as TranslationKey)}</h3>
        <p className="description">{t(savedResult.descriptionKey as TranslationKey)}</p>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          backgroundColor: 'var(--accent-sage-light)', 
          borderRadius: 'var(--radius-sm)',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-sage)',
          textAlign: 'left'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            {t('quiz.uiPhil')} {t(savedResult.philosophicalConceptKey as TranslationKey)}
          </h4>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {t(savedResult.insightKey as TranslationKey)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              setCurrentIdx(0);
              setScores([]);
              setSelectedScore(null);
              onReset();
            }}
            className="btn-secondary"
            style={{ marginTop: 0 }}
          >
            {t('quiz.uiBtnAgain')}
          </button>
          <a 
            href="#help" 
            className="btn-primary" 
            style={{ 
              textDecoration: 'none', 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500
            }}
          >
            {t('quiz.uiBtnHelp')}
          </a>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  return (
    <div className="quiz-card fade-in" key={currentIdx}>
      <div className="quiz-progress">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span>{currentIdx + 1} {t('quiz.uiOf')} {QUESTIONS.length}</span>
      </div>

      <h3 className="quiz-question">{currentQuestion.text}</h3>
      <div className="quiz-options">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selectedScore === opt.score ? 'selected' : ''}`}
            onClick={() => setSelectedScore(opt.score)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn-primary" 
          onClick={handleNext} 
          disabled={selectedScore === null}
          style={{ opacity: selectedScore === null ? 0.5 : 1, cursor: selectedScore === null ? 'not-allowed' : 'pointer' }}
        >
          {currentIdx === QUESTIONS.length - 1 ? t('quiz.uiBtnFinish') : t('quiz.uiBtnNext')}
        </button>
      </div>
    </div>
  );
};
