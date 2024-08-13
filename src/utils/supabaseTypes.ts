export interface Model {
  id: string;
  name: string;
  createdBy: string | null;
  endpoint: string | null;
  apiKey: string | null;
  createdAt: string;
}
