import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async post<T>(path: string, data: unknown): Promise<T> {
    const response = await this.request.post(path, { data });
    await expect(response).toBeOK();
    return response.json() as Promise<T>;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const response = await this.request.get(path, { params });
    await expect(response).toBeOK();
    return response.json() as Promise<T>;
  }

  async getText(path: string): Promise<string> {
    const response = await this.request.get(path);
    await expect(response).toBeOK();
    return response.text();
  }
}
