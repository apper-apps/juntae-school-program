import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { articleService } from '@/services/api/articleService';

const MonetizationTips = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');

  const categories = ['전체', '기초 수익화', '브랜드 협업', '디지털 상품', '구독 모델', 'SEO & 마케팅'];

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getAll();
      setArticles(data);
      setFilteredArticles(data);
    } catch (err) {
      setError(err.message);
      toast.error('아티클을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = [...articles];

    // Category filter
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedDate) - new Date(a.publishedDate);
        case 'oldest':
          return new Date(a.publishedDate) - new Date(b.publishedDate);
        case 'popular':
          return b.views - a.views;
        case 'readTime':
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleViewArticle = (articleId) => {
    toast.info(`아티클 ${articleId}를 조회합니다.`);
    // 실제 구현에서는 상세 페이지로 이동
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadArticles} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <Text variant="h1" className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          수익화 팁 & 전략
        </Text>
        <Text variant="body" className="text-slate-400 max-w-2xl mx-auto">
          텍스트 인플루언서를 위한 실전 수익화 노하우와 전략을 공유합니다.
          성공적인 수익 창출을 위한 다양한 방법들을 알아보세요.
        </Text>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="아티클 검색..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-surface-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex justify-center">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 bg-surface-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-primary-500"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="popular">인기순</option>
            <option value="readTime">읽기 시간순</option>
          </select>
        </div>
      </motion.div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <Empty
          title="아티클이 없습니다"
          description="검색 조건에 맞는 아티클을 찾을 수 없습니다."
          action={{
            label: "전체 보기",
            onClick: () => {
              setSearchQuery('');
              setSelectedCategory('전체');
            }
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer"
                    onClick={() => handleViewArticle(article.Id)}>
                <div className="p-6 flex-1 flex flex-col">
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent-500/20 text-accent-400 rounded-full text-xs w-fit mb-3">
                      <ApperIcon name="Star" size={12} />
                      추천
                    </div>
                  )}

                  {/* Category */}
                  <div className="inline-flex items-center px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs w-fit mb-3">
                    {article.category}
                  </div>

                  {/* Title */}
                  <Text variant="h3" className="text-lg font-semibold mb-3 line-clamp-2">
                    {article.title}
                  </Text>

                  {/* Description */}
                  <Text variant="body" className="text-slate-400 mb-4 line-clamp-3 flex-1">
                    {article.description}
                  </Text>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={14} />
                        {article.readTime}분
                      </span>
                      <span className="flex items-center gap-1">
                        <ApperIcon name="Eye" size={14} />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <span>{new Date(article.publishedDate).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-center"
      >
        <Text variant="body" className="text-slate-400">
          총 {filteredArticles.length}개의 아티클 
          {searchQuery && ` (검색: "${searchQuery}")`}
          {selectedCategory !== '전체' && ` (카테고리: ${selectedCategory})`}
        </Text>
      </motion.div>
    </div>
  );
};

export default MonetizationTips;