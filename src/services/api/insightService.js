import insightsData from "@/services/mockData/insights.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const insightService = {
  async getAll() {
    await delay(300);
    return [...insightsData];
  },

  async getById(id) {
    await delay(200);
    const insight = insightsData.find(item => item.Id === parseInt(id));
    if (!insight) {
      throw new Error("인사이트를 찾을 수 없습니다.");
    }
    return { ...insight };
  },

  async create(insight) {
    await delay(400);
    const newId = Math.max(...insightsData.map(item => item.Id)) + 1;
    const newInsight = { ...insight, Id: newId };
    insightsData.push(newInsight);
    return { ...newInsight };
  },

  async update(id, updatedInsight) {
    await delay(350);
    const index = insightsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("인사이트를 찾을 수 없습니다.");
    }
    insightsData[index] = { ...insightsData[index], ...updatedInsight };
    return { ...insightsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = insightsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("인사이트를 찾을 수 없습니다.");
    }
    const deletedInsight = { ...insightsData[index] };
    insightsData.splice(index, 1);
    return deletedInsight;
  }
};