import React, { useState } from 'react';
import { analyzeUserProfile, getSongRecommendation } from '../services/analytics';
import './ProfileTester.css';

// Sample profiles with different characteristics
const sampleProfiles = [
  {
    id: 'crypto-artist',
    displayName: 'Crypto Artist',
    username: 'crypto.artist',
    bio: 'Digital artist exploring NFTs and crypto art. Building in web3 and creating unique pieces.',
    followers: 2500,
    topics: ['art', 'nft', 'crypto', 'web3']
  },
  {
    id: 'defi-dev',
    displayName: 'DeFi Developer',
    username: 'defi.dev',
    bio: 'Full-stack developer focused on DeFi protocols. Building the future of finance.',
    followers: 800,
    topics: ['defi', 'coding', 'finance', 'blockchain']
  },
  {
    id: 'web3-writer',
    displayName: 'Web3 Writer',
    username: 'web3.writer',
    bio: 'Writing about blockchain, crypto, and web3. Sharing insights and analysis.',
    followers: 150,
    topics: ['writing', 'crypto', 'blockchain', 'web3']
  }
];

function ProfileTester() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [songRecommendation, setSongRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestProfile = async (profile) => {
    setSelectedProfile(profile);
    setLoading(true);
    setError(null);
    setSongRecommendation(null);

    try {
      const analysis = await analyzeUserProfile(profile);
      const recommendation = await getSongRecommendation(analysis);
      setSongRecommendation(recommendation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-tester">
      <div className="tester-header">
        <h2>Profile Tester</h2>
        <p className="tester-description">
          Try out different sample profiles to see how the song recommendation system works.
          Each profile has different interests and engagement levels that influence the recommendations.
        </p>
      </div>

      <div className="sample-profiles">
        {sampleProfiles.map(profile => (
          <div 
            key={profile.id}
            className={`profile-card ${selectedProfile?.id === profile.id ? 'selected' : ''}`}
            onClick={() => handleTestProfile(profile)}
          >
            <h3>{profile.displayName}</h3>
            <p className="username">@{profile.username}</p>
            <p className="bio">{profile.bio}</p>
            <div className="profile-stats">
              <span className="followers">{profile.followers} followers</span>
            </div>
            <div className="topics">
              {profile.topics.map(topic => (
                <span key={topic} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-message">
          Analyzing profile and finding the perfect song...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {songRecommendation && (
        <div className="recommendation-result">
          <h3>Song Recommendation</h3>
          <div className="song-card">
            <h4>{songRecommendation.title}</h4>
            <p className="artist">{songRecommendation.artist}</p>
            <p className="genre">Genre: {songRecommendation.genre}</p>
            <p className="mood">Mood: {songRecommendation.mood}</p>
            <p className="reason">{songRecommendation.reason}</p>
            {songRecommendation.spotifyUrl && (
              <a 
                href={songRecommendation.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-link"
              >
                Listen on Spotify
              </a>
            )}
            {songRecommendation.previewUrl && (
              <audio controls className="preview-player">
                <source src={songRecommendation.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileTester; 