import React from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2, Layout, Layers } from "lucide-react";

const prices = [
  {
    name: "STANDARD",
    type: "감성 독채 / 싱글 페이지",
    iconType: "sparkle",
    price: "₩1,800,000 ~",
    desc: "숙소 운영에 필요한 핵심 정보를 체계적으로 구성하고, 첫인상을 완성하는 맞춤형 홈페이지",
    features: [
      "메인 페이지 및 서브 페이지 최대 3종",
      "숙소 소개 및 객실 정보 구성",
      "이미지 갤러리 및 위치 안내",
      "예약 페이지 및 외부 링크 연동",
      "기본 인터랙션 및 애니메이션",
      "PC · 태블릿 · 모바일 반응형",
      "검색엔진 최적화(SEO)",
      "월 관리비(₩50,000): 서버·보안 관리, 단순 텍스트·이미지 수정 수시 지원"
    ],
    badge: "기본형"
  },
  {
    name: "DELUXE",
    type: "독채 풀빌라 / 시그니처 스테이",
    iconType: "layout",
    price: "₩3,000,000 ~",
    desc: "숙소만의 브랜드 정체성을 구체화하고, 차별화된 사용자 경험을 구현하여 인기 있는 대표 플랜",
    features: [
      "메인 페이지 및 서브 페이지 최대 6종",
      "브랜드 콘셉트 및 디자인 방향 기획",
      "객실별 상세 페이지 및 콘텐츠 구성",
      "이미지 갤러리 및 주변 관광 정보",
      "예약 동선 및 외부 서비스 연동",
      "맞춤형 인터랙션 및 스크롤 애니메이션",
      "PC · 태블릿 · 모바일 반응형",
      "검색엔진 최적화(SEO)",
      "월 관리비(₩100,000): 서버·보안 관리, 단순 수정 수시 지원, 시즌 팝업·공지 배너 제작 (월 1건)"
    ],
    badge: "가장 인기"
  },
  {
    name: "PREMIUM",
    type: "하이엔드 스테이 / 다중 지점",
    iconType: "layers",
    price: "₩4,200,000 ~",
    desc: "독보적인 비주얼 아카이브와 정교한 기능 구현을 통해 최고급 브랜드 가치를 증명하는 고도화 맞춤형 플랜",
    features: [
      "메인 페이지 및 서브 페이지 최대 10종",
      "브랜드 아이덴티티 및 디지털 디자인 기획",
      "전 페이지 맞춤형 UI/UX 설계",
      "고급 인터랙션 및 모션 애니메이션",
      "독창적인 레이아웃 및 스크롤 연출",
      "객실 및 부대시설 상세 콘텐츠 구성",
      "PC · 태블릿 · 모바일 반응형",
      "검색엔진 최적화(SEO)",
      "월 관리비(₩150,000): 서버·보안 관리, 단순 수정 수시 지원, 시즌 팝업·이벤트 섹션 제작 (월 2건)"
    ],
    badge: "프리미엄"
  }
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 sm:scroll-mt-20 py-28 md:py-36 bg-[#F2ECE4] text-ink relative overflow-hidden border-t border-accent/15 font-sans">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase shadow-2xs">
              <Layers size={13} className="text-accent" />
              <span>Core Pricing Guide</span>
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[24px] sm:text-[30px] md:max-lg:text-[28px] font-sans font-semibold text-ink leading-snug"
          >
            <span className="text-[#2C2824]">맞춤 제작</span> <span className="text-accent">플랜 & 가격 안내</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[14px] sm:text-[15px] text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed pt-1"
          >
            <span className="hidden sm:inline">숙소의 특성과 필요한 제작 범위를 고려한 맞춤형 홈페이지 제작 플랜을 소개합니다.</span>
            <span className="sm:hidden">
              <span>숙소의 특성과 필요한 제작 범위를 고려한 </span>
              <span className="block">맞춤형 홈페이지 제작 플랜을 소개합니다.</span>
            </span>
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans text-left">
          {prices.map((plan, index) => {
            const isPopular = index === 1;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.18, ease: "easeOut" } }}
                className={`bg-white border p-8 rounded-2xl flex flex-col justify-between h-full relative transition-all duration-300 ${
                  isPopular 
                    ? "border-accent shadow-md ring-2 ring-accent/30 bg-gradient-to-b from-white to-[#FAF8F5]" 
                    : "border-accent/15 hover:border-accent/40 shadow-xs hover:shadow-md"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[12px] tracking-wider font-semibold px-4 py-1 rounded-full shadow-xs border border-white">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="tracking-tight uppercase">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-md bg-[#FAF8F5] border border-accent/35 text-accent font-mono text-[14.5px] sm:text-[15.5px] font-semibold tracking-wider shadow-2xs">
                        {plan.iconType === "sparkle" && <Sparkles size={13} className="text-accent flex-shrink-0" />}
                        {plan.iconType === "layout" && <Layout size={13} className="text-accent flex-shrink-0" />}
                        {plan.iconType === "layers" && <Layers size={13} className="text-accent flex-shrink-0" />}
                        <span>{plan.name}</span>
                      </span>
                    </h3>
                    <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      isPopular 
                        ? "bg-accent/20 text-accent border border-accent/30" 
                        : "bg-accent/10 text-accent border border-accent/20"
                    }`}>
                      {isPopular ? "대표 플랜" : plan.badge}
                    </span>
                  </div>
                  
                  <div className="border-b border-accent/15 pb-4 mb-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-sans font-semibold text-ink tracking-tight">{plan.price}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-normal mb-5 break-keep">
                    {plan.desc}
                  </p>
                  
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
                  무료 견적 받아보기
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Monthly Management Fee & Custom Code Notice Box */}
        <div className="p-6 md:p-7 rounded-2xl bg-white border border-accent/20 shadow-xs flex flex-col md:flex-row items-center text-center md:items-center md:text-left justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 w-full">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5 shadow-2xs mx-auto sm:mx-0">
              <Sparkles size={16} />
            </div>
            <div className="space-y-1 w-full text-center sm:text-left">
              <h4 className="text-[17px] sm:text-[15px] font-semibold text-[#2C2824] text-center sm:text-left">
                월 관리비(유지보수) 안내
              </h4>
              {/* Tablet & PC Desktop version (md:): Merged on tablet, line break before 전담 월 관리비 on PC */}
              <div className="hidden md:block text-[13px] text-gray-600 leading-relaxed font-normal mt-2 text-left">
                <p>
                  <span>스테이무드는 숙소 브랜딩을 반영한 100% 맞춤 코딩으로 감도 높은 웹사이트를 구현합니다. 대표님께서 기술적인 번거로움 없이 숙소 운영에만 온전히 집중하실 수 있도록 </span>
                  <span className="lg:block">전담 월 관리비 플랜을 통해 호스팅·보안(SSL) 유지와 콘텐츠 수정을 안전하게 케어해 드립니다.</span>
                </p>
              </div>

              {/* Mobile version: merged into a single paragraph with extra top and bottom spacing */}
              <div className="block md:hidden text-[13px] text-gray-600 leading-relaxed font-normal mt-3 pb-2 text-center sm:text-left">
                <p>
                  스테이무드는 100% 맞춤 코딩으로 감도 높은 웹사이트를 구현합니다. 대표님께서 기술적인 번거로움 없이 숙소 운영에만 집중하실 수 있도록 전담 월 관리 플랜을 통해 호스팅·보안(SSL) 유지와 콘텐츠 수정을 안전하게 케어해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
