/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import BrandPhilosophy from "./components/BrandPhilosophy";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, ArrowUp, X, ArrowRight, Compass, Sparkles, CheckCircle2, Link2, ShieldCheck, MessageCircle } from "lucide-react";
import seorimyeongaImage from "./assets/images/brand_philosophy_staymood_1786383942128.jpg";
import sosowonImage from "./assets/images/regenerated_image_1792044901311.jpg";
import yunseulImage from "./assets/images/regenerated_image_1792245625113.avif";
import atelzerozImage from "./assets/images/staymood_atelier_interior_1786651370823.jpg";
import stayonulImage from "./assets/images/staymood_philosophy_bg_1786458408069.jpg";

const allProjects = [
  { id: 2, title: "소소원 (Sosowon)", category: "Private Pool Villa / Web Space", image: sosowonImage, description: "제주 돌담과 푸른 정원 속 고즈넉한 여유가 머무는 프라이빗 독채 스테이", link: "https://sosowon-jeju.netlify.app/" },
  { id: 1, title: "서림재 (Seorimjae)", category: "Private Pool Villa / Web Space", image: seorimyeongaImage, description: "오대산 소나무 숲의 고요한 풍경 속에서 자연과 함께 머무는 독채 풀빌라", link: "https://seorimjae.netlify.app/" },
  { id: 4, title: "아눅 스테이 (Anuk Stay)", category: "Aesthetic Pool Villa / Branding & Web", image: atelzerozImage, description: "차분한 공간을 채우는 따스한 빛과 섬세한 디테일이 머무는 감성 풀빌라", link: "https://anuk-stay.netlify.app/" },
  { id: 3, title: "윤슬 스테이 (Yunseul Stay)", category: "Private Pool Villa / Web Space", image: yunseulImage, description: "햇살에 반짝이는 윤슬과 잔잔한 파도 소리를 온전히 즐기는 오션뷰 스테이", link: "https://yunseul-stay.netlify.app/" },
  { id: 5, title: "스테이 온을 (Stay Onul)", category: "Private Stay / Web Space", image: stayonulImage, description: "부드러운 색감과 포근한 인테리어가 어우러진 아늑한 감성 스테이", link: "https://stay-onul.netlify.app/" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "projects">("home");
  const [isPhilosophyModalOpen, setIsPhilosophyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSectionOverride, setActiveSectionOverride] = useState<string | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const handleMobileMenuChange = (open: boolean) => {
    setIsMobileMenuOpen(open);
    if (open) {
      setIsConsultModalOpen(false);
    }
  };

  const checkScrollState = (y?: number) => {
    if (typeof window === "undefined") return;

    const scrollPos = Math.max(
      typeof y === "number" ? y : 0,
      window.scrollY || 0,
      window.pageYOffset || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0,
      document.scrollingElement?.scrollTop || 0
    );

    // Show floating banner and top button as soon as user scrolls past top (40px)
    if (scrollPos > 40) {
      setShowScrollTop(true);
    } else if (scrollPos <= 10) {
      setShowScrollTop(false);
      setIsConsultModalOpen(false);
    }
  };

  // Immediate frame-by-frame Motion scroll detection across mobile, tablet, and desktop
  useMotionValueEvent(scrollY, "change", (latest) => {
    checkScrollState(latest);
  });

  useEffect(() => {
    if (!pendingScroll) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, pendingScroll]);

  useEffect(() => {
    const handleScrollOrTouch = () => {
      checkScrollState();
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      checkScrollState();
    };

    // Initial check
    checkScrollState();
    const timer = setTimeout(checkScrollState, 100);

    window.addEventListener("scroll", handleScrollOrTouch, { passive: true, capture: true });
    window.addEventListener("touchmove", handleScrollOrTouch, { passive: true, capture: true });
    window.addEventListener("wheel", handleScrollOrTouch, { passive: true, capture: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("scroll", handleScrollOrTouch, { passive: true, capture: true });
    document.documentElement.addEventListener("scroll", handleScrollOrTouch, { passive: true, capture: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScrollOrTouch, true);
      window.removeEventListener("touchmove", handleScrollOrTouch, true);
      window.removeEventListener("wheel", handleScrollOrTouch, true);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScrollOrTouch, true);
      document.documentElement.removeEventListener("scroll", handleScrollOrTouch, true);
    };
  }, [currentPage, isMobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setActiveSectionOverride("about");
    setPendingScroll("about");
    setCurrentPage("home");
    setTimeout(() => {
      setActiveSectionOverride(null);
    }, 1400);
  };

  const handleNavigate = (href: string) => {
    const id = href.replace("#", "");
    if (currentPage !== "home") {
      setPendingScroll(id);
      setCurrentPage("home");
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (currentPage === "home" && pendingScroll) {
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          setPendingScroll(null);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage, pendingScroll]);

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="scroll-smooth w-full"
    >
      <Hero />
      <BrandPhilosophy />
      <Portfolio onViewAll={() => setCurrentPage("projects")} />
      <Services onViewPortfolio={() => setCurrentPage("projects")} />
      <Contact onViewPortfolio={() => setCurrentPage("projects")} />
      <Footer />
    </motion.div>
  );

  const renderProjects = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20 sm:pt-40 pb-0 bg-[#F2ECE4] min-h-screen text-ink font-sans flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-20 w-full">
        {/* Elegant Floating Top Bar with Redesigned Back to Home Button */}
        <div className="flex items-center justify-between mb-14 sm:mb-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#8F7A63]/35 text-[13px] text-[#7A6652] font-medium hover:bg-[#8F7A63] hover:border-[#8F7A63] hover:text-white transition-all duration-200 cursor-pointer font-sans group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>메인 홈으로 돌아가기</span>
          </motion.button>
        </div>
        
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2.5 pt-2">
          {/* Unified Annotation Tag matching Selected Portfolio Cases on Main page */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase">
              <Sparkles size={13} className="text-accent" />
              <span>MAIN PORTFOLIO</span>
            </span>
          </motion.div>

          <h1 className="text-[24px] sm:text-[30px] md:max-lg:text-[28px] font-sans font-semibold text-ink leading-snug break-keep">
            <span className="text-[#2C2824]">공간의 결을 담은 </span>
            <span className="inline text-accent">대표 프로젝트</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-gray-600 font-normal leading-relaxed pt-0.5 break-keep">
            <span>숙소마다 지닌 특별한 분위기와 매력을 </span>
            <span className="block sm:inline">온전히 담아 완성한 웹사이트입니다.</span>
          </p>
        </div>

        {/* Portfolio Cards: Main-page vertical visual layout on mobile (preserving h-32 image height), horizontal compact card on tablet/PC */}
        <div className="flex flex-col gap-5">
          {allProjects.map((project, index) => {
            const mainPageUrl = project.link && project.link !== '#' ? new URL('/', project.link).href : '#';
            return (
              <motion.a
                key={project.id}
                href={mainPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="group bg-white hover:bg-[#a58e74] rounded-xl border border-accent/15 hover:border-accent transition-all duration-300 shadow-xs hover:shadow-lg overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 md:max-lg:p-4.5 md:max-lg:px-6 md:max-lg:gap-4.5 md:px-8 gap-4 sm:gap-5 cursor-pointer text-left"
              >
                {/* Top (mobile) / Left (tablet & PC) Image Thumbnail - keeping previous padded rounded-lg design & h-32 height */}
                <div className="relative w-full sm:w-56 md:w-72 md:max-lg:w-56 md:max-lg:h-32 lg:w-72 h-32 sm:h-28 md:h-32 rounded-lg overflow-hidden bg-pastel-cream flex-shrink-0 sm:-ml-2.5 md:-ml-3.5 sm:mr-1 md:mr-1.5 md:max-lg:ml-0 md:max-lg:mr-0">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    animate={{
                      scale: [1, 1.06, 1],
                    }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = sosowonImage;
                    }}
                  />
                </div>

                {/* Mobile card body wrapper matching Portfolio.tsx; sm:contents restores desktop/tablet 3-col flex */}
                <div className="w-full flex flex-col gap-4 sm:contents">
                  {/* Title & Description */}
                  <div className="flex-1 text-left min-w-0 transition-colors duration-300 w-full sm:w-auto md:max-lg:px-1.5 space-y-2 sm:space-y-0">
                    <h3 className="text-[19px] sm:text-[20px] md:max-lg:text-[18px] font-sans font-semibold text-ink group-hover:text-white sm:mb-1.5 md:max-lg:mb-1 transition-colors leading-snug sm:truncate md:max-lg:whitespace-normal break-keep">
                      {project.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13.5px] md:max-lg:text-[12.5px] leading-relaxed text-gray-600 group-hover:text-white/90 font-sans font-normal sm:truncate md:max-lg:whitespace-normal break-keep transition-colors">
                      {project.id === 1 ? (
                        <>
                          <span>오대산 소나무 숲의 고요한 풍경 속에서 자연과 </span>
                          <br className="sm:hidden" />
                          <span>함께 머무는 독채 풀빌라</span>
                        </>
                      ) : (
                        project.description
                      )}
                    </p>
                  </div>

                  {/* External Link Button - divider + right aligned on mobile matching Portfolio.tsx, slightly reduced button size */}
                  <div className="pt-3 border-t border-accent/15 group-hover:border-white/20 flex items-center justify-end sm:pt-0 sm:border-t-0 sm:block flex-shrink-0 sm:self-center transition-colors duration-300">
                    <span className="px-4 py-2 sm:px-5.5 sm:py-2.5 md:max-lg:px-5 md:max-lg:py-2 lg:px-6.5 lg:py-3 md:max-lg:text-[12.5px] rounded-full border border-accent text-[12px] sm:text-[13px] font-medium text-white bg-accent group-hover:bg-white group-hover:text-accent group-hover:border-white hover:!bg-white hover:!text-accent hover:!border-white transition-all duration-150 flex items-center gap-1.5 cursor-pointer font-sans shadow-xs group/btn whitespace-nowrap">
                      <span className="transition-colors duration-150">웹사이트 보기</span>
                      <ExternalLink className="w-3 h-3 sm:w-[13px] sm:h-[13px] md:max-lg:w-3.5 md:max-lg:h-3.5 transition-colors duration-150" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Separate Standalone '메인 홈으로 돌아가기' Button (lowered slightly across mobile, tablet, and PC) */}
        <div className="mt-16 sm:mt-14 md:max-lg:mt-18 lg:mt-16 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBackToHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8F5] border border-[#8F7A63]/35 text-[13px] text-[#7A6652] font-medium hover:bg-[#8F7A63] hover:border-[#8F7A63] hover:text-white transition-all duration-200 cursor-pointer font-sans group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>메인 홈으로 돌아가기</span>
          </motion.button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuChange={handleMobileMenuChange}
        activeSectionOverride={activeSectionOverride}
      />
      
      <AnimatePresence mode="wait">
        {currentPage === "home" ? renderHome() : renderProjects()}
      </AnimatePresence>

      {/* Persistent floating action buttons visible on scroll across all devices (Mobile, Tablet, Desktop) */}
      <div
        id="staymood-floating-controls"
        className={`fixed bottom-6 right-6 z-[9999] flex flex-col items-center gap-2.5 md:gap-3 transition-all duration-300 ease-out pointer-events-auto ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-4 pointer-events-none scale-90"
        }`}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
        }}
      >
        {/* Consultation Inquiry Floating Button (빠른 상담 플로팅 버튼 - 44px mobile / 52px tablet & PC) */}
        <button
          type="button"
          data-floating-consult-btn
          onClick={() => setIsConsultModalOpen((prev) => !prev)}
          className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-accent text-white flex items-center justify-center transition-all shadow-lg cursor-pointer hover:bg-accent-dark hover:scale-105 active:scale-95 border border-accent/25"
          aria-label="스테이무드 빠른 상담"
          title="스테이무드 빠른 상담"
        >
          <MessageCircle className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        </button>

        {/* Back to Top Button (최상단 이동 버튼 - 44px mobile / 52px tablet & PC) */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/95 backdrop-blur-md border border-accent/20 flex items-center justify-center transition-all text-accent shadow-lg cursor-pointer hover:bg-accent hover:text-white hover:border-accent hover:scale-105 active:scale-95"
          aria-label="최상단으로 이동"
          title="최상단으로 이동"
        >
          <ArrowUp className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        </button>
      </div>

      {/* Consultation Info Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        onNavigateToContact={() => handleNavigate("#contact")}
      />
    </div>
  );
}
