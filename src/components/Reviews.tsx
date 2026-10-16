import { motion } from "motion/react";
import { Star, Quote, TrendingUp, CheckCircle } from "lucide-react";
import seorimyeongaImage from "../assets/images/brand_philosophy_staymood_1786383942128.jpg";
import atelzerozImage from "../assets/images/staymood_atelier_interior_1786651370823.jpg";
import dearforestImage from "../assets/images/staymood_trust_architecture_1786645050482.jpg";

interface Review {
  id: number;
  stayName: string;
  category: string;
  owner: string;
  image: string;
  quote: string;
  metric: string;
  highlights: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    stayName: "서림연가",
    category: "전북 무주 독채 한옥 스테이",
    owner: "김서연 대표",
    image: seorimyeongaImage,
    quote: "중개 수수료로 매달 지출되던 비용에서 완전히 해방되었습니다. 대나무 숲의 고요함과 한옥의 온도가 웹페이지 스크롤에 완벽히 담겨 방문객들이 홈페이지에서 바로 예약을 확정합니다.",
    metric: "직거래 예약 비율 94% 달성",
    highlights: ["중개 수수료 0원 직거래", "예약 전환율 3.8배 상승"]
  },
  {
    id: 2,
    stayName: "메종 드 아코디",
    category: "수공예 오브제 & 리빙 쇼룸",
    owner: "이유진 디렉터",
    image: atelzerozImage,
    quote: "스테이무드의 섬세한 톤앤매너 기획 덕분에 브랜드 이미지가 한 차원 다르게 완성되었습니다. 론칭 첫 달 만에 예상 매출의 220%를 달성했습니다.",
    metric: "론칭 첫 달 목표 매출 220% 달성",
    highlights: ["1:1 맞춤 브랜딩 수립", "브랜드 스토어 결제 연동"]
  },
  {
    id: 3,
    stayName: "디어 림",
    category: "강원 정선 숲속 독채 풀빌라",
    owner: "박민호 대표",
    image: dearforestImage,
    quote: "사계절 숲의 일렁임과 풀빌라의 수려한 미학을 모션 인터랙션으로 연출해주셨습니다. 객실 문의 및 직접 예약 오픈 주말에 전 객실 마감을 기록했습니다.",
    metric: "오픈 주말 전 객실 만실 기록",
    highlights: ["공간 감성 모션 연출", "모바일 최적화 실시간 캘린더"]
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-28 md:py-36 bg-[#FAF8F5] text-ink relative overflow-hidden border-t border-accent/15">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[13px] tracking-[0.2em] text-accent mb-1 block font-medium uppercase font-sans"
          >
            Client Voices
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[30px] font-sans font-semibold text-ink leading-snug"
          >
            스테이무드와 함께한 <span className="text-accent">호스트의 제작 후기</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-[14px] text-gray-600 font-sans leading-relaxed"
          >
            공간의 고유한 가치를 직거래 예약 플랫폼으로 완성한 실제 파트너 대표님들의 이야기입니다.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              className="bg-white rounded-2xl border border-accent/15 hover:border-accent/40 transition-all duration-300 p-7 flex flex-col justify-between shadow-xs hover:shadow-md relative group text-left"
            >
              <div>
                {/* Stay Header Info */}
                <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-accent/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-accent/20 flex-shrink-0">
                    <motion.img
                      src={review.image}
                      alt={review.stayName}
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
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-sans font-medium text-ink group-hover:text-accent transition-colors">
                      {review.stayName}
                    </h3>
                    <p className="text-[12px] text-gray-500 font-sans">{review.category} · {review.owner}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-[13px] text-gray-700 font-sans leading-relaxed mb-6 italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Metric & Highlights Footer */}
              <div className="pt-4 border-t border-accent/10 bg-pastel-cream/50 -mx-7 -mb-7 p-6 rounded-b-2xl">
                <div className="flex items-center gap-2 text-accent font-medium text-[13px] mb-2 font-sans">
                  <TrendingUp size={15} />
                  <span>{review.metric}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {review.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] text-ink/75 bg-white border border-accent/20 px-2.5 py-1 rounded-full font-sans">
                      <CheckCircle size={10} className="text-accent" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
