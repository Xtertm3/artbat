export const APP_NAME = 'LSSM';
export const APP_FULL_NAME = 'London Serenade School of Music';
export const APP_DESCRIPTION = 'Master Music, Dance & Theater from Home';

export const API_URL = import.meta.env.VITE_API_URL || 'https://artbat.onrender.com/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://artbat.onrender.com';


export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || '';

export const COURSE_CATEGORIES = [
  { id: 'music', label: 'Music', icon: '🎸', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/40' },
  { id: 'dance', label: 'Dance', icon: '💃', color: 'text-pink-600 bg-pink-100 dark:bg-pink-900/40' },
  { id: 'vocals', label: 'Vocals', icon: '🎤', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/40' },
  { id: 'theater', label: 'Theater', icon: '🎭', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/40' },
] as const;

/** Indian & Western string/wind instruments */
export const MUSIC_SUBCATEGORIES = [
  // String
  { id: 'guitar', label: 'Guitar', emoji: '🎸', group: 'String' },
  { id: 'acoustic-guitar', label: 'Acoustic Guitar', emoji: '🎸', group: 'String' },
  { id: 'electric-guitar', label: 'Electric Guitar', emoji: '🎸', group: 'String' },
  { id: 'bass-guitar', label: 'Bass Guitar', emoji: '🎸', group: 'String' },
  { id: 'sitar', label: 'Sitar', emoji: '🪕', group: 'Indian String' },
  { id: 'sarod', label: 'Sarod', emoji: '🪕', group: 'Indian String' },
  { id: 'veena', label: 'Veena', emoji: '🪕', group: 'Indian String' },
  { id: 'santoor', label: 'Santoor', emoji: '🪕', group: 'Indian String' },
  { id: 'sarangi', label: 'Sarangi', emoji: '🪕', group: 'Indian String' },
  { id: 'violin', label: 'Violin', emoji: '🎻', group: 'String' },
  // Keyboard
  { id: 'piano', label: 'Piano', emoji: '🎹', group: 'Keyboard' },
  { id: 'keyboard', label: 'Keyboard', emoji: '🎹', group: 'Keyboard' },
  { id: 'harmonium', label: 'Harmonium', emoji: '🪗', group: 'Keyboard' },
  // Percussion
  { id: 'tabla', label: 'Tabla', emoji: '🥁', group: 'Percussion' },
  { id: 'mridangam', label: 'Mridangam', emoji: '🥁', group: 'Percussion' },
  { id: 'drums', label: 'Drums', emoji: '🥁', group: 'Percussion' },
  // Wind
  { id: 'flute', label: 'Flute', emoji: '🪈', group: 'Wind' },
  { id: 'bansuri', label: 'Bansuri', emoji: '🪈', group: 'Indian Wind' },
  { id: 'shehnai', label: 'Shehnai', emoji: '🪈', group: 'Indian Wind' },
  { id: 'saxophone', label: 'Saxophone', emoji: '🎷', group: 'Wind' },
  { id: 'trumpet', label: 'Trumpet', emoji: '🎺', group: 'Wind' },
] as const;

/** Dance subcategories – Indian Classical, Folk, Western, Bollywood */
export const DANCE_SUBCATEGORIES = [
  // Indian Classical
  { id: 'bharatanatyam', label: 'Bharatanatyam', emoji: '🕍', group: 'Indian Classical' },
  { id: 'kathak', label: 'Kathak', emoji: '🕍', group: 'Indian Classical' },
  { id: 'kuchipudi', label: 'Kuchipudi', emoji: '🕍', group: 'Indian Classical' },
  { id: 'odissi', label: 'Odissi', emoji: '🕍', group: 'Indian Classical' },
  { id: 'manipuri', label: 'Manipuri', emoji: '🕍', group: 'Indian Classical' },
  { id: 'mohiniyattam', label: 'Mohiniyattam', emoji: '🕍', group: 'Indian Classical' },
  // Folk
  { id: 'bhangra', label: 'Bhangra', emoji: '🎉', group: 'Folk' },
  { id: 'garba', label: 'Garba', emoji: '🎉', group: 'Folk' },
  { id: 'lavani', label: 'Lavani', emoji: '🎉', group: 'Folk' },
  { id: 'bihu', label: 'Bihu', emoji: '🎉', group: 'Folk' },
  { id: 'ghoomar', label: 'Ghoomar', emoji: '🎉', group: 'Folk' },
  // Western
  { id: 'hip-hop', label: 'Hip Hop', emoji: '🕺', group: 'Western' },
  { id: 'contemporary', label: 'Contemporary', emoji: '🕺', group: 'Western' },
  { id: 'ballet', label: 'Ballet', emoji: '🩰', group: 'Western' },
  { id: 'jazz', label: 'Jazz Dance', emoji: '🕺', group: 'Western' },
  { id: 'salsa', label: 'Salsa', emoji: '🕺', group: 'Western' },
  { id: 'breakdance', label: 'Breakdance', emoji: '🕺', group: 'Western' },
  // Carnatic
  { id: 'carnatic-dance', label: 'Carnatic Dance', emoji: '🎵', group: 'Carnatic' },
  // Bollywood
  { id: 'bollywood', label: 'Bollywood Dance', emoji: '🎬', group: 'Bollywood' },
  { id: 'semi-classical', label: 'Semi-Classical', emoji: '🎬', group: 'Bollywood' },
] as const;

/** Vocals subcategories */
export const VOCAL_SUBCATEGORIES = [
  { id: 'hindustani', label: 'Hindustani Classical', emoji: '🎶', group: 'Indian Classical' },
  { id: 'carnatic-vocal', label: 'Carnatic Classical', emoji: '🎶', group: 'Indian Classical' },
  { id: 'ghazal', label: 'Ghazal', emoji: '🎶', group: 'Semi-Classical' },
  { id: 'bhajan', label: 'Bhajan & Devotional', emoji: '🙏', group: 'Semi-Classical' },
  { id: 'sufi', label: 'Sufi Music', emoji: '🎙️', group: 'Semi-Classical' },
  { id: 'folk-vocal', label: 'Folk Singing', emoji: '🎵', group: 'Folk' },
  { id: 'light-music', label: 'Light Music', emoji: '🎵', group: 'Semi-Classical' },
  { id: 'western-pop', label: 'Western Pop', emoji: '🎤', group: 'Western' },
  { id: 'rb', label: 'R&B / Soul', emoji: '🎤', group: 'Western' },
  { id: 'musical-theater', label: 'Musical Theater', emoji: '🎭', group: 'Western' },
  { id: 'playback', label: 'Playback Singing', emoji: '🎬', group: 'Bollywood' },
] as const;

/** Language options for course filtering */
export const LANGUAGE_OPTIONS = [
  { id: 'English', label: 'English', flag: '🇬🇧' },
  { id: 'Hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { id: 'Tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { id: 'Telugu', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { id: 'Kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { id: 'Malayalam', label: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { id: 'Bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { id: 'Marathi', label: 'मराठी (Marathi)', flag: '🇮🇳' },
  { id: 'Gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
] as const;

export const SKILL_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
] as const;

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
] as const;

export const CURRENCY = '₹';
export const CURRENCY_CODE = 'INR';

export const PLATFORM_STATS = {
  students: '50,000+',
  courses: '1,200+',
  instructors: '500+',
  satisfaction: '98%',
};

export const MOCK_DELAY = 800;
