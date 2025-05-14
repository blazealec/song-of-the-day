// Quiz questions to determine music preferences
export const MUSIC_QUIZ = {
  questions: [
    {
      id: 'energy',
      question: 'How would you describe your energy level today?',
      options: [
        { id: 'high', text: 'High - Ready to take on the world!' },
        { id: 'medium', text: 'Medium - Feeling balanced' },
        { id: 'low', text: 'Low - Need something calming' }
      ]
    },
    {
      id: 'activity',
      question: 'What kind of activity are you doing right now?',
      options: [
        { id: 'work', text: 'Working/Studying' },
        { id: 'exercise', text: 'Exercising/Working out' },
        { id: 'relax', text: 'Relaxing/Chilling' },
        { id: 'social', text: 'Socializing/Hanging out' }
      ]
    },
    {
      id: 'time',
      question: 'What time of day is it?',
      options: [
        { id: 'morning', text: 'Morning (6AM - 12PM)' },
        { id: 'afternoon', text: 'Afternoon (12PM - 5PM)' },
        { id: 'night', text: 'Night (5PM - 12AM)' },
        { id: 'late', text: 'Late Night (12AM - 6AM)' }
      ]
    },
    {
      id: 'mood',
      question: 'What\'s your current mood?',
      options: [
        { id: 'happy', text: 'Happy/Excited' },
        { id: 'reflective', text: 'Reflective/Thoughtful' },
        { id: 'melancholic', text: 'Melancholic/Nostalgic' },
        { id: 'energetic', text: 'Energetic/Adventurous' }
      ]
    },
    {
      id: 'genre',
      question: 'What genre do you usually prefer?',
      options: [
        { id: 'pop', text: 'Pop' },
        { id: 'rock', text: 'Rock' },
        { id: 'electronic', text: 'Electronic' },
        { id: 'hiphop', text: 'Hip Hop' },
        { id: 'indie', text: 'Indie' },
        { id: 'jazz', text: 'Jazz' }
      ]
    },
    {
      id: 'era',
      question: 'What era of music do you enjoy most?',
      options: [
        { id: 'current', text: 'Current (2020s)' },
        { id: 'recent', text: 'Recent (2010s)' },
        { id: 'classic', text: 'Classic (2000s and earlier)' }
      ]
    }
  ],
  
  // Mapping of quiz answers to music characteristics
  mappings: {
    energy: {
      high: { tempo: 'fast', energy: 'high' },
      medium: { tempo: 'medium', energy: 'medium' },
      low: { tempo: 'slow', energy: 'low' }
    },
    activity: {
      work: { focus: 'high', complexity: 'medium' },
      exercise: { energy: 'high', tempo: 'fast' },
      relax: { energy: 'low', complexity: 'low' },
      social: { energy: 'medium', danceability: 'high' }
    },
    time: {
      morning: { energy: 'medium', mood: 'positive' },
      afternoon: { energy: 'high', mood: 'balanced' },
      night: { energy: 'medium', mood: 'relaxed' },
      late: { energy: 'low', mood: 'introspective' }
    },
    mood: {
      happy: { valence: 'high', energy: 'high' },
      reflective: { valence: 'medium', complexity: 'high' },
      melancholic: { valence: 'low', energy: 'low' },
      energetic: { energy: 'high', tempo: 'fast' }
    },
    genre: {
      pop: { genre: 'pop', danceability: 'high' },
      rock: { genre: 'rock', energy: 'high' },
      electronic: { genre: 'electronic', danceability: 'high' },
      hiphop: { genre: 'hip-hop', energy: 'medium' },
      indie: { genre: 'indie', complexity: 'high' },
      jazz: { genre: 'jazz', complexity: 'high' }
    },
    era: {
      current: { year: '2020-2024' },
      recent: { year: '2010-2019' },
      classic: { year: '2000-2009' }
    }
  }
};

// Keep track of recently recommended songs to avoid repetition
const recentRecommendations = new Set();
const MAX_RECENT_RECOMMENDATIONS = 50;

// Common artists and songs for each genre
const genreArtists = {
  pop: [
    { 
      name: "Dua Lipa", 
      songs: [
        { title: "Levitating", cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e" },
        { title: "Don't Start Now", cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e" },
        { title: "Physical", cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e" }
      ]
    },
    { 
      name: "The Weeknd", 
      songs: [
        { title: "Blinding Lights", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" },
        { title: "Save Your Tears", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" },
        { title: "Starboy", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" }
      ]
    }
  ],
  rock: [
    { 
      name: "Arctic Monkeys", 
      songs: [
        { title: "Do I Wanna Know?", cover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5" },
        { title: "R U Mine?", cover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5" },
        { title: "Why'd You Only Call Me When You're High?", cover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5" }
      ]
    },
    { 
      name: "Queens of the Stone Age", 
      songs: [
        { title: "No One Knows", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Go With the Flow", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "The Way You Used to Do", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    }
  ],
  hiphop: [
    { 
      name: "Kendrick Lamar", 
      songs: [
        { title: "HUMBLE.", cover: "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a" },
        { title: "DNA.", cover: "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a" },
        { title: "Alright", cover: "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a" }
      ]
    },
    { 
      name: "J. Cole", 
      songs: [
        { title: "No Role Modelz", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Middle Child", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Love Yourz", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    }
  ],
  electronic: [
    { 
      name: "Deadmau5", 
      songs: [
        { title: "Strobe", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Ghosts 'n' Stuff", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Raise Your Weapon", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    },
    { 
      name: "Daft Punk", 
      songs: [
        { title: "One More Time", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Get Lucky", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Harder Better Faster Stronger", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    }
  ],
  indie: [
    { 
      name: "Tame Impala", 
      songs: [
        { title: "The Less I Know The Better", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Feels Like We Only Go Backwards", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Let It Happen", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    },
    { 
      name: "Arctic Monkeys", 
      songs: [
        { title: "Do I Wanna Know?", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "R U Mine?", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Why'd You Only Call Me When You're High?", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    }
  ],
  jazz: [
    { 
      name: "Kamasi Washington", 
      songs: [
        { title: "The Rhythm Changes", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Truth", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Fists of Fury", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    },
    { 
      name: "Robert Glasper", 
      songs: [
        { title: "Ah Yeah", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Gonna Be Alright", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" },
        { title: "Black Radio", cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e9c5c4c0b1a" }
      ]
    }
  ]
};

// Helper function to generate a unique song based on quiz answers
const generateSongRecommendation = (quizAnswers) => {
  // Get genre preference from quiz answers
  const genre = quizAnswers.genre || 'pop';
  const mood = quizAnswers.mood || 'happy';
  const energy = quizAnswers.energy || 'medium';

  // Get artists for the selected genre
  const artists = genreArtists[genre] || genreArtists.pop;
  
  // Select a random artist
  const artist = artists[Math.floor(Math.random() * artists.length)];
  
  // Select a random song
  const song = artist.songs[Math.floor(Math.random() * artist.songs.length)];

  return {
    id: `${artist.name}-${song.title}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: song.title,
    artist: artist.name,
    genre: genre,
    mood: mood,
    energy: energy,
    coverUrl: song.cover,
    reason: generateRecommendationReason(quizAnswers)
  };
};

// Helper function to generate recommendation reason
const generateRecommendationReason = (quizAnswers) => {
  const reasons = [];
  
  if (quizAnswers.energy) {
    reasons.push(`Based on your ${quizAnswers.energy} energy level`);
  }
  
  if (quizAnswers.activity) {
    reasons.push(`while you're ${quizAnswers.activity}`);
  }
  
  if (quizAnswers.time) {
    reasons.push(`during the ${quizAnswers.time}`);
  }
  
  if (quizAnswers.mood) {
    reasons.push(`feeling ${quizAnswers.mood}`);
  }
  
  return reasons.join(', ');
};

export async function getQuizRecommendation(answers) {
  try {
    // Generate recommendation
    const recommendation = generateSongRecommendation(answers);
    
    // Add to recent recommendations
    recentRecommendations.add(recommendation.id);
    if (recentRecommendations.size > MAX_RECENT_RECOMMENDATIONS) {
      // Remove oldest recommendation
      const firstItem = recentRecommendations.values().next().value;
      recentRecommendations.delete(firstItem);
    }

    return recommendation;
  } catch (error) {
    console.error('Error getting quiz recommendation:', error);
    throw new Error('Failed to get song recommendation. Please try again.');
  }
} 