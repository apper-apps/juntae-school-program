import { toast } from 'react-toastify';

const tableName = 'blog_post';

function getApperClient() {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
}

const blogPostService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "content" } },
          { field: { Name: "author" } },
          { field: { Name: "publishedDate" } },
          { field: { Name: "category" } },
          { field: { Name: "readTime" } },
          { field: { Name: "views" } },
          { field: { Name: "featured" } }
        ],
        orderBy: [
          {
            fieldName: "publishedDate",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
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
        console.error("Error fetching blog posts:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async create(postData) {
    try {
      const apperClient = getApperClient();
      
      // Only include Updateable fields
      const params = {
        records: [{
          title: postData.title,
          description: postData.description || '',
          thumbnail: postData.thumbnail || '',
          content: postData.content,
          author: postData.author,
          publishedDate: postData.publishedDate,
          category: postData.category || 'Other',
          readTime: postData.readTime || 5,
          views: 0,
          featured: false
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
          console.error(`Failed to create blog post ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating blog post:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};

export default blogPostService;
import { toast } from 'react-toastify';

const tableName = 'blog_post';

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const blogPostService = {
  // Get all blog posts with Money Insight category filter
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "content" } },
          { field: { Name: "author" } },
          { field: { Name: "publishedDate" } },
          { field: { Name: "category" } },
          { field: { Name: "readTime" } },
          { field: { Name: "views" } },
          { field: { Name: "featured" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: ["Money Insight"]
          }
        ],
        orderBy: [
          {
            fieldName: "publishedDate",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(`Failed to fetch blog posts: ${response.message}`);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching blog posts:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error fetching blog posts:", error.message);
        toast.error("블로그 포스트를 불러오는데 실패했습니다.");
      }
      return [];
    }
  },

  // Get blog post by ID
  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "thumbnail" } },
          { field: { Name: "content" } },
          { field: { Name: "author" } },
          { field: { Name: "publishedDate" } },
          { field: { Name: "category" } },
          { field: { Name: "readTime" } },
          { field: { Name: "views" } },
          { field: { Name: "featured" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, id, params);

      if (!response.success) {
        console.error(`Failed to fetch blog post ${id}: ${response.message}`);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching blog post ${id}:`, error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error(`Error fetching blog post ${id}:`, error.message);
        toast.error("블로그 포스트를 불러오는데 실패했습니다.");
      }
      return null;
    }
  },

  // Create new blog post
  async create(postData) {
    try {
      const apperClient = getApperClient();

      // Only include Updateable fields
      const params = {
        records: [{
          Name: postData.Name || postData.title,
          title: postData.title,
          description: postData.description,
          thumbnail: postData.thumbnail || "",
          content: postData.content || "",
          author: postData.author, // Lookup field - send as ID
          publishedDate: postData.publishedDate, // Date format: YYYY-MM-DD
          category: postData.category || "Money Insight",
          readTime: parseInt(postData.readTime) || 5,
          views: parseInt(postData.views) || 0,
          featured: !!postData.featured,
          Tags: postData.Tags || ""
        }]
      };

      const response = await apperClient.createRecord(tableName, params);

      if (!response.success) {
        console.error(`Failed to create blog post: ${response.message}`);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create blog post ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success("블로그 포스트가 성공적으로 생성되었습니다.");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating blog post:", error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Error creating blog post:", error.message);
        toast.error("블로그 포스트 생성에 실패했습니다.");
      }
      return null;
    }
  },

  // Update blog post
  async update(id, postData) {
    try {
      const apperClient = getApperClient();

      // Only include Updateable fields plus Id
      const params = {
        records: [{
          Id: parseInt(id),
          Name: postData.Name || postData.title,
          title: postData.title,
          description: postData.description,
          thumbnail: postData.thumbnail,
          content: postData.content,
          author: postData.author, // Lookup field - send as ID
          publishedDate: postData.publishedDate, // Date format: YYYY-MM-DD
          category: postData.category,
          readTime: parseInt(postData.readTime),
          views: parseInt(postData.views),
          featured: !!postData.featured,
          Tags: postData.Tags || ""
        }]
      };

      const response = await apperClient.updateRecord(tableName, params);

      if (!response.success) {
        console.error(`Failed to update blog post ${id}: ${response.message}`);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update blog post ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success("블로그 포스트가 성공적으로 업데이트되었습니다.");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating blog post ${id}:`, error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error(`Error updating blog post ${id}:`, error.message);
        toast.error("블로그 포스트 업데이트에 실패했습니다.");
      }
      return null;
    }
  },

  // Delete blog post
  async delete(id) {
    try {
      const apperClient = getApperClient();

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);

      if (!response.success) {
        console.error(`Failed to delete blog post ${id}: ${response.message}`);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete blog post ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success("블로그 포스트가 성공적으로 삭제되었습니다.");
          return true;
        }
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting blog post ${id}:`, error?.response?.data?.message);
        toast.error(error.response.data.message);
      } else {
        console.error(`Error deleting blog post ${id}:`, error.message);
        toast.error("블로그 포스트 삭제에 실패했습니다.");
      }
      return false;
    }
  }
};

export default blogPostService;