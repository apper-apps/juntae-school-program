import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Text from "@/components/atoms/Text";
import Card from "@/components/atoms/Card";
import PlaceholderCard from "@/components/molecules/PlaceholderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { insightService } from "@/services/api/insightService";

const MoneyInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await insightService.getAll();
      setInsights(data);
    } catch (err) {
      setError("인사이트를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadInsights} />;
  if (insights.length === 0) return <Empty />;

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
          머니 인사이트
        </Text>
        <Text className="text-slate-400 max-w-2xl mx-auto">
          텍스트 인플루언서를 위한 수익화 전략과 마케팅 노하우를 알아보세요
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
            title="수익화 가이드 준비 중"
            description="텍스트 인플루언서를 위한 다양한 수익화 전략과 실전 팁을 준비하고 있습니다. 곧 공개됩니다!"
            icon="DollarSign"
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
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
                  <Text className="text-emerald-400 font-bold text-lg">💰</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    브랜드 협업 전략
                  </Text>
                  <Text className="text-slate-400">
                    브랜드와의 성공적인 협업을 위한 접근법과 협상 기술
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                  <Text className="text-blue-400 font-bold text-lg">📈</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    수익 다변화
                  </Text>
                  <Text className="text-slate-400">
                    다양한 수익원 창출과 지속가능한 비즈니스 모델 구축
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
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center border border-amber-500/30 flex-shrink-0">
                  <Text className="text-amber-400 font-bold text-lg">🎯</Text>
                </div>
                <div className="space-y-2">
                  <Text variant="h5" className="text-slate-200">
                    타겟팅 마케팅
                  </Text>
                  <Text className="text-slate-400">
                    효과적인 타겟 오디언스 분석과 맞춤형 콘텐츠 전략
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Money Tips Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-12"
      >
        <Card className="p-8">
          <div className="text-center space-y-6">
            <Text variant="h3" className="text-slate-200">
              수익화 핵심 포인트
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30 mx-auto">
                  <Text className="text-green-400 font-bold text-2xl">1</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  개인 브랜딩
                </Text>
                <Text className="text-slate-400 text-sm">
                  독창적인 개성과 전문성을 바탕으로 한 브랜드 구축
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto">
                  <Text className="text-blue-400 font-bold text-2xl">2</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  콘텐츠 품질
                </Text>
                <Text className="text-slate-400 text-sm">
                  가치 있고 차별화된 콘텐츠를 통한 팔로워 확보
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30 mx-auto">
                  <Text className="text-purple-400 font-bold text-2xl">3</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  네트워킹
                </Text>
                <Text className="text-slate-400 text-sm">
                  업계 관계자들과의 네트워크 구축과 협업 기회 창출
                </Text>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center border border-orange-500/30 mx-auto">
                  <Text className="text-orange-400 font-bold text-2xl">4</Text>
                </div>
                <Text variant="h6" className="text-slate-300">
                  지속성
                </Text>
                <Text className="text-slate-400 text-sm">
                  꾸준한 활동과 팬층 관리를 통한 장기적 성공
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