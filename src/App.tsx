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
        <h1>Echa Ekranu</h1>
        <p className="subtitle">
          Interaktywna refleksja o czasie przed ekranem, cyfrowym zmęczeniu i szukaniu przestrzeni na oddech.
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
            Uzyskaj pomoc i wsparcie
          </a>
        </div>
        <div className="divider"></div>
      </header>

      {/* Intro Essay */}
      <section className="section fade-in">
        <div className="grid-2">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>
              Dlaczego ekrany sprawiają, że tak się czujemy?
            </h2>
            <p>
              Zaczyna się niewinnie. Otwieramy aplikację, bo się nudzimy, czujemy się samotni lub szukamy chwili rozrywki. Jednak to, co zaczyna się jako nieszkodliwe przewijanie, często przeradza się w pętlę, która wysysa z nas energię i oddala od rzeczywistości.
            </p>
            <p>
              Ten projekt to przestrzeń na zatrzymanie się i spojrzenie pod podszewkę naszych nawyków. Analizując powiązania między sposobem projektowania aplikacji a naszym samopoczuciem, możemy zrozumieć mechanizmy stojące za cyfrowym zmęczeniem i stanami obniżonego nastroju — oraz dowiedzieć się, jak zrobić krok w tył.
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
              Historia Pętli
            </h3>
            <div className="step-story" style={{ fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>1. Pokusa:</strong> Szukamy szybkiego kontaktu. Chęć interakcji i ucieczki przed nudą to naturalna ludzka potrzeba.
              </p>
              <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>2. Pułapka:</strong> Przeglądamy idealne tablice innych, podświadomie porównując naszą zwykłą codzienność z wyselekcjonowanymi, najlepszymi momentami z cudzego życia.
              </p>
              <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>3. Zmęczenie:</strong> Zaczynamy dopieszczać własnego cyfrowego awatara, by zyskać aprobatę. Dobrowolnie pracujemy na rzecz swojego profilu, co wyczerpuje nas psychicznie i prowadzi do cyfrowego wypalenia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <div className="quote-section fade-in">
        <blockquote className="quote-text">
          &ldquo;Żyjemy w świecie, w którym jest coraz więcej informacji, a coraz mniej znaczenia.&rdquo;
        </blockquote>
        <cite className="quote-author">— Jean Baudrillard, Symulakry i symulacja</cite>
      </div>

      {/* Interactive Questionnaire */}
      <section className="section" id="diagnostics">
        <div className="section-title-wrap">
          <h2 className="section-title">1. Sprawdź siebie (Szybki quiz)</h2>
          <p className="section-subtitle">
            Odpowiedz na kilka prostych pytań, aby przyjrzeć się swoim nawykom i sprawdzić, gdzie na skali cyfrowego zmęczenia się znajdujesz.
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
          <h2 className="section-title">2. Jak działa ta pętla (Mapa pojęć)</h2>
          <p className="section-subtitle">
            Najedź kursorem na poszczególne węzły, aby zbadać, jak codzienne nawyki przed ekranem tworzą pętle wpływające na samopoczucie i wyobcowanie.
          </p>
        </div>
        <ConceptMap activeResult={quizResult} />
      </section>

      {/* Focus Sanctuary (Soma Room) */}
      <section className="section" id="sanctuary">
        <div className="section-title-wrap">
          <h2 className="section-title">3. Pokój wytchnienia (Strefa relaksu)</h2>
          <p className="section-subtitle">
            Cicha przestrzeń na odcięcie się od ciągłego przewijania. Przećwicz oddech, posłuchaj wyciszających pejzaży dźwiękowych lub włącz jedną z naszych krótkich rozmów.
          </p>
        </div>
        <FocusSpace />
      </section>

      {/* Grounding Practices */}
      <section className="section">
        <div className="section-title-wrap">
          <h2 className="section-title">4. Małe codzienne kroki</h2>
          <p className="section-subtitle">
            Proste, praktyczne wskazówki inspirowane filozofią, które pomogą Ci odzyskać uważność i obecność tu i teraz.
          </p>
        </div>
        <div className="rec-grid">
          <div className="rec-card">
            <div className="rec-icon">
              <Shield size={20} />
            </div>
            <h4 className="rec-title">Kwarantanna uwagi</h4>
            <p>
              Wyznacz w domu wyraźną granicę (np. biurko lub łóżko), za którą nie wnosisz żadnych urządzeń z ekranami. Zachowaj tę strefę całkowicie offline.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <Sparkles size={20} />
            </div>
            <h4 className="rec-title">Radykalna nuda</h4>
            <p>
              Poświęć 5 do 10 minut dziennie na całkowitą ciszę bez telefonu, muzyki i jakichkolwiek bodźców. Pozwól swojemu umysłowi odpocząć.
            </p>
          </div>

          <div className="rec-card">
            <div className="rec-icon">
              <BookOpen size={20} />
            </div>
            <h4 className="rec-title">Analogowe kotwice</h4>
            <p>
              Zastąp jeden cyfrowy nawyk jego fizyczną wersją. Pisz w papierowym notesie, czytaj papierowe książki lub idź na spacer bez telefonu.
            </p>
          </div>
        </div>
      </section>

      {/* Watch More Section */}
      <section className="section" id="watch">
        <div className="section-title-wrap">
          <h2 className="section-title">5. Zobacz więcej</h2>
          <p className="section-subtitle">
            Wartościowe eseje wideo, które w prosty sposób wyjaśniają psychologiczne i filozoficzne aspekty cyfrowego wypalenia i samotności.
          </p>
        </div>
        <div className="grid-2">
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Dlaczego wszyscy się wypalamy</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Esej wideo autorstwa Einzelgänger przybliżający idee filozofa Byung-Chul Hana, pokazujący, jak sami się wyczerpujemy w pogoni za sukcesem i aprobatą.
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Zrozumieć samotność</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Animowane wyjaśnienie od Kurzgesagt badające ewolucyjne korzenie samotności oraz to, jak cyfrowa hiper-łączność w sieci często pogłębia nasze poczucie izolacji.
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
          <h2 className="section-title">6. Dowiedz się więcej</h2>
          <p className="section-subtitle">
            Jeśli chcesz dowiedzieć się więcej o pojęciach leżących u podstaw tego projektu, poniżej znajdziesz książki oraz badania krajowe, z których korzystaliśmy.
          </p>
        </div>
        <div className="library-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card lib-card">
            <div>
              <span className="lib-concept">Ogólnopolski Raport</span>
              <h3 className="lib-title">Badanie MŁODE GŁOWY</h3>
              <p className="lib-desc">
                Przełomowe ogólnopolskie badanie ponad 180 tysięcy uczniów przeprowadzone przez Fundację UNAWEZA. Wskazuje na dramatyczną kondycję psychiczną młodzieży w Polsce — co drugi młody człowiek ma skrajnie niską samoocenę wywołaną m.in. porównywaniem się w sieci, hejtem oraz lękiem przed wykluczeniem (FOMO).
              </p>
            </div>
            <a href="https://mlodeglowy.pl" target="_blank" rel="noopener noreferrer" className="lib-link">
              Odwiedź stronę mlodeglowy.pl <ExternalLink size={14} />
            </a>
          </div>

          <div className="card lib-card">
            <div>
              <span className="lib-concept">Byung-Chul Han</span>
              <h3 className="lib-title">Społeczeństwo zmęczenia</h3>
              <p className="lib-desc">
                Byung-Chul Han wyjaśnia, że współczesne społeczeństwo mami nas poczuciem wolności, podczas gdy w rzeczywistości dobrowolnie eksploatujemy samych siebie, dążąc do ciągłego doskonalenia, widoczności i poklasku.
              </p>
            </div>
            <a href="https://en.wikipedia.org/wiki/Byung-Chul_Han" target="_blank" rel="noopener noreferrer" className="lib-link">
              Przeczytaj opis teorii <ExternalLink size={14} />
            </a>
          </div>

          <div className="card lib-card">
            <div>
              <span className="lib-concept">Jean Baudrillard</span>
              <h3 className="lib-title">Symulakry i symulacja</h3>
              <p className="lib-desc">
                Jean Baudrillard twierdzi, że ekrany zastępują nasze realne życie znakami i reprezentacjami. Nasze profile online stają się dla innych bardziej \"rzeczywiste\" (hiperrealne) niż nasza codzienna, fizyczna egzystencja.
              </p>
            </div>
            <a href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation" target="_blank" rel="noopener noreferrer" className="lib-link">
              Odkryj pojęcie hiperrzeczywistości <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Get Help Section */}
      <section className="section" id="help" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div className="section-title-wrap">
          <h2 className="section-title" style={{ color: 'var(--accent-clay)' }}>7. Pomoc i wsparcie</h2>
          <p className="section-subtitle">
            Jeśli Ty lub ktoś z Twojego otoczenia zmaga się z cyfrowym przeciążeniem, izolacją lub stanami depresyjnymi, skorzystaj z poniższych punktów wsparcia. Nie jesteś sam.
          </p>
        </div>
        <div className="grid-2">
          <div className="card" style={{ borderLeft: '4px solid var(--accent-clay)' }}>
            <span className="lib-concept" style={{ color: 'var(--accent-clay)' }}>Dla młodzieży (Polska)</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Telefon Zaufania 116 111</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Bezpłatny, anonimowy telefon zaufania dla dzieci i młodzieży prowadzony przez <strong>Fundację Dajemy Dzieciom Siłę</strong>. Działa całodobowo przez 7 dni w tygodniu.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="tel:116111" className="btn-primary" style={{ textDecoration: 'none' }}>Zadzwoń pod 116 111</a>
              <a href="https://116111.pl" target="_blank" rel="noopener noreferrer" className="lib-link" style={{ margin: 0 }}>Odwiedź 116111.pl <ExternalLink size={14} /></a>
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent-sage)' }}>
            <span className="lib-concept" style={{ color: 'var(--accent-sage)' }}>Kampanie i pomoc</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Fundacja Twarze Depresji</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Fundacja prowadzi kampanie edukacyjne, przeciwdziała stygmatyzacji osób w kryzysie psychicznym oraz organizuje bezpłatną pomoc psychologiczną.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="https://twarzedepresji.pl" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', backgroundColor: 'var(--accent-sage)' }}>Uzyskaj pomoc</a>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--text-secondary)' }}>
          <span className="lib-concept">Dla dorosłych (Polska)</span>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Kryzysowy Telefon Zaufania 116 123</h3>
          <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>
            Bezpłatna infolinia dla osób dorosłych w kryzysie emocjonalnym, zmagających się z trudnościami lub depresją. Dostępny codziennie w godzinach 14:00 - 22:00. Zadzwoń pod numer <a href="tel:116123" style={{ color: 'var(--accent-clay)', fontWeight: 600, textDecoration: 'none' }}>116 123</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div className="app-footer-links">
          <a href="#diagnostics">Quiz refleksyjny</a>
          <a href="#network">Mapa pętli</a>
          <a href="#sanctuary">Strefa relaksu</a>
          <a href="#help">Uzyskaj pomoc</a>
        </div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Projekt semestralny studenta Mikity Mikado w ramach Praktycznej Filozofii i Etyki Cyfrowej.</p>
        <p style={{ fontSize: '0.85rem' }}>© {new Date().getFullYear()} Mikita Mikado. Echa Ekranu.</p>
      </footer>
    </div>
  );
}

export default App;
