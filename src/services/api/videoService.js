import videosData from "@/services/mockData/videos.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const videoService = {
  async getAll() {
    await delay(300);
    return [...videosData];
  },

  async getById(id) {
    await delay(200);
    const video = videosData.find(item => item.Id === parseInt(id));
    if (!video) {
      throw new Error("영상을 찾을 수 없습니다.");
    }
    return { ...video };
  },

async create(video) {
    await delay(400);
    const newId = Math.max(...videosData.map(item => item.Id)) + 1;
    const newVideo = { ...video, Id: newId, progress: video.progress || 0 };
    videosData.push(newVideo);
    return { ...newVideo };
  },

async update(id, updatedVideo) {
    await delay(350);
    const index = videosData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("영상을 찾을 수 없습니다.");
    }
    videosData[index] = { ...videosData[index], ...updatedVideo };
    return { ...videosData[index] };
  },

  async updateProgress(id, progress) {
    await delay(200);
    const index = videosData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("영상을 찾을 수 없습니다.");
    }
    videosData[index].progress = Math.min(Math.max(progress, 0), 100);
    return { ...videosData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = videosData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("영상을 찾을 수 없습니다.");
    }
    const deletedVideo = { ...videosData[index] };
    videosData.splice(index, 1);
    return deletedVideo;
  }
};