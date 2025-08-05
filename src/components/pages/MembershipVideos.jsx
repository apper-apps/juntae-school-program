import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { videoService } from "@/services/api/videoService";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";

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

      {/* Content Section with Conditional Rendering */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-slate-700 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-700 rounded animate-pulse" />
                  <div className="h-3 bg-slate-700 rounded animate-pulse w-2/3" />
                  <div className="h-3 bg-slate-700 rounded animate-pulse w-1/3" />
                </div>
              </Card>
            </motion.div>
          ))}
</div>
      ) : error ? (
        <Error message={error} onRetry={loadVideos} />
      ) : !videos || videos.length === 0 ? (
        <Empty 
          title="영상이 없습니다"
          description="아직 등록된 영상이 없습니다. 곧 다양한 강의 영상이 추가될 예정입니다."
          icon="Video"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={video.Id}
              video={video}
              index={index}
            />
          ))}
        </div>
      )}
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
}

// VideoCard Component
const VideoCard = ({ video, index }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins}분`;
    }
    return `${mins}분`;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case '기초':
        return 'bg-accent-500/20 text-accent-400 border-accent-500/30';
      case '중급':
        return 'bg-secondary-500/20 text-secondary-400 border-secondary-500/30';
      case '고급':
        return 'bg-primary-500/20 text-primary-400 border-primary-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card hover className="overflow-hidden group">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
          
          {/* Category Badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs border ${getCategoryColor(video.category)}`}>
            {video.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <Text 
            variant="h6" 
            className="text-slate-200 font-medium group-hover:text-primary-400 transition-colors korean-text line-clamp-2"
          >
            {video.title}
          </Text>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Text className="text-white text-xs font-bold">준</Text>
            </div>
            <Text className="text-slate-400 text-sm">
              {video.instructor}
            </Text>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MembershipVideos;