// Centralized blog utilities

export const isNewPost = (dateString: string, daysThreshold = 7): boolean => {
  const postDate = new Date(dateString);
  const daysSince = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSince <= daysThreshold;
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'students':
      return 'bg-primary/10 text-primary';
    case 'investors':
      return 'bg-secondary/10 text-secondary-foreground';
    case 'sellers':
      return 'bg-accent/10 text-accent-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getAbsoluteImageUrl = (imageUrl: string, baseUrl = 'https://junglerent.it'): string => {
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${baseUrl}${imageUrl}`;
};

export const formatDate = (dateString: string, locale: 'it' | 'en' = 'it'): string => {
  return new Date(dateString).toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
