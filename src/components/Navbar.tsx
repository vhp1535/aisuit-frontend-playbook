import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Settings as SettingsIcon, Zap, ZapOff } from "lucide-react";
import { setDevMode } from "../utils/localStorageHelpers";
import { getHistory } from "../utils/localStorageHelpers";

interface NavbarProps {
  devMode: boolean;
  setDevMode: (enabled: boolean) => void;
  onMenuClick: () => void;
}

const Navbar = ({ devMode, setDevMode: setDevModeState, onMenuClick }: NavbarProps) => {
  const location = useLocation();
  const history = getHistory();

  const handleDevModeToggle = () => {
    const newMode = !devMode;
    setDevMode(newMode);
    setDevModeState(newMode);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-16 bg-beige border-b-3 border-navy flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Logo and main nav */}
      <div className="flex items-center space-x-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-peach/20 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-navy" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-peach border-2 border-navy rounded-lg flex items-center justify-center shadow-offset-small">
            <span className="text-navy font-black text-lg">A</span>
          </div>
          <span className="text-2xl font-black text-navy">AiSuite</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link
            to="/"
            className={isActive("/") ? "nav-link-active" : "nav-link"}
          >
            Home
          </Link>
          <Link
            to="/assistant"
            className={isActive("/assistant") ? "nav-link-active" : "nav-link"}
          >
            Assistant
          </Link>
          <Link
            to="/history"
            className={`${isActive("/history") ? "nav-link-active" : "nav-link"} relative`}
          >
            History
            {history.length > 0 && (
              <span className="badge-count absolute -top-1 -right-1">
                {history.length > 9 ? "9+" : history.length}
              </span>
            )}
          </Link>
          <Link
            to="/settings"
            className={isActive("/settings") ? "nav-link-active" : "nav-link"}
          >
            Settings
          </Link>
        </div>
      </div>

      {/* Right side - Dev mode toggle and demo badge */}
      <div className="flex items-center space-x-4">
        {/* Dev Mode Toggle */}
        <button
          onClick={handleDevModeToggle}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-navy transition-all duration-200 ${
            devMode 
              ? "bg-peach text-navy shadow-offset-small hover:translate-x-1 hover:translate-y-1 hover:shadow-none" 
              : "bg-beige text-navy/60 hover:bg-beige/80"
          }`}
          title={devMode ? "Dev Mode: ON" : "Dev Mode: OFF"}
        >
          {devMode ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
          <span className="hidden sm:inline text-sm font-semibold">
            DEV {devMode ? "ON" : "OFF"}
          </span>
        </button>

        {/* Demo Badge */}
        <div className="hidden sm:flex items-center space-x-2 bg-coral text-white px-3 py-1 rounded-lg border border-navy text-sm font-semibold">
          <span>Frontend-only Demo — No Backend</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;