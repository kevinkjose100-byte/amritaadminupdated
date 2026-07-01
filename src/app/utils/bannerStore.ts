export interface SpotlightBanner {
  id: string;
  title: string;
  bookId?: string; // empty if custom
  customBookCover?: string; // base64 string
  customBookTitle?: string;
  customBookAuthor?: string;
  quotation: string;
  quoteAuthor: string;
  quoteSource: string;
  backgroundUrl?: string; // base64 or URL
  backgroundPresetId?: string; // e.g., 'mountain-mist'
  ctaLabel: string;
  ctaUrl: string;
  isActive: boolean;
  displayOrder: number;
}

export const PRESET_BACKDROPS = [
  {
    id: "mountain-mist",
    name: "Mountain Mist",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "forest-sunrise",
    name: "Forest Sunrise",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "starry-night",
    name: "Starry Night",
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ocean-sunset",
    name: "Ocean Sunset",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const DEFAULT_BANNERS: SpotlightBanner[] = [
  {
    id: "b1",
    title: "In Amma's Splendor Spotlight",
    bookId: "2", // Ramayana
    customBookTitle: "In Amma's Splendor",
    customBookAuthor: "SWAMI RAMAKRISHNANANDA PURI",
    quotation: "The true mark of freedom is an undisturbed mind.",
    quoteAuthor: "SWAMI RAMAKRISHNANANDA PURI",
    quoteSource: "In Amma's Splendor (PAGE 42)",
    backgroundPresetId: "mountain-mist",
    backgroundUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Discover Book",
    ctaUrl: "/catalog",
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "b2",
    title: "Bhagavad Gita Wisdom Spotlight",
    bookId: "1", // Bhagavad Gita
    customBookTitle: "Bhagavad Gita",
    customBookAuthor: "AMMA",
    quotation: "Love is the only medicine that can heal the wounds of the world.",
    quoteAuthor: "MATA AMRITANANDAMAYI (AMMA)",
    quoteSource: "The Eternal Message (PAGE 15)",
    backgroundPresetId: "forest-sunrise",
    backgroundUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Discover Book",
    ctaUrl: "/catalog",
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "b3",
    title: "Mahabharata Epic Spotlight",
    bookId: "3", // Mahabharata
    customBookTitle: "Mahabharata",
    customBookAuthor: "SWAMI RAMAKRISHNANANDA PURI",
    quotation: "Duty is the highest path to spiritual realization and inner peace.",
    quoteAuthor: "SWAMI RAMAKRISHNANANDA PURI",
    quoteSource: "Ocean of Grace (PAGE 108)",
    backgroundPresetId: "starry-night",
    backgroundUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Discover Book",
    ctaUrl: "/catalog",
    isActive: true,
    displayOrder: 3,
  },
];

export function getBanners(): SpotlightBanner[] {
  const saved = localStorage.getItem("amrita_banners");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing saved banners", e);
    }
  }
  // Initialize with defaults if none exists
  localStorage.setItem("amrita_banners", JSON.stringify(DEFAULT_BANNERS));
  return DEFAULT_BANNERS;
}

export function saveBanners(banners: SpotlightBanner[]) {
  localStorage.setItem("amrita_banners", JSON.stringify(banners));
  window.dispatchEvent(new Event("amrita_banners_updated"));
}
