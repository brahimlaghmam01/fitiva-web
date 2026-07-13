const API_BASE_URL = '/api';

export interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  created_at: string;
}

export interface DownloadStats {
  total: number;
  by_platform: Record<string, number>;
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function submitReview(data: { 
  name: string; 
  email?: string; 
  role?: string; 
  content: string; 
  rating?: number;
}): Promise<{ message: string; review?: Review }> {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit review');
  }
  return await response.json();
}

export async function fetchDownloadStats(): Promise<DownloadStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/download-stats`);
    if (!response.ok) throw new Error('Failed to fetch download stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching download stats:', error);
    return { total: 0, by_platform: {} };
  }
}

export async function incrementDownload(platform?: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/download-stats/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    });
  } catch (error) {
    console.error('Error incrementing download:', error);
  }
}