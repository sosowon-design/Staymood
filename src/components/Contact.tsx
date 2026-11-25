import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Instagram, Send, ShieldCheck, Sparkles, MessageCircle, ArrowRight, Clock, FileText, Check, ExternalLink, X, ChevronDown } from "lucide-react";

const stayBusinessTypes = [
  "독채 펜션",
  "풀빌라",
  "한옥 스테이",
  "글램핑 · 캠핑장",
  "직접 입력"
];

const faqItems: { question: string; answer: React.ReactNode }[] = [
  {
    question: "홈페이지 제작 기간은 보통 얼마나 걸리나요?",
    answer:
      "선택하신 플랜과 페이지 구성에 따라 평균 2주~3주 정도 소요됩니다. 자료 전달 및 피드백 일정에 따라 기간이 일부 조정될 수 있으며, 상담 시 오픈 희망 일정에 맞춰 구체적인 스케줄을 안내해 드립니다."
  },
  {
    question: "템플릿이 아닌 100% 맞춤 코딩으로 제작하면 어떤 점이 좋은가요?",
    answer: (
      <>
        <span>
          기성 템플릿의 획일적인 구조나 디자인 제약 없이, 우리 숙소만의 특별한 분위기와 공간 강점을 온전히 살린 독보적인 웹사이트를 구현할 수 있습니다.{" "}
        </span>
        <span className="block mt-4 sm:mt-0 sm:inline">
          또한 불필요한 코드가 없어 로딩 속도가 빠르고 안정적이며, PC·태블릿·모바일 반응형 최적화와 검색엔진 최적화(SEO)까지 정교하게 설계되어 실제 예약 전환율을 높이는 데 유리합니다.
        </span>
      </>
    )
  },
  {
    question: "네이버 예약, 에어비앤비 등 외부 예약 시스템 연동이 가능한가요?",
    answer:
      "네, 가능합니다. 기존에 운영 중이신 네이버 예약, 에어비앤비 등 외부 예약 페이지로 자연스럽게 연결해 드립니다."
  },
  {
    question: "아직 숙소 사진이나 문구가 모두 준비되지 않았는데 신청해도 될까요?",
    answer:
      "물론입니다. 오픈 준비 중이시거나 사진·텍스트가 아직 완성되지 않았더라도 상담을 통해 촬영 및 자료 준비 가이드를 안내해 드리며, 숙소 분위기에 어울리는 문구 방향도 함께 정리해 드립니다."
  },
  {
    question: "홈페이지 오픈 후 월 관리비(유지보수)에는 어떤 서비스가 포함되나요?",
    answer:
      "스테이무드는 오픈 후에도 숙소 홈페이지가 늘 최상의 상태로 운영될 수 있도록 플랜별 전담 유지보수 서비스를 기본으로 운영하고 있습니다.\n\n• STANDARD (월 50,000원): 서버·보안 관리, 단순 텍스트·이미지 수정 수시 지원\n• DELUXE (월 100,000원): STANDARD 기본 혜택 + 시즌 팝업·공지 배너 제작 (월 1건)\n• PREMIUM (월 150,000원): STANDARD 기본 혜택 + 시즌 팝업·이벤트 섹션 제작 (월 2건)\n\n별도의 관리 인력 없이도 코딩이나 디자인 수정 요청을 바로 처리해 드리므로 대표님께서 숙소 운영에만 집중하실 수 있습니다."
  },
  {
    question: "상담 신청 후 제작 진행 절차와 결제는 어떻게 이루어지나요?",
    answer: (
      <>
        <span className="block">
          • 제작 절차: 무료 진단 및 상담 접수 → 맞춤 견적 안내 → 계약 및 선금 결제 → 디자인 시안 제작 및 피드백 → 최종 검수·잔금 결제 → 도메인 연결·사이트 오픈 순으로 진행됩니다.
        </span>
        <span className="block mt-4 sm:mt-0">
          • 제작 대금: 선금 50%, 잔금 50%로 나누어 납부해 주시면 됩니다.
        </span>
        <span className="block mt-4 sm:mt-0">
          • 결제 수단: 계좌이체 방식이며, 현금영수증(사업자 지출증빙용·개인 소득공제용) 발행이 가능합니다.
        </span>
      </>
    )
  }
];

export default function Contact({ variant, onViewPortfolio }: { variant?: "minimal" | "full"; onViewPortfolio?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // States for briefing form
  const [clientName, setClientName] = useState("");
  const [stayName, setStayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stayStatus, setStayStatus] = useState("현재 운영 중");
  const [roomCount, setRoomCount] = useState("1개");
  const [customRoomCount, setCustomRoomCount] = useState("");
  const [spaceType, setSpaceType] = useState("독채 펜션");
  const [customSpaceType, setCustomSpaceType] = useState("");
  const [budget, setBudget] = useState("STANDARD (최대 3페이지 / 180만~)");
  const [timeline, setTimeline] = useState("2~3주 이내");
  const [customTimeline, setCustomTimeline] = useState("");
  const [referenceInfo, setReferenceInfo] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Field refs for smooth scroll and focus on validation error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const stayNameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const philosophyRef = useRef<HTMLTextAreaElement>(null);
  const privacyCheckboxRef = useRef<HTMLInputElement>(null);

  // Active field alert state
  const [activeAlertField, setActiveAlertField] = useState<"clientName" | "stayName" | "phoneNumber" | "philosophy" | "privacy" | null>(null);
  const [fieldAlertMessage, setFieldAlertMessage] = useState("");

  // Auto-dismiss alert popup after 4 seconds
  useEffect(() => {
    if (activeAlertField) {
      const timer = setTimeout(() => {
        setActiveAlertField(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeAlertField]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("staymood.web@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!clientName.trim()) {
      setActiveAlertField("clientName");
      setFieldAlertMessage("호스트님의 성함을 입력해 주세요.");
      nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current?.focus();
      return;
    }
    if (!phoneNumber.trim()) {
      setActiveAlertField("phoneNumber");
      setFieldAlertMessage("연락처를 입력해 주세요.");
      phoneInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      phoneInputRef.current?.focus();
      return;
    }
    if (!agreedPrivacy) {
      setActiveAlertField("privacy");
      setFieldAlertMessage("개인정보 수집 및 이용 동의에 체크해 주세요.");
      privacyCheckboxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      privacyCheckboxRef.current?.focus();
      return;
    }

    setActiveAlertField(null);
    setFieldAlertMessage("");
    setSubmitError(null);
    setSubmitted(false);

    const finalTimeline = timeline === "직접 입력" ? (customTimeline.trim() || "직접 협의") : timeline;
    const finalRoomCount = roomCount === "직접 입력" ? (customRoomCount.trim() || "직접 입력") : roomCount;
    const finalSpaceType = (spaceType === "직접 입력" || spaceType === "기타 숙소") ? (customSpaceType.trim() || "직접 입력") : spaceType;

    const trimmedName = clientName.trim();
    const trimmedStayName = stayName.trim();
    const trimmedPhone = phoneNumber.trim();
    const trimmedChannel = referenceInfo.trim();
    const trimmedRequest = philosophy.trim();

    const now = new Date();
    const timeParts = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const getTimePart = (type: Intl.DateTimeFormatPartTypes) =>
      timeParts.find((part) => part.type === type)?.value || "";
    const formattedTimestamp = `${getTimePart("year")}-${getTimePart("month")}-${getTimePart("day")} ${getTimePart("hour")}:${getTimePart("minute")}:${getTimePart("second")}`;
    const emailSubject = `[스테이무드 상담 신청] ${trimmedName} (${formattedTimestamp})`;

    // Cleanly organized summary of application
    const formattedSummary = `[스테이무드 프로젝트 제작 신청폼]
• 접수 일시: ${formattedTimestamp}
• 성함: ${trimmedName || "-"}
• 숙소명: ${trimmedStayName || "미입력"}
• 연락처: ${trimmedPhone || "-"}
• 숙소 운영 상태: ${stayStatus}
• 객실 수: ${finalRoomCount}
• 숙소 유형: ${finalSpaceType}
• 희망 플랜: ${budget}
• 희망 오픈 일정: ${finalTimeline}
• 운영 중인 채널: ${trimmedChannel || "미입력"}
• 상세 제작 요청 및 공간 소개:
${trimmedRequest || "미입력"}

--------------------------------
• 개인정보 수집 여부: 동의 완료`;

    const formData = new FormData();
    formData.append("access_key", "fe7b2f8a-d54a-4285-b96e-21f26b224071");
    formData.append("subject", emailSubject);
    formData.append("from_name", trimmedStayName ? `${trimmedName} (${trimmedStayName})` : trimmedName);
    formData.append("submitted_at", formattedTimestamp);
    formData.append("name", trimmedName);
    formData.append("stay_name", trimmedStayName || "미입력");
    formData.append("phone", trimmedPhone);
    formData.append("stay_status", stayStatus);
    formData.append("room_count", finalRoomCount);
    formData.append("stay_type", finalSpaceType);
    formData.append("budget", budget);
    formData.append("timeline", finalTimeline);
    formData.append("channel", trimmedChannel || "미입력");
    formData.append("request_details", trimmedRequest || "미입력");
    formData.append("privacy_agreed", agreedPrivacy ? "동의함" : "미동의");
    formData.append("message", formattedSummary);

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const rawText = await response.text();
      let result: { success?: boolean; message?: string } = {};
      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        result = {};
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || `신청서 전송에 실패했습니다. (${response.status})`);
      }

      // 1. Automatically copy cleanly organized application content to clipboard
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(formattedSummary).catch(() => {});
      }

      // 2. Safely store in localStorage for record keeping
      try {
        const existingInquiries = JSON.parse(localStorage.getItem("staymood_inquiries") || "[]");
        existingInquiries.push({
          id: Date.now(),
          clientName: trimmedName,
          stayName: trimmedStayName,
          phoneNumber: trimmedPhone,
          stayStatus,
          roomCount: finalRoomCount,
          spaceType: finalSpaceType,
          budget,
          timeline: finalTimeline,
          referenceInfo: trimmedChannel,
          philosophy: trimmedRequest,
          createdAt: new Date().toISOString(),
          summary: formattedSummary,
        });
        localStorage.setItem("staymood_inquiries", JSON.stringify(existingInquiries));
      } catch {
        // ignore
      }

      // 3. Reset all form selections and text inputs
      setClientName("");
      setStayName("");
      setPhoneNumber("");
      setStayStatus("현재 운영 중");
      setRoomCount("1개");
      setCustomRoomCount("");
      setSpaceType("독채 펜션");
      setCustomSpaceType("");
      setBudget("STANDARD (최대 3페이지 / 180만~)");
      setTimeline("2~3주 이내");
      setCustomTimeline("");
      setReferenceInfo("");
      setPhilosophy("");
      setAgreedPrivacy(false);

      // 4. Display submission feedback and KakaoTalk chat prompt modal
      setSubmitted(true);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Web3Forms submit error:", error);
      setSubmitError("전송 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도하거나 카카오톡(@스테이무드)으로 문의해 주세요.");
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="scroll-mt-16 sm:scroll-mt-20 pt-24 md:pt-32 pb-0 bg-[#FAF8F5] text-ink border-t border-accent/15 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 flex flex-col gap-16">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase shadow-2xs">
              <Sparkles size={13} className="text-accent" />
              <span>PROJECT INQUIRY</span>
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-sans font-semibold text-[24px] sm:text-[30px] md:max-lg:text-[28px] leading-snug text-ink break-keep"
          >
            <span className="text-[#2C2824]">프로젝트 <span className="hidden sm:inline">문의 및 </span></span>
            <span className="inline text-accent">무료 진단 신청</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[14px] sm:text-[15px] text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed pt-1 break-keep"
          >
            스테이무드는 한 숙소만을 위한 맞춤 코딩과 깊이 있는 브랜드 디렉팅을 위해 월 3팀 한정으로 진행합니다.
          </motion.p>
        </div>

        {/* SECTION BLOCK 1: Streamlined Project Briefing Sheet */}
        <div className="flex flex-col gap-5 text-left">
          
          {/* Header for Briefing Sheet with Enhanced Design */}
          <div className="border-b border-accent/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 shadow-2xs">
                <FileText size={17} />
              </div>
              <h3 className="text-[19px] sm:text-[22px] font-sans font-medium text-[#2C2824] tracking-tight">
                프로젝트 상담 신청폼
              </h3>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-accent/20 text-[12px] text-gray-600 font-sans font-normal shadow-2xs self-start sm:self-auto">
              <Clock size={13} className="text-accent flex-shrink-0" />
              <span>접수 후 24시간 이내 카카오톡(@스테이무드) 개별 안내</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-accent/20 bg-white text-ink text-left font-sans shadow-xs"
          >
            <form noValidate onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
                {/* Step 1: Basic Contact Info */}
                <div className="space-y-3">
                  <span className="text-[13px] font-semibold text-accent uppercase tracking-wider block mb-2">01. 기본 정보</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-2">
                        성함 <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          ref={nameInputRef}
                          type="text" 
                          value={clientName}
                          onChange={(e) => {
                            setClientName(e.target.value);
                            if (activeAlertField === "clientName") setActiveAlertField(null);
                          }}
                          onFocus={() => {
                            if (activeAlertField === "clientName") setActiveAlertField(null);
                          }}
                          placeholder="예: 홍길동" 
                          className="w-full rounded-xl px-4 py-2.5 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
                        />
                        <AnimatePresence>
                          {activeAlertField === "clientName" && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              className="absolute -top-10 left-2 z-30 bg-[#2C2824] text-white text-[12px] font-sans font-medium px-3.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/10"
                            >
                              <Sparkles size={12} className="text-accent stroke-[2.5]" />
                              <span>{fieldAlertMessage}</span>
                              <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#2C2824] rotate-45 border-r border-b border-white/10" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-2">
                        연락처 <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          ref={phoneInputRef}
                          type="tel" 
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (activeAlertField === "phoneNumber") setActiveAlertField(null);
                          }}
                          onFocus={() => {
                            if (activeAlertField === "phoneNumber") setActiveAlertField(null);
                          }}
                          placeholder="예: 010-1234-5678" 
                          className="w-full rounded-xl px-4 py-2.5 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
                        />
                        <AnimatePresence>
                          {activeAlertField === "phoneNumber" && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              className="absolute -top-10 left-2 z-30 bg-[#2C2824] text-white text-[12px] font-sans font-medium px-3.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/10"
                            >
                              <Sparkles size={12} className="text-accent stroke-[2.5]" />
                              <span>{fieldAlertMessage}</span>
                              <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#2C2824] rotate-45 border-r border-b border-white/10" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-2">숙소명 (선택)</label>
                      <div className="relative">
                        <input 
                          ref={stayNameInputRef}
                          type="text" 
                          value={stayName}
                          onChange={(e) => {
                            setStayName(e.target.value);
                            if (activeAlertField === "stayName") setActiveAlertField(null);
                          }}
                          onFocus={() => {
                            if (activeAlertField === "stayName") setActiveAlertField(null);
                          }}
                          placeholder="예: 스테이무드 (미정 시 비워두세요)" 
                          className="w-full rounded-xl px-4 py-2.5 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
                        />
                        <AnimatePresence>
                          {activeAlertField === "stayName" && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              className="absolute -top-10 left-2 z-30 bg-[#2C2824] text-white text-[12px] font-sans font-medium px-3.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/10"
                            >
                              <Sparkles size={12} className="text-accent stroke-[2.5]" />
                              <span>{fieldAlertMessage}</span>
                              <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#2C2824] rotate-45 border-r border-b border-white/10" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* 숙소 운영 상태 */}
                  <div className="pt-2 border-t border-accent/10">
                    <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-2">
                      숙소 운영 상태 <span className="text-accent">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "operating", label: "현재 운영 중" },
                        { id: "preparing", label: "오픈 준비 중" },
                        { id: "planning", label: "기획 단계" },
                      ].map((item) => {
                        const isChecked = stayStatus === item.label;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setStayStatus(item.label)}
                            className={`h-[44px] px-3 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center text-[11px] sm:text-[12.5px] font-medium ${
                              isChecked
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                            }`}
                          >
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 객실 수 (선택) */}
                  <div className="pt-2 border-t border-accent/10">
                    <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-2">객실 수 (선택)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {["1개", "2~3개", "4~5개", "6개 이상", "아직 미정"].map((rc) => {
                        const isChecked = roomCount === rc;
                        return (
                          <button
                            key={rc}
                            type="button"
                            onClick={() => setRoomCount(rc)}
                            className={`h-[44px] px-2 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center text-[12px] sm:text-[12.5px] font-medium ${
                              isChecked
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                            }`}
                          >
                            <span>{rc}</span>
                          </button>
                        );
                      })}
                    </div>
                    {roomCount === "직접 입력" && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          value={customRoomCount}
                          onChange={(e) => setCustomRoomCount(e.target.value)}
                          placeholder="예: 본채 1동, 별채 2개 동 / 총 5개 룸"
                          className="w-full rounded-xl px-4 py-2 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 2: Space Type - Exactly 5 cards, horizontal layout */}
                <div className="pt-3 border-t border-accent/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-semibold text-accent uppercase tracking-wider">
                      02. 숙소 유형 <span className="text-accent">*</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {stayBusinessTypes.map((title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => setSpaceType(title)}
                        className={`h-[44px] px-3 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center ${
                          spaceType === title 
                            ? "bg-accent text-white border-accent shadow-xs"
                            : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                        }`}
                      >
                        <span className="text-[12px] sm:text-[12.5px] font-medium tracking-tight">{title}</span>
                      </button>
                    ))}
                  </div>
                  {(spaceType === "직접 입력" || spaceType === "기타 숙소") && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5"
                    >
                      <input
                        type="text"
                        value={customSpaceType}
                        onChange={(e) => setCustomSpaceType(e.target.value)}
                        placeholder="예: 료칸, 카라반 등"
                        className="w-full rounded-xl px-4 py-2 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Step 3: Budget & Timeline */}
                <div className="pt-3 border-t border-accent/15">
                  <span className="text-[13px] font-semibold text-accent uppercase tracking-wider block mb-2">03. 희망 플랜 및 오픈 일정</span>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-1.5">
                        희망 플랜 <span className="text-accent">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          "STANDARD (최대 3페이지 / 180만~)",
                          "DELUXE (최대 6페이지 / 300만~)",
                          "PREMIUM (최대 10페이지 / 420만~)",
                          "상담 후 맞춤 견적"
                        ].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`min-h-[44px] py-2.5 px-3 flex items-center justify-center rounded-xl text-[12px] sm:text-[12.5px] font-medium text-center border transition-all duration-200 cursor-pointer shadow-2xs ${
                              budget === b 
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-1.5">
                        희망 오픈 일정 <span className="text-accent">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["2~3주 이내", "1개월 이내", "상담 후 결정", "직접 입력"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`h-[44px] px-2 flex items-center justify-center rounded-xl text-[12px] sm:text-[12.5px] font-medium text-center border transition-all duration-200 cursor-pointer shadow-2xs whitespace-nowrap ${
                              timeline === t 
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {timeline === "직접 입력" && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2"
                        >
                          <input
                            type="text"
                            value={customTimeline}
                            onChange={(e) => setCustomTimeline(e.target.value)}
                            placeholder="예: 3월 초 오픈 예정 등"
                            className="w-full rounded-xl px-4 py-2 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 4: Details & Concept */}
                <div className="pt-3 border-t border-accent/15 space-y-3">
                  <span className="text-[13px] font-semibold text-accent uppercase tracking-wider block">04. 세부 요청사항</span>
                  
                  <div>
                    <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-1.5">운영 중인 채널 (선택)</label>
                    <input 
                      type="text" 
                      value={referenceInfo}
                      onChange={(e) => setReferenceInfo(e.target.value)}
                      placeholder="예: 인스타그램 아이디 또는 웹사이트 주소" 
                      className="w-full bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-ink text-[12px] sm:text-[13px] outline-none font-normal shadow-2xs transition-all duration-200" 
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] sm:text-[13px] text-ink font-medium mb-1.5">제작 요청사항 (선택)</label>
                    <div className="relative">
                      <textarea 
                        ref={philosophyRef}
                        rows={3} 
                        value={philosophy}
                        onChange={(e) => {
                          setPhilosophy(e.target.value);
                          if (activeAlertField === "philosophy") setActiveAlertField(null);
                        }}
                        onFocus={() => {
                          if (activeAlertField === "philosophy") setActiveAlertField(null);
                        }}
                        placeholder="추구하시는 숙소 무드, 꼭 넣고 싶은 기능이나 참고하고 싶은 레퍼런스 사이트가 있다면 자유롭게 적어주세요."
                        className="w-full rounded-xl px-4 py-2.5 text-ink text-[12px] sm:text-[13px] outline-none font-normal resize-none shadow-2xs leading-relaxed transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
                      />
                      <AnimatePresence>
                        {activeAlertField === "philosophy" && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            className="absolute -top-10 left-2 z-30 bg-[#2C2824] text-white text-[12px] font-sans font-medium px-3.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/10"
                          >
                            <Sparkles size={12} className="text-accent stroke-[2.5]" />
                            <span>{fieldAlertMessage}</span>
                            <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#2C2824] rotate-45 border-r border-b border-white/10" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Privacy Agreement Checkbox */}
                <div className="pt-2 border-t border-accent/15 relative">
                  <AnimatePresence>
                    {activeAlertField === "privacy" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        className="absolute -top-9 left-0 z-30 bg-[#2C2824] text-white text-[12px] font-sans font-medium px-3.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 border border-white/10"
                      >
                        <Sparkles size={12} className="text-accent stroke-[2.5]" />
                        <span>{fieldAlertMessage}</span>
                        <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#2C2824] rotate-45 border-r border-b border-white/10" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <label className="flex items-start sm:items-center gap-2 sm:gap-2.5 cursor-pointer select-none group text-left">
                    <input
                      ref={privacyCheckboxRef}
                      type="checkbox"
                      checked={agreedPrivacy}
                      onChange={(e) => {
                        setAgreedPrivacy(e.target.checked);
                        if (activeAlertField === "privacy") setActiveAlertField(null);
                      }}
                      className="w-4 h-4 rounded text-accent accent-accent focus:ring-accent cursor-pointer flex-shrink-0 mt-0.5 sm:mt-0"
                    />
                    <div className="flex-1 flex items-center gap-1.5 sm:gap-2">
                      <span className="text-[12px] sm:text-[12.5px] text-accent sm:text-gray-700 font-normal leading-relaxed inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5">
                        <span>
                          <strong className="text-accent font-semibold">[필수]</strong> 개인정보 수집 및 이용에 동의합니다.
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsPrivacyModalOpen(true)}
                          className="text-[11px] sm:text-[11.5px] text-gray-500 underline hover:text-accent flex-shrink-0 whitespace-nowrap cursor-pointer"
                        >
                          상세보기
                        </button>
                      </span>
                    </div>
                  </label>
                </div>

                {/* Submit Button & Reassurance */}
                <div className="pt-2 space-y-3">
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-left text-[12.5px] font-medium flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <span>{submitError}</span>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          className="text-red-500 hover:text-red-700 cursor-pointer flex-shrink-0"
                          aria-label="오류 안내 닫기"
                        >
                          <X size={15} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-accent/30 text-ink text-left space-y-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-accent font-semibold text-[14px]">
                          <Check size={17} className="stroke-[2.5] flex-shrink-0" />
                          <span>신청서가 성공적으로 접수되었습니다!</span>
                        </div>
                        <p className="text-[12.5px] text-gray-700 leading-relaxed">
                          아래 버튼을 눌러 카카오톡 이동 후, 채팅방 하단의{" "}
                          <strong className="font-semibold text-[#2C2824]">[신청서 제출 완료] 버튼</strong>을 눌러주셔야 1:1 대화방이 열려 답변을 드릴 수 있습니다.
                        </p>
                        <div className="pt-0.5">
                          <a
                            href="https://pf.kakao.com/_fhxirX/chat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FEE500] hover:bg-[#F5DC00] text-[#191919] text-[12.5px] font-semibold transition-all shadow-2xs cursor-pointer group"
                          >
                            <MessageCircle size={15} className="flex-shrink-0" />
                            <span>카카오톡 채널 이동하기</span>
                            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button 
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-3.5 rounded-full text-[13px] sm:text-[14px] font-medium transition-all flex items-center justify-center gap-2 font-sans shadow-md group ${
                      isSubmitting
                        ? "bg-accent/80 text-white border border-accent cursor-not-allowed"
                        : "bg-accent text-white border border-accent cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <span>전송 중...</span>
                    ) : (
                      <>
                        <span>무료 진단 및 맞춤 견적서 받기</span>
                        <Send size={14} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
          </motion.div>
        </div>

        {/* SECTION BLOCK 2: 자주 묻는 질문 (FAQ) */}
        <div className="mt-8 md:mt-12 w-screen relative left-1/2 -translate-x-1/2 bg-[#F2ECE4] border-t border-accent/15 py-24 md:py-32 font-sans">
          <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
            {/* Centered Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-[12px] font-sans tracking-wider text-accent font-semibold uppercase shadow-2xs">
                  <MessageCircle size={13} className="text-accent" />
                  <span>FAQ</span>
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-[24px] sm:text-[30px] md:max-lg:text-[28px] font-sans font-semibold text-ink leading-snug text-center"
              >
                <span className="hidden sm:inline text-[#2C2824]">홈페이지 제작 시 </span>
                <span className="inline">
                  <span className="text-[#2C2824] sm:text-accent">자주 묻는 </span>
                  <span className="text-accent">질문</span>
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="text-[14px] sm:text-[15px] text-gray-600 font-sans font-normal leading-relaxed pt-0.5 text-center mx-auto break-keep"
              >
                <span>숙소 대표님들께서 제작부터 오픈 후 운영까지 </span>
                <span className="block sm:inline">가장 많이 궁금해하시는 내용을 모았습니다.</span>
              </motion.p>
            </div>

            {/* Individual Rounded Rectangular FAQ Cards */}
            <div className="flex flex-col gap-3.5 text-left">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={item.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-white border-accent/45 shadow-sm"
                        : "bg-white hover:bg-[#FAF8F5] border-accent/20 hover:border-accent/40 shadow-xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span className="text-[13px] sm:text-[14px] font-semibold text-accent flex-shrink-0 leading-snug">
                          Q{idx + 1}.
                        </span>
                        <span
                          className={`text-[13px] sm:text-[14px] font-medium leading-snug transition-colors break-keep ${
                            isOpen ? "text-[#2C2824]" : "text-ink group-hover:text-[#2C2824]"
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border ${
                          isOpen
                            ? "bg-accent text-white border-accent"
                            : "bg-[#FAF8F5] text-accent-dark border-accent/20 group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                        }`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-5 pt-3.5 border-t border-accent/15 text-[13px] sm:text-[14px] text-gray-600 font-normal leading-relaxed break-keep whitespace-pre-line">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Subtle divider between FAQ cards and 3 contact cards */}
            <div className="mt-10 sm:mt-12 mb-8 sm:mb-10 flex items-center justify-center gap-3">
              <span className="h-px flex-1 bg-accent/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/45 flex-shrink-0" />
              <span className="h-px flex-1 bg-accent/20" />
            </div>

            {/* 3 Small Contact Cards below FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-left md:max-lg:text-center"
            >
              {/* KakaoTalk */}
              <a
                href="https://pf.kakao.com/_fhxirX"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF8F5] hover:bg-white py-4 px-5 sm:p-5 rounded-2xl border border-accent/20 flex items-center justify-between md:max-lg:flex-col md:max-lg:items-center md:max-lg:text-center md:max-lg:justify-between lg:flex-row lg:items-center lg:justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer min-h-[86px] sm:min-h-[110px] md:max-lg:h-full md:max-lg:min-h-[175px]"
              >
                <div className="flex items-center gap-3.5 md:max-lg:flex-col md:max-lg:items-center md:max-lg:gap-2.5 md:max-lg:text-center lg:flex-row lg:items-center lg:gap-3.5 w-full md:max-lg:flex-1 md:max-lg:justify-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <div className="text-left md:max-lg:text-center lg:text-left flex-1 md:max-lg:flex-none min-w-0">
                    <span className="text-xs leading-4 text-accent font-semibold block font-sans">
                      카카오톡 문의
                    </span>
                    <span className="text-sm md:max-lg:text-[13px] lg:text-sm leading-5 min-h-[20px] font-medium text-ink group-hover:text-accent transition-colors flex items-center md:max-lg:justify-center lg:justify-start mt-0.5">
                      @스테이무드
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0 md:max-lg:self-center md:max-lg:mt-auto">
                  <ArrowRight size={14} />
                </div>
              </a>

              {/* Email - Copy on click with a small window/toast popping up nearby */}
              <div className="relative md:max-lg:h-full flex flex-col">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full bg-[#FAF8F5] hover:bg-white py-4 px-5 sm:p-5 rounded-2xl border border-accent/20 flex items-center justify-between md:max-lg:flex-col md:max-lg:items-center md:max-lg:text-center md:max-lg:justify-between lg:flex-row lg:items-center lg:justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer text-left md:max-lg:text-center lg:text-left min-h-[86px] sm:min-h-[110px] md:max-lg:h-full md:max-lg:min-h-[175px]"
                  title="클릭하여 이메일 주소 복사"
                >
                  <div className="flex items-center gap-3.5 md:max-lg:flex-col md:max-lg:items-center md:max-lg:gap-2.5 md:max-lg:text-center lg:flex-row lg:items-center lg:gap-3.5 w-full md:max-lg:flex-1 md:max-lg:justify-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      copiedEmail ? "bg-accent text-white" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                    }`}>
                      {copiedEmail ? <Check size={20} /> : <Mail size={20} />}
                    </div>
                    <div className="text-left md:max-lg:text-center lg:text-left flex-1 md:max-lg:flex-none min-w-0">
                      <span className="text-xs leading-4 text-accent font-semibold block font-sans">
                        이메일 문의
                      </span>
                      <span className="text-[13px] sm:text-sm md:max-lg:text-[12px] lg:text-sm leading-5 min-h-[20px] font-medium text-ink group-hover:text-accent transition-colors flex items-center md:max-lg:justify-center lg:justify-start mt-0.5 whitespace-nowrap">
                        staymood.web@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 md:max-lg:self-center md:max-lg:mt-auto ${
                    copiedEmail
                      ? "bg-accent text-white"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  }`}>
                    {copiedEmail ? <Check size={14} /> : <ArrowRight size={14} />}
                  </div>
                </button>

                {/* Small popup window appearing nearby */}
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      className="absolute -top-11 right-3 md:max-lg:right-1/2 md:max-lg:translate-x-1/2 z-30 bg-[#2C2824] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/10 whitespace-nowrap"
                    >
                      <Check size={13} className="text-accent stroke-[2.5]" />
                      <span>이메일이 복사되었습니다</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Instagram */}
              <a
                href="https://instagram.com/staymood_web"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF8F5] hover:bg-white py-4 px-5 sm:p-5 rounded-2xl border border-accent/20 flex items-center justify-between md:max-lg:flex-col md:max-lg:items-center md:max-lg:text-center md:max-lg:justify-between lg:flex-row lg:items-center lg:justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer min-h-[86px] sm:min-h-[110px] md:max-lg:h-full md:max-lg:min-h-[175px]"
              >
                <div className="flex items-center gap-3.5 md:max-lg:flex-col md:max-lg:items-center md:max-lg:gap-2.5 md:max-lg:text-center lg:flex-row lg:items-center lg:gap-3.5 w-full md:max-lg:flex-1 md:max-lg:justify-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div className="text-left md:max-lg:text-center lg:text-left flex-1 md:max-lg:flex-none min-w-0">
                    <span className="text-xs leading-4 text-accent font-semibold block font-sans">공식 인스타그램</span>
                    <span className="text-sm md:max-lg:text-[13px] lg:text-sm leading-5 min-h-[20px] font-medium text-ink group-hover:text-accent transition-colors flex items-center md:max-lg:justify-center lg:justify-start mt-0.5">
                      @staymood_web
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0 md:max-lg:self-center md:max-lg:mt-auto">
                  <ArrowRight size={14} />
                </div>
              </a>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl text-left font-sans text-ink relative max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-accent/15">
                <h3 className="text-base font-semibold text-ink">개인정보 수집 및 이용 동의</h3>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-[12.5px] font-normal text-gray-600 leading-relaxed overflow-y-auto pr-1">
                <div>
                  <h4 className="font-semibold text-ink mb-1">1. 수집하는 개인정보 항목</h4>
                  <div className="space-y-1">
                    <p>필수 항목: 성함, 연락처, 숙소 운영 상태, 숙소 유형, 희망 플랜, 희망 오픈 일정</p>
                    <p>선택 항목: 숙소명, 객실 수, 운영 중인 채널, 제작 요청사항</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">2. 개인정보 수집 및 이용 목적</h4>
                  <p>스테이무드 1:1 숙소 맞춤 웹사이트 제작 상담, 견적서 및 기획안 발송, 프로젝트 일정 조율 및 커뮤니케이션</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">3. 개인정보 보유 및 이용 기간</h4>
                  <p>상담 접수 및 안내 완료 시까지 보관하며, 이용자의 삭제 요청 시 지체 없이 파기합니다(단, 상담 후 계약이 체결되는 경우 관련 법령 및 계약 이행 기간에 따르며, 미계약 시 최대 1년 보관).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">4. 동의 거부 권리</h4>
                  <p>귀하는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 단, 동의를 거부할 경우 맞춤 제작 상담 접수가 제한됩니다.</p>
                </div>
              </div>

              <div className="pt-3 border-t border-accent/15 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setAgreedPrivacy(true);
                    setIsPrivacyModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-full bg-accent text-white text-[13px] font-medium hover:bg-accent-dark transition-colors cursor-pointer"
                >
                  동의하고 닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Post-Submission KakaoTalk Channel Guidance Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div
            onClick={() => setIsSuccessModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-center font-sans text-ink relative border border-accent/20"
            >
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="창 닫기"
              >
                <X size={16} />
              </button>

              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center mx-auto mb-4">
                <Check size={22} className="stroke-[2.5]" />
              </div>

              <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#2C2824] tracking-tight mb-2">
                신청서가 성공적으로 접수되었습니다!
              </h3>

              <p className="text-[13px] text-gray-600 leading-relaxed mb-6">
                <span className="block">아래 버튼을 눌러 카카오톡 이동 후,</span>
                <span className="block">
                  채팅방 하단의 <strong className="font-semibold text-[#2C2824]">[신청서 제출 완료] 버튼</strong>을 눌러주셔야
                </span>
                <span className="block">1:1 대화방이 열려 답변을 드릴 수 있습니다.</span>
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href="https://pf.kakao.com/_fhxirX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-3.5 px-5 rounded-full bg-[#FEE500] hover:bg-[#F5DC00] text-[#191919] text-[13.5px] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <MessageCircle size={17} className="flex-shrink-0" />
                  <span>카카오톡 채널 이동하기</span>
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="w-full py-2.5 rounded-full text-[12.5px] text-gray-500 hover:text-ink hover:bg-[#FAF8F5] transition-colors cursor-pointer font-medium"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
