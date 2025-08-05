import articlesData from "@/services/mockData/monetizationTips.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const articleService = {
  async getAll() {
    await delay(300);
    return [...articlesData];
  },

  async getById(id) {
    await delay(200);
    const article = articlesData.find(item => item.Id === parseInt(id));
    if (!article) {
      throw new Error("아티클을 찾을 수 없습니다.");
    }
    return { ...article };
  },

  async getFeatured() {
    await delay(250);
    return articlesData.filter(article => article.featured);
  },

  async getByCategory(category) {
    await delay(300);
    return articlesData.filter(article => article.category === category);
  },

  async search(query) {
    await delay(400);
    const lowercaseQuery = query.toLowerCase();
    return articlesData.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  async create(article) {
    await delay(400);
    const newId = Math.max(...articlesData.map(item => item.Id)) + 1;
    const newArticle = { 
      ...article, 
      Id: newId,
      publishedDate: new Date().toISOString().split('T')[0],
      views: 0,
      featured: false
    };
    articlesData.push(newArticle);
    return { ...newArticle };
  },

  async update(id, updatedArticle) {
    await delay(350);
    const index = articlesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("아티클을 찾을 수 없습니다.");
    }
    articlesData[index] = { ...articlesData[index], ...updatedArticle };
    return { ...articlesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = articlesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("아티클을 찾을 수 없습니다.");
    }
    const deletedArticle = { ...articlesData[index] };
    articlesData.splice(index, 1);
    return deletedArticle;
  }
};