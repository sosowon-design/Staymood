import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, MessageCircle, Mail, Sparkles, Check } from "lucide-react";
import heroBg from "../assets/images/staymood_hero_bg_1786458380751.jpg";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openKakaoChat = () => {
    window.open('https://pf.kakao.com/_fhxirX', '_blank');
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('staymood.web@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-28 bg-[#1C1B19] text-[#FAF8F5]">
      {/* Background Image with Clear View */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroBg}
          alt="Aesthetic Stay Mood Space Interior Background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          animate={{
            scale: [1.02, 1.08, 1.02],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        {/* Balanced elegant dark gradient overlay for natural warmth and clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero Main Grid Container with generous side padding */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 relative z-10 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Shifted slightly right for optimal visual balance */}
          <div className="lg:col-span-7 lg:pl-6 text-left flex flex-col items-start justify-center">

            {/* Micro Tagline Badge above Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[12px] font-medium mb-4 font-sans shadow-xs"
            >
              <Sparkles size={13} className="text-accent flex-shrink-0" />
              <span className="font-semibold text-white tracking-wide">감성 숙소 & 독채 스테이 전문</span>
            </motion.div>

            {/* Main Headline with Enhanced Legibility & Natural Shadow (Clean 2 lines) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-sans font-semibold tracking-tight text-white leading-[1.4] mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              머물고 싶은 <span className="text-[#dbccbc]">숙소 홈페이지 제작</span>, <span className="text-white">스테이무드</span>
            </motion.h1>

            {/* Sub-description with High Contrast & Readability (Core 1 line) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-xl text-[14px] md:text-[15.5px] text-white/95 font-sans font-normal leading-relaxed mb-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
            >
              <span>여행자의 마음을 사로잡는 감각적인 디자인으로 숙소 고유의 결을 전합니다.</span>
              <br />
              <span>단순한 소개를 넘어, 머물고 싶은 설렘과 직접 예약으로 이어지는 홈페이지를 완성해 보세요.</span>
            </motion.p>

            {/* Left-Aligned Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-3.5 w-full sm:w-auto font-sans"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="w-full sm:w-auto px-7 py-3 bg-accent text-white rounded-full text-[13.5px] font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-accent-dark transition-all cursor-pointer group"
              >
                <span>상담 신청하기</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToWork}
                className="w-full sm:w-auto px-7 py-3 bg-white/15 backdrop-blur-md text-white border border-white/30 rounded-full text-[13.5px] font-medium flex items-center justify-center gap-2 hover:bg-white/25 transition-all cursor-pointer"
              >
                <span>포트폴리오 살펴보기</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side: Clickable Quick Contact Info Cards (Lighter point color text & arrow hover color) */}
          <div className="lg:col-span-5 flex flex-col gap-3 font-sans lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              onClick={openKakaoChat}
              role="button"
              tabIndex={0}
              className="w-full lg:max-w-[330px] bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/60 hover:bg-white/25 px-4.5 py-3.5 rounded-xl text-left text-white shadow-lg space-y-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white text-[11.5px] font-semibold tracking-wide">
                  <MessageCircle size={13} className="text-white flex-shrink-0" />
                  <span>카카오톡 문의</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-accent transition-all duration-200">
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="text-[14px] font-semibold text-white group-hover:text-[#dbccbc] transition-colors pt-0.5">
                <span className="drop-shadow-sm">@스테이무드 (staymood_web)</span>
              </div>
              <p className="text-[11px] text-[#c8b39e] font-medium drop-shadow-sm pt-1">1:1 카카오톡 채널</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              className="w-full lg:max-w-[330px] bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/60 hover:bg-white/25 px-4.5 py-3.5 rounded-xl text-left text-white shadow-lg space-y-1 transition-all cursor-pointer group relative"
              title="클릭하여 이메일 주소 복사"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white text-[11.5px] font-semibold tracking-wide">
                  <Mail size={13} className="text-white flex-shrink-0" />
                  <span>이메일 문의</span>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  copiedEmail 
                    ? "bg-white text-accent border-white" 
                    : "bg-white/15 border-white/30 text-white group-hover:bg-white group-hover:text-accent"
                }`}>
                  {copiedEmail ? <Check size={12} /> : <ArrowRight size={12} />}
                </div>
              </div>
              <p className="text-[14px] font-semibold text-white group-hover:text-[#dbccbc] transition-colors truncate pt-0.5 drop-shadow-sm">
                staymood.web@gmail.com
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-[#c8b39e] font-medium drop-shadow-sm">
                  스테이무드 공식 이메일
                </p>
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.span
                      initial={{ opacity: 0, y: -2, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -2, scale: 0.9 }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-white text-[10.5px] font-medium shadow-xs"
                    >
                      <Check size={11} className="stroke-[2.5]" />
                      <span>복사되었습니다</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Sleek Minimalist Scroll Down Indicator (Mouse Wheel Frame) */}
      <motion.div
        onClick={scrollToWork}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-white/60 group-hover:text-accent transition-colors font-semibold">
          Scroll Down
        </span>

        {/* Mouse outline with scrolling dot */}
        <div className="w-5 h-8 border border-white/35 rounded-full group-hover:border-accent transition-colors duration-300 flex justify-center p-1 bg-black/20 backdrop-blur-xs">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
        
        <ChevronDown size={13} className="text-white/50 group-hover:text-accent group-hover:translate-y-0.5 transition-all" />
      </motion.div>
    </section>
  );
}

