import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import blogPostService from '@/services/api/blogPostService';

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    content: '',
    category: 'Other'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }
    
    if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = '올바른 URL 형식을 입력해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const postData = {
        title: formData.title,
        description: formData.content.substring(0, 200) + (formData.content.length > 200 ? '...' : ''),
        thumbnail: formData.thumbnail,
        content: formData.content,
        author: 1, // Default author ID - in real app, this would be current user
        publishedDate: new Date().toISOString().split('T')[0],
        category: formData.category,
        readTime: Math.max(1, Math.ceil(formData.content.length / 1000))
      };
      
      const result = await blogPostService.create(postData);
      
      if (result) {
        toast.success('블로그 포스트가 성공적으로 작성되었습니다!');
        navigate('/insights');
      }
    } catch (error) {
      toast.error('포스트 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/insights');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleCancel}
              className="flex items-center text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              돌아가기
            </button>
            <Text variant="h1" className="text-white mb-2">
              새 블로그 포스트 작성
            </Text>
            <Text variant="body" className="text-slate-400">
              독자들과 공유할 인사이트를 작성해보세요.
            </Text>
          </div>

          {/* Form */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="포스트 제목을 입력하세요"
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                    errors.title ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Thumbnail URL Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  썸네일 이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                    errors.thumbnail ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.thumbnail && (
                  <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>
                )}
                {formData.thumbnail && isValidUrl(formData.thumbnail) && (
                  <div className="mt-2">
                    <img
                      src={formData.thumbnail}
                      alt="썸네일 미리보기"
                      className="w-32 h-20 object-cover rounded-lg border border-slate-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Money Insight">Money Insight</option>
                  <option value="Other">기타</option>
                </select>
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  내용 *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="포스트 내용을 작성하세요..."
                  rows={15}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-vertical ${
                    errors.content ? 'border-red-500' : 'border-slate-600'
                  }`}
                  style={{ minHeight: '300px' }}
                />
                {errors.content && (
                  <p className="text-red-400 text-sm mt-1">{errors.content}</p>
                )}
                <p className="text-slate-400 text-sm mt-1">
                  {formData.content.length} 글자 · 약 {Math.max(1, Math.ceil(formData.content.length / 1000))}분 읽기
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="min-w-[120px]"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      저장 중...
                    </div>
                  ) : (
                    <>
                      <ApperIcon name="Save" size={16} className="mr-2" />
                      저장
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlogPost;