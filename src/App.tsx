

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Mikado Diploma Project</h1>
        <p className="subtitle">A philosophical exploration of depression in the era of social networks.</p>
      </header>
      
      <main className="content">
        <section className="section">
          <h2>Introduction & Philosophical Context</h2>
          <p>Analysis placeholder: Discussing the impact of digital connection, online presence, and social media on mental health from a philosophical perspective.</p>
        </section>
        
        <section className="section">
          <h2>Materials & Research</h2>
          <p>Core findings, information, and conceptual frameworks placeholder.</p>
        </section>
        
        <section className="section">
          <h2>Recommendations</h2>
          <p>Actionable guidance and cognitive strategies for digital well-being.</p>
        </section>
        
        <section className="section">
          <h2>External Resources & Podcasts</h2>
          <p>Links to external studies, essays, and attached audio/podcast materials.</p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Mikado Diploma Project</p>
      </footer>
    </div>
  )
}

export default App
