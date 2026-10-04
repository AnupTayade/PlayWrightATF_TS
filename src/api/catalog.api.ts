import { ApiClient } from '../core/api-client';

export class CatalogApi {
  constructor(private readonly client: ApiClient) {}

  getAll<T>() {
    return this.client.get<T>('/api/ecom/product/get-all');
  }
}
