import React, { useState } from 'react';
import { getQuizRecommendation } from './services/music';
import MusicQuiz from './components/MusicQuiz';
import './App.css';

function App() {
  const [songRecommendation, setSongRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = async (answers) => {
    setLoading(true);
    setError(null);
    try {
      const recommendation = await getQuizRecommendation(answers);
      setSongRecommendation(recommendation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Song of the Day</h1>
        <p className="subtitle">Discover your perfect song based on your personality</p>
      </header>

      <main className="app-main">
        {!showQuiz && !songRecommendation && (
          <div className="welcome-section">
            <h2>Find Your Perfect Song</h2>
            <p>Take our quick personality quiz to discover a song that matches your vibe.</p>
            <button 
              className="start-quiz-button"
              onClick={() => setShowQuiz(true)}
            >
              Start Quiz
            </button>
          </div>
        )}

        {showQuiz && !songRecommendation && (
          <MusicQuiz onComplete={handleQuizComplete} />
        )}

        {loading && (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            Finding your perfect song...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {songRecommendation && (
          <div className="recommendation-section">
            <h2>Your Song Recommendation</h2>
            <div className="song-card">
              {songRecommendation.coverUrl && (
                <div className="album-cover">
                  <img 
                    src={songRecommendation.coverUrl} 
                    alt={`${songRecommendation.title} album cover`}
                  />
                </div>
              )}
              <div className="song-info">
                <h3>{songRecommendation.title}</h3>
                <p className="artist">{songRecommendation.artist}</p>
                <div className="song-tags">
                  <span className="tag genre">{songRecommendation.genre}</span>
                  <span className="tag mood">{songRecommendation.mood}</span>
                  <span className="tag energy">{songRecommendation.energy}</span>
                </div>
                <p className="reason">{songRecommendation.reason}</p>
                <button 
                  className="share-button"
                  onClick={() => setShowQuiz(false)}
                >
                  Take Quiz Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
