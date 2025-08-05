import reviewsData from "@/services/mockData/reviews.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewService = {
  async getAll() {
    await delay(300);
    return [...reviewsData];
  },

  async getById(id) {
    await delay(200);
    const review = reviewsData.find(item => item.Id === parseInt(id));
    if (!review) {
      throw new Error("리뷰를 찾을 수 없습니다.");
    }
    return { ...review };
  },

  async create(review) {
    await delay(400);
    const newId = Math.max(...reviewsData.map(item => item.Id)) + 1;
    const newReview = { ...review, Id: newId };
    reviewsData.push(newReview);
    return { ...newReview };
  },

  async update(id, updatedReview) {
    await delay(350);
    const index = reviewsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("리뷰를 찾을 수 없습니다.");
    }
    reviewsData[index] = { ...reviewsData[index], ...updatedReview };
    return { ...reviewsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = reviewsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("리뷰를 찾을 수 없습니다.");
    }
    const deletedReview = { ...reviewsData[index] };
    reviewsData.splice(index, 1);
    return deletedReview;
  }
};