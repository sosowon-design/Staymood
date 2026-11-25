import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, Link2, ShieldCheck, CheckCircle2, Palette, Layout, Search, Layers, Clock, ArrowRight, ChevronRight, Globe, MapPin, Code2 } from "lucide-react";

type TabType = "philosophy" | "services" | "process";

interface ServiceDetail {
  num: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

const philosophyCards = [
  {
    num: "01",
    tag: "CORE VALUE 01",
    icon: <Sparkles size={13} className="text-accent flex-shrink-0" />,
    title: "브랜드 차별화",
    desc: "숙소만의 고유한 분위기와 결을 자연스럽게 담아, 수많은 스테이 속에서도 오래 기억되는 독보적인 인상을 만듭니다.",
    points: [
      "숙소별 개성을 담은 무드 기획",
      "경쟁 숙소와 차별화되는 정체성",
      "방문자의 기억에 남는 공간 경험"
    ],
    footer: "숙소만의 브랜드 경쟁력 강화"
  },
  {
    num: "02",
    tag: "CORE VALUE 02",
    icon: <Link2 size={13} className="text-accent flex-shrink-0" />,
    title: "편리한 예약 경험",
    desc: "직관적인 정보 구성과 간결한 동선을 통해 방문자가 숙소 정보를 한눈에 파악하고 망설임 없이 예약하도록 설계합니다.",
    points: [
      "쉽고 빠른 예약 경로 제공",
      "직관적인 객실·이용 안내",
      "불필요한 페이지 이동 최소화"
    ],
    footer: "예약 접근성과 이용 편의 향상"
  },
  {
    num: "03",
    tag: "CORE VALUE 03",
    icon: <ShieldCheck size={13} className="text-accent flex-shrink-0" />,
    title: "안정적인 운영 기반",
    desc: "네이버·구글 검색 노출부터 오픈 이후의 수정·관리까지 고려해, 대표님이 숙소 운영에만 집중할 수 있는 환경을 만듭니다.",
    points: [
      "포털 검색 최적화(SEO) 기반 구축",
      "운영 중 간편한 정보 수정·업데이트",
      "오픈 이후에도 이어지는 유지보수"
    ],
    footer: "지속 가능한 온라인 운영 기반"
  }
];

const services: ServiceDetail[] = [
  {
    num: "01",
    icon: <Palette size={16} />,
    title: "브랜딩 & 비주얼 디자인",
    subtitle: "SERVICE 01",
    description: "숙소 고유의 분위기와 이야기를 바탕으로 사진, 타이포그래피, 컬러, 레이아웃을 기획하여 일관된 브랜드 이미지를 완성합니다.",
    benefits: [
      "숙소 콘셉트·무드 맞춤 기획",
      "공간 매력 극대화 사진 배치",
      "브랜드 전용 컬러·서체 구성"
    ]
  },
  {
    num: "02",
    icon: <Layout size={16} />,
    title: "공간 정보 큐레이션",
    subtitle: "SERVICE 02",
    description: "객실별 구조와 구비 비품, 이용 요금 및 부대시설 안내를 보기 쉽게 정리합니다. 주변 맛집과 관광 정보까지 구성하여 필요한 정보를 한눈에 전달합니다.",
    benefits: [
      "객실·비품 상세 안내",
      "체크인·아웃 및 이용 수칙 정리",
      "주변 맛집·관광 코스 큐레이션"
    ]
  },
  {
    num: "03",
    icon: <Code2 size={16} />,
    title: "맞춤형 웹사이트 설계 및 제작",
    subtitle: "SERVICE 03",
    description: "정형화된 템플릿에서 벗어나 숙소의 콘셉트와 운영 방향을 반영합니다. 디자인부터 기능 구현까지 숙소만의 웹사이트를 완성합니다.",
    benefits: [
      "템플릿 없는 100% 맞춤 코딩",
      "전 기기 반응형 최적화",
      "감성 인터랙션 및 기능 구현"
    ]
  },
  {
    num: "04",
    icon: <Link2 size={16} />,
    title: "예약 연동 & 운영 지원",
    subtitle: "SERVICE 04",
    description: "네이버 예약·에어비앤비 등 외부 예약 채널을 연결하고, 검색엔진 최적화와 오픈 이후 수정 및 유지보수를 지원합니다.",
    benefits: [
      "네이버·에어비앤비 예약 연동",
      "네이버·구글 검색엔진 최적화",
      "오픈 후 홈페이지 수정·관리 지원"
    ]
  }
];

const steps = [
  {
    num: "01",
    title: "무료 진단 & 계약·선금",
    desc: "숙소의 분위기와 필요한 기능을 1:1로 진단한 뒤 맞춤 견적을 안내해 드리며, 계약 확정 및 선금(50%) 결제 후 제작을 시작합니다.",
    differentiator: "대표 디자이너 직접 소통"
  },
  {
    num: "02",
    title: "시안 제작 & 피드백 반영",
    desc: "숙소의 매력이 돋보이는 디자인 시안을 제안해 드리고, 사장님의 의견을 꼼꼼하게 반영해 원하는 방향으로 수정합니다.",
    differentiator: "세밀한 피드백 맞춤 반영"
  },
  {
    num: "03",
    title: "반응형 코딩 & 최종 검수",
    desc: "휴대폰, 태블릿, PC 어디서든 쾌적하게 보이도록 맞춤 코딩으로 사이트를 완성한 뒤 테스트 링크로 최종 검수를 진행합니다.",
    differentiator: "전 기기 반응형 최적화"
  },
  {
    num: "04",
    title: "잔금 결제 & 사이트 오픈",
    desc: "최종 검수 완료 및 잔금(50%) 결제 후 실제 도메인을 연결해 정식 오픈하며, 네이버 검색 등록과 월 관리 케어를 시작합니다.",
    differentiator: "도메인 연결 & 검색 등록"
  }
];

export default function BrandPhilosophy() {
  const [activeTab, setActiveTab] = useState<TabType>("philosophy");

  const tabs: { id: TabType; label: string; num: string }[] = [
    { id: "philosophy", label: "핵심 가치", num: "01" },
    { id: "services", label: "핵심 서비스", num: "02" },
    { id: "process", label: "제작 진행 절차", num: "03" },
  ];

  return (
    <section id="about" className="scroll-mt-16 sm:scroll-mt-20 py-24 md:py-32 relative font-sans border-t border-accent/15 bg-[#F2ECE4]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-10">
        
        {/* Section Header with Concise Annotation & 30px Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 md:max-lg:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase shadow-2xs">
              <Compass size={13} className="text-accent" />
              <span>About Staymood</span>
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[24px] sm:text-[30px] md:max-lg:text-[28px] font-sans font-semibold text-ink leading-snug break-keep whitespace-nowrap sm:whitespace-normal"
          >
            <span className="text-[#2C2824]">스테이무드 </span>
            <span className="inline text-accent">
              <span className="sm:hidden">소개 및 진행 절차</span>
              <span className="hidden sm:inline">제작 기준 및 프로세스</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[14px] sm:text-[15px] text-gray-700 font-sans max-w-2xl mx-auto leading-relaxed pt-1 md:max-lg:pt-0.5 break-keep"
          >
            숙소의 고유한 분위기가 머무는 이에게 온전히 닿고, 자연스러운 예약으로 이어지도록 설계합니다.
          </motion.p>
        </div>

        {/* Tab Navigation Buttons - matching Core Services & Pricing design with natural mobile slide bar */}
        <div className="relative flex flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible justify-start sm:justify-center items-center gap-2.5 sm:gap-3 border-b border-accent/20 pb-3 sm:pb-6 px-1.5 sm:px-0 mx-0 sm:mx-0 font-sans sm:scrollbar-none sm:[scrollbar-width:none] sm:[-ms-overflow-style:none] sm:[&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-accent/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-accent/40 hover:[&::-webkit-scrollbar-thumb]:bg-accent/60 [&::-webkit-scrollbar-thumb]:rounded-full touch-pan-x">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4.5 py-2.5 sm:px-5 rounded-full text-[13px] font-sans transition-all duration-300 cursor-pointer shadow-xs ${
                  isActive
                    ? "bg-accent text-white shadow-md ring-2 ring-accent/30 font-semibold sm:font-medium"
                    : "bg-white text-[#2C2824] sm:text-gray-600 hover:text-ink hover:bg-white/90 border border-accent/35 sm:border-accent/20 font-semibold sm:font-medium"
                }`}
              >
                <span className={`text-[12px] font-bold tracking-wide ${isActive ? "text-white" : "text-accent"}`}>
                  {tab.num}
                </span>
                <span className="tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {/* TAB 01: 브랜드 철학 (기존 내용) */}
          {activeTab === "philosophy" && (
            <motion.div
              key="philosophy-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:max-lg:grid-cols-1 lg:grid-cols-3 gap-6 md:max-lg:gap-5 text-left font-sans"
            >
              {philosophyCards.map((card, index) => (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
                  className="bg-white/95 backdrop-blur-md p-7 md:max-lg:p-5 md:max-lg:pl-6.5 lg:p-8 rounded-2xl border border-white/80 shadow-md hover:border-accent/60 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-accent/20 text-[12px] md:max-lg:text-[11px] font-semibold text-accent font-sans shadow-2xs">
                        {card.icon}
                        <span>{card.tag}</span>
                      </span>
                    </div>

                    <h3 className="text-[19px] md:max-lg:text-[18px] lg:text-[20px] font-sans font-semibold text-ink mb-2.5 leading-snug group-hover:text-accent transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-[13px] md:max-lg:text-[13px] text-gray-600 font-normal leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    <div className="p-3.5 md:max-lg:p-2.5 rounded-xl bg-[#FAF8F5] border border-accent/15 space-y-1.5 mb-4">
                      {card.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-[12px] text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-accent/10 flex items-center gap-2 text-[12px] md:max-lg:text-[11.5px] text-accent font-semibold font-sans">
                    <CheckCircle2 size={14} />
                    <span>{card.footer}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 02: 핵심 서비스 (Core Services) */}
          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left font-sans w-full"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.18, ease: "easeOut" } }}
                  className="bg-white p-5.5 sm:p-6 rounded-2xl shadow-xs border border-accent/15 flex flex-col justify-between hover:border-accent/40 hover:shadow-md transition-all duration-300 group h-full"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Unified Single Annotation Tag containing Icon + Subtitle */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-accent/25 text-[11.5px] font-semibold text-accent shadow-2xs font-sans">
                          {service.icon}
                          <span className="truncate">{service.subtitle}</span>
                        </span>
                      </div>

                      {/* Title for superior legibility */}
                      <h3 className="text-[17px] md:max-lg:text-[18px] font-sans font-semibold text-ink mb-2 group-hover:text-accent transition-colors leading-snug min-h-[36px] sm:min-h-[42px] flex items-center">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-[12.5px] md:max-lg:text-[13.5px] leading-relaxed font-normal mb-3.5 font-sans min-h-0 sm:min-h-[78px]">
                        {service.description}
                      </p>
                    </div>

                    {/* Distinct Separated Checklist Box with Unified Height */}
                    <div className="mt-1.5 py-2.5 px-3.5 rounded-xl bg-[#FAF8F5] border border-accent/15 min-h-[92px] sm:min-h-[96px] flex flex-col justify-center space-y-1.5">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11.5px] sm:text-[12px] text-gray-700 leading-snug font-medium">
                          <CheckCircle2 size={13} className="text-accent flex-shrink-0 mt-0.5" />
                          <span className="break-keep">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 03: 제작 진행 절차 (Process) */}
          {activeTab === "process" && (
            <motion.div
              key="process-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 text-left font-sans relative"
            >
              {steps.map((step, idx) => (
                <motion.div 
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.18, ease: "easeOut" } }}
                  className="relative flex flex-col h-full group"
                >
                  <div
                    className="bg-white border border-accent/15 p-5 sm:p-6 md:p-6.5 rounded-2xl flex-1 flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-xs"
                  >
                    <div>
                      {/* Comment Tag Style Step Badge */}
                      <div className="mb-2 sm:mb-2.5 flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#FAF8F5] border border-accent/25 text-[11.5px] font-semibold text-accent font-sans tracking-wide shadow-2xs">
                          STEP {step.num}
                        </span>
                      </div>

                      {/* Clean Step Title */}
                      <h3 className="text-[16.5px] md:max-lg:text-[17.5px] font-sans font-semibold text-ink group-hover:text-accent transition-colors mb-1.5 sm:mb-2 leading-snug min-h-[32px] sm:min-h-[42px] flex items-center">
                        {step.title}
                      </h3>

                      <p className="text-[12.5px] md:max-lg:text-[13.5px] text-gray-600 leading-relaxed font-normal mb-2.5 sm:mb-3.5 font-sans min-h-0 sm:min-h-[54px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Differentiator Highlight Box */}
                    <div className="mt-1 sm:mt-1.5 p-2.5 sm:p-3 rounded-xl bg-[#FAF8F5] border border-accent/15 flex items-center gap-2 text-[12px] text-ink font-medium">
                      <Sparkles size={13} className="text-accent flex-shrink-0" />
                      <span className="text-gray-800">{step.differentiator}</span>
                    </div>
                  </div>

                  {/* Mobile Flow Arrow Badge (overlapping top card's bottom edge only, matching PC one-side overlap) */}
                  {idx < steps.length - 1 && (
                    <div className="flex md:hidden absolute left-1/2 -bottom-5.5 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white text-accent border border-accent/25 items-center justify-center shadow-sm transition-all duration-300">
                      <ChevronRight size={16} className="stroke-[2.5] rotate-90" />
                    </div>
                  )}

                  {/* PC Flow Arrow Badge (overlapping left card's right edge only, as before) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white text-accent border border-accent/25 items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-accent/50 transition-all duration-300">
                      <ChevronRight size={18} className="stroke-[2.5]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
