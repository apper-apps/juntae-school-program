import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import blogPostService from '@/services/api/blogPostService';

function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!id) {
        setError('블로그 포스트 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const postData = await blogPostService.getById(parseInt(id));
        
        if (postData) {
          setPost(postData);
        } else {
          setError('블로그 포스트를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('블로그 포스트를 불러오는데 실패했습니다.');
        toast.error('블로그 포스트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [id]);

  const handleBack = () => {
    navigate('/insights');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Money Insight': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Other': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    };
    return colors[category] || colors['Other'];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    // Basic formatting for multiline text content
    return content
      .split('\n')
      .map((paragraph, index) => {
        if (paragraph.trim() === '') return null;
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {paragraph.trim()}
          </p>
        );
      })
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-slate-400 hover:text-slate-200"
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              뒤로 가기
            </Button>
          </div>
          <Error message={error} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-slate-400 hover:text-slate-200"
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              뒤로 가기
            </Button>
          </div>
          <Empty message="블로그 포스트를 찾을 수 없습니다." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            뒤로 가기
          </Button>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            {/* Header Section */}
            <div className="p-8 pb-6 border-b border-slate-700/50">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
                  {post.category || 'Other'}
                </span>
              </div>

              {/* Title */}
              <Text variant="h1" className="text-slate-100 font-bold mb-6 leading-tight korean-text">
                {post.title || '제목 없음'}
              </Text>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400">
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center border border-primary-500/30">
                    <Text className="text-primary-400 font-bold">
                      {post.author?.Name?.charAt(0) || post.author?.charAt(0) || 'A'}
                    </Text>
                  </div>
                  <div>
                    <div className="text-slate-200 font-medium">
                      {post.author?.Name || post.author || '익명'}
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatDate(post.publishedDate)}
                    </div>
                  </div>
                </div>

                {/* Reading Stats */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Clock" size={16} />
                    <span>{post.readTime || 5}분 읽기</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Eye" size={16} />
                    <span>{(post.views || 0).toLocaleString()}회 조회</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Image */}
            {post.thumbnail && (
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-slate-600/50 rounded-full flex items-center justify-center">
                    <ApperIcon name="FileText" size={32} className="text-slate-300" />
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {post.description && (
              <div className="p-8 border-b border-slate-700/50">
                <Text className="text-slate-300 text-lg leading-relaxed korean-text italic">
                  {post.description}
                </Text>
              </div>
            )}

            {/* Main Content */}
            <div className="p-8">
              <div className="prose prose-slate prose-invert max-w-none">
                <div className="text-slate-200 text-base leading-relaxed korean-text space-y-4">
                  {post.content ? (
                    formatContent(post.content)
                  ) : (
                    <p className="text-slate-400 italic">
                      본문 내용이 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-6 border-t border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {post.Tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.Tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-sm"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {post.featured && (
                  <div className="flex items-center space-x-2 text-amber-400">
                    <ApperIcon name="Star" size={16} />
                    <span className="text-sm font-medium">추천 글</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.article>

        {/* Back to List Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button
            onClick={handleBack}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-all duration-200"
          >
            <ApperIcon name="List" size={20} className="mr-2" />
            목록으로 돌아가기
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default BlogPostDetail;