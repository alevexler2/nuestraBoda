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

  public async getImages(eventId: string) {
    try {
      const response = await this.axiosInstance.get(
        `api/media-file/event/${eventId}`
      );
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

  public async createMediaFile(
    createDto: {
      file: File;
      URL?: string;
      MediaTypeID: number;
      UploadedBy: string;
      EventID?: string;
    },
    onProgress?: (progress: number) => void
  ) {
    try {
      const formData = new FormData();

      formData.append("file", createDto.file);
      formData.append("MediaTypeID", createDto.MediaTypeID.toString());
      formData.append("UploadedBy", createDto.UploadedBy);

      if (createDto.EventID) formData.append("EventID", createDto.EventID);
      if (createDto.URL) formData.append("URL", createDto.URL);

      const response = await axios.post("/api/media-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (evt) => {
          if (onProgress && evt.total && evt.total > 0) {
            const percent = Math.round((evt.loaded * 100) / evt.total );
            onProgress(percent);
          }
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating media file:", error);
      throw error;
    }
  }

  public async deleteMediaFile(mediaFileId: string) {
    try {
      const response = await this.axiosInstance.delete(
        `api/media-file/${mediaFileId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting media file with ID ${mediaFileId}:`, error);
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
      const response = await this.axiosInstance.get(
        `api/media-file-like/media-file/${mediaFileID}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching likes for media file ${mediaFileID}:`,
        error
      );
      throw error;
    }
  }

  public async createMediaFileComment(createDto: {
    MediaFileID: string;
    UserEmail: string;
    CommentText: string;
  }) {
    try {
      const response = await this.axiosInstance.post(
        "api/media-file-comment",
        createDto
      );
      return response.data;
    } catch (error) {
      console.error("Error creating media file comment:", error);
      throw error;
    }
  }

  public async getCommentsByMediaFile(MediaFileID: string) {
    try {
      const response = await this.axiosInstance.get(
        "api/media-file-comment/media-file",
        {
          params: { MediaFileID },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching comments for media file ${MediaFileID}:`,
        error
      );
      throw error;
    }
  }
}

export const api = ApiService.getInstance();
