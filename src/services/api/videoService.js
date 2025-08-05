import { toast } from 'react-toastify';

const tableName = 'video';

export const videoService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "instructor" } },
          { field: { Name: "duration" } },
          { field: { Name: "category" } },
          { field: { Name: "difficulty" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "uploadDate" } },
          { field: { Name: "views" } },
          { field: { Name: "rating" } },
          { field: { Name: "progress" } },
          { field: { Name: "embedURL" } }
        ],
        orderBy: [
          {
            fieldName: "uploadDate",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching videos:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "instructor" } },
          { field: { Name: "duration" } },
          { field: { Name: "category" } },
          { field: { Name: "difficulty" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "uploadDate" } },
          { field: { Name: "views" } },
          { field: { Name: "rating" } },
          { field: { Name: "progress" } },
          { field: { Name: "embedURL" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching video with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(video) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const params = {
records: [{
          Name: video.Name,
          Tags: video.Tags,
          title: video.title,
          description: video.description,
          instructor: video.instructor,
          duration: video.duration,
          category: video.category,
          difficulty: video.difficulty,
          thumbnail: video.thumbnail,
          uploadDate: video.uploadDate,
          views: video.views || 0,
          rating: video.rating || 0,
          progress: video.progress || 0,
          embedURL: video.embedURL
        }]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create videos ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, updatedVideo) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
const updateData = {
        Id: parseInt(id)
      };

      // Add only provided updateable fields
      if (updatedVideo.Name !== undefined) updateData.Name = updatedVideo.Name;
      if (updatedVideo.Tags !== undefined) updateData.Tags = updatedVideo.Tags;
      if (updatedVideo.title !== undefined) updateData.title = updatedVideo.title;
      if (updatedVideo.description !== undefined) updateData.description = updatedVideo.description;
      if (updatedVideo.instructor !== undefined) updateData.instructor = updatedVideo.instructor;
      if (updatedVideo.duration !== undefined) updateData.duration = updatedVideo.duration;
      if (updatedVideo.category !== undefined) updateData.category = updatedVideo.category;
      if (updatedVideo.difficulty !== undefined) updateData.difficulty = updatedVideo.difficulty;
      if (updatedVideo.thumbnail !== undefined) updateData.thumbnail = updatedVideo.thumbnail;
      if (updatedVideo.uploadDate !== undefined) updateData.uploadDate = updatedVideo.uploadDate;
      if (updatedVideo.views !== undefined) updateData.views = updatedVideo.views;
      if (updatedVideo.rating !== undefined) updateData.rating = updatedVideo.rating;
      if (updatedVideo.progress !== undefined) updateData.progress = updatedVideo.progress;
      if (updatedVideo.embedURL !== undefined) updateData.embedURL = updatedVideo.embedURL;
      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update videos ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async updateProgress(id, progress) {
    return this.update(id, { progress: Math.min(Math.max(progress, 0), 100) });
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete videos ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting video:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};