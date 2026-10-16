import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import seorimyeongaImage from "../assets/images/brand_philosophy_staymood_1786383942128.jpg";
import sosowonImage from "../assets/images/regenerated_image_1792044901311.jpg";
import dearforestImage from "../assets/images/staymood_trust_architecture_1786645050482.jpg";
import atelzerozImage from "../assets/images/staymood_atelier_interior_1786651370823.jpg";

interface Project {
  id: number;
  title: string;
  image: string;
  shortDesc: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "서림연가 (Seorim Yeonga)",
    image: seorimyeongaImage,
    shortDesc: "대나무 숲의 사스락거리는 소리와 한옥의 고요한 온도를 담아낸 독채 프리미엄 예약 스토어",
    link: "#"
  },
  {
    id: 2,
    title: "소소원 (Sosowon)",
    image: sosowonImage,
    shortDesc: "제주 고즈넉한 돌담 숲속에 머무는 단 한 팀만을 위한 고요한 프라이빗 독채 펜션",
    link: "https://sosowon-jeju.netlify.app"
  },
  {
    id: 3,
    title: "디어 림 (Stay Dear Forest)",
    image: dearforestImage,
    shortDesc: "깊은 숲속에 위치한 풀빌라 독채의 수려함을 미디어 모션으로 연출한 공간 웹사이트",
    link: "#"
  },
  {
    id: 4,
    title: "아뜰리에 오즈 (Atelier Oz)",
    image: atelzerozImage,
    shortDesc: "세라믹 아티스트들의 흙빛 질감과 비정형의 가치를 정갈한 여백으로 정돈한 아카이브",
    link: "#"
  }
];

interface PortfolioProps {
  onViewAll: () => void;
}

export default function Portfolio({ onViewAll }: PortfolioProps) {
  return (
    <section id="work" className="bg-[#FAF8F5] text-ink relative overflow-hidden py-28 md:py-36 border-t border-accent/15">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 pt-2 sm:pt-4">
          <div className="text-left space-y-2.5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase">
                <Sparkles size={13} className="text-accent" />
                <span>Selected Portfolio Cases</span>
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[30px] font-sans font-semibold text-ink leading-snug"
            >
              실제 예약 전환을 이끈 <span className="text-accent">스테이무드 포트폴리오</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-[15px] text-gray-600 font-sans font-normal leading-relaxed pt-0.5"
            >
              공간만의 고유한 무드를 담아내어 실제 예약 전환을 이끈 스테이무드의 제작 사례입니다.
            </motion.p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={onViewAll}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-accent/10 border border-accent text-accent rounded-full text-[13px] font-medium hover:bg-[#8F7A63] hover:border-[#8F7A63] hover:text-white transition-all duration-200 cursor-pointer font-sans shadow-xs group"
          >
            <span>포트폴리오 전체보기</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </motion.button>
        </div>

        {/* Portfolio Cards - 2-Column Large Visual Grid for Best Image Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-left">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => {
                if (project.link && project.link !== "#") {
                  window.open(project.link, "_blank", "noopener,noreferrer");
                } else {
                  onViewAll();
                }
              }}
              className="group bg-white rounded-2xl border border-accent/20 hover:border-accent shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Top Large Prominent Image Showcase */}
              <div className="relative w-full h-60 sm:h-72 overflow-hidden bg-pastel-cream">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Category Pill Tag on Image */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[11.5px] font-medium text-ink tracking-wide font-sans shadow-xs">
                    {index === 0 && "독채 한옥 스테이"}
                    {index === 1 && "프라이빗 독채 풀빌라"}
                    {index === 2 && "숲속 프라이빗 풀빌라"}
                    {index === 3 && "세라믹 & 공예 아카이브"}
                  </span>
                </div>
              </div>

              {/* Bottom Information & Action Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4 font-sans bg-white group-hover:bg-[#FAF8F5] transition-colors duration-300">
                <div className="space-y-2">
                  <h3 className="text-[19px] sm:text-[20px] font-sans font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[13.5px] text-gray-600 font-sans font-normal leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-accent/15 flex items-center justify-between">
                  <span className="text-[12px] text-[#8F7A63] font-medium font-sans">
                    100% 맞춤 브랜딩 & 반응형 웹
                  </span>
                  
                  {project.link && project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-full border border-accent/30 text-[12.5px] font-medium text-ink bg-white group-hover:bg-accent group-hover:text-white group-hover:border-accent hover:!bg-[#8F7A63] hover:!text-white hover:!border-[#8F7A63] transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-sans shadow-2xs"
                    >
                      <span>웹사이트 보기</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewAll();
                      }}
                      className="px-4 py-2 rounded-full border border-accent/30 text-[12.5px] font-medium text-ink bg-white group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-sans shadow-2xs"
                    >
                      <span>웹사이트 보기</span>
                      <ExternalLink size={13} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Prominent CTA Banner for Viewing All Portfolio */}
        <div className="mt-10 pt-4 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={onViewAll}
            className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full text-[13.5px] font-medium hover:bg-accent-dark transition-all duration-200 cursor-pointer font-sans shadow-xs group"
          >
            <span>포트폴리오 전체보기</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}


