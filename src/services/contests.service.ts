import api from './api';

export interface Contest {
  id: number;
  title: string;
  description: string;
  image: string | null;
  image_url: string | null;
  deadline: string;
  formatted_deadline: string;
  days_left: number;
  participants: number;
  max_participants: number;
  progress_percent: number;
  prize: string;
  category: string;
  status: 'upcoming' | 'active' | 'finished';
  winner: string | null;
  rules: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  value: string;
  label: string;
}

class ContestsService {
  async getAll(): Promise<Contest[]> {
    try {
      const response = await api.get<Contest[]>('/contests/');
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  }

  async getById(id: number): Promise<Contest | null> {
    try {
      const response = await api.get<Contest>(`/contests/${id}/`);
      return response.data;
    } catch {
      return null;
    }
  }

  async getActive(params?: { category?: string }): Promise<Contest[]> {
    try {
      const response = await api.get<Contest[]>('/contests/active/', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  }

  async getFinished(params?: { category?: string }): Promise<Contest[]> {
    try {
      const response = await api.get<Contest[]>('/contests/finished/', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>('/contests/categories/');
      return response.data;
    } catch {
      return [];
    }
  }

  async participate(id: number): Promise<Contest | null> {
    try {
      const response = await api.post<Contest>(`/contests/${id}/participate/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContestsService();