import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "준비 중입니다", 
  description = "곧 새로운 콘텐츠가 추가될 예정입니다.",
  action,
  actionLabel = "홈으로 돌아가기"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 text-center max-w-md w-full" gradient>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
            <ApperIcon 
              name="BookOpen" 
              size={32} 
              className="text-primary-400" 
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="h4" className="text-slate-200">
              {title}
            </Text>
            <Text className="text-slate-400">
              {description}
            </Text>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-accent-400">
              <ApperIcon name="Clock" size={16} />
              <Text className="text-sm">
                최고의 콘텐츠를 준비하고 있습니다
              </Text>
            </div>
            <div className="flex items-center space-x-2 text-secondary-400">
              <ApperIcon name="Star" size={16} />
              <Text className="text-sm">
                준태스쿨의 전문 교육이 곧 시작됩니다
              </Text>
            </div>
          </div>

          {action && (
            <Button 
              onClick={action}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Home" size={16} />
              <span>{actionLabel}</span>
            </Button>
          )}

          <div className="pt-4 border-t border-slate-700 w-full">
            <Text className="text-slate-500 text-sm">
              업데이트 소식을 기대해 주세요! 🚀
            </Text>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;