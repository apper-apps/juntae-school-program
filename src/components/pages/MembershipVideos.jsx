import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { videoService } from "@/services/api/videoService";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const MembershipVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

// Filter videos based on search term and selected category
  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    
    return videos.filter(video => {
      const matchesSearch = searchTerm === "" || 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || 
        video.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
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
          멤버십 영상실
        </Text>
        <Text className="text-slate-400 max-w-2xl mx-auto">
          텍스트 인플루언서가 되기 위한 전문 교육 콘텐츠를 만나보세요
        </Text>
      </div>

      {/* Search and Filter Section */}
      {!loading && !error && videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <ApperIcon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
                />
                <input
                  type="text"
                  placeholder="영상 제목이나 강사명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all korean-text"
                />
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="">모든 카테고리</option>
                  <option value="기초">기초</option>
                  <option value="중급">중급</option>
                  <option value="고급">고급</option>
                </select>
                <ApperIcon 
                  name="ChevronDown" 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" 
                />
              </div>
              
              {/* Clear Filters Button */}
              {(searchTerm || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="px-4 py-3 whitespace-nowrap"
                >
                  <ApperIcon name="X" size={16} className="mr-2" />
                  초기화
                </Button>
              )}
            </div>
            
            {/* Results Summary */}
            {(searchTerm || selectedCategory) && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <Text className="text-slate-400 text-sm">
                  {filteredVideos.length}개의 영상을 찾았습니다
                  {searchTerm && (
                    <span className="ml-2">
                      검색어: <span className="text-primary-400">"{searchTerm}"</span>
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="ml-2">
                      카테고리: <span className="text-primary-400">{selectedCategory}</span>
                    </span>
                  )}
                </Text>
              </div>
            )}
          </Card>
        </motion.div>
      )}

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
filteredVideos.length === 0 ? (
          <Empty 
            title={searchTerm || selectedCategory ? "검색 결과가 없습니다" : "영상이 없습니다"}
            description={
              searchTerm || selectedCategory 
                ? "다른 검색어나 필터 조건을 시도해보세요."
                : "아직 등록된 영상이 없습니다. 곧 다양한 강의 영상이 추가될 예정입니다."
            }
            icon="Video"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={video.Id}
                video={video}
                index={index}
              />
            ))}
          </div>
        )
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