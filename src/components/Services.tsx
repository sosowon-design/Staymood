import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Link2, Layout, Sparkles, CheckCircle2, ChevronRight, Search, Layers, Clock, ArrowRight } from "lucide-react";

interface ServiceDetail {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

const services: ServiceDetail[] = [
  {
    icon: <Palette size={16} />,
    title: "공간 브랜딩 & 비주얼 연출",
    subtitle: "숙소만의 독보적 무드 정립",
    description: "공간이 품은 고유의 분위기와 머무름의 가치를 직관적인 웹 인터랙션과 세련된 비주얼로 완성합니다.",
    benefits: [
      "1:1 톤앤매너 맞춤 기획",
      "전용 브랜드 컬러 & 폰트",
      "공간 감성 이미지 최적화"
    ]
  },
  {
    icon: <Layout size={16} />,
    title: "몰입형 감성 UI/UX 설계",
    subtitle: "실제 방문하듯 생생한 경험",
    description: "게스트가 문을 열고 들어서는 듯한 스크롤 모션과 직관적인 반응형 동선으로 몰입감을 만듭니다.",
    benefits: [
      "모바일·PC 완벽 반응형",
      "감성 스크롤 모션 연출",
      "체류 시간 늘리는 레이아웃"
    ]
  },
  {
    icon: <Link2 size={16} />,
    title: "원클릭 외부 예약 링크 연동",
    subtitle: "네이버 예약·에어비앤비 직결",
    description: "호스트가 이미 사용 중인 네이버 예약, 에어비앤비 등 외부 예약 사이트를 이탈 없이 원클릭으로 연결합니다.",
    benefits: [
      "네이버·에어비앤비 직결",
      "수수료 0원 간편 연동",
      "이탈 없는 원클릭 예약 동선"
    ]
  },
  {
    icon: <Search size={16} />,
    title: "네이버·구글 SEO & 1:1 케어",
    subtitle: "검색 노출 최적화 & 사후 케어",
    description: "오픈 즉시 게스트에게 탐색되도록 포털 검색을 최적화하고, 오픈 후에도 전담 관리를 지속합니다.",
    benefits: [
      "네이버·구글 검색(SEO) 등록",
      "공식 인스타그램 연동",
      "오픈 후 꼼꼼한 사후 지원"
    ]
  }
];

const steps = [
  {
    num: "01",
    title: "1:1 맞춤 상담 & 계약",
    desc: "숙소의 분위기와 원하시는 기능을 편하게 이야기 나누고, 투명한 견적과 일정을 확인한 뒤 계약을 진행합니다.",
    differentiator: "스테이무드 1:1 직접 소통"
  },
  {
    num: "02",
    title: "맞춤 시안 제안 & 피드백 반영",
    desc: "숙소의 매력이 돋보이는 첫 디자인 시안을 보내드리고, 사장님의 의견을 꼼꼼하게 반영해 수정합니다.",
    differentiator: "사장님 의견 100% 반영"
  },
  {
    num: "03",
    title: "감성 디자인 & 반응형 풀코딩",
    desc: "휴대폰, 태블릿, PC 어디서든 예쁘고 편리하게 보일 수 있도록 맞춤 코딩으로 사이트를 완성합니다.",
    differentiator: "모바일·태블릿 화면 완벽 최적화"
  },
  {
    num: "04",
    title: "최종 오픈 & 월 관리 케어",
    desc: "네이버 검색 등록과 예약 링크를 꼼꼼히 점검한 뒤 사이트를 오픈하며, 꾸준한 월 관리 케어를 시작합니다.",
    differentiator: "네이버 검색 등록 & 든든한 사후 관리"
  }
];

const prices = [
  {
    name: "STANDARD",
    type: "감성 독채 / 싱글 페이지",
    iconType: "sparkle",
    price: "₩1,800,000 ~",
    desc: "템플릿 없이 100% 맞춤 풀코딩으로 제작되는 단일 페이지 감성 숙소 전용 기본 라인업.",
    features: [
      "100% 순수 맞춤 풀코딩 (노템플릿)",
      "모바일 & 태블릿 반응형 완벽 최적화",
      "제작 기간: 보통 2주 완성 프로세스",
      "네이버 예약·에어비앤비 원클릭 연동",
      "월 관리비(₩30,000): 호스팅·보안·수정 대행"
    ],
    badge: "기본형"
  },
  {
    name: "DELUXE",
    type: "독채 풀빌라 / 시그니처 스테이",
    iconType: "layout",
    price: "₩2,800,000 ~",
    desc: "공간별 서사와 세련된 스크롤 인터랙션으로 예약 전환율을 극대화하는 가장 인기 있는 대표 플랜.",
    features: [
      "100% 커스텀 코딩 & 감성 스크롤 모션",
      "모바일·태블릿·데스크톱 완벽 반응형",
      "제작 기간: 보통 2주 완성 프로세스",
      "공간별 룸 투어 & 실시간 예약 링크 직결",
      "월 관리비(₩50,000): 텍스트·사진 수정 및 서버 케어"
    ],
    badge: "가장 인기"
  },
  {
    name: "PREMIUM",
    type: "하이엔드 스테이 / 다중 지점",
    iconType: "layers",
    price: "₩4,200,000 ~",
    desc: "독보적인 비주얼 아카이브와 오리지널 인터랙션으로 공간의 하이엔드 가치를 증명하는 맞춤형 아틀리에 플랜.",
    features: [
      "최상위 감성 인터랙션 & 100% 풀코딩",
      "모바일·태블릿 초고화질 인터랙티브 최적화",
      "제작 기간: 보통 2주 내외 집중 완성",
      "다채널 예약 연동 & 검색(SEO) 상위 등록",
      "월 관리비(₩70,000): 호스팅·보안 및 우선 수정 케어"
    ],
    badge: "프리미엄"
  }
];

type TabType = "prices" | "services" | "process";

interface ServicesProps {
  onViewPortfolio?: () => void;
}

export default function Services({ onViewPortfolio }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<TabType>("prices");

  const tabs: { id: TabType; label: string; num: string }[] = [
    { id: "prices", label: "가격 안내", num: "01" },
    { id: "services", label: "핵심 서비스", num: "02" },
    { id: "process", label: "제작 과정", num: "03" },
  ];

  return (
    <section id="services" className="py-28 md:py-36 bg-[#F2ECE4] text-ink relative overflow-hidden border-t border-accent/15">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 flex flex-col gap-12">
        
        {/* Section Header with Icon Annotation and Balanced Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase">
              <Layers size={13} className="text-accent" />
              <span>Core Services & Pricing</span>
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[30px] font-sans font-semibold text-ink leading-snug"
          >
            <span className="text-[#2C2824]">스테이무드</span> <span className="text-accent">서비스 및 제작 안내</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[15px] text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed pt-1"
          >
            감성 브랜딩부터 예약 연동까지, 공간의 가치를 높이는 맞춤 제작 플랜.
          </motion.p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="relative flex flex-wrap justify-center items-center gap-3 border-b border-accent/20 pb-6 font-sans">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer font-sans z-10 border flex items-center gap-1.5 ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-xs"
                    : "bg-white/60 text-ink/80 border-accent/30 hover:border-accent hover:text-accent hover:bg-white"
                }`}
              >
                <span className={`text-[11.5px] font-semibold tracking-wide ${isActive ? "text-white/85" : "text-accent"}`}>
                  {tab.num}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "prices" && (
            <motion.div
              key="prices-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-left">
                {prices.map((plan, index) => {
                  const isPopular = index === 1;
                  return (
                    <motion.div
                      key={plan.name}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className={`bg-white border p-8 rounded-2xl flex flex-col justify-between h-full relative transition-all duration-300 ${
                        isPopular 
                          ? "border-accent shadow-md ring-2 ring-accent/30 bg-gradient-to-b from-white to-[#FAF8F5]" 
                          : "border-accent/15 hover:border-accent/40"
                      }`}
                    >
                      {isPopular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[12px] tracking-wider font-semibold px-4 py-1 rounded-full shadow-xs border border-white">
                          {plan.badge}
                        </span>
                      )}

                      <div>
                        {/* Plan Type Annotation placed above plan.name like an eyebrow comment */}
                        <div className="mb-2.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-accent/20 text-[11.5px] font-semibold text-accent tracking-wide font-sans shadow-2xs">
                            {plan.iconType === "sparkle" && <Sparkles size={12} className="text-accent flex-shrink-0" />}
                            {plan.iconType === "layout" && <Layout size={12} className="text-accent flex-shrink-0" />}
                            {plan.iconType === "layers" && <Layers size={12} className="text-accent flex-shrink-0" />}
                            <span>{plan.type}</span>
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-[20px] font-sans font-semibold text-ink tracking-tight uppercase">{plan.name}</h3>
                          <span className={`text-[11px] font-normal px-2 py-0.5 rounded ${
                            isPopular 
                              ? "bg-accent/15 text-accent font-medium border border-accent/20" 
                              : "bg-pastel-cream text-gray-500"
                          }`}>
                            {isPopular ? "대표 플랜" : plan.badge}
                          </span>
                        </div>
                        
                        <div className="border-b border-accent/15 pb-4 mb-4">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-2xl font-sans font-semibold text-ink tracking-tight">{plan.price}</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-gray-600 leading-relaxed font-normal mb-5">{plan.desc}</p>
                        
                        <ul className="space-y-2.5 mb-8">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2 text-[13px] text-gray-700 font-normal leading-relaxed">
                              <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href="#contact"
                        className={`w-full py-3 rounded-full text-[13px] font-medium tracking-wider text-center transition-all cursor-pointer block font-sans ${
                          isPopular
                            ? "bg-accent text-white hover:bg-accent-dark shadow-xs"
                            : "bg-accent/15 border border-accent/30 text-ink hover:bg-accent hover:text-white"
                        }`}
                      >
                        상담 신청하기
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Monthly Management Fee & Custom Code Notice Box */}
              <div className="p-6 rounded-2xl bg-white border border-accent/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5 shadow-2xs">
                    <Sparkles size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[14.5px] font-semibold text-[#2C2824]">
                      맞춤형 홈페이지 제작 & 월 관리비 케어 안내
                    </h4>
                    <div className="text-[12.5px] text-gray-600 leading-relaxed font-normal space-y-1.5">
                      <p>
                        스테이무드는 퀄리티 높은 제작을 위해 템플릿을 사용하지 않고 숙소의 브랜딩을 위한 코드로 맞춤 개발합니다. 코딩으로 정교하게 제작되어 호스트님께서 코드를 수정하기 어려운 점을 고려하여,
                      </p>
                      <p>
                        매월 소정의 관리비로 호스팅·보안(SSL) 유지 및 텍스트/이미지/예약링크 수정을 스테이무드에서 안전하게 관리해 드립니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left font-sans w-full"
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white p-6 rounded-2xl shadow-xs border border-accent/15 flex flex-col justify-between hover:border-accent/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Unified Single Annotation Tag containing Icon + Subtitle */}
                      <div className="mb-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-accent/25 text-[11.5px] font-semibold text-accent shadow-2xs font-sans">
                          {service.icon}
                          <span className="truncate">{service.subtitle}</span>
                        </span>
                      </div>

                      {/* Enlarged Title for superior legibility */}
                      <h3 className="text-[16.5px] font-sans font-semibold text-ink mb-2 group-hover:text-accent transition-colors leading-snug min-h-[44px] flex items-center">
                        {service.title}
                      </h3>
                      
                      {/* Enlarged Description */}
                      <p className="text-gray-600 text-[12.5px] leading-relaxed font-normal mb-4 font-sans min-h-[58px]">
                        {service.description}
                      </p>
                    </div>

                    {/* Distinct Separated Checklist Box with Enlarged Clear Text */}
                    <div className="mt-2 p-3.5 rounded-xl bg-[#FAF8F5] border border-accent/15 space-y-2">
                      <span className="text-[11px] font-semibold text-accent uppercase tracking-wider block mb-1">
                        핵심 제공 혜택
                      </span>
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[12px] text-gray-700 leading-snug font-normal">
                          <CheckCircle2 size={13} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "process" && (
            <motion.div
              key="process-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-left font-sans relative"
            >
              {steps.map((step, idx) => (
                <div key={step.num} className="relative flex flex-col h-full">
                  <div
                    className="bg-white border border-accent/15 p-6 md:p-7 rounded-2xl flex-1 flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-xs group"
                  >
                    <div>
                      {/* Comment Tag Style Step Badge */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#FAF8F5] border border-accent/25 text-[11.5px] font-semibold text-accent font-sans tracking-wide shadow-2xs">
                          STEP {step.num}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          0{idx + 1} / 04
                        </span>
                      </div>
                      
                      {/* Title with Uniform Height */}
                      <h3 className="text-[16px] font-semibold text-ink mb-2.5 leading-snug min-h-[44px] flex items-center group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>

                      {/* Description with Uniform Height */}
                      <p className="text-[13px] leading-relaxed font-normal text-gray-600 min-h-[64px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Differentiator Line aligned strictly across all cards */}
                    <div className="pt-3.5 mt-4 border-t border-accent/10 text-[12px] text-accent font-semibold flex items-center gap-1.5 truncate">
                      <Sparkles size={13} className="flex-shrink-0" />
                      <span className="truncate">{step.differentiator}</span>
                    </div>
                  </div>

                  {/* Refined Chevron Flow Connector Arrow between cards */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-accent/30 text-accent items-center justify-center shadow-xs">
                      <ChevronRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}



