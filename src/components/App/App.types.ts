export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

export interface FetchResponse {
  per_page: number;
  photos: Image[];
  total_results: number;
}
export interface ApiResponse {
  results: Image[];
  total: number;
}
