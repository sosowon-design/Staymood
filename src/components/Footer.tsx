import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, Instagram, Check, X, ShieldCheck, FileText } from "lucide-react";

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
    <footer className="bg-[#382C22] text-[#FAF8F5] py-14 px-6 md:px-12 font-sans border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 text-left">
        
        {/* Main Footer Info Grid - Navigation removed */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-8 border border-white/50 rounded-t-full bg-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span className="text-lg tracking-[0.2em] font-medium text-white uppercase font-serif">Staymood</span>
            </div>

            <p className="text-[13px] text-white/80 font-normal max-w-md leading-relaxed">
              머무는 이의 마음에 깊은 여운을 남기는 공간, 그 특별한 결을 온전히 담아내는 1:1 맞춤형 웹사이트를 만듭니다. 방문객의 감성을 사로잡는 감각적인 디자인과 스토리로 숙소의 매력을 깊이 있게 전하며, 직접 예약률을 높이고 우리 숙소만의 독보적인 브랜드 무드를 완성해 드립니다.
            </p>
          </div>

          {/* Contact Info (md:col-span-5 md:pl-6 or shifted slightly to the left) */}
          <div className="md:col-span-5 space-y-2.5 flex flex-col md:items-start md:pl-6 lg:pl-10">
            <div className="w-full md:max-w-[280px]">
              <h4 className="text-[13px] text-white/80 font-semibold uppercase tracking-wider mb-2 font-sans text-left">
                Contact
              </h4>
              <div className="space-y-2 text-[13px] text-white/80 font-normal leading-relaxed text-left">
                <p className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-accent flex-shrink-0" />
                  <a href="https://pf.kakao.com/_fhxirX" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    카카오톡: @스테이무드 (staymood_web)
                  </a>
                </p>
                <div className="flex items-center gap-2 relative">
                  <Mail size={14} className="text-accent flex-shrink-0" />
                  <span 
                    onClick={handleCopyEmail}
                    className="hover:text-accent transition-colors cursor-pointer select-all inline-flex items-center gap-1.5"
                    title="클릭 시 이메일 복사"
                  >
                    <span>이메일:</span>
                    <span>staymood.web@gmail.com</span>
                  </span>
                  {copiedEmail && (
                    <span className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-white text-[11px] font-medium shadow-md pointer-events-none z-10">
                      <Check size={11} className="stroke-[2.5]" />
                      <span>복사되었습니다</span>
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-2">
                  <Instagram size={14} className="text-accent flex-shrink-0" />
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    인스타그램: @staymood_web
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Center Divider Line */}
        <div className="w-full border-t border-white/15 my-1" />

        {/* Company Info & Left Copyright / Right Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[12px] text-white/70 leading-relaxed font-normal">
          <div className="space-y-1">
            <p>
              상호: 스테이무드 | 대표: 조혜민 | 사업자등록번호: 297-46-01033
            </p>
            <p className="text-white/50 text-[11.5px] font-sans tracking-wide">
              © 2026 Staymood. All rights reserved.
            </p>
          </div>

          {/* Privacy Policy & Terms Links - Open as Modals */}
          <div className="flex items-center gap-5 text-white/80 font-medium text-[12px]">
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
                        주식회사 스테이무드(이하 '회사')는 감성 숙소 맞춤 웹사이트 구축 상담, 견적서 및 기획 제안서 전달, 프로젝트 일정 조율 및 고객 문의 응대를 위해 최소한의 개인정보를 수집 및 이용합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">2. 수집하는 개인정보의 항목</h4>
                      <p>
                        - 필수 항목: 브랜드명 또는 성함, 연락처(휴대전화번호), 이메일 주소<br />
                        - 선택 항목: 숙소 위치, SNS 계정 또는 참고 링크, 공간 소개 및 상세 요청사항
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">3. 개인정보의 보유 및 이용 기간</h4>
                      <p>
                        수집된 개인정보는 1:1 상담 접수 및 프로젝트 완료 시까지 안전하게 보관되며, 관계 법령에 따른 보존 의무가 없는 한 이용자의 파기 요청 시 지체 없이 파기합니다 (최대 1년 보관).
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">4. 개인정보의 제3자 제공 및 위탁</h4>
                      <p>
                        회사는 정보주체의 사전 동의 없이 개인정보를 외부에 제공하거나 위탁하지 않으며, 관계 법령에 의한 적법한 절차에 따릅니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">5. 정보주체의 권리 및 행사 방법</h4>
                      <p>
                        고객님께서는 언제든지 등록되어 있는 본인의 개인정보 열람, 정정, 삭제 및 처리 정지를 요청하실 수 있으며, 카카오톡 채널(@스테이무드) 또는 이메일(staymood.web@gmail.com)을 통해 즉시 처리 가능합니다.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 1 조 (목적)</h4>
                      <p>
                        본 약관은 주식회사 스테이무드(이하 '회사')가 제공하는 숙소 맞춤형 웹사이트 기획·디자인·개발 및 월 관리 케어 서비스(이하 '서비스')의 이용 조건 및 절차에 관한 제반 사항을 규정함을 목적으로 합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 2 조 (서비스의 범위 및 특성)</h4>
                      <p>
                        1. 회사가 제공하는 웹사이트는 템플릿을 사용하지 않는 100% 순수 코딩 맞춤 제작 방식으로 진행됩니다.<br />
                        2. 모바일 및 태블릿 반응형 최적화, 외부 예약 링크(네이버 예약·에어비앤비 등) 연동, 포털 검색(SEO) 최적화 등록이 포함됩니다.<br />
                        3. 코딩 기반 사이트의 안정적인 운영을 위하여 호스팅, 보안 업데이트 및 텍스트/이미지 수정 대행을 포함하는 월 관리비 케어 서비스를 지원합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 3 조 (계약 및 대금 결제)</h4>
                      <p>
                        1. 1:1 맞춤 상담 후 제안된 견적 및 작업 범위에 동의하는 경우 계약이 성립됩니다.<br />
                        2. 프로젝트는 착수금 입금 확인 후 본격적인 기획 및 시안 작업이 개시되며, 최종 검수 및 오픈 완료 시 잔금을 정산합니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 4 조 (지식재산권 및 결과물 귀속)</h4>
                      <p>
                        1. 최종 완성된 웹사이트 결과물의 저작권은 개발 대금이 전액 완납된 시점에 고객에게 귀속됩니다.<br />
                        2. 회사는 제작된 웹사이트의 화면 캡처 및 링크를 스테이무드의 포트폴리오 목적으로 활용할 수 있습니다.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-ink text-[13px] mb-1">제 5 조 (유지보수 및 월 관리비)</h4>
                      <p>
                        코딩 작업 특성상 고객의 직접 수정이 어려운 점을 감안하여, 월 관리비 약정을 통해 호스팅 및 보안 관리, 예약 링크 및 텍스트 상시 수정 케어를 전담 지원합니다.
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
                  확인 및 닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}


