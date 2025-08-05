import React, { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import Logo from "@/components/molecules/Logo";
import NavigationItem from "@/components/molecules/NavigationItem";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { AuthContext } from "../../App";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

const navigationItems = [
    { path: "/", label: "홈" },
    { path: "/insights", label: "머니 인사이트" },
    { path: "/monetization-tips", label: "수익화 팁" },
    { path: "/reviews", label: "리뷰" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-900/95 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavigationItem key={item.path} to={item.path}>
                {item.label}
              </NavigationItem>
            ))}
          </nav>

          {/* Login/Logout Link */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-surface-100 hover:text-primary-500 transition-colors duration-200"
              >
                로그아웃
              </Button>
            ) : (
              <NavigationItem to="/login">
                로그인
              </NavigationItem>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
              />
            </Button>
          </div>
        </div>

{/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface-900/98 backdrop-blur-md border-b border-slate-700 shadow-2xl">
            <nav className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <NavigationItem 
                    key={item.path} 
                    to={item.path}
                    mobile
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavigationItem>
                ))}
                
                {/* Mobile Auth Button */}
                <div className="pt-2 border-t border-slate-700">
                  {isAuthenticated ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left justify-start text-surface-100 hover:text-primary-500 transition-colors duration-200"
                    >
                      로그아웃
                    </Button>
                  ) : (
                    <NavigationItem 
                      to="/login"
                      mobile
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      로그인
                    </NavigationItem>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;