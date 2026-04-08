/**
 * Returns a dynamic wallpaper URL.
 * You can enhance this to return different images based on time, 
 * weather, or user preference.
 */
export const getDynamicWallpaper = (): string => {
  const themes = ['nature', 'abstract', 'minimal', 'space'];
  const selectedTheme = themes[Math.floor(Math.random() * themes.length)];
  
  // Using Unsplash Source for a 300x600 vertical mobile aspect ratio
  return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop`;
};