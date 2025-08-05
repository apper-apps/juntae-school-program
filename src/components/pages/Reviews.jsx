import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { reviewService } from "@/services/api/reviewService";
import ApperIcon from "@/components/ApperIcon";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
// Form state
  const [formData, setFormData] = useState({
    userName: "",
    comment: "",
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userName.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    
    if (!formData.comment.trim()) {
      toast.error("리뷰 내용을 입력해주세요.");
      return;
    }
    
    if (formData.comment.length > 500) {
      toast.error("리뷰는 500자 이내로 작성해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      const reviewData = {
        userName: formData.userName.trim(),
        comment: formData.comment.trim(),
        rating: formData.rating,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isAnonymous: true
      };
      
      await reviewService.create(reviewData);
      toast.success("리뷰가 성공적으로 등록되었습니다!");
      
      // Reset form
      setFormData({
        userName: "",
        comment: "",
        rating: 5
      });
      
      // Reload reviews
      loadReviews();
    } catch (err) {
      toast.error("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await reviewService.likeReview(reviewId);
      
      // Update local state optimistically
      setReviews(prev => prev.map(review => 
        review.Id === reviewId 
          ? { ...review, likes: (review.likes || 0) + 1 }
          : review
      ));
      
      toast.success("도움이 되었다고 표시했습니다!");
    } catch (err) {
      toast.error("좋아요 처리에 실패했습니다.");
    }
  };
  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await reviewService.getAll();
      setReviews(data);
    } catch (err) {
      setError("리뷰를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadReviews();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadReviews} />;
  if (reviews.length === 0) return <Empty />;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <ApperIcon
        key={index}
        name="Star"
        size={16}
        className={
          index < rating
            ? "text-amber-400 fill-current"
            : "text-slate-600"
        }
      />
    ));
  };

// Calculate review statistics
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;
  
  const totalReviews = reviews.length;
  const fiveStarReviews = reviews.filter(review => review.rating === 5).length;
  const satisfactionRate = totalReviews > 0 
    ? Math.round((fiveStarReviews / totalReviews) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <Text variant="h1" gradient>
          수강생 리뷰
        </Text>
        <Text className="text-slate-400 max-w-2xl mx-auto">
          준태스쿨을 수강한 학습자들의 생생한 후기와 성공 스토리를 확인해보세요
        </Text>
</div>

      {/* Review Submission Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Text variant="h3" className="text-slate-200">
                리뷰 작성하기
              </Text>
              <Text className="text-slate-400">
                준태스쿨에 대한 솔직한 후기를 남겨주세요 (로그인 불필요)
              </Text>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nickname Input */}
                <div className="space-y-2">
                  <Text className="text-slate-300 font-medium">
                    닉네임 <span className="text-red-400">*</span>
                  </Text>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="닉네임을 입력하세요"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                    maxLength={50}
                  />
                </div>
                
                {/* Rating Selection */}
                <div className="space-y-2">
                  <Text className="text-slate-300 font-medium">
                    평점 <span className="text-red-400">*</span>
                  </Text>
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleRatingChange(index + 1)}
                        className="transition-colors"
                      >
                        <ApperIcon
                          name="Star"
                          size={24}
                          className={
                            index < formData.rating
                              ? "text-amber-400 fill-current hover:text-amber-300"
                              : "text-slate-600 hover:text-slate-500"
                          }
                        />
                      </button>
                    ))}
                    <Text className="text-slate-400 ml-2">
                      ({formData.rating}점)
                    </Text>
                  </div>
                </div>
              </div>
              
              {/* Comment Textarea */}
              <div className="space-y-2">
                <Text className="text-slate-300 font-medium">
                  리뷰 내용 <span className="text-red-400">*</span>
                </Text>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="준태스쿨에 대한 솔직한 후기를 남겨주세요..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between">
                  <Text className="text-slate-500 text-sm">
                    최대 500자까지 입력 가능합니다
                  </Text>
                  <Text className={`text-sm ${formData.comment.length > 450 ? 'text-amber-400' : 'text-slate-500'}`}>
                    {formData.comment.length}/500
                  </Text>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "등록 중..." : "리뷰 등록하기"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>

      {/* Review Statistics */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-8">
            <div className="text-center space-y-6">
              <Text variant="h3" className="text-slate-200">
                수강생 만족도
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3 text-center">
                  <Text variant="h2" gradient className="font-bold">
                    {averageRating}
                  </Text>
                  <div className="flex items-center justify-center space-x-1">
                    {renderStars(Math.floor(averageRating))}
                  </div>
                  <Text className="text-slate-300 font-medium">
                    평균 평점
                  </Text>
                  <Text className="text-slate-400 text-sm">
                    5점 만점 기준
                  </Text>
                </div>
                <div className="space-y-3 text-center">
                  <Text variant="h2" gradient className="font-bold">
                    {satisfactionRate}%
                  </Text>
                  <Text className="text-slate-300 font-medium">
                    만족도
                  </Text>
                  <Text className="text-slate-400 text-sm">
                    5점 만점 기준
                  </Text>
                </div>
                <div className="space-y-3 text-center">
                  <Text variant="h2" gradient className="font-bold">
                    {totalReviews}
                  </Text>
                  <Text className="text-slate-300 font-medium">
                    총 리뷰 수
                  </Text>
                  <Text className="text-slate-400 text-sm">
                    검증된 수강생 후기
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Review Cards */}
{/* Review Timeline Header */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <Text variant="h3" className="text-slate-200 mb-2">
            커뮤니티 리뷰 타임라인
          </Text>
          <Text className="text-slate-400">
            수강생들의 생생한 후기를 시간순으로 확인해보세요
          </Text>
        </motion.div>
      )}

      {/* Review Timeline */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
          >
            <Card className="p-6" hover>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Text className="text-white font-bold text-lg">
                        {review.userName.charAt(0).toUpperCase()}
                      </Text>
                    </div>
                    <div>
                      <Text variant="h6" className="text-slate-200">
                        {review.userName}
                      </Text>
                      <div className="flex items-center space-x-2">
                        <Text className="text-slate-400 text-sm">
                          {new Date(review.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                        <span className="text-slate-600">•</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(review.Id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group"
                  >
                    <ApperIcon 
                      name="ThumbsUp" 
                      size={16} 
                      className="text-slate-400 group-hover:text-primary-400 transition-colors" 
                    />
                    <Text className="text-slate-400 group-hover:text-primary-400 text-sm font-medium transition-colors">
                      {review.likes || 0}
                    </Text>
                  </button>
                </div>
                
                {/* Review Content */}
                <div className="ml-15">
                  <Text className="text-slate-300 leading-relaxed korean-text text-base">
                    "{review.comment}"
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>
))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon name="MessageSquare" size={28} className="text-white" />
            </div>
            <Text variant="h3" className="text-slate-200">
              당신의 성공 스토리를 들려주세요
            </Text>
            <Text className="text-slate-400 max-w-2xl mx-auto">
              준태스쿨을 통해 얻은 성과와 경험을 다른 예비 수강생들과 공유해보세요. 
              여러분의 후기가 누군가에게는 큰 동기부여가 될 수 있습니다.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="text-center space-y-2">
                <Text className="text-slate-300 font-medium">
                  평균 수강 만족도
                </Text>
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                  </div>
                  <Text className="text-amber-400 font-bold">
                    {averageRating || "5.0"}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Reviews;