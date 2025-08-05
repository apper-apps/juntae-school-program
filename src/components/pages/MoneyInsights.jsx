import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const MoneyInsights = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock data for demonstration - will be replaced with actual service
  const mockBlogPosts = [
    {
      Id: 1,
      title: "텍스트 인플루언서를 위한 첫 번째 수익화 전략",
      description: "블로그와 소셜미디어를 활용한 기본적인 수익화 방법을 알아보세요. 광고 수익부터 제휴 마케팅까지 단계별로 설명합니다.",
      author: "김수익",
      publishedDate: "2024-01-15",
      category: "기초 수익화",
      readTime: 5,
      views: 1250,
      featured: true
    },
    {
      Id: 2,
      title: "브랜드 협업으로 수익 극대화하기",
      description: "브랜드와의 성공적인 협업을 통해 안정적인 수익을 만드는 실전 노하우를 공유합니다.",
      author: "박협업",
      publishedDate: "2024-01-12",
      category: "브랜드 협업",
      readTime: 7,
      views: 980,
      featured: false
    },
    {
      Id: 3,
      title: "디지털 상품 판매로 passive income 만들기",
      description: "전자책, 온라인 강의, 템플릿 등 디지털 상품을 통한 지속적인 수익 창출 방법을 알려드립니다.",
      author: "이디지털",
      publishedDate: "2024-01-10",
      category: "디지털 상품",
      readTime: 6,
      views: 1450,
      featured: true
    },
    {
      Id: 4,
      title: "구독 모델과 멤버십 운영 가이드",
      description: "안정적인 월 수익을 위한 구독 서비스와 멤버십 프로그램 운영 전략을 상세히 다룹니다.",
      author: "최구독",
      publishedDate: "2024-01-08",
      category: "구독 모델",
      readTime: 8,
      views: 750,
      featured: false
    },
    {
      Id: 5,
      title: "텍스트 콘텐츠의 가치를 높이는 SEO 전략",
      description: "검색 엔진 최적화를 통해 더 많은 독자에게 도달하고 수익을 증대시키는 방법을 설명합니다.",
      author: "서최적",
      publishedDate: "2024-01-05",
      category: "SEO & 마케팅",
      readTime: 9,
      views: 1180,
      featured: false
    },
    {
      Id: 6,
      title: "인플루언서 마케팅의 새로운 트렌드",
      description: "2024년 텍스트 인플루언서들이 주목해야 할 마케팅 트렌드와 전략을 분석합니다.",
      author: "트렌드킹",
      publishedDate: "2024-01-03",
      category: "SEO & 마케팅",
      readTime: 6,
      views: 892,
      featured: false
    }
  ];

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      setError("");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setBlogPosts(mockBlogPosts);
    } catch (err) {
      setError("블로그 포스트를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      "기초 수익화": "bg-green-500/20 text-green-400 border-green-500/30",
      "브랜드 협업": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "디지털 상품": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "구독 모델": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "SEO & 마케팅": "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return colors[category] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  const handleWritePost = () => {
    // Navigate to write post page (will be implemented)
    console.log("Navigate to write post page");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBlogPosts} />;
  if (blogPosts.length === 0) return <Empty />;

return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <Text variant="h1" gradient className="mb-2">
            머니 인사이트
          </Text>
          <Text className="text-slate-400 max-w-2xl">
            텍스트 인플루언서를 위한 수익화 전략과 마케팅 노하우를 알아보세요
          </Text>
        </div>
        <Button
          onClick={handleWritePost}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Edit" size={20} />
          <span>글쓰기</span>
        </Button>
      </div>

      {/* Featured Posts */}
      {blogPosts.filter(post => post.featured).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="mb-6">
            <Text variant="h3" className="text-slate-200 mb-4">
              추천 포스트
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(post => post.featured)
                .slice(0, 2)
                .map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                            <ApperIcon name="Star" size={16} className="text-amber-400" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Text variant="h5" className="text-white font-bold mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
                            {post.title}
                          </Text>
                        </div>
                      </div>
                      <div className="p-6">
                        <Text className="text-slate-400 mb-4 line-clamp-2">
                          {post.description}
                        </Text>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center space-x-4">
                            <span>{post.author}</span>
                            <span>{new Date(post.publishedDate).toLocaleDateString('ko-KR')}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Clock" size={14} />
                              <span>{post.readTime}분</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Eye" size={14} />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* All Posts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="mb-6">
          <Text variant="h3" className="text-slate-200 mb-4">
            모든 포스트
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                          <ApperIcon name="Star" size={16} className="text-amber-400" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-slate-600/50 rounded-full flex items-center justify-center">
                        <ApperIcon name="FileText" size={24} className="text-slate-300" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <Text variant="h5" className="text-slate-200 font-bold mb-3 line-clamp-2 group-hover:text-primary-300 transition-colors">
                      {post.title}
                    </Text>
                    <Text className="text-slate-400 mb-4 line-clamp-3 flex-grow">
                      {post.description}
                    </Text>
                    <div className="flex items-center justify-between text-sm text-slate-500 mt-auto">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center border border-primary-500/30">
                          <Text className="text-primary-400 font-bold text-xs">
                            {post.author.charAt(0)}
                          </Text>
                        </div>
                        <div>
                          <div className="text-slate-300 font-medium">{post.author}</div>
                          <div className="text-xs">{new Date(post.publishedDate).toLocaleDateString('ko-KR')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-slate-400">
                          <ApperIcon name="Clock" size={14} />
                          <span>{post.readTime}분</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400 text-xs">
                          <ApperIcon name="Eye" size={12} />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <Text variant="h3" className="text-slate-200">
              플랫폼 통계
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto">
                  <ApperIcon name="FileText" size={24} className="text-blue-400" />
                </div>
                <Text variant="h4" className="text-slate-200 font-bold">
                  {blogPosts.length}
                </Text>
                <Text className="text-slate-400 text-sm">
                  총 포스트 수
                </Text>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center border border-green-500/30 mx-auto">
                  <ApperIcon name="Eye" size={24} className="text-green-400" />
                </div>
                <Text variant="h4" className="text-slate-200 font-bold">
                  {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </Text>
                <Text className="text-slate-400 text-sm">
                  총 조회수
                </Text>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center border border-amber-500/30 mx-auto">
                  <ApperIcon name="Star" size={24} className="text-amber-400" />
                </div>
                <Text variant="h4" className="text-slate-200 font-bold">
                  {blogPosts.filter(post => post.featured).length}
                </Text>
                <Text className="text-slate-400 text-sm">
                  추천 포스트
                </Text>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 mx-auto">
                  <ApperIcon name="Clock" size={24} className="text-purple-400" />
                </div>
                <Text variant="h4" className="text-slate-200 font-bold">
                  {Math.round(blogPosts.reduce((sum, post) => sum + post.readTime, 0) / blogPosts.length)}분
                </Text>
                <Text className="text-slate-400 text-sm">
                  평균 읽기 시간
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MoneyInsights;