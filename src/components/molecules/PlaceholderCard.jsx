import React from "react";
import Card from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";
import ApperIcon from "@/components/ApperIcon";

const PlaceholderCard = ({ 
  title, 
  description, 
  icon = "BookOpen",
  gradient = false 
}) => {
  return (
    <Card className="p-8 text-center" gradient={gradient}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
          <ApperIcon 
            name={icon} 
            size={32} 
            className="text-primary-400" 
          />
        </div>
        <div className="space-y-2">
          <Text variant="h4" className="text-slate-200">
            {title}
          </Text>
          <Text className="text-slate-400 max-w-md">
            {description}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PlaceholderCard;