import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { videoService } from "@/services/api/videoService";

const MembershipVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await videoService.getAll();
      setVideos(data);
    } catch (err) {
      setError("영상 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadVideos} />;
  if (videos.length === 0) return <Empty />;

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
          멤버십 영상실
        </Text>
        <Text className="text-slate-400 max-w-2xl mx-auto">
          텍스트 인플루언서가 되기 위한 전문 교육 콘텐츠를 만나보세요
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
            title="강의 목록이 곧 추가됩니다"
            description="텍스트 인플루언서를 위한 다양한 강의와 실전 노하우가 준비되고 있습니다. 곧 만나보실 수 있어요!"
            icon="Video"
            gradient
          />
        </motion.div>

        {/* Secondary Info Cards */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-lg flex items-center justify-center border border-accent-500/30 flex-shrink-0">
                  <Text className="text-accent-400 font-bold text-lg">📚</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    체계적인 커리큘럼
                  </Text>
                  <Text className="text-slate-400">
                    기초부터 고급까지, 단계별로 구성된 전문 교육과정
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 rounded-lg flex items-center justify-center border border-secondary-500/30 flex-shrink-0">
                  <Text className="text-secondary-400 font-bold text-lg">🎯</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    실전 중심 교육
                  </Text>
                  <Text className="text-slate-400">
                    현업 전문가의 실제 경험과 노하우를 바탕으로 한 실무 교육
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="p-6" hover>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center border border-primary-500/30 flex-shrink-0">
                  <Text className="text-primary-400 font-bold text-lg">💡</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    개인 맞춤 피드백
                  </Text>
                  <Text className="text-slate-400">
                    개별 진도에 맞춘 맞춤형 피드백과 멘토링 서비스
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Coming Soon Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-12"
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <Text variant="h3" className="text-slate-200">
              곧 출시될 기능들
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30 mx-auto">
                  <Text className="text-emerald-400 font-bold text-lg">📹</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  HD 강의 영상
                </Text>
                <Text className="text-slate-400 text-sm">
                  고화질 강의 영상과 자막 지원
                </Text>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 mx-auto">
                  <Text className="text-blue-400 font-bold text-lg">📊</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  진도 관리
                </Text>
                <Text className="text-slate-400 text-sm">
                  학습 진도와 성취도 관리 시스템
                </Text>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30 mx-auto">
                  <Text className="text-purple-400 font-bold text-lg">💬</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  커뮤니티
                </Text>
                <Text className="text-slate-400 text-sm">
                  학습자 간 소통과 네트워킹 공간
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MembershipVideos;