import { useState } from 'react';
import { ReflectiveQuiz } from './components/ReflectiveQuiz';
import type { QuizResult } from './components/ReflectiveQuiz';
import { ConceptMap } from './components/ConceptMap';
import { FocusSpace } from './components/FocusSpace';
import { Shield, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

function App() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
  };

  const handleQuizReset = () => {
    setQuizResult(null);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="app-header fade-in">
        <span className="lib-concept" style={{ letterSpacing: '0.15em', color: 'var(--accent-clay)' }}>
          A Student Philosophical Inquiry
        </span>
        <h1>Echoes of the Screen</h1>
        <p className="subtitle">
          An interactive contemplation of digital alienation, fatigue, and depression in the age of algorithmic connection.
        </p>
        <div className="divider"></div>
      </header>

      {/* Intro Essay */}
      <section className="section fade-in">
        <div className="grid-2">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>
              The Algorithmic Mirror
            </h2>
            <p>
              In our hyper-connected world, we have traded actual presence for virtual proximity. We scroll through streams of curated events, converting our organic life experiences into digital artifacts to seek reaction and validation.
            </p>
            <p>
              This landing page is designed to help you pause. By examining the structural connections between digital design and your mental state, we aim to move beyond simple screen-time metrics to explore the existential weight of living behind glass.
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
              Core Inquiry
            </h3>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>
              Does social media alleviate loneliness, or does it merely automate it? Through these interactive features, we examine how the design of the feed shapes the structure of our fatigue and isolation.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <div className="quote-section fade-in">
        <blockquote className="quote-text">
          &ldquo;We live in a world where there is more and more information, and less and less meaning.&rdquo;
        </blockquote>
        <cite className="quote-author">— Jean Baudrillard, Simulacra and Simulation</cite>
      </div>

      {/* Interactive Questionnaire */}
      <section className="section" id="diagnostics">
        <div className="section-title-wrap">
          <h2 className="section-title">I. Reflective Diagnostics</h2>
          <p className="section-subtitle">
            Answer these introspective questions to examine your digital habits and calculate your current state of alienation.
          </p>
        </div>
        <div className="quiz-container">
          <ReflectiveQuiz 
            onComplete={handleQuizComplete} 
            onReset={handleQuizReset}
            savedResult={quizResult}
          />
        </div>
      </section>

      {/* Behavioral Concept Map */}
      <section className="section" id="network">
        <div className="section-title-wrap">
          <h2 className="section-title">II. The Dependency Network</h2>
          <p className="section-subtitle">
            Explore how micro-habits feed into cognitive loops, eventually manifesting as existential states of fatigue or burnout.
          </p>
        </div>
        <ConceptMap activeResult={quizResult} />
      </section>

      {/* Focus Sanctuary (Soma Room) */}
      <section className="section" id="sanctuary">
        <div className="section-title-wrap">
          <h2 className="section-title">III. Grounding Sanctuary</h2>
          <p className="section-subtitle">
            A quiet space to detach from the scroll. Practice box breathing, listen to synthesized soundscapes, or play our philosophical podcast audio.
          </p>
        </div>
        <FocusSpace />
      </section>

      {/* Recommendations */}
      <section className="section">
        <div className="section-title-wrap">
          <h2 className="section-title">IV. Grounding Practices</h2>
          <p className="section-subtitle">
            Simple, actionable strategies based on philosophical wisdom to reclaim attention and presence.
          </p>
        </div>
        <div className="rec-grid">
          <div className="rec-card">
            <div className="rec-icon">
              <Shield size={20} />
            </div>
            <h4 className="rec-title">Attention Quarantine</h4>
            <p>
              Designate a physical boundary in your home (e.g., your desk or bed) where screens are completely prohibited. Reclaim your environment for offline thoughts.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <Sparkles size={20} />
            </div>
            <h4 className="rec-title">Radical Boredom</h4>
            <p>
              Commit to 10 minutes of complete silence each day with no stimulation. Allow your mind to settle from constant pings and experience grounding boredom.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <BookOpen size={20} />
            </div>
            <h4 className="rec-title">Analog Anchors</h4>
            <p>
              Replace one digital habit with an analog version. Write down your diary on physical paper, read a print book, or converse without recording the event.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophical Library */}
      <section className="section">
        <div className="section-title-wrap">
          <h2 className="section-title">V. Theoretical Library</h2>
          <p className="section-subtitle">
            Deepen your understanding of digital fatigue through these theoretical and philosophical summaries.
          </p>
        </div>
        <div className="library-grid">
          <div className="card lib-card">
            <div>
              <span className="lib-concept">Byung-Chul Han</span>
              <h3 className="lib-title">The Fatigue Society</h3>
              <p className="lib-desc">
                In contemporary society, we believe we are free, yet we voluntarily self-exploit to achieve optimization, visibility, and validation. This causes a distinctive "tiredness of the soul."
              </p>
            </div>
            <a href="https://en.wikipedia.org/wiki/Byung-Chul_Han" target="_blank" rel="noopener noreferrer" className="lib-link">
              Read Theory Details <ExternalLink size={14} />
            </a>
          </div>

          <div className="card lib-card">
            <div>
              <span className="lib-concept">Jean Baudrillard</span>
              <h3 className="lib-title">Simulacra & Simulation</h3>
              <p className="lib-desc">
                Baudrillard argues that modern media replaces real life with signs and representations (simulacra). Our online personas become more "real" (hyperreal) than our physical daily existence.
              </p>
            </div>
            <a href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation" target="_blank" rel="noopener noreferrer" className="lib-link">
              Explore Hyperreality <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="app-footer-links">
          <a href="#diagnostics">Reflection Quiz</a>
          <a href="#network">Dependency Map</a>
          <a href="#sanctuary">Sanctuary Room</a>
        </div>
        <p>© {new Date().getFullYear()} Echoes of the Screen. A Student Diploma Project in Practical Philosophy & Digital Ethics.</p>
      </footer>
    </div>
  );
}

export default App;
