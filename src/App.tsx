/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, ArrowUp, X, ArrowRight, Compass, Sparkles, CheckCircle2, Link2, ShieldCheck, MessageCircle } from "lucide-react";
import seorimyeongaImage from "./assets/images/brand_philosophy_staymood_1786383942128.jpg";
import sosowonImage from "./assets/images/regenerated_image_1792044901311.jpg";
import dearforestImage from "./assets/images/staymood_trust_architecture_1786645050482.jpg";
import atelzerozImage from "./assets/images/staymood_atelier_interior_1786651370823.jpg";
import aroundfollieImage from "./assets/images/staymood_philosophy_bg_1786458408069.jpg";
import momentoffImage from "./assets/images/staymood_web_studio_workspace_1786647265560.jpg";

const allProjects = [
  { id: 1, title: "서림연가 (Seorim Yeonga)", category: "Aesthetic Stay / Branding & Web", image: seorimyeongaImage, description: "대나무 숲의 사스락거리는 소리와 고요한 한옥의 온도를 시각적 레이아웃으로 풀어낸 프리미엄 숙소 플랫폼", link: "#" },
  { id: 2, title: "소소원 (Sosowon)", category: "Private Pool Villa / Web Space", image: sosowonImage, description: "제주 고즈넉한 돌담 숲속에 머무는 단 한 팀만을 위한 고요한 프라이빗 독채 펜션", link: "https://sosowon-jeju.netlify.app" },
  { id: 3, title: "디어 림 (Stay Dear Forest)", category: "Private Pool Villa / Web Space", image: dearforestImage, description: "깊은 자연 속에 숨겨진 풀빌라 독채의 지형적 수려함을 미디어 연출 모션으로 녹여낸 웹사이트", link: "#" },
  { id: 4, title: "아뜰리에 오즈 (Atelier Oz)", category: "Creative Portfolio Archive", image: atelzerozImage, description: "세라믹 아티스트들의 시그니처 흙빛 질감과 비정형의 가치를 정적인 여백의 미학으로 표현한 브랜드 디렉토리", link: "#" },
  { id: 5, title: "어라운드 폴리 (Around Follie)", category: "Outdoor Stay / Editorial Strategy", image: aroundfollieImage, description: "자연 속에 머무는 글램핑과 조립식 하우스 스테이의 내추럴한 감성을 직조한 감성 공간 포탈", link: "#" },
  { id: 6, title: "모먼트 오프 (Moment Off)", category: "Lifestyle Fabric / Digital Commerce", image: momentoffImage, description: "일상에 쉼표를 주는 오가닉 린넨 패브릭 소품 브랜드의 편안함을 다듬은 디렉트 웹 스토어", link: "#" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "projects">("home");
  const [isPhilosophyModalOpen, setIsPhilosophyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleMobileMenuChange = (open: boolean) => {
    setIsMobileMenuOpen(open);
    if (open) {
      setIsConsultModalOpen(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowScrollTop(shouldShow);
      if (!shouldShow) {
        setIsConsultModalOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const handleNavigate = (href: string) => {
    const id = href.replace("#", "");
    if (currentPage !== "home") {
      setPendingScroll(id);
      setCurrentPage("home");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (currentPage === "home" && pendingScroll) {
      const timer = setTimeout(() => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
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
      
      {/* Brand Philosophy Section - Why Staymood */}
      <section id="about" className="py-24 md:py-32 relative font-sans border-t border-accent/15 bg-[#F2ECE4]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header with Concise Annotation & 30px Title */}
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase shadow-2xs">
                <Compass size={13} className="text-accent" />
                <span>Brand Philosophy</span>
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[30px] font-sans font-semibold text-ink leading-snug"
            >
              공간의 첫인상이 되는 <span className="text-accent">감성 브랜드 웹사이트</span>를 완성합니다
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[15px] text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed pt-1"
            >
              숙소 고유의 결을 감각적인 디지털 인터랙션으로 풀어내어 즉각적인 예약 연결로 이끕니다.
            </motion.p>
          </div>

          {/* 01~03 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-sans relative z-10">
            
            {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
                className="bg-white/95 backdrop-blur-md p-7 md:p-8 rounded-2xl border border-white/80 shadow-md hover:border-accent/60 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-accent/20 text-[12px] font-semibold text-accent font-sans shadow-2xs">
                      <Sparkles size={13} className="text-accent flex-shrink-0" />
                      <span>01. 감성 연출</span>
                    </span>
                  </div>

                  <h3 className="text-[19px] md:text-[20px] font-sans font-semibold text-ink mb-2.5 leading-snug group-hover:text-accent transition-colors">
                    독보적 감성 비주얼 연출
                  </h3>
                  
                  <p className="text-[13px] text-gray-600 font-normal leading-relaxed mb-4">
                    사진 한 장의 한계를 넘어, 숙소의 조도와 쉼의 분위기를 생생한 웹 모션으로 구현하여 게스트의 시선을 사로잡습니다.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-accent/15 space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>숙소 고유 톤앤매너 1:1 맞춤 기획</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>모바일·태블릿·PC 100% 최적화</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-accent/10 flex items-center gap-2 text-[12px] text-accent font-semibold font-sans">
                  <CheckCircle2 size={14} />
                  <span>체류 시간을 늘리는 감성 UI/UX</span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
                className="bg-white/95 backdrop-blur-md p-7 md:p-8 rounded-2xl border border-white/80 shadow-md hover:border-accent/60 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-accent/20 text-[12px] font-semibold text-accent font-sans shadow-2xs">
                      <Link2 size={13} className="text-accent flex-shrink-0" />
                      <span>02. 예약 연동</span>
                    </span>
                  </div>

                  <h3 className="text-[19px] md:text-[20px] font-sans font-semibold text-ink mb-2.5 leading-snug group-hover:text-accent transition-colors">
                    원클릭 외부 예약 연동
                  </h3>
                  
                  <p className="text-[13px] text-gray-600 font-normal leading-relaxed mb-4">
                    기존에 사용 중이신 네이버 예약, 에어비앤비, 스테이폴리오 등 외부 예약 채널로 손쉽게 버튼 하나로 직결합니다.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-accent/15 space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>네이버 예약 / 에어비앤비 다이렉트 버튼</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>불필요한 결제 모듈 없이 간편 관리</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-accent/10 flex items-center gap-2 text-[12px] text-accent font-semibold font-sans">
                  <CheckCircle2 size={14} />
                  <span>예약 유입 전환율 극대화</span>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
                className="bg-white/95 backdrop-blur-md p-7 md:p-8 rounded-2xl border border-white/80 shadow-md hover:border-accent/60 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-accent/20 text-[12px] font-semibold text-accent font-sans shadow-2xs">
                      <ShieldCheck size={13} className="text-accent flex-shrink-0" />
                      <span>03. 전담 케어</span>
                    </span>
                  </div>

                  <h3 className="text-[19px] md:text-[20px] font-sans font-semibold text-ink mb-2.5 leading-snug group-hover:text-accent transition-colors">
                    검색 최적화 & 파트너십
                  </h3>
                  
                  <p className="text-[13px] text-gray-600 font-normal leading-relaxed mb-4">
                    네이버·구글 포털 검색 최적화(SEO)와 지도 등록을 꼼꼼히 세팅하고, 런칭 이후에도 안정적인 운영을 지원합니다.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-accent/15 space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>네이버·구글 포털 SEO 상위 검색 등록</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>오픈 후 꼼꼼한 사이트 점검 및 운영 지원</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-accent/10 flex items-center gap-2 text-[12px] text-accent font-semibold font-sans">
                  <CheckCircle2 size={14} />
                  <span>검색 노출 & 런칭 후 안정적 케어</span>
                </div>
              </motion.div>

            </div>

        </div>
      </section>

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
      className="pt-36 sm:pt-40 pb-0 bg-[#F2ECE4] min-h-screen text-ink font-sans flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 w-full">
        {/* Elegant Floating Top Bar with Redesigned Back to Home Button */}
        <div className="flex items-center justify-between mb-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage("home")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-accent/25 text-[13px] text-ink font-medium shadow-xs hover:border-accent hover:text-accent transition-all cursor-pointer font-sans group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform text-accent" />
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
              <span>Selected Portfolio Cases</span>
            </span>
          </motion.div>

          <h1 className="text-[30px] font-sans font-semibold text-ink leading-snug">
            실제 예약 전환을 이끈 <span className="text-accent">스테이무드 포트폴리오</span>
          </h1>
          <p className="text-[13.5px] md:text-[14px] text-gray-600 font-normal leading-relaxed pt-0.5">
            머무는 공간의 감성을 살려 실제 예약 전환으로 연결한 오픈 프로젝트 아카이브입니다.
          </p>
        </div>

        {/* Horizontal Compact Card Layout matching previous design */}
        <div className="flex flex-col gap-5">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              onClick={() => {
                if (project.link && project.link !== '#') {
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                }
              }}
              className="group bg-white hover:bg-[#a58e74] rounded-xl border border-accent/15 hover:border-accent transition-all duration-300 shadow-xs hover:shadow-lg overflow-hidden flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 md:px-8 gap-5 cursor-pointer text-left"
            >
              {/* Left Image Thumbnail */}
              <div className="relative w-full sm:w-48 md:w-60 h-28 sm:h-24 rounded-lg overflow-hidden bg-pastel-cream flex-shrink-0">
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

              {/* Middle Title & Description */}
              <div className="flex-1 text-left min-w-0 transition-colors duration-300">
                <h3 className="text-base md:text-lg font-sans font-medium text-ink group-hover:text-white mb-1.5 transition-colors truncate">
                  {project.title}
                </h3>
                <p className="text-[13px] text-gray-600 group-hover:text-white/90 font-sans font-normal leading-normal truncate transition-colors">
                  {project.description}
                </p>
              </div>

              {/* Right External Link Button with Point Color Hover Text & No Floating Text */}
              <div className="flex-shrink-0 self-start sm:self-center">
                {project.link && project.link !== '#' ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-full border border-accent/30 text-[13px] font-medium text-ink bg-white/80 group-hover:bg-white group-hover:text-accent group-hover:border-accent hover:bg-white hover:text-accent transition-all duration-150 flex items-center gap-1.5 cursor-pointer font-sans shadow-xs group/btn"
                  >
                    <span className="transition-colors duration-150 group-hover/btn:text-accent">웹사이트 보기</span>
                    <ExternalLink size={13} className="transition-colors duration-150 group-hover/btn:text-accent" />
                  </a>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-4 py-2 rounded-full border border-accent/30 text-[13px] font-medium text-ink bg-white/80 group-hover:bg-white group-hover:text-accent group-hover:border-accent hover:bg-white hover:text-accent transition-all duration-150 flex items-center gap-1.5 cursor-pointer font-sans shadow-xs group/btn"
                  >
                    <span className="transition-colors duration-150 group-hover/btn:text-accent">웹사이트 보기</span>
                    <ExternalLink size={13} className="transition-colors duration-150 group-hover/btn:text-accent" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Persuasive Consultation Banner matching 1:1 Consulting Solution */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 p-7 sm:p-9 rounded-2xl bg-white/95 backdrop-blur-sm border border-accent/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[11.5px] font-semibold text-accent font-sans shadow-2xs mb-2.5">
              <Sparkles size={12} className="text-accent" />
              <span>1:1 맞춤 제작 솔루션</span>
            </div>
            <h4 className="text-[17px] sm:text-[19px] font-sans font-semibold leading-snug tracking-tight">
              <span className="text-[#2C2824]">감성 숙소 맞춤 웹사이트, </span>
              <span className="text-accent">스테이무드와 편하게 상담하세요</span>
            </h4>
            <p className="text-[13.5px] text-gray-600 font-sans font-normal leading-relaxed">
              숙소의 무드와 특색을 꼼꼼히 살펴본 뒤 1:1 맞춤 기획서와 최적의 제작 방향을 친절히 제안해 드립니다.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavigate("#contact")}
            className="flex-shrink-0 px-7 py-3.5 rounded-full bg-accent text-white border border-accent text-[13.5px] font-semibold shadow-md hover:bg-accent-dark transition-all cursor-pointer font-sans flex items-center gap-2 group"
          >
            <span>상담 바로가기</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Separate Standalone '메인 홈으로 돌아가기' Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage("home")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/90 border border-accent/20 text-[13px] text-gray-700 font-medium shadow-2xs hover:border-accent hover:text-accent hover:bg-white transition-all cursor-pointer font-sans group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-accent" />
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
      />
      
      <AnimatePresence mode="wait">
        {currentPage === "home" ? renderHome() : renderProjects()}
      </AnimatePresence>

      {/* Persistent floating action buttons visible on scroll (hidden when mobile menu is open) */}
      <AnimatePresence>
        {showScrollTop && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2.5"
          >
            {/* Consultation Inquiry Floating Button (Icon only, exact same size: w-10 h-10) */}
            <motion.button
              data-floating-consult-btn
              onClick={() => setIsConsultModalOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:bg-accent-dark hover:shadow-lg relative border border-accent/25"
              aria-label="스테이무드 빠른 상담"
              title="스테이무드 빠른 상담"
            >
              <MessageCircle size={17} />
            </motion.button>

            {/* Back to Top Button (최상단 이동 버튼: w-10 h-10) */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, backgroundColor: "var(--color-accent)", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-accent/15 flex items-center justify-center transition-all text-accent shadow-md cursor-pointer hover:shadow-lg"
              aria-label="Back to top"
              title="최상단으로 이동"
            >
              <ArrowUp size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Info Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        onNavigateToContact={() => handleNavigate("#contact")}
      />
    </div>
  );
}
