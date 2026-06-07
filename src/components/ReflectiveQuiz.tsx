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
    text: "Co najczęściej skłania Cię do otwarcia aplikacji społecznościowej?",
    options: [
      { text: "Mam konkretny powód — np. chcę napisać do znajomego lub sprawdzić określoną informację.", score: 1 },
      { text: "Zwykła ciekawość. Chcę zobaczyć, czy pojawiło się coś interesującego.", score: 2 },
      { text: "Czysta pamięć mięśniowa. Moje palce same klikają ikonę, zanim w ogóle pomyślę.", score: 3 },
      { text: "Nawyk wywołany niepokojem. Czuję się niespokojnie lub nudzę się i szukam szybkiego rozproszenia.", score: 4 }
    ]
  },
  {
    id: 2,
    text: "Jak się czujesz po przewijaniu tablicy przez ponad 30 minut?",
    options: [
      { text: "Dobrze. Dowiedziałem się, co u znajomych lub przeczytałem coś ciekawego i czuję satysfakcję.", score: 1 },
      { text: "Trochę zmęczony, ale bez problemu potrafię zamknąć aplikację i zająć się czymś innym.", score: 2 },
      { text: "Podekscytowany, ale niespokojny. Czuję, że muszę przewijać dalej, by znaleźć więcej.", score: 3 },
      { text: "Wyczerpany i pusty. Czuję się dziwnie odcięty od rzeczywistości i pokoju, w którym siedzę.", score: 4 }
    ]
  },
  {
    id: 3,
    text: "Jak wizerunek Twojej osoby w sieci ma się do tego, co naprawdę czujesz w środku?",
    options: [
      { text: "Są tacy sami. Rzadko coś publikuję, a kiedy to robię, po prostu jestem sobą.", score: 1 },
      { text: "W ogóle nic nie publikuję. Jestem tu tylko po to, by obserwować.", score: 2 },
      { text: "Staram się zachować autentyczność, ale to wciąż przypomina wyreżyserowany występ.", score: 3 },
      { text: "Mój profil to mocno upiększona wersja mojego życia. Ukrywam wszelkie prawdziwe problemy.", score: 4 }
    ]
  },
  {
    id: 4,
    text: "Kiedy próbujesz czytać książkę, oglądać film lub po prostu posiedzieć w ciszy, czy telefon Cię rozprasza?",
    options: [
      { text: "Rzadko. Z łatwością potrafię zaangażować się w spokojne zajęcia offline.", score: 1 },
      { text: "Czasami, ale potrafię zignorować powiadomienia i skupić się na tym, co robię.", score: 2 },
      { text: "Często. Czuję ciągłą pokusę sprawdzania telefonu, nawet jeśli nie ma tam nic pilnego.", score: 3 },
      { text: "Nieustannie. Mam problem z przeczytaniem chociażby strony lub posiedzeniem w ciszy bez patrzenia na ekran.", score: 4 }
    ]
  },
  {
    id: 5,
    text: "Jak się czujesz, gdy oglądasz posty znajomych lub influencerów?",
    options: [
      { text: "Dobrze lub neutralnie. Rozmawiam z nimi i czuję autentyczną więź.", score: 1 },
      { text: "Rozbawiony. Oglądam ich życie jako formę nieszkodliwej rozrywki.", score: 2 },
      { text: "Lekko poirytowany lub cyniczny. Denerwuje mnie, jak bardzo sztuczne i na pokaz są te posty.", score: 3 },
      { text: "Niepewnie. Oglądanie ich idealnego życia sprawia, że czuję, jakbym zostawał w tyle.", score: 4 }
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
        <span className="lib-concept">Twoje cyfrowe odbicie</span>
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
            Idea filozoficzna: {savedResult.philosophicalConcept}
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
            Reflektuj ponownie
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
            Pomoc i wsparcie
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
        <span>{currentIdx + 1} z {QUESTIONS.length}</span>
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
          {currentIdx === QUESTIONS.length - 1 ? "Zakończ refleksję" : "Następne pytanie"}
        </button>
      </div>
    </div>
  );
};
