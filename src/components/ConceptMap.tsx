import React, { useState, useEffect } from 'react';
import type { QuizResult } from './ReflectiveQuiz';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  quote: string;
}

interface Link {
  source: string;
  target: string;
}

const NODES: Node[] = [
  {
    id: "notifications",
    x: 100,
    y: 80,
    label: "Digital Pings",
    description: "Constant auditory and visual alerts fragmenting continuous consciousness.",
    quote: "Every notification is a demand on your presence from someone who isn't there."
  },
  {
    id: "infinite_scroll",
    x: 100,
    y: 200,
    label: "Infinite Scroll",
    description: "The Sisyphus-like behavior of descending feeds without endpoints.",
    quote: "We roll the screen up only for it to reset, a digital task devoid of completion."
  },
  {
    id: "validation_seeking",
    x: 100,
    y: 320,
    label: "Social Feedback",
    description: "Seeking external value validation through likes, notifications, and shares.",
    quote: "Seeking approval online turns your lived reality into a commodity for others' validation."
  },
  {
    id: "dopamine_loop",
    x: 350,
    y: 80,
    label: "Dopamine Exhaustion",
    description: "The depletion of brain reward chemistry through unpredictable micro-stimuli.",
    quote: "When rewards are constant and random, the value of satisfaction drops to zero."
  },
  {
    id: "comparison_trap",
    x: 350,
    y: 200,
    label: "Imposter Comparison",
    description: "Measuring your complex internal reality against others' curated showcases.",
    quote: "We compare our behind-the-scenes footage with everyone else's highlight reels."
  },
  {
    id: "curation_burden",
    x: 350,
    y: 320,
    label: "Curated Avatar",
    description: "The continuous burden of maintaining an optimized online replica of yourself.",
    quote: "The avatar demands maintenance. We work for the profile, rather than living for ourselves."
  },
  {
    id: "burnout",
    x: 600,
    y: 80,
    label: "Self-Exploitation",
    description: "Byung-Chul Han describes burnout as the voluntary overwork under the guise of freedom.",
    quote: "The burnout subject is fighting against themselves, unable to distinguish freedom from constraint."
  },
  {
    id: "alienation",
    x: 600,
    y: 200,
    label: "Existential Isolation",
    description: "Feeling lonely in a crowd of contacts; losing connection to immediate physical reality.",
    quote: "We are connected, yet completely untouched. Social networks replace closeness with proximity."
  },
  {
    id: "inauthenticity",
    x: 600,
    y: 320,
    label: "The Simulacrum Self",
    description: "Baudrillard's concept of the sign replacing reality. The online profile becomes the real self.",
    quote: "The representation has swallowed the original. We exist to feed the image."
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
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [highlightedLinks, setHighlightedLinks] = useState<string[]>([]);

  // Update highlighted nodes/links based on quiz results
  useEffect(() => {
    if (!activeResult) {
      setHighlightedNodes([]);
      setHighlightedLinks([]);
      return;
    }

    const { profileId } = activeResult;
    let activeNodes: string[] = [];
    let activeLinks: string[] = [];

    if (profileId === 'fatigue') {
      activeNodes = ["notifications", "infinite_scroll", "dopamine_loop", "comparison_trap", "burnout", "alienation"];
      activeLinks = [
        "notifications-dopamine_loop",
        "infinite_scroll-dopamine_loop",
        "infinite_scroll-comparison_trap",
        "dopamine_loop-burnout",
        "comparison_trap-alienation",
        "dopamine_loop-alienation"
      ];
    } else if (profileId === 'connected') {
      activeNodes = ["validation_seeking", "curation_burden", "comparison_trap", "inauthenticity", "alienation"];
      activeLinks = [
        "validation_seeking-curation_burden",
        "validation_seeking-comparison_trap",
        "curation_burden-inauthenticity",
        "comparison_trap-inauthenticity",
        "comparison_trap-alienation"
      ];
    } else if (profileId === 'spectator') {
      activeNodes = ["infinite_scroll", "dopamine_loop", "burnout"];
      activeLinks = [
        "infinite_scroll-dopamine_loop",
        "dopamine_loop-burnout"
      ];
    } else if (profileId === 'anchor') {
      // Anchors don't trigger passive fatigue paths
      activeNodes = [];
      activeLinks = [];
    }

    setHighlightedNodes(activeNodes);
    setHighlightedLinks(activeLinks);
  }, [activeResult]);

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
                <text dx="18" dy="4">{node.label}</text>
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
              Your Pathway Highlighted
            </h4>
            <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>
              {activeResult.profileId === 'anchor' 
                ? "You have managed to stay grounded! No critical toxic dependencies or fatigue loops are highlighted. Feel free to hover over individual nodes to inspect potential digital pitfalls."
                : `Your questionnaire score has illuminated the pathway of nodes above. Hover over the highlighted nodes (or any others) to understand the cognitive progression of your digital experience.`
              }
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }} className="fade-in">
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', margin: 0 }}>
              Hover over any node in the map above to explore the philosophical connections of digital fatigue, or complete the Reflection Quiz to highlight your pathway.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
