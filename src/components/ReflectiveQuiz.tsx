import React, { useState } from 'react';

export interface QuizResult {
  score: number;
  profileId: 'anchor' | 'spectator' | 'connected' | 'fatigue';
  title: string;
  description: string;
  philosophicalConcept: string;
  insight: string;
}

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
    text: "When you open a social media app, what is your primary immediate sensation?",
    options: [
      { text: "Purposeful intent to message a specific person or check a particular update.", score: 1 },
      { text: "Curiosity or seeking a quick burst of connection.", score: 2 },
      { text: "Habitual impulse—my fingers open it without thinking.", score: 3 },
      { text: "Anxious expectation or scanning for validation.", score: 4 }
    ]
  },
  {
    id: 2,
    text: "How do you feel after spending more than 30 minutes scrolling through your feed?",
    options: [
      { text: "Calm and satisfied with the information or connections gathered.", score: 1 },
      { text: "Slightly fatigued, but ready to shut the screen and move on.", score: 2 },
      { text: "Stimulated but anxious, wanting to see even more.", score: 3 },
      { text: "Drained, empty, or vaguely disconnected from my physical space.", score: 4 }
    ]
  },
  {
    id: 3,
    text: "How does the 'online persona' you project compare to your internal lived experience?",
    options: [
      { text: "They are mostly aligned; I write/share rarely, and only with authenticity.", score: 1 },
      { text: "I don't project any persona; I am purely a silent observer.", score: 2 },
      { text: "I try to keep it honest, but it still feels like an curated performance.", score: 3 },
      { text: "It represents a carefully optimized version that hides my struggles.", score: 4 }
    ]
  },
  {
    id: 4,
    text: "When trying to focus on a book, film, or quiet thought, how often do you feel the pull of notifications?",
    options: [
      { text: "Rarely—I can immerse myself easily in slow, analog activities.", score: 1 },
      { text: "Occasionally, but I can easily resist the urge to check.", score: 2 },
      { text: "Often, but it's only to verify urgent updates, not casual feeds.", score: 3 },
      { text: "Frequently; I struggle to read a single page or sit in silence without looking.", score: 4 }
    ]
  },
  {
    id: 5,
    text: "What is your primary relationship with the digital 'Others' (influencers, friends, peers) on screen?",
    options: [
      { text: "Active engagement—I genuinely converse and build real-world connections.", score: 1 },
      { text: "Distracted entertainment—I watch their lives as a form of harmless noise.", score: 2 },
      { text: "Cynical critique—I watch but feel detached or frustrated by the performative nature.", score: 3 },
      { text: "Passive comparison—I feel inadequate seeing their achievements or aesthetics.", score: 4 }
    ]
  }
];

export const getResultFromScore = (score: number): QuizResult => {
  if (score <= 8) {
    return {
      score,
      profileId: 'anchor',
      title: "The Anchor (Digital Harmony)",
      description: "You maintain an intentional and grounded relationship with the digital sphere. Social media is a tool, not a mirror or a prison. You remain connected to your immediate physical reality.",
      philosophicalConcept: "Stoic Dichotomy of Control",
      insight: "You exercise choice in what you pay attention to. Keep protecting your silence, as it allows your inner self to remain coherent rather than scattered."
    };
  } else if (score <= 12) {
    return {
      score,
      profileId: 'spectator',
      title: "The Spectator (Detached Noise)",
      description: "You use screens mostly for passive entertainment. While you don't feel acute despair, you risk using digital noise to fill quiet spaces, slowly eroding your capacity for deep reflection.",
      philosophicalConcept: "Pascalian Diversion (Divertissement)",
      insight: "Blaise Pascal argued we seek distraction to avoid sitting in a quiet room with ourselves. Try choosing complete silence over passive scroll time once a day."
    };
  } else if (score <= 16) {
    return {
      score,
      profileId: 'connected',
      title: "The Hyper-Connected (The Curation Loop)",
      description: "You are deeply caught in the performative loops of the network. You feel a constant pull to check notification dynamics, leading to imposter anxiety, comparison fatigue, and a fractured attention span.",
      philosophicalConcept: "Baudrillard's Simulacra",
      insight: "You are editing a copy of yourself for others to view, which can create a gap between your online avatar and your lived experience. Focus on experiences you do not capture on camera."
    };
  } else {
    return {
      score,
      profileId: 'fatigue',
      title: "The Fatigue-Bound (Sisyphus of the Scroll)",
      description: "You are experiencing acute digital burnout and existential alienation. The screen has become an involuntary habit that separates you from your immediate reality, leaving you feeling empty, fatigued, or anxious.",
      philosophicalConcept: "Byung-Chul Han's Fatigue Society",
      insight: "You are self-exploiting in pursuit of connection and optimization. The cure is not more productivity, but the 'peaceful tiredness' that comes from real, physical pauses and doing nothing."
    };
  }
};

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
            Philosophical Concept: {savedResult.philosophicalConcept}
          </h4>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {savedResult.insight}
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => {
            setCurrentIdx(0);
            setSelectedScore(null);
            setTotalScore(0);
            onReset();
          }}
        >
          Reflect Again
        </button>
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
