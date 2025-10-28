import axios, { type AxiosInstance } from "axios";

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL, 
      timeout: 15000, 
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async getImages() {
    try {
      const response = await this.axiosInstance.get("/cloudinary/mi-boda");
      return response.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  }
}

export const api = ApiService.getInstance();
