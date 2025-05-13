import React, { useState } from 'react';

function SongCard({ song, onMint }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const handlePlayPreview = () => {
    if (!song.previewUrl) return;

    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(song.previewUrl);
      newAudio.onended = () => setIsPlaying(false);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  return (
    <div className="song-card">
      {song.albumArt && (
        <div className="album-art">
          <img src={song.albumArt} alt={`${song.title} album art`} />
        </div>
      )}
      <h3>{song.title}</h3>
      <p className="artist">by {song.artist}</p>
      <div className="song-details">
        <span className="genre">🎵 {song.genre}</span>
        <span className="mood">✨ {song.mood}</span>
      </div>
      <p className="reason">{song.reason}</p>
      
      <div className="song-actions">
        {song.previewUrl && (
          <button 
            className="preview-button"
            onClick={handlePlayPreview}
          >
            {isPlaying ? '⏸️ Pause Preview' : '▶️ Play Preview'}
          </button>
        )}
        
        {song.spotifyUrl && (
          <a 
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-link"
          >
            🎵 Open in Spotify
          </a>
        )}
        
        <button 
          onClick={onMint}
          className="mint-button"
        >
          Mint & Share
        </button>
      </div>
    </div>
  );
}

export default SongCard; 