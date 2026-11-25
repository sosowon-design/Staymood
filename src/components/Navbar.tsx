import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ 
  onNavigate,
  currentPage = "home",
  isMobileMenuOpen: externalMobileMenuOpen,
  onMobileMenuChange,
  activeSectionOverride,
}: { 
  onNavigate?: (href: string) => void;
  currentPage?: "home" | "projects";
  isMobileMenuOpen?: boolean;
  onMobileMenuChange?: (open: boolean) => void;
  activeSectionOverride?: string | null;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const isMobileMenuOpen = externalMobileMenuOpen !== undefined ? externalMobileMenuOpen : internalMobileMenuOpen;
  
  const handleToggleMobileMenu = (open: boolean) => {
    if (onMobileMenuChange) {
      onMobileMenuChange(open);
    } else {
      setInternalMobileMenuOpen(open);
    }
  };

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (activeSectionOverride) {
      setActiveSection(activeSectionOverride);
      setIsScrolled(true);
      return;
    }

    if (currentPage === "projects") {
      setActiveSection("work");
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if user is near bottom of the page (Contact section)
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      // Check sections from bottom to top to accurately match scroll offset
      const sections = ["contact", "services", "work", "about"];
      const scrollYPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollYPos >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, activeSectionOverride]);

  const navLinks = [
    { id: "about", name: "스테이무드 소개", href: "#about" },
    { id: "work", name: "포트폴리오", href: "#work" },
    { id: "services", name: "가격 안내", href: "#services" },
  ];

  const isDarkNavbar = isScrolled || currentPage === "projects" || Boolean(activeSectionOverride) || isMobileMenuOpen;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleToggleMobileMenu(false);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(href);
      } else {
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }
    }, 80);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isDarkNavbar ? "py-2.5 sm:py-3 glass shadow-xs" : "py-4 sm:py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate("#hero");
            else window.location.href = "/";
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          {/* Archway Monogram Logo for Staymood */}
          <div className={`relative flex items-center justify-center w-7 h-8 border rounded-t-full transition-all duration-500 ${
            isDarkNavbar ? "border-ink/25 bg-pastel-cream group-hover:border-accent" : "border-white/50 bg-white/10 group-hover:border-white"
          }`}>
            <motion.div 
              className={`w-1.5 h-1.5 rounded-full ${isDarkNavbar ? "bg-accent" : "bg-white"}`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className={`text-[16px] font-serif font-normal tracking-[0.16em] uppercase transition-colors ${
              isDarkNavbar ? "text-ink" : "text-white"
            }`}>Staymood</span>
            <span className={`text-[10.5px] font-normal tracking-[0.08em] font-sans transition-colors ${
              isDarkNavbar ? "text-accent" : "text-white/80"
            }`}>스테이무드</span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navLinks.map((link) => {
            const currentSection = activeSectionOverride || (currentPage === "projects" ? "work" : activeSection);
            const isActive = currentSection === link.id;
            return (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-[13.5px] tracking-wider transition-all duration-200 font-sans ${
                  isDarkNavbar
                    ? isActive 
                      ? "text-accent font-medium bg-accent/10" 
                      : "text-ink/80 hover:text-accent hover:bg-black/5 font-normal"
                    : isActive
                      ? "text-white font-medium bg-white/20 backdrop-blur-xs"
                      : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-xs font-normal"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavDiagonalDot"
                    className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full shadow-xs ${
                      isDarkNavbar ? "bg-accent" : "bg-white"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`relative ml-1.5 px-4.5 py-1.5 rounded-full text-[12.5px] font-medium tracking-wider transition-all duration-300 font-sans cursor-pointer ${
              isDarkNavbar
                ? activeSection === "contact"
                  ? "bg-accent text-white shadow-xs border border-accent"
                  : "bg-accent/15 border border-accent/30 text-ink hover:bg-accent hover:text-white"
                : activeSection === "contact"
                  ? "bg-accent text-white shadow-xs border border-accent"
                  : "bg-white/20 border border-white/40 text-white hover:bg-accent hover:border-accent hover:text-white backdrop-blur-sm"
            }`}
          >
            제작 문의하기
            {activeSection === "contact" && (
              <motion.span 
                layoutId="activeNavDiagonalDot"
                className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full shadow-xs ${
                  isDarkNavbar ? "bg-accent" : "bg-white"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-1 cursor-pointer transition-colors ${
            isDarkNavbar ? "text-ink" : "text-white"
          }`}
          onClick={() => handleToggleMobileMenu(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Top Divider Line below Logo */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full border-b border-accent/15 mt-2" />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden absolute top-full left-0 w-full bg-[#FAF8F5]/98 backdrop-blur-md border-b border-accent/20 overflow-hidden shadow-lg z-50"
      >
        <div className="flex flex-col items-center justify-center py-6 gap-2.5 px-6 font-sans text-center">
          {(() => {
            const currentSection = activeSectionOverride || (currentPage === "projects" ? "work" : activeSection);
            return (
              <>
                {navLinks.map((link) => {
                  const isActive = currentSection === link.id;

                  return (
                    <a 
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleMobileNavClick(e, link.href)}
                      className={`relative flex items-center justify-center gap-2 w-full max-w-xs py-2.5 px-4 rounded-xl text-[15px] transition-all duration-200 ${
                        isActive
                          ? "bg-accent/15 text-accent font-semibold border border-accent/30 shadow-2xs" 
                          : "text-ink/80 font-normal hover:bg-black/5 hover:text-ink border border-transparent"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                      <span>{link.name}</span>
                    </a>
                  );
                })}

                {/* 제작 문의하기 button in mobile menu */}
                <a 
                  href="#contact"
                  onClick={(e) => handleMobileNavClick(e, "#contact")}
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-[15px] font-medium tracking-wider text-center w-full max-w-xs transition-all duration-200 shadow-xs bg-accent text-white hover:bg-accent/90"
                >
                  {currentSection === "contact" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
                  )}
                  <span>제작 문의하기</span>
                </a>
              </>
            );
          })()}
        </div>
      </motion.div>
    </nav>
  );
}

