import React, { useState } from 'react';
import { getResultFromScore } from '../utils/quizUtils';
import type { QuizResult } from '../utils/quizUtils';

interface ReflectiveQuizProps {
  onComplete: (result: QuizResult) => void;
  onReset: () => void;
  savedResult: QuizResult | null;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "When you open a social media app, what's usually the trigger?",
    options: [
      { text: "I have a specific reason—like messaging a friend or looking up a particular page.", score: 1 },
      { text: "Just curiosity. I want to see if anything interesting has popped up.", score: 2 },
      { text: "Pure muscle memory. My fingers just tap the icon without me even thinking.", score: 3 },
      { text: "Nervous habit. I feel anxious or bored and look for a quick distraction.", score: 4 }
    ]
  },
  {
    id: 2,
    text: "How do you feel after scrolling through your feed for more than 30 minutes?",
    options: [
      { text: "Good. I caught up with friends or read something interesting and feel satisfied.", score: 1 },
      { text: "A little tired, but it's easy for me to close the app and move on.", score: 2 },
      { text: "Hyped up but anxious. I feel like I need to keep scrolling to find more.", score: 3 },
      { text: "Drained and empty. I feel strangely disconnected from the actual room I'm sitting in.", score: 4 }
    ]
  },
  {
    id: 3,
    text: "How does the 'you' on screen compare to how you actually feel inside?",
    options: [
      { text: "They're the same. I rarely post, and when I do, I'm just being myself.", score: 1 },
      { text: "I don't post anything at all. I'm just here to watch.", score: 2 },
      { text: "I try to keep it real, but it still feels like a polished performance.", score: 3 },
      { text: "My profile is a highly optimized version of my life. I hide all my real struggles.", score: 4 }
    ]
  },
  {
    id: 4,
    text: "When you try to read a book, watch a movie, or just sit quietly, does your phone pull you back?",
    options: [
      { text: "Rarely. I can easily lose myself in offline, quiet activities.", score: 1 },
      { text: "Sometimes, but I can easily ignore the notifications and keep focusing.", score: 2 },
      { text: "Often. I feel this constant itch to check for updates, even if they aren't urgent.", score: 3 },
      { text: "Constantly. I struggle to read a single page or sit in silence without looking at the screen.", score: 4 }
    ]
  },
  {
    id: 5,
    text: "How do you feel when looking at posts from friends or influencers?",
    options: [
      { text: "Happy or neutral. I chat with them and feel genuinely connected.", score: 1 },
      { text: "Amused. I just watch their lives as a form of harmless entertainment.", score: 2 },
      { text: "A bit annoyed or cynical about how performative everyone's posts are.", score: 3 },
      { text: "Insecure. Seeing their highlight reels makes me feel like I'm falling behind.", score: 4 }
    ]
  }
];

export const ReflectiveQuiz: React.FC<ReflectiveQuizProps> = ({ onComplete, onReset, savedResult }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const handleNext = () => {
    if (selectedScore === null) return;
    
    const newTotal = totalScore + selectedScore;
    setTotalScore(newTotal);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedScore(null);
    } else {
      const finalResult = getResultFromScore(newTotal);
      onComplete(finalResult);
    }
  };

  const handleSelect = (score: number) => {
    setSelectedScore(score);
  };

  const currentQuestion = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  if (savedResult) {
    return (
      <div className="quiz-results fade-in">
        <span className="lib-concept">Your Digital Reflection</span>
        <h3>{savedResult.title}</h3>
        <p className="description">{savedResult.description}</p>
        
        <div style={{ 
          backgroundColor: 'var(--accent-sage-light)', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-sm)', 
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-sage)',
          textAlign: 'left'
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Philosophical Idea: {savedResult.philosophicalConcept}
          </h4>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {savedResult.insight}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            onClick={() => {
              setCurrentIdx(0);
              setSelectedScore(null);
              setTotalScore(0);
              onReset();
            }}
            style={{ marginTop: 0 }}
          >
            Reflect Again
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
            Get Help & Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-card fade-in">
      <div className="quiz-progress">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span>{currentIdx + 1} of {QUESTIONS.length}</span>
      </div>

      <h3 className="quiz-question">{currentQuestion.text}</h3>

      <div className="quiz-options">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selectedScore === opt.score ? 'selected' : ''}`}
            onClick={() => handleSelect(opt.score)}
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
          {currentIdx === QUESTIONS.length - 1 ? "Finish Reflection" : "Next Question"}
        </button>
      </div>
    </div>
  );
};
