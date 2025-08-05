import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";

const Loading = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg mx-auto w-64"></div>
        <div className="h-6 bg-slate-700 rounded-lg mx-auto w-96 max-w-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Card Skeleton */}
        <Card className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
            <div className="space-y-2 text-center w-full">
              <div className="h-8 bg-slate-700 rounded-lg mx-auto w-48"></div>
              <div className="h-4 bg-slate-700 rounded-lg mx-auto w-72"></div>
              <div className="h-4 bg-slate-700 rounded-lg mx-auto w-64"></div>
            </div>
          </div>
        </Card>

        {/* Side Cards Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-slate-700 rounded-lg w-32"></div>
                  <div className="h-4 bg-slate-700 rounded-lg w-full"></div>
                  <div className="h-4 bg-slate-700 rounded-lg w-3/4"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex justify-center">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="text-center">
        <Text className="text-slate-400">
          콘텐츠를 불러오는 중입니다...
        </Text>
      </div>
    </div>
  );
};

export default Loading;