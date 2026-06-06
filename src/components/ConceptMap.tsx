import React, { useState } from 'react';
import type { QuizResult } from '../utils/quizUtils';

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
    label: "Constant Pings",
    description: "Every ding, buzz, and red dot that pulls your focus away from the real world.",
    quote: "Every notification is a reminder of a virtual world demanding your attention."
  },
  {
    id: "infinite_scroll",
    x: 100,
    y: 200,
    label: "The Endless Scroll",
    description: "Scrolling down forever with no natural stopping point. You roll the screen up only for it to reset.",
    quote: "A digital task that never ends, designed to keep you scrolling forever."
  },
  {
    id: "validation_seeking",
    x: 100,
    y: 320,
    label: "Looking for Likes",
    description: "Checking your phone to see who liked your post or commented, tying your self-worth to numbers.",
    quote: "We start translating our real moments into posts, hoping someone else approves."
  },
  {
    id: "dopamine_loop",
    x: 350,
    y: 80,
    label: "Dopamine Fatigue",
    description: "When your brain gets tired from a constant drip-feed of unpredictable notifications.",
    quote: "When feedback is random and constant, it stops feeling rewarding and starts feeling exhausting."
  },
  {
    id: "comparison_trap",
    x: 350,
    y: 200,
    label: "The Comparison Trap",
    description: "Comparing your messy everyday life with everyone else's highlight reels.",
    quote: "You see their best days on screen and wonder why your ordinary days feel so dull."
  },
  {
    id: "curation_burden",
    x: 350,
    y: 320,
    label: "The Online Avatar",
    description: "The constant job of maintaining a polished online version of yourself.",
    quote: "The profile needs updates. We begin working for our avatar instead of just living."
  },
  {
    id: "burnout",
    x: 600,
    y: 80,
    label: "Digital Burnout",
    description: "Exhaustion that comes from voluntarily overworking your brain to stay connected.",
    quote: "We think we are free to scroll, but we find ourselves unable to stop."
  },
  {
    id: "alienation",
    x: 600,
    y: 200,
    label: "Loneliness in a Crowd",
    description: "Feeling isolated despite having hundreds of online contacts. You're connected, but untouched.",
    quote: "Social media gives us virtual proximity, but takes away real, physical presence."
  },
  {
    id: "inauthenticity",
    x: 600,
    y: 320,
    label: "Living in the Screen",
    description: "When the online image of your life starts feeling more important than your actual life.",
    quote: "The image of our life replaces the reality. We exist to feed the profile."
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
                ? "You have managed to stay grounded! No toxic dependencies or fatigue loops are highlighted. Feel free to hover over individual nodes to inspect potential digital pitfalls."
                : `Your quiz results have highlighted the loop above. Hover over the active nodes to understand the cognitive progression of your digital experience.`
              }
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }} className="fade-in">
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', margin: 0 }}>
              Hover over any node in the map above to explore the connections of digital fatigue, or complete the Quiz above to highlight your specific pathway.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
