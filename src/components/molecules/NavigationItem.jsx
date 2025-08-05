import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import Text from "@/components/atoms/Text";

const NavigationItem = ({ to, children, onClick, mobile = false }) => {
  const baseStyles = "relative px-4 py-2 rounded-lg transition-all duration-200 font-medium korean-text";
  const mobileStyles = mobile ? "block w-full text-left border-b border-slate-700 last:border-b-0" : "";
  
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          baseStyles,
          mobileStyles,
          isActive
            ? "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 border border-primary-500/30"
            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
        )
      }
    >
      <Text className="text-inherit">{children}</Text>
    </NavLink>
  );
};

export default NavigationItem;