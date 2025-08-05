import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  children,
  hover = false,
  gradient = false,
  ...props 
}, ref) => {
const baseStyles = "bg-surface-800 rounded-xl border border-slate-700 shadow-lg";
  const hoverStyles = hover ? "transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-500/30 cursor-pointer" : "";
  const gradientStyles = gradient ? "bg-gradient-to-br from-surface-800 to-slate-800" : "";
  
  return (
    <div
      className={cn(
        baseStyles,
        hoverStyles,
        gradientStyles,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;