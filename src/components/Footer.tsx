import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, Instagram, Check, X, ShieldCheck, FileText, Clock } from "lucide-react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLegalModal(null);
      }
    };
    if (legalModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [legalModal]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("staymood.web@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-[#382C22] text-[#FAF8F5] py-10 md:py-14 px-6 md:px-12 font-sans border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 text-center md:text-left">
        
        {/* Main Footer Info Grid - Navigation removed */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start pb-2 md:pb-3">
          
          {/* Brand Info (7 cols) - Centered on mobile */}
          <div className="md:col-span-7 space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="flex items-center justify-center w-7 h-8 border border-white/50 rounded-t-full bg-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span className="text-lg tracking-[0.2em] font-medium text-white uppercase font-serif">Staymood</span>
            </div>

            {/* Tablet version: line break after 매력을, rest merged */}
            <p className="hidden md:max-lg:block text-[12.5px] text-white/80 font-normal max-w-lg leading-relaxed text-left break-keep">
              <span>스테이무드는 브랜딩을 통한 맞춤 제작으로 숙소의 고유한 매력을 </span>
              <span className="block">웹사이트에 온전히 담아냅니다. 감각적인 디자인과 직관적인 구조로 방문객의 마음을 사로잡아 예약률을 높여보세요.</span>
            </p>

            {/* Desktop version (lg:) */}
            <p className="hidden lg:block text-[13px] text-white/80 font-normal lg:max-w-none leading-relaxed text-left break-keep">
              <span className="lg:block lg:whitespace-nowrap">스테이무드는 브랜딩을 통한 맞춤 제작으로 숙소의 고유한 매력을 웹사이트에 온전히 담아냅니다.</span>
              <span className="lg:block lg:whitespace-nowrap">감각적인 디자인과 직관적인 구조로 방문객의 마음을 사로잡아 예약률을 높여보세요.</span>
            </p>
          </div>

          {/* Contact Info - Centered on mobile, right-aligned on md+ matching footer edges */}
          <div className="md:col-span-5 space-y-2.5 flex flex-col items-center md:items-end text-center md:text-left">
            <div className="w-full md:w-fit flex flex-col items-center md:items-start">
              <h4 className="hidden md:block text-[13px] text-white/80 font-semibold uppercase tracking-wider mb-2 font-sans text-center md:text-left">
                Contact
              </h4>
              <div className="space-y-2 text-[13px] text-white/80 font-normal leading-relaxed text-center md:text-left flex flex-col items-center md:items-start">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <MessageCircle size={14} className="text-accent flex-shrink-0" />
                  <a href="https://pf.kakao.com/_fhxirX" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    카카오톡: @스테이무드
                  </a>
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 relative">
                  <Mail size={14} className="text-accent flex-shrink-0" />
                  <span 
                    onClick={handleCopyEmail}
                    className="hover:text-accent transition-colors cursor-pointer select-all"
                    title="클릭 시 이메일 복사"
                  >
                    이메일: staymood.web@gmail.com
                  </span>
                  {copiedEmail && (
                    <span className="absolute -top-8 right-0 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent text-white text-[11px] font-medium shadow-md pointer-events-none z-10">
                      <Check size={11} className="stroke-[2.5]" />
                      <span>복사되었습니다</span>
                    </span>
                  )}
                </div>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Instagram size={14} className="text-accent flex-shrink-0" />
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    인스타그램: @staymood_web
                  </a>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Clock size={14} className="text-accent flex-shrink-0" />
                  <span>평일 10:00 ~ 19:00 (주말·공휴일 휴무)</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Center Divider Line */}
        <div className="w-full border-t border-white/15 my-1" />

        {/* Company Info & Left Copyright / Right Legal Links - Centered on mobile */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:items-center md:text-left gap-4 text-[12px] text-white/70 leading-relaxed font-normal">
          <div className="space-y-1 text-center md:text-left">
            <p>
              <span>상호: 스테이무드 | 대표: 조혜민</span>
              <span className="hidden sm:inline"> | </span>
              <br className="sm:hidden" />
              <span className="inline-block mt-1 sm:mt-0">사업자등록번호: 297-46-01033</span>
            </p>
            <p className="text-white/50 text-[11.5px] font-sans tracking-wide">
              Copyright © 2026 Staymood. All rights reserved.
            </p>
          </div>

          {/* Privacy Policy & Terms Links - Open as Modals */}
          <div className="flex items-center justify-center md:justify-end gap-5 text-white/80 font-medium text-[12px]">
            <button 
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="hover:underline hover:text-accent transition-all cursor-pointer"
            >
              개인정보처리방침
            </button>
            <span className="text-white/30">|</span>
            <button 
              type="button"
              onClick={() => setLegalModal("terms")}
              className="hover:underline hover:text-accent transition-all cursor-pointer"
            >
              이용약관
            </button>
          </div>
        </div>

      </div>

      {/* Legal Modal (개인정보처리방침 & 이용약관) */}
      <AnimatePresence>
        {legalModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs text-[#2C2824]"
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl text-left font-sans relative max-h-[85vh] flex flex-col border border-accent/20"
            >
              {/* Modal Top Header with Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-accent/15">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLegalModal("privacy")}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      legalModal === "privacy"
                        ? "bg-accent text-white shadow-2xs"
                        : "bg-[#FAF8F5] text-gray-600 hover:text-ink hover:bg-gray-100"
                    }`}
                  >
                    <ShieldCheck size={14} />
                    <span>개인정보처리방침</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLegalModal("terms")}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      legalModal === "terms"
                        ? "bg-accent text-white shadow-2xs"
                        : "bg-[#FAF8F5] text-gray-600 hover:text-ink hover:bg-gray-100"
                    }`}
                  >
                    <FileText size={14} />
                    <span>이용약관</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="닫기"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="py-4 space-y-4 text-[12.5px] text-gray-600 leading-relaxed overflow-y-auto pr-1">
                {legalModal === "privacy" ? (
                  <>
                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">1. 개인정보의 수집 및 이용 목적</h4>
                      <p>
                        스테이무드는 감성 숙소 맞춤 웹사이트 구축 상담, 견적서 및 기획 제안서 전달, 프로젝트 일정 조율 및 고객 문의 응대를 위해 최소한의 개인정보를 수집 및 이용합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">2. 수집하는 개인정보의 항목</h4>
                      <p>
                        - 필수 항목: 성함, 연락처<br />
                        - 선택 항목: 숙소명, SNS 계정 또는 참고 링크, 공간 소개 및 상세 요청사항
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">3. 개인정보의 보유 및 이용 기간</h4>
                      <p>
                        수집된 개인정보는 1:1 상담 접수 및 프로젝트 완료 시까지 안전하게 보관되며, 관계 법령에 따른 보존 의무가 없는 한 이용자의 파기 요청 시 지체 없이 파기하며, 전자적 파일 형태는 복구 불가능한 방법으로 영구 삭제합니다 (최대 1년 보관).
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">4. 개인정보의 제3자 제공 및 위탁</h4>
                      <p>
                        스테이무드는 정보주체의 사전 동의 없이 개인정보를 외부에 제공하지 않으며, 원활한 문의 접수 및 이메일 발송을 위한 시스템 이용 외에 별도의 마케팅 목적으로 제3자에게 위탁하지 않습니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">5. 정보주체의 권리 및 행사 방법</h4>
                      <p>
                        고객님께서는 언제든지 등록되어 있는 본인의 개인정보 열람, 정정, 삭제 및 처리 정지를 요청하실 수 있으며, 카카오톡 채널(@스테이무드) 또는 이메일(staymood.web@gmail.com)을 통해 즉시 처리 가능합니다.
                      </p>
                      <p className="mt-1.5 font-medium text-ink">
                        개인정보 보호책임자: 조혜민 대표 (이메일: staymood.web@gmail.com / 카카오톡 채널: @스테이무드)
                      </p>
                    </div>

                    <div className="pt-3 border-t border-accent/15 text-[12px] text-gray-500">
                      본 개인정보처리방침은 2026년 11월 20일부터 적용됩니다.
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 1 조 (목적)</h4>
                      <p>
                        본 약관은 스테이무드가 제공하는 숙소 맞춤형 웹사이트 기획·디자인·개발 및 월 관리 케어 서비스(이하 '서비스')의 이용 조건 및 절차에 관한 제반 사항을 규정함을 목적으로 합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 2 조 (서비스의 범위 및 특성)</h4>
                      <p>
                        1. 스테이무드가 제공하는 웹사이트는 템플릿을 사용하지 않는 100% 순수 코딩 맞춤 제작 방식으로 진행됩니다.<br />
                        2. 모바일 및 태블릿 반응형 최적화, 외부 예약 링크(네이버 예약·에어비앤비 등) 연동, 포털 검색(SEO) 기본 등록이 포함됩니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 3 조 (계약, 대금 결제 및 환불 기준)</h4>
                      <p>
                        1. 1:1 맞춤 상담 후 제안된 견적 및 작업 범위에 동의하는 경우 계약이 성립됩니다.<br />
                        2. 프로젝트는 선금 입금 확인 후 기획 및 시안 작업이 개시되며, 최종 검수 및 오픈 완료 시 잔금을 정산합니다.<br />
                        3. 기획·시안 작업 착수 이후 고객의 단순 변심으로 인한 계약 해지 시 선금은 반환되지 않으며, 진행 단계에 따라 추가 정산이 발생할 수 있습니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 4 조 (지식재산권 및 결과물 귀속)</h4>
                      <p>
                        1. 최종 완성된 웹사이트 결과물의 저작권은 개발 대금이 전액 완납된 시점에 고객에게 귀속됩니다.<br />
                        2. 스테이무드는 제작된 웹사이트의 화면 캡처 및 링크를 포트폴리오 및 홍보 목적으로 활용할 수 있습니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 5 조 (유지보수 및 월 관리비)</h4>
                      <p>
                        코딩 작업 특성상 고객의 직접 수정이 어려운 점을 감안하여, 별도의 월 관리비 약정을 통해 호스팅 및 보안 관리, 예약 링크 및 텍스트·이미지 상시 수정 케어를 전담 지원합니다.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Modal Bottom Close Button */}
              <div className="pt-3.5 border-t border-accent/15 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="px-5 py-2.5 rounded-full bg-accent text-white text-[13px] font-medium hover:bg-accent-dark transition-colors cursor-pointer shadow-2xs"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}


