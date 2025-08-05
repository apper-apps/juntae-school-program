import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { reviewService } from "@/services/api/reviewService";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
          >
            <Card className="p-6 h-full" hover>
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Text className="text-white font-bold text-lg">
                        {review.userName.charAt(0)}
                      </Text>
                    </div>
                    <div>
                      <Text variant="h6" className="text-slate-200">
                        {review.userName}
                      </Text>
                      <Text className="text-slate-400 text-sm">
                        수강생
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <Text className="text-slate-300 leading-relaxed korean-text">
                    "{review.comment}"
                  </Text>
                </div>
                
                <div className="pt-2 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <Text className="text-slate-500 text-sm">
                      {new Date(review.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="ThumbsUp" size={14} className="text-slate-400" />
                      <Text className="text-slate-400 text-sm">도움됨</Text>
                    </div>
                  </div>
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