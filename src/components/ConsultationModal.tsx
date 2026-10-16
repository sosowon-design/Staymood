import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, Mail, Clock, ArrowRight, Check } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  onNavigateToContact,
}: ConsultationModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of the popover
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // If click was inside popover, ignore
      if (popoverRef.current && popoverRef.current.contains(event.target as Node)) {
        return;
      }
      // If click was on the floating consultation button, ignore (toggle is handled by button)
      const target = event.target as HTMLElement;
      if (target.closest("[data-floating-consult-btn]")) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("staymood.web@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-[120px] right-4 sm:right-6 z-50 w-[300px] sm:w-[320px] bg-white/95 backdrop-blur-md rounded-2xl border border-accent/25 shadow-2xl p-4 font-sans text-ink"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-accent/15">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[13px] font-semibold text-[#2C2824]">스테이무드 빠른 상담</span>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X size={15} />
            </button>
          </div>

          {/* Simple Body */}
          <div className="py-3 space-y-2.5 text-[12.5px]">
            {/* Kakao Inquiry Row - Direct click to open KakaoTalk with hover arrow button */}
            <a
              href="https://pf.kakao.com/_fhxirX"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-accent/15 hover:border-accent/40 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              title="카카오톡 채널로 이동"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <MessageCircle size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-ink block truncate group-hover:text-accent transition-colors">
                    카카오톡: @스테이무드
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all duration-200 flex-shrink-0">
                <ArrowRight size={12} />
              </div>
            </a>

            {/* Email Inquiry Row - Click copies email address with hover arrow/check button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full group p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-accent/15 hover:border-accent/40 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer transform hover:-translate-y-0.5 text-left"
              title="클릭하여 이메일 주소 복사"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  copiedEmail 
                    ? "bg-accent text-white" 
                    : "bg-accent/10 group-hover:bg-accent text-accent group-hover:text-white"
                }`}>
                  <Mail size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-ink block truncate text-[12px] group-hover:text-accent transition-colors">
                    이메일: staymood.web@gmail.com
                  </span>
                  {copiedEmail && (
                    <span className="text-[10.5px] text-accent font-medium flex items-center gap-1">
                      <Check size={11} className="stroke-[2.5]" />
                      <span>복사되었습니다</span>
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                copiedEmail 
                  ? "bg-accent text-white" 
                  : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
              }`}>
                {copiedEmail ? <Check size={12} /> : <ArrowRight size={12} />}
              </div>
            </button>

            {/* Operating Hours */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent/5 text-[11.5px] text-gray-600">
              <Clock size={13} className="text-accent flex-shrink-0" />
              <span>상담 시간: 평일 9:00 ~ 18:00</span>
            </div>
          </div>

          {/* Direct Briefing Form CTA Button */}
          <button
            onClick={() => {
              onClose();
              onNavigateToContact();
            }}
            className="w-full mt-1 py-2.5 px-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-medium text-[12.5px] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer group transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>신청폼 작성하기</span>
            <ArrowRight size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
