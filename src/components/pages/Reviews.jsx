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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Primary Placeholder Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <PlaceholderCard
            title="수강생 후기 준비 중"
            description="곧 다양한 수강생들의 생생한 후기와 성공 사례를 만나보실 수 있습니다. 기대해 주세요!"
            icon="MessageSquare"
            gradient
          />
        </motion.div>

        {/* Sample Review Preview */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="p-6" hover>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Text className="text-white font-bold text-sm">김</Text>
                    </div>
                    <div>
                      <Text variant="h6" className="text-slate-200">
                        김○○님
                      </Text>
                      <Text className="text-slate-400 text-sm">
                        수강 예정자
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                  </div>
                </div>
                <Text className="text-slate-300 leading-relaxed">
                  "텍스트 인플루언서에 대해 배우고 싶어서 기다리고 있습니다. 체계적인 커리큘럼이 기대돼요!"
                </Text>
                <Text className="text-slate-500 text-sm">
                  2024년 출시 예정
                </Text>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="p-6" hover>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-amber-500 rounded-full flex items-center justify-center">
                      <Text className="text-white font-bold text-sm">박</Text>
                    </div>
                    <div>
                      <Text variant="h6" className="text-slate-200">
                        박○○님
                      </Text>
                      <Text className="text-slate-400 text-sm">
                        대기 중인 수강생
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                  </div>
                </div>
                <Text className="text-slate-300 leading-relaxed">
                  "실전 중심의 교육이라는 점이 매력적입니다. 빨리 시작하고 싶어요!"
                </Text>
                <Text className="text-slate-500 text-sm">
                  런칭 대기 중
                </Text>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Statistics Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <Text variant="h3" className="text-slate-200">
              예상 만족도 지표
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3 text-center">
                <Text variant="h2" gradient className="font-bold">
                  95%
                </Text>
                <Text className="text-slate-300 font-medium">
                  예상 만족도
                </Text>
                <Text className="text-slate-400 text-sm">
                  체계적인 커리큘럼 기대
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <Text variant="h2" gradient className="font-bold">
                  4.9
                </Text>
                <Text className="text-slate-300 font-medium">
                  목표 평점
                </Text>
                <Text className="text-slate-400 text-sm">
                  5점 만점 기준
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <Text variant="h2" gradient className="font-bold">
                  100+
                </Text>
                <Text className="text-slate-300 font-medium">
                  대기 수강생
                </Text>
                <Text className="text-slate-400 text-sm">
                  런칭 전 사전 등록자
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <Text variant="h2" gradient className="font-bold">
                  24/7
                </Text>
                <Text className="text-slate-300 font-medium">
                  학습 지원
                </Text>
                <Text className="text-slate-400 text-sm">
                  언제든지 학습 가능
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Review Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="p-8">
          <div className="space-y-6">
            <Text variant="h3" className="text-slate-200">
              준태스쿨 수강 후 기대 효과
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      전문 스킬 습득
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      텍스트 콘텐츠 제작의 핵심 기술과 노하우 완전 습득
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      수익화 성공
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      다양한 수익원을 통한 안정적인 인플루언서 수입 창출
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      브랜드 구축
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      개인만의 독창적인 브랜드 아이덴티티 완성
                    </Text>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      네트워크 확장
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      업계 전문가들과의 네트워킹 기회와 협업 가능성 확대
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      지속 성장
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      장기적인 성공을 위한 전략적 사고와 실행력 배양
                    </Text>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ApperIcon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <Text variant="h6" className="text-slate-300">
                      자신감 증진
                    </Text>
                    <Text className="text-slate-400 text-sm">
                      전문적인 텍스트 인플루언서로서의 자신감과 정체성 확립
                    </Text>
                  </div>
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