// Constants for API keys
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const SPOTIFY_API_KEY = process.env.REACT_APP_SPOTIFY_API_KEY;

// Mapping of user interests to music genres
const GENRE_MAPPING = {
  'crypto': 'electronic',
  'defi': 'electronic',
  'nft': 'electronic',
  'web3': 'electronic',
  'blockchain': 'electronic',
  'trading': 'hiphop',
  'investing': 'hiphop',
  'finance': 'hiphop',
  'art': 'classical',
  'music': 'rock',
  'gaming': 'electronic',
  'tech': 'electronic',
  'coding': 'electronic',
  'development': 'electronic',
  'programming': 'electronic',
  'design': 'classical',
  'photography': 'classical',
  'writing': 'jazz',
  'reading': 'jazz',
  'travel': 'rock',
  'food': 'jazz',
  'fitness': 'electronic',
  'sports': 'rock',
  'gaming': 'electronic'
};

// Mapping of engagement levels to music moods
const MOOD_MAPPING = {
  high: 'Energetic',
  medium: 'Balanced',
  low: 'Chill'
};

// Function to analyze user profile and extract interests
export const analyzeUserProfile = async (profile) => {
  try {
    // Extract interests from bio
    const interests = extractInterests(profile.bio);
    
    // Determine engagement level based on followers
    const engagement = determineEngagementLevel(profile.followers);
    
    return {
      interests,
      engagement,
      reason: generateRecommendationReason(interests, engagement)
    };
  } catch (error) {
    console.error('Error analyzing user profile:', error);
    throw error;
  }
};

// Helper function to extract interests from bio
const extractInterests = (bio) => {
  if (!bio) return [];
  
  const interests = [];
  const bioLower = bio.toLowerCase();
  
  Object.keys(GENRE_MAPPING).forEach(interest => {
    if (bioLower.includes(interest)) {
      interests.push(interest);
    }
  });
  
  return interests;
};

// Helper function to determine engagement level
const determineEngagementLevel = (followers) => {
  if (!followers) return 'low';
  
  if (followers > 1000) return 'high';
  if (followers > 100) return 'medium';
  return 'low';
};

// Helper function to generate recommendation reason
const generateRecommendationReason = (interests, engagement) => {
  const reasons = [];
  
  if (interests.length > 0) {
    reasons.push(`Based on your interests in ${interests.join(', ')}`);
  }
  
  if (engagement) {
    reasons.push(`and your ${engagement} engagement level`);
  }
  
  return reasons.join(' ');
};

// Function to get song recommendation
export const getSongRecommendation = async (userPreferences) => {
  try {
    // Get genres based on interests
    const genres = userPreferences.interests.map(interest => 
      GENRE_MAPPING[interest] || 'electronic'
    );
    
    // Get mood based on engagement
    const mood = MOOD_MAPPING[userPreferences.engagement] || 'Balanced';
    
    // Generate a recommendation based on genres and mood
    return {
      title: 'Sample Song',
      artist: 'Sample Artist',
      genre: genres[0] || 'electronic',
      mood: mood,
      reason: userPreferences.reason,
      spotifyUrl: 'https://open.spotify.com/track/sample',
      previewUrl: 'https://example.com/preview.mp3'
    };
  } catch (error) {
    console.error('Error getting song recommendation:', error);
    throw error;
  }
};

// Helper functions for on-chain analysis
const getNFTHoldings = async (address) => {
  // TODO: Implement NFT holdings analysis using Alchemy API
  return [];
};

const getTransactionHistory = async (address) => {
  // TODO: Implement transaction history analysis using Alchemy API
  return [];
};

const getDeFiActivity = async (address) => {
  // TODO: Implement DeFi activity analysis using Alchemy API
  return [];
}; 