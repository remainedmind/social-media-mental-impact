import { useState } from 'react';
import { ReflectiveQuiz } from './components/ReflectiveQuiz';
import type { QuizResult } from './utils/quizUtils';
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
        <h1>Echoes of the Screen</h1>
        <p className="subtitle">
          An interactive reflection on screen time, digital fatigue, and finding space to breathe.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href="#help" 
            className="btn-primary" 
            style={{ 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              fontWeight: 500,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Get Help & Support
          </a>
        </div>
        <div className="divider"></div>
      </header>

      {/* Intro Essay */}
      <section className="section fade-in">
        <div className="grid-2">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>
              Why do our screens make us feel like this?
            </h2>
            <p>
              It usually starts simple. We open an app because we're bored, lonely, or just looking for a quick distraction. But what starts as a harmless scroll often turns into a cycle that leaves us feeling drained and disconnected.
            </p>
            <p>
              This project is a space to pause and look at what is happening under the hood. By looking at the connection between how these apps are designed and how we feel, we can begin to understand why digital fatigue and depression happen—and how we can step back.
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
              The Story of the Loop
            </h3>
            <div className="step-story" style={{ fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>1. The Lure:</strong> We seek quick connection. It's a natural human impulse to want to interact and avoid quiet boredom.
              </p>
              <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>2. The Trap:</strong> We scroll through curated highlight reels, subconsciously comparing our messy everyday lives to everyone else's best moments.
              </p>
              <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>3. The Fatigue:</strong> We start editing our own online "avatar" to get approval. We voluntarily work for the profile, which drains our energy and creates digital burnout.
              </p>
            </div>
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
          <h2 className="section-title">1. Check Yourself (Quick Quiz)</h2>
          <p className="section-subtitle">
            Answer these simple questions to reflect on your digital habits and see where you stand on the digital fatigue spectrum.
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
          <h2 className="section-title">2. How the Loop Works (Concept Map)</h2>
          <p className="section-subtitle">
            Hover over nodes to explore how screen-time habits feed into cognitive loops, eventually leading to digital fatigue or isolation.
          </p>
        </div>
        <ConceptMap activeResult={quizResult} />
      </section>

      {/* Focus Sanctuary (Soma Room) */}
      <section className="section" id="sanctuary">
        <div className="section-title-wrap">
          <h2 className="section-title">3. The Break Room (Unwind Space)</h2>
          <p className="section-subtitle">
            A quiet space to detach from the scroll. Practice breathing, listen to relaxing soundscapes, or play our short audio talks.
          </p>
        </div>
        <FocusSpace />
      </section>

      {/* Grounding Practices */}
      <section className="section">
        <div className="section-title-wrap">
          <h2 className="section-title">4. Small Daily Steps</h2>
          <p className="section-subtitle">
            Simple, practical ideas based on philosophical wisdom to help you reclaim your focus and presence.
          </p>
        </div>
        <div className="rec-grid">
          <div className="rec-card">
            <div className="rec-icon">
              <Shield size={20} />
            </div>
            <h4 className="rec-title">Attention Quarantine</h4>
            <p>
              Designate a physical boundary in your home (like your desk or bed) where screens are completely prohibited. Keep this space screens-free.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <Sparkles size={20} />
            </div>
            <h4 className="rec-title">Radical Boredom</h4>
            <p>
              Commit to 5 or 10 minutes of complete silence each day with no phone, music, or stimulation. Let your mind settle down.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <BookOpen size={20} />
            </div>
            <h4 className="rec-title">Analog Anchors</h4>
            <p>
              Replace one daily digital habit with a physical version. Write in a paper notebook, read a printed book, or go for a walk phone-free.
            </p>
          </div>
        </div>
      </section>

      {/* Watch More Section */}
      <section className="section" id="watch">
        <div className="section-title-wrap">
          <h2 className="section-title">5. Watch More</h2>
          <p className="section-subtitle">
            Thoughtful video essays that explain the psychology and philosophy of digital burnout and loneliness in simple terms.
          </p>
        </div>
        <div className="grid-2">
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Why We're All Burning Out</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              A video essay by Einzelgänger breaking down the ideas of philosopher Byung-Chul Han, showing how we exhaust ourselves in search of achievement and validation.
            </p>
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/XlRlWuEyt8E" 
                title="Why We're All Burning Out" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: 'var(--radius-sm)' }}
              ></iframe>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Understanding Loneliness</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              An animated explanation by Kurzgesagt exploring the evolutionary roots of loneliness and how hyper-connectivity online often leaves us feeling more isolated.
            </p>
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/n3Xv_g3g-mA" 
                title="Kurzgesagt Loneliness" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: 'var(--radius-sm)' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Read More Section */}
      <section className="section" id="read">
        <div className="section-title-wrap">
          <h2 className="section-title">6. Read More</h2>
          <p className="section-subtitle">
            If you want to read more about the ideas behind this project, here are the core texts and local studies we drew from.
          </p>
        </div>
        <div className="library-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card lib-card">
            <div>
              <span className="lib-concept">National Report (Poland)</span>
              <h3 className="lib-title">MŁODE GŁOWY Study</h3>
              <p className="lib-desc">
                A massive study of over 180,000 students in Poland by the UNAWEZA Foundation. It highlights a critical mental health crisis, showing that 1 in 2 young people suffer from extremely low self-esteem, fueled by social media comparison, cyberbullying, and FOMO.
              </p>
            </div>
            <a href="https://mlodeglowy.pl" target="_blank" rel="noopener noreferrer" className="lib-link">
              Visit mlodeglowy.pl <ExternalLink size={14} />
            </a>
          </div>

          <div className="card lib-card">
            <div>
              <span className="lib-concept">Byung-Chul Han</span>
              <h3 className="lib-title">The Fatigue Society</h3>
              <p className="lib-desc">
                Han explains that modern society makes us believe we are free, yet we voluntarily self-exploit to achieve optimization, visibility, and validation, causing a deep \"tiredness of the soul.\"
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
                Baudrillard argues that screens replace our actual lives with symbols and representations. Our online profiles become more \"real\" (hyperreal) to others than our physical day-to-day existence.
              </p>
            </div>
            <a href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation" target="_blank" rel="noopener noreferrer" className="lib-link">
              Explore Hyperreality <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Get Help Section */}
      <section className="section" id="help" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div className="section-title-wrap">
          <h2 className="section-title" style={{ color: 'var(--accent-clay)' }}>7. Get Help & Support</h2>
          <p className="section-subtitle">
            If you or someone you know is struggling with digital fatigue, isolation, or depression, please reach out to these support resources. You are not alone.
          </p>
        </div>
        <div className="grid-2">
          <div className="card" style={{ borderLeft: '4px solid var(--accent-clay)' }}>
            <span className="lib-concept" style={{ color: 'var(--accent-clay)' }}>For Youth (Poland)</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Helpline 116 111</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              A free, anonymous support helpline run by <strong>Fundacja Dajemy Dzieciom Siłę</strong> for children and teenagers. Available 24/7.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="tel:116111" className="btn-primary" style={{ textDecoration: 'none' }}>Call 116 111</a>
              <a href="https://116111.pl" target="_blank" rel="noopener noreferrer" className="lib-link" style={{ margin: 0 }}>Visit 116111.pl <ExternalLink size={14} /></a>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent-sage)' }}>
            <span className="lib-concept" style={{ color: 'var(--accent-sage)' }}>Campaign & Support</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Twarze Depresji</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              The <strong>Faces of Depression Foundation</strong> provides educational materials, anti-stigma campaigns, and access to free psychological consultations.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="https://twarzedepresji.pl" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', backgroundColor: 'var(--accent-sage)' }}>Get Support</a>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--text-secondary)' }}>
          <span className="lib-concept">For Adults (Poland)</span>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Crisis Helpline 116 123</h3>
          <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>
            A free helpline for adults experiencing psychological crisis, emotional distress, or depression. Available daily from 14:00 to 22:00. Call <a href="tel:116123" style={{ color: 'var(--accent-clay)', fontWeight: 600, textDecoration: 'none' }}>116 123</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="app-footer-links">
          <a href="#diagnostics">Reflection Quiz</a>
          <a href="#network">Dependency Map</a>
          <a href="#sanctuary">Sanctuary Room</a>
          <a href="#help">Get Help</a>
        </div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>A Student Term Project by Mikita Mikado in Practical Philosophy & Digital Ethics.</p>
        <p style={{ fontSize: '0.85rem' }}>© {new Date().getFullYear()} Mikita Mikado. Echoes of the Screen.</p>
      </footer>
    </div>
  );
}

export default App;
