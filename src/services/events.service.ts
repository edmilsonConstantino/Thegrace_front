import api from './api';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  formatted_date: string;
  time: string;
  location: string;
  image: string | null;
  image_url: string | null;
  category: string;
  attendees: number;
  max_attendees: number;
  featured: boolean;
  status: 'upcoming' | 'past' | 'cancelled';
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface EventsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

export interface Category {
  value: string;
  label: string;
}

class EventsService {
  async getAll(params?: {
    category?: string;
    status?: string;
    search?: string;
    page?: number;
  }): Promise<Event[]> {
    try {
      const response = await api.get<EventsResponse | Event[]>('/events/', { params });
      if ('results' in response.data) {
        return response.data.results;
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return [];
    }
  }

  async getById(id: number): Promise<Event | null> {
    try {
      const response = await api.get<Event>(`/events/${id}/`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getUpcoming(params?: {
    category?: string;
    search?: string;
  }): Promise<Event[]> {
    try {
      const response = await api.get<Event[]>('/events/upcoming/', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return [];
    }
  }

  async getPast(params?: {
    category?: string;
    search?: string;
  }): Promise<Event[]> {
    try {
      const response = await api.get<Event[]>('/events/past/', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return [];
    }
  }

  async getFeatured(): Promise<Event | null> {
    try {
      const response = await api.get<Event>('/events/featured/');
      return response.data;
    } catch (error: any) {
      // 404 é esperado quando não há evento em destaque
      if (error.response?.status === 404) {
        return null;
      }
      return null;
    }
  }

  async register(id: number): Promise<Event | null> {
    try {
      const response = await api.post<Event>(`/events/${id}/register/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>('/events/categories/');
      return response.data;
    } catch (error) {
      return [];
    }
  }
}

export default new EventsService();