import React from "react";
import { cn } from "@/utils/cn";

const Text = React.forwardRef(({ 
  className, 
  variant = "body", 
  children,
  gradient = false,
  ...props 
}, ref) => {
  const variants = {
    h1: "text-4xl md:text-5xl font-bold leading-tight",
    h2: "text-3xl md:text-4xl font-bold leading-tight",
    h3: "text-2xl md:text-3xl font-semibold leading-tight",
    h4: "text-xl md:text-2xl font-semibold leading-tight",
    h5: "text-lg md:text-xl font-medium leading-tight",
    h6: "text-base md:text-lg font-medium leading-tight",
    body: "text-base leading-relaxed",
    small: "text-sm leading-relaxed",
    caption: "text-xs leading-relaxed"
  };
  
  const gradientStyles = gradient ? "bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent" : "";
  
  const Component = variant.startsWith("h") ? variant : "p";
  
  return (
    <Component
      className={cn(
        variants[variant],
        "korean-text",
        gradientStyles,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = "Text";

export default Text;