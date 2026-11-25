import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import seorimyeongaImage from "../assets/images/brand_philosophy_staymood_1786383942128.jpg";
import sosowonImage from "../assets/images/regenerated_image_1792044901311.jpg";
import yunseulImage from "../assets/images/regenerated_image_1792245625113.avif";
import atelzerozImage from "../assets/images/staymood_atelier_interior_1786651370823.jpg";
import stayonulImage from "../assets/images/staymood_philosophy_bg_1786458408069.jpg";

interface Project {
  id: number;
  title: string;
  image: string;
  badge: string;
  shortDesc: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 2,
    title: "소소원 (Sosowon)",
    image: sosowonImage,
    badge: "프라이빗 독채 풀빌라",
    shortDesc: "제주 돌담과 푸른 정원 속 고즈넉한 여유가 머무는 프라이빗 독채 스테이",
    link: "https://sosowon-jeju.netlify.app/"
  },
  {
    id: 1,
    title: "서림재 (Seorimjae)",
    image: seorimyeongaImage,
    badge: "독채 풀빌라",
    shortDesc: "오대산 소나무 숲의 고요한 풍경 속에서 자연과 함께 머무는 독채 풀빌라",
    link: "https://seorimjae.netlify.app/"
  },
  {
    id: 4,
    title: "아눅 스테이 (Anuk Stay)",
    image: atelzerozImage,
    badge: "감성 풀빌라",
    shortDesc: "차분한 공간을 채우는 따스한 빛과 섬세한 디테일이 머무는 감성 풀빌라",
    link: "https://anuk-stay.netlify.app/"
  },
  {
    id: 3,
    title: "윤슬 스테이 (Yunseul Stay)",
    image: yunseulImage,
    badge: "독채 풀빌라",
    shortDesc: "햇살에 반짝이는 윤슬과 잔잔한 파도 소리를 온전히 즐기는 오션뷰 스테이",
    link: "https://yunseul-stay.netlify.app/"
  }
];

interface PortfolioProps {
  onViewAll: () => void;
}

export default function Portfolio({ onViewAll }: PortfolioProps) {
  return (
    <section id="work" className="scroll-mt-16 sm:scroll-mt-20 bg-[#FAF8F5] text-ink relative overflow-hidden py-28 md:py-36 border-t border-accent/15">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-10 pt-2 sm:pt-4 text-center sm:text-left md:max-lg:flex-col md:max-lg:items-center md:max-lg:text-center">
          <div className="text-center sm:text-left space-y-2.5 flex flex-col items-center sm:items-start md:max-lg:text-center md:max-lg:w-full md:max-lg:flex md:max-lg:flex-col md:max-lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-1 flex justify-center sm:justify-start md:max-lg:flex md:max-lg:justify-center"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase">
                <Sparkles size={13} className="text-accent" />
                <span>MAIN PORTFOLIO</span>
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[24px] sm:text-[30px] md:max-lg:text-[28px] font-sans font-semibold text-ink leading-snug text-center sm:text-left md:max-lg:text-center break-keep"
            >
              <span className="text-[#2C2824]">공간의 결을 담은 </span>
              <span className="inline text-accent">대표 프로젝트</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-[14px] sm:text-[15px] text-gray-600 font-sans font-normal leading-relaxed pt-0.5 text-center sm:text-left md:max-lg:text-center md:max-lg:mx-auto break-keep"
            >
              <span>숙소마다 지닌 특별한 분위기와 매력을 </span>
              <span className="block sm:inline">온전히 담아 완성한 웹사이트입니다.</span>
            </motion.p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={onViewAll}
            className="flex-shrink-0 hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#FAF8F5] border border-[#8F7A63] text-[#7A6652] rounded-full text-[13px] font-medium hover:bg-[#8F7A63] hover:border-[#8F7A63] hover:text-white transition-all duration-200 cursor-pointer font-sans group md:max-lg:hidden"
          >
            <span>포트폴리오 전체보기</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </motion.button>
        </div>

        {/* Portfolio Cards - 2-Column Large Visual Grid for Best Image Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-left">
          {projects.map((project, index) => {
            const mainPageUrl = project.link && project.link !== "#" ? new URL("/", project.link).href : "#";
            return (
              <motion.a
                key={project.id}
                href={mainPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
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
                </div>

                {/* Bottom Information & Action Area */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4 font-sans bg-white group-hover:bg-accent transition-colors duration-300">
                  <div className="space-y-2">
                    <h3 className="text-[20px] font-sans font-semibold text-ink group-hover:text-white transition-colors duration-300 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[13.5px] text-gray-600 group-hover:text-white/90 font-sans font-normal leading-relaxed transition-colors duration-300">
                      {project.id === 1 ? (
                        <>
                          <span>오대산 소나무 숲의 고요한 풍경 속에서 자연과 </span>
                          <br className="sm:hidden" />
                          <span>함께 머무는 독채 풀빌라</span>
                        </>
                      ) : (
                        project.shortDesc
                      )}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-accent/15 group-hover:border-white/20 transition-colors duration-300 flex items-center justify-end sm:justify-between md:max-lg:justify-end">
                    <span className="hidden sm:inline md:max-lg:hidden text-[12px] text-[#8F7A63] group-hover:text-white/85 font-medium font-sans transition-colors duration-300">
                      100% 맞춤 브랜딩 & 반응형 웹
                    </span>

                    <span className="px-5.5 py-2.5 rounded-full border border-accent text-[12.5px] font-medium text-white bg-accent group-hover:bg-white group-hover:text-accent group-hover:border-white hover:!bg-[#FAF8F5] hover:!text-accent-dark transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-sans shadow-2xs whitespace-nowrap flex-shrink-0">
                      <span className="whitespace-nowrap transition-colors duration-200">웹사이트 보기</span>
                      <ExternalLink size={13} className="flex-shrink-0 transition-colors duration-200" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom Prominent CTA Banner for Viewing All Portfolio */}
        <div className="mt-10 pt-4 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={onViewAll}
            className="flex items-center gap-2 px-8 py-3 bg-[#FAF8F5] border border-[#8F7A63] text-[#7A6652] rounded-full text-[13.5px] font-medium hover:bg-[#8F7A63] hover:border-[#8F7A63] hover:text-white transition-all duration-200 cursor-pointer font-sans group"
          >
            <span>포트폴리오 전체보기</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}


