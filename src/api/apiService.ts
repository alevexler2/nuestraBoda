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
      const response = await this.axiosInstance.get("api/cloudinary/mi-boda");
      return response.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  }

  public async getEventById(id: string) {
    try {
      const response = await this.axiosInstance.get(`api/event-settings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  }

  public async createMediaFile(createDto: {
    URL: string;
    MediaTypeID: number;
    UploadedBy: string;
    EventID?: string;
  }) {
    try {
      const response = await this.axiosInstance.post(
        "api/media-file",
        createDto
      );
      return response.data;
    } catch (error) {
      console.error("Error creating media file:", error);
      throw error;
    }
  }

  public async deleteMediaFile(url: string) {
    try {
      const response = await this.axiosInstance.delete("api/cloudinary", {
        data: { url },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting media file with URL ${url}:`, error);
      throw error;
    }
  }

  public async toggleLike(mediaFileID: string, UserEmail: string) {
    try {
      const response = await this.axiosInstance.post("api/media-file-like", {
        MediaFileID: mediaFileID,
        UserEmail: UserEmail,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error toggling like for media file ${mediaFileID}:`,
        error
      );
      throw error;
    }
  }

   public async getLikesByMediaFile(mediaFileID: string) {
    try {
      const response = await this.axiosInstance.get(`api/media-file-like/media-file/${mediaFileID}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching likes for media file ${mediaFileID}:`, error);
      throw error;
    }
  }
}

export const api = ApiService.getInstance();
