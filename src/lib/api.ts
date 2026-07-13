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

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    return await apiRequest<Review[]>('/reviews');
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
  return apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchDownloadStats(): Promise<DownloadStats> {
  try {
    return await apiRequest<DownloadStats>('/download-stats');
  } catch (error) {
    console.error('Error fetching download stats:', error);
    return { total: 0, by_platform: {} };
  }
}

export async function incrementDownload(platform?: string): Promise<void> {
  try {
    await apiRequest('/download-stats/increment', {
      method: 'POST',
      body: JSON.stringify({ platform }),
    });
  } catch (error) {
    console.error('Error incrementing download:', error);
  }
}