import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "오류가 발생했습니다.", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 text-center max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border border-red-500/30">
            <ApperIcon 
              name="AlertCircle" 
              size={32} 
              className="text-red-400" 
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="h4" className="text-slate-200">
              문제가 발생했습니다
            </Text>
            <Text className="text-slate-400">
              {message}
            </Text>
          </div>

          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              <span>다시 시도</span>
            </Button>
          )}

          <div className="pt-4 border-t border-slate-700 w-full">
            <Text className="text-slate-500 text-sm">
              문제가 계속되면 잠시 후 다시 시도해 주세요.
            </Text>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;