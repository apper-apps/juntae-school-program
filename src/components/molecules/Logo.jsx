import React from "react";
import { cn } from "@/utils/cn";
import Text from "@/components/atoms/Text";

const Logo = ({ className, size = "md" }) => {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
        <Text className="text-white font-bold text-sm">준</Text>
      </div>
      <Text 
        className={cn(
          "font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent",
          sizes[size]
        )}
      >
        준태스쿨 Hub
      </Text>
    </div>
  );
};

export default Logo;