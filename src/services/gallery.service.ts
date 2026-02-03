const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

function unwrapList<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray((data as Paginated<T>).results)) return (data as Paginated<T>).results;
  return [];
}

async function safeJson<T = any>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    // @ts-expect-error
    return text as T;
  }
}

function buildErrorMessage(prefix: string, response: Response, data: any) {
  const detail =
    typeof data === "string"
      ? data
      : data?.detail || data?.message || data?.error || JSON.stringify(data);

  return `${prefix} (HTTP ${response.status}) - ${detail}`;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
  is_active: boolean;
  items_count: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category_name: string;
  category_slug: string;
  type: "image" | "video";
  url: string;
  thumb: string;
  date: string;
  formatted_date: string;
  is_featured: boolean;
  views_count: number;
}

export interface GalleryItemDetail extends GalleryItem {
  category: number;
  video_url_processed: string | null;
  description: string;
  photographer: string;
  location: string;
  tags: string;
  tags_list: string[];
  downloads_count: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryStats {
  total_items: number;
  total_images: number;
  total_videos: number;
  total_categories: number;
  total_views: number;
  total_downloads: number;
  featured_items: number;
  most_viewed: GalleryItem[];
  recent_items: GalleryItem[];
}

export interface GalleryCategoryWithItems {
  category: GalleryCategory;
  items: GalleryItem[];
}

export interface GalleryFilters {
  category?: number;
  category_slug?: string;
  type?: "image" | "video";
  is_featured?: boolean;
  date_from?: string;
  date_to?: string;
  year?: number;
  month?: number;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

class GalleryService {
  private baseUrl = `${API_BASE}/gallery`;

  private buildQueryString(filters?: GalleryFilters): string {
    if (!filters) return "";

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  async getCategories(): Promise<GalleryCategory[]> {
    const response = await fetch(`${this.baseUrl}/categories/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar categorias", response, data));
    }

    return unwrapList<GalleryCategory>(data);
  }

  async getCategory(id: number): Promise<GalleryCategory> {
    const response = await fetch(`${this.baseUrl}/categories/${id}/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar categoria", response, data));
    }

    return data as GalleryCategory;
  }

  async getCategoryItems(categoryId: number): Promise<GalleryItem[]> {
    const response = await fetch(`${this.baseUrl}/categories/${categoryId}/items/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens da categoria", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async getItems(filters?: GalleryFilters): Promise<GalleryItem[]> {
    const queryString = this.buildQueryString(filters);
    const response = await fetch(`${this.baseUrl}/items/${queryString}`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async getItem(id: number): Promise<GalleryItemDetail> {
    const response = await fetch(`${this.baseUrl}/items/${id}/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar item", response, data));
    }

    return data as GalleryItemDetail;
  }

  async getFeaturedItems(): Promise<GalleryItem[]> {
    const response = await fetch(`${this.baseUrl}/items/featured/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens destacados", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async getRecentItems(): Promise<GalleryItem[]> {
    const response = await fetch(`${this.baseUrl}/items/recent/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens recentes", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async getPopularItems(): Promise<GalleryItem[]> {
    const response = await fetch(`${this.baseUrl}/items/popular/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens populares", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async getItemsByCategory(): Promise<GalleryCategoryWithItems[]> {
    const response = await fetch(`${this.baseUrl}/items/by_category/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar itens por categoria", response, data));
    }

    return unwrapList<GalleryCategoryWithItems>(data);
  }

  async getStats(): Promise<GalleryStats> {
    const response = await fetch(`${this.baseUrl}/items/stats/`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao buscar estatísticas", response, data));
    }

    return data as GalleryStats;
  }

  async searchAdvanced(params: {
    q?: string;
    categories?: number[];
    types?: ("image" | "video")[];
    featured?: boolean;
    year?: number;
    month?: number;
  }): Promise<GalleryItem[]> {
    const queryParams = new URLSearchParams();

    if (params.q) queryParams.append("q", params.q);
    if (params.categories?.length) queryParams.append("categories", params.categories.join(","));
    if (params.types?.length) queryParams.append("types", params.types.join(","));
    if (params.featured !== undefined) queryParams.append("featured", String(params.featured));
    if (params.year) queryParams.append("year", String(params.year));
    if (params.month) queryParams.append("month", String(params.month));

    const response = await fetch(`${this.baseUrl}/items/search_advanced/?${queryParams.toString()}`);
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro na busca avançada", response, data));
    }

    return unwrapList<GalleryItem>(data);
  }

  async registerDownload(id: number): Promise<{ message: string; downloads_count: number }> {
    const response = await fetch(`${this.baseUrl}/items/${id}/download/`, {
      method: "POST",
    });
    const data = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao registrar download", response, data));
    }

    return data as { message: string; downloads_count: number };
  }

  async createItem(data: FormData | any, token?: string): Promise<GalleryItem> {
    const headers: HeadersInit = {};

    if (token) headers["Authorization"] = `Bearer ${token}`;

    let body: BodyInit;
    if (data instanceof FormData) {
      body = data;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}/items/`, {
      method: "POST",
      headers,
      body,
    });
    const resData = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao criar item", response, resData));
    }

    return resData as GalleryItem;
  }

  async updateItem(id: number, data: FormData | any, token?: string): Promise<GalleryItem> {
    const headers: HeadersInit = {};

    if (token) headers["Authorization"] = `Bearer ${token}`;

    let body: BodyInit;
    if (data instanceof FormData) {
      body = data;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}/items/${id}/`, {
      method: "PUT",
      headers,
      body,
    });
    const resData = await safeJson(response);

    if (!response.ok) {
      throw new Error(buildErrorMessage("Erro ao atualizar item", response, resData));
    }

    return resData as GalleryItem;
  }

  async deleteItem(id: number, token?: string): Promise<void> {
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${this.baseUrl}/items/${id}/`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const data = await safeJson(response);
      throw new Error(buildErrorMessage("Erro ao deletar item", response, data));
    }
  }
}

export const galleryService = new GalleryService();

export default GalleryService;
