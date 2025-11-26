export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  const minutes = diff / 60;
  const hours = diff / 3600;
  const days = diff / 86400;
  const months = diff / 2592000;
  const years = diff / 31536000;

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (days < 30) return `${Math.floor(days)} days ago`;
  if (months < 12) return `${Math.floor(months)} months ago`;
  return `${Math.floor(years)} years ago`;
}
