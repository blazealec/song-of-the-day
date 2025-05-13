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
  electronic: [
    { 
      name: "Deadmau5", 
      songs: [
        { title: "Strobe", cover: "https://i.imgur.com/JQK5tXZ.jpg" },
        { title: "Ghosts 'n' Stuff", cover: "https://i.imgur.com/JQK5tXZ.jpg" },
        { title: "Raise Your Weapon", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "I Remember", cover: "https://i.imgur.com/JQK5tXZ.jpg" },
        { title: "The Veldt", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Daft Punk", 
      songs: [
        { title: "One More Time", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Get Lucky", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Harder Better Faster Stronger", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Around the World", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Digital Love", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "The Chemical Brothers", 
      songs: [
        { title: "Galvanize", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Hey Boy Hey Girl", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Go", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Block Rockin' Beats", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Star Guitar", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    }
  ],
  hiphop: [
    { 
      name: "Kanye West", 
      songs: [
        { title: "Stronger", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "All of the Lights", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Runaway", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Gold Digger", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Heartless", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Kendrick Lamar", 
      songs: [
        { title: "HUMBLE.", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Alright", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Swimming Pools", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "King Kunta", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "DNA.", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "J. Cole", 
      songs: [
        { title: "No Role Modelz", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Middle Child", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Love Yourz", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Work Out", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Power Trip", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    }
  ],
  rock: [
    { 
      name: "Queen", 
      songs: [
        { title: "Bohemian Rhapsody", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Another One Bites the Dust", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "We Will Rock You", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Don't Stop Me Now", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Somebody to Love", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Led Zeppelin", 
      songs: [
        { title: "Stairway to Heaven", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Whole Lotta Love", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Kashmir", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Black Dog", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Immigrant Song", cover: "https://i.imgur.com/QZxGXxY.jpg" }
      ]
    },
    { 
      name: "The Beatles", 
      songs: [
        { title: "Hey Jude", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Let It Be", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Come Together", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Yesterday", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Here Comes the Sun", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    }
  ],
  jazz: [
    { 
      name: "Miles Davis", 
      songs: [
        { title: "So What", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Blue in Green", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "All Blues", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Flamenco Sketches", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Nardis", cover: "https://i.imgur.com/QZxGXxY.jpg" }
      ]
    },
    { 
      name: "John Coltrane", 
      songs: [
        { title: "Giant Steps", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "My Favorite Things", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "A Love Supreme", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Naima", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Blue Train", cover: "https://i.imgur.com/QZxGXxY.jpg" }
      ]
    },
    { 
      name: "Thelonious Monk", 
      songs: [
        { title: "Round Midnight", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Blue Monk", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Straight No Chaser", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Ruby My Dear", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Well You Needn't", cover: "https://i.imgur.com/QZxGXxY.jpg" }
      ]
    }
  ],
  pop: [
    { 
      name: "Taylor Swift", 
      songs: [
        { title: "Shake It Off", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Blank Space", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Style", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Love Story", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "You Belong With Me", cover: "https://i.imgur.com/QZxGXxY.jpg" }
      ]
    },
    { 
      name: "The Weeknd", 
      songs: [
        { title: "Blinding Lights", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Starboy", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "The Hills", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Save Your Tears", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Die For You", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Dua Lipa", 
      songs: [
        { title: "Levitating", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Don't Start Now", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "New Rules", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Physical", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Break My Heart", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    }
  ],
  indie: [
    { 
      name: "Arctic Monkeys", 
      songs: [
        { title: "Do I Wanna Know?", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "505", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "R U Mine?", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Why'd You Only Call Me When You're High?", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Arabella", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Tame Impala", 
      songs: [
        { title: "The Less I Know The Better", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Feels Like We Only Go Backwards", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "Let It Happen", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Borderline", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Eventually", cover: "https://i.imgur.com/8XZxYQp.jpg" }
      ]
    },
    { 
      name: "Vampire Weekend", 
      songs: [
        { title: "A-Punk", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Oxford Comma", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Cape Cod Kwassa Kwassa", cover: "https://i.imgur.com/8XZxYQp.jpg" },
        { title: "Harmony Hall", cover: "https://i.imgur.com/QZxGXxY.jpg" },
        { title: "This Life", cover: "https://i.imgur.com/QZxGXxY.jpg" }
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