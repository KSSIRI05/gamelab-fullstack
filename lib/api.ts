// Configuration de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types pour TypeScript
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  location?: string;
  max_participants?: number;
  participants_count: number;
  image_url?: string;
  created_at: string;
}

export interface EventRegistration {
  id: number;
  user_id: number;
  event_id: number;
  registered_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Service API class
class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Récupérer le token depuis localStorage au démarrage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  // Headers avec authentification
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Gestion des erreurs
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  // Sauvegarder le token
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Supprimer le token
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // AUTH ENDPOINTS
  async register(userData: RegisterData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    return this.handleResponse<User>(response);
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(loginData),
    });

    const authResponse = await this.handleResponse<AuthResponse>(response);
    this.setToken(authResponse.access_token);
    return authResponse;
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/api/auth/me`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<User>(response);
  }

  // EVENT ENDPOINTS
  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${this.baseUrl}/api/events/`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<Event[]>(response);
  }

  async getEvent(eventId: number): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/api/events/${eventId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<Event>(response);
  }

  async createEvent(eventData: Omit<Event, 'id' | 'participants_count' | 'created_at'>): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/api/events/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(eventData),
    });

    return this.handleResponse<Event>(response);
  }

  async registerForEvent(eventId: number): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/api/events/${eventId}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    return this.handleResponse<{ message: string }>(response);
  }

  async unregisterFromEvent(eventId: number): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/api/events/${eventId}/register`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<{ message: string }>(response);
  }

  async getUserRegistrations(): Promise<EventRegistration[]> {
    const response = await fetch(`${this.baseUrl}/api/events/registrations`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<EventRegistration[]>(response);
  }

  async getEventParticipants(eventId: number): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/api/events/${eventId}/participants`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<User[]>(response);
  }

  // HEALTH CHECK
  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseUrl}/health`, {
      method: 'GET',
    });

    return this.handleResponse<{ status: string }>(response);
  }
}

// Instance singleton
export const apiService = new ApiService();
export default apiService;