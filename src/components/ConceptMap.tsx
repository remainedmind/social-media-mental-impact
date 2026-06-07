import React, { useState } from 'react';
import type { QuizResult } from '../utils/quizUtils';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  quote: string;
  textAnchor: 'inherit' | 'end' | 'start' | 'middle';
  dx: number;
  dy: number;
}

interface Link {
  source: string;
  target: string;
}

const NODES: Node[] = [
  {
    id: "notifications",
    x: 150,
    y: 80,
    label: "Ciągłe powiadomienia",
    description: "Każdy dźwięk, wibracja i czerwona kropka powiadomienia, które odciągają Twoją uwagę od świata rzeczywistego.",
    quote: "Każde powiadomienie to upomnienie się wirtualnego świata o Twoją uwagę.",
    textAnchor: "end",
    dx: -18,
    dy: 4
  },
  {
    id: "infinite_scroll",
    x: 150,
    y: 200,
    label: "Nieskończone przewijanie",
    description: "Przewijanie tablicy bez żadnego naturalnego końca. Przesuwasz ekran w górę tylko po to, by za chwilę się zresetował.",
    quote: "Cyfrowa praca bez końca, zaprojektowana tak, by trzymać Cię przed ekranem na zawsze.",
    textAnchor: "end",
    dx: -18,
    dy: 4
  },
  {
    id: "validation_seeking",
    x: 150,
    y: 320,
    label: "Pogoń za lajkami",
    description: "Ciągłe sprawdzanie telefonu, by zobaczyć, kto polubił Twój post lub zostawił komentarz. Uzależnianie samooceny od liczb.",
    quote: "Zeczynamy tłumaczyć nasze realne chwile na posty w nadziei, że ktoś inny je zatwierdzi.",
    textAnchor: "end",
    dx: -18,
    dy: 4
  },
  {
    id: "dopamine_loop",
    x: 350,
    y: 80,
    label: "Zmęczenie dopaminowe",
    description: "Stan, w którym Twój mózg jest wyczerpany ciągłym dopływem nieprzewidywalnych mikro-bodźców z powiadomień.",
    quote: "Kiedy nagrody są losowe i nieustanne, przestają przynosić satysfakcję, a zaczynają męczyć.",
    textAnchor: "middle",
    dx: 0,
    dy: -20
  },
  {
    id: "comparison_trap",
    x: 350,
    y: 200,
    label: "Pułapka porównań",
    description: "Porównywanie swojego codziennego, pełnego wad życia z wyselekcjonowanymi i idealnymi momentami z profili innych ludzi.",
    quote: "Widzisz ich najlepsze dni na ekranie i zastanawiasz się, dlaczego Twoja codzienność jest tak szara.",
    textAnchor: "middle",
    dx: 0,
    dy: -20
  },
  {
    id: "curation_burden",
    x: 350,
    y: 320,
    label: "Cyfrowy awatar",
    description: "Ciągły wysiłek wkładany w utrzymanie idealnej, cyfrowej wersji samego siebie w sieci.",
    quote: "Profil wymaga ciągłej opieki. Zaczynamy pracować dla swojego cyfrowego awatara zamiast po prostu żyć.",
    textAnchor: "middle",
    dx: 0,
    dy: 26
  },
  {
    id: "burnout",
    x: 550,
    y: 80,
    label: "Cyfrowe wypalenie",
    description: "Skrajne wyczerpanie wynikające z dobrowolnego przeciążania umysłu, by cały czas być online.",
    quote: "Wydaje nam się, że możemy przewijać tablicę kiedy chcemy, ale w rzeczywistości nie potrafimy przestać.",
    textAnchor: "start",
    dx: 18,
    dy: 4
  },
  {
    id: "alienation",
    x: 550,
    y: 200,
    label: "Samotność w tłumie",
    description: "Uczucie izolacji pomimo posiadania setek kontaktów w sieci. Jesteśmy połączeni, ale pozbawieni dotyku.",
    quote: "Media społecznościowe dają nam wirtualną bliskość, ale odbierają realną, fizyczną obecność.",
    textAnchor: "start",
    dx: 18,
    dy: 4
  },
  {
    id: "inauthenticity",
    x: 550,
    y: 320,
    label: "Życie na ekranie",
    description: "Moment, w którym cyfrowy obraz Twojego życia zaczyna wydawać się ważniejszy niż Twoja codzienna rzeczywistość.",
    quote: "Obraz naszego życia zastępuje samą rzeczywistość. Istniejemy po to, by karmić profil.",
    textAnchor: "start",
    dx: 18,
    dy: 4
  }
];

const LINKS: Link[] = [
  { source: "notifications", target: "dopamine_loop" },
  { source: "infinite_scroll", target: "dopamine_loop" },
  { source: "infinite_scroll", target: "comparison_trap" },
  { source: "validation_seeking", target: "comparison_trap" },
  { source: "validation_seeking", target: "curation_burden" },
  { source: "dopamine_loop", target: "burnout" },
  { source: "comparison_trap", target: "alienation" },
  { source: "curation_burden", target: "inauthenticity" },
  { source: "comparison_trap", target: "inauthenticity" },
  { source: "dopamine_loop", target: "alienation" }
];

interface ConceptMapProps {
  activeResult: QuizResult | null;
}

export const ConceptMap: React.FC<ConceptMapProps> = ({ activeResult }) => {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  // Derived state: calculate active highlights directly from activeResult during render
  let highlightedNodes: string[] = [];
  let highlightedLinks: string[] = [];

  if (activeResult) {
    const { profileId } = activeResult;
    if (profileId === 'fatigue') {
      highlightedNodes = ["notifications", "infinite_scroll", "dopamine_loop", "comparison_trap", "burnout", "alienation"];
      highlightedLinks = [
        "notifications-dopamine_loop",
        "infinite_scroll-dopamine_loop",
        "infinite_scroll-comparison_trap",
        "dopamine_loop-burnout",
        "comparison_trap-alienation",
        "dopamine_loop-alienation"
      ];
    } else if (profileId === 'connected') {
      highlightedNodes = ["validation_seeking", "curation_burden", "comparison_trap", "inauthenticity", "alienation"];
      highlightedLinks = [
        "validation_seeking-curation_burden",
        "validation_seeking-comparison_trap",
        "curation_burden-inauthenticity",
        "comparison_trap-inauthenticity",
        "comparison_trap-alienation"
      ];
    } else if (profileId === 'spectator') {
      highlightedNodes = ["infinite_scroll", "dopamine_loop", "burnout"];
      highlightedLinks = [
        "infinite_scroll-dopamine_loop",
        "dopamine_loop-burnout"
      ];
    }
  }

  const handleNodeMouseEnter = (node: Node) => {
    setHoveredNode(node);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
  };

  const isLinkHighlighted = (link: Link) => {
    const linkId = `${link.source}-${link.target}`;
    if (hoveredNode) {
      if (link.source === hoveredNode.id || link.target === hoveredNode.id) return true;
    }
    return highlightedLinks.includes(linkId);
  };

  return (
    <div>
      <div className="concept-map-container">
        <svg viewBox="0 0 700 400" className="concept-map-svg">
          {/* Arrow markers */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="var(--border-color)" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="var(--accent-sage)" />
            </marker>
            <marker id="arrow-highlight" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="var(--accent-clay)" />
            </marker>
          </defs>

          {/* Links */}
          {LINKS.map((link, i) => {
            const sourceNode = NODES.find(n => n.id === link.source)!;
            const targetNode = NODES.find(n => n.id === link.target)!;
            const isH = hoveredNode && (link.source === hoveredNode.id || link.target === hoveredNode.id);
            const isActive = isLinkHighlighted(link);

            return (
              <line
                key={i}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                className={`map-link ${isH ? 'highlight' : isActive ? 'active' : ''}`}
                markerEnd={isH ? "url(#arrow-highlight)" : isActive ? "url(#arrow-active)" : "url(#arrow)"}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map(node => {
            const isH = hoveredNode && hoveredNode.id === node.id;
            const isActive = highlightedNodes.includes(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className={`map-node ${isH ? 'highlight' : isActive ? 'active' : ''}`}
                onMouseEnter={() => handleNodeMouseEnter(node)}
                onMouseLeave={handleNodeMouseLeave}
              >
                <circle r="12" />
                <text dx={node.dx} dy={node.dy} textAnchor={node.textAnchor}>{node.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info panel below the map */}
      <div style={{
        marginTop: '2rem',
        minHeight: '120px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem 2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        {hoveredNode ? (
          <div className="fade-in">
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--accent-clay)', marginBottom: '0.5rem' }}>
              {hoveredNode.label}
            </h4>
            <p style={{ fontSize: '0.95rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              {hoveredNode.description}
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              &ldquo;{hoveredNode.quote}&rdquo;
            </p>
          </div>
        ) : activeResult ? (
          <div className="fade-in">
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--accent-sage)', marginBottom: '0.5rem' }}>
              Twój profil został podświetlony
            </h4>
            <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>
              {activeResult.profileId === 'anchor' 
                ? "Udało Ci się zachować równowagę! Żadne toksyczne pętle ani zależności nie zostały podświetlone. Możesz najechać kursorem na poszczególne węzły, by poznać potencjalne zagrożenia."
                : `Twój wynik quizu podświetlił powyższą pętlę. Najedź na aktywne węzły, by zrozumieć etapy cyfrowego zmęczenia.`
              }
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }} className="fade-in">
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', margin: 0 }}>
              Najedź na dowolny węzeł na mapie powyżej, aby zbadać powiązania cyfrowego zmęczenia, lub rozwiąż quiz powyżej, aby podświetlić swoją własną ścieżkę.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
