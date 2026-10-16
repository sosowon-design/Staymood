import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Instagram, Send, ShieldCheck, Sparkles, MessageCircle, ArrowRight, Clock, FileText, Check, Copy, ExternalLink, X } from "lucide-react";

const stayBusinessTypes = [
  "독채 펜션",
  "풀빌라",
  "한옥 스테이",
  "글램핑 / 캠핑장",
  "직접 입력"
];

export default function Contact({ variant, onViewPortfolio }: { variant?: "minimal" | "full"; onViewPortfolio?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedFormSummary, setCopiedFormSummary] = useState(false);
  const [lastSummary, setLastSummary] = useState("");

  // States for briefing form
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [stayStatus, setStayStatus] = useState("현재 운영 중");
  const [roomCount, setRoomCount] = useState("1개");
  const [customRoomCount, setCustomRoomCount] = useState("");
  const [spaceType, setSpaceType] = useState("독채 펜션");
  const [customSpaceType, setCustomSpaceType] = useState("");
  const [budget, setBudget] = useState("100~250만");
  const [timeline, setTimeline] = useState("1~2주");
  const [customTimeline, setCustomTimeline] = useState("");
  const [referenceInfo, setReferenceInfo] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Field refs for smooth scroll and focus on validation error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const contactInfoRef = useRef<HTMLInputElement>(null);
  const philosophyRef = useRef<HTMLTextAreaElement>(null);
  const privacyCheckboxRef = useRef<HTMLInputElement>(null);

  // Active field alert state
  const [activeAlertField, setActiveAlertField] = useState<"clientName" | "contactInfo" | "philosophy" | "privacy" | null>(null);
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

  const handleCopyAgain = () => {
    if (lastSummary) {
      navigator.clipboard.writeText(lastSummary);
      setCopiedFormSummary(true);
      setTimeout(() => setCopiedFormSummary(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setActiveAlertField("clientName");
      setFieldAlertMessage("호스트님의 성함 또는 숙소명을 입력해 주세요.");
      nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current?.focus();
      return;
    }
    if (!contactInfo.trim()) {
      setActiveAlertField("contactInfo");
      setFieldAlertMessage("상담 안내를 받아보실 연락처 또는 이메일을 남겨주세요.");
      contactInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      contactInfoRef.current?.focus();
      return;
    }
    if (!philosophy.trim()) {
      setActiveAlertField("philosophy");
      setFieldAlertMessage("숙소 소개 또는 원하시는 제작 요청사항을 입력해 주세요.");
      philosophyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      philosophyRef.current?.focus();
      return;
    }
    if (!agreedPrivacy) {
      setActiveAlertField("privacy");
      setFieldAlertMessage("개인정보 수집 및 정보이용 동의에 체크해 주세요.");
      privacyCheckboxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      privacyCheckboxRef.current?.focus();
      return;
    }

    setActiveAlertField(null);
    setFieldAlertMessage("");
    
    const finalTimeline = timeline === "직접 입력" ? (customTimeline.trim() || "직접 협의") : timeline;
    const finalRoomCount = roomCount === "직접 입력" ? (customRoomCount.trim() || "직접 입력") : roomCount;
    const finalSpaceType = (spaceType === "직접 입력" || spaceType === "기타 숙소") ? (customSpaceType.trim() || "직접 입력") : spaceType;

    // Cleanly organized summary of application
    const formattedSummary = `[스테이무드 프로젝트 제작 신청폼]
• 성함 / 숙소명: ${clientName.trim() || "-"}
• 연락처 / 이메일: ${contactInfo.trim() || "-"}
• 숙소 여부: ${stayStatus}
• 객실수: ${finalRoomCount}
• 숙소 비즈니스 유형: ${finalSpaceType}
• 희망 예산 범위: ${budget}
• 희망 오픈 일정: ${finalTimeline}
• SNS 링크: ${referenceInfo.trim() || "미입력"}
• 상세 제작 요청 및 공간 소개:
${philosophy.trim() || "미입력"}

--------------------------------
• 개인정보 수집 여부: 동의 완료`;

    setLastSummary(formattedSummary);

    // 1. Automatically copy cleanly organized application content to clipboard
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(formattedSummary).catch(() => {});
    }

    // 2. Safely store in localStorage for record keeping
    try {
      const existingInquiries = JSON.parse(localStorage.getItem("staymood_inquiries") || "[]");
      existingInquiries.push({
        id: Date.now(),
        clientName: clientName.trim(),
        contactInfo: contactInfo.trim(),
        stayStatus,
        roomCount: finalRoomCount,
        spaceType: finalSpaceType,
        budget,
        timeline: finalTimeline,
        referenceInfo: referenceInfo.trim(),
        philosophy: philosophy.trim(),
        createdAt: new Date().toISOString(),
        summary: formattedSummary,
      });
      localStorage.setItem("staymood_inquiries", JSON.stringify(existingInquiries));
    } catch {
      // ignore
    }

    // 4. Display submission feedback and update submit button
    setSubmitted(true);
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 bg-[#FAF8F5] text-ink border-t border-accent/15 overflow-hidden"
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
              <span>Start a Project & Consulting</span>
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-sans font-semibold text-[30px] leading-snug text-ink"
          >
            하나뿐인 공간의 결을 담아, <span className="text-accent">오래 머물고 싶은 웹사이트</span>를 만듭니다
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[15px] text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed pt-1"
          >
            단순한 안내 페이지가 아닌 게스트의 감성을 움직이는 맞춤 웹사이트로 공간의 고유한 가치와 설렘을 전하세요.
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
                프로젝트 제작 신청폼
              </h3>
            </div>
            
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-accent/20 text-[12px] text-gray-600 font-sans font-normal shadow-2xs self-start sm:self-auto">
              <Clock size={13} className="text-accent flex-shrink-0" />
              <span>접수 확인 후 카카오톡 채널(@스테이무드)로 연락 드리겠습니다</span>
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
                      <label className="block text-[13px] text-ink font-medium mb-2">성함 / 숙소명</label>
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
                          placeholder="예: 홍길동 / 스테이무드" 
                          className="w-full rounded-xl px-4 py-2.5 text-ink text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
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
                      <label className="block text-[13px] text-ink font-medium mb-2">연락처 / 이메일</label>
                      <div className="relative">
                        <input 
                          ref={contactInfoRef}
                          type="text" 
                          value={contactInfo}
                          onChange={(e) => {
                            setContactInfo(e.target.value);
                            if (activeAlertField === "contactInfo") setActiveAlertField(null);
                          }}
                          onFocus={() => {
                            if (activeAlertField === "contactInfo") setActiveAlertField(null);
                          }}
                          placeholder="예: 010-1234-5678 / staymood.web@gmail.com" 
                          className="w-full rounded-xl px-4 py-2.5 text-ink text-[13px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
                        />
                        <AnimatePresence>
                          {activeAlertField === "contactInfo" && (
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

                  {/* 숙소 여부 */}
                  <div className="pt-2 border-t border-accent/10">
                    <label className="block text-[13px] text-ink font-medium mb-2">숙소 여부</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "operating", label: "현재 운영 중" },
                        { id: "preparing", label: "오픈 준비 중" },
                        { id: "planning", label: "기획 / 예정 단계" },
                      ].map((item) => {
                        const isChecked = stayStatus === item.label;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setStayStatus(item.label)}
                            className={`py-2.5 px-3 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center text-[12.5px] font-medium ${
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

                  {/* 객실수 (선택) */}
                  <div className="pt-2 border-t border-accent/10">
                    <label className="block text-[13px] text-ink font-medium mb-2">객실수 (선택)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {["1개", "2~3개", "4~5개", "6개 이상", "직접 입력"].map((rc) => {
                        const isChecked = roomCount === rc;
                        return (
                          <button
                            key={rc}
                            type="button"
                            onClick={() => setRoomCount(rc)}
                            className={`py-2.5 px-2 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center text-[12px] font-medium ${
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
                          className="w-full rounded-xl px-4 py-2 text-ink text-[12.5px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 2: Space Type - Exactly 5 cards, horizontal layout */}
                <div className="pt-3 border-t border-accent/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-semibold text-accent uppercase tracking-wider">02. 숙소 비즈니스 유형</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {stayBusinessTypes.map((title) => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => setSpaceType(title)}
                        className={`py-3.5 px-3 rounded-xl text-center border transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center min-h-[52px] ${
                          spaceType === title 
                            ? "bg-accent text-white border-accent shadow-xs"
                            : "bg-[#FAF8F5] border-accent/20 text-gray-700 hover:border-accent hover:bg-[#F0E9DF] hover:text-[#2C2824]"
                        }`}
                      >
                        <span className="text-[13px] font-semibold tracking-tight">{title}</span>
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
                        placeholder="숙소 유형을 직접 입력해 주세요 (예: 료칸, 카라반 등)"
                        className="w-full rounded-xl px-4 py-2 text-ink text-[12.5px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Step 3: Budget & Timeline */}
                <div className="pt-3 border-t border-accent/15">
                  <span className="text-[13px] font-semibold text-accent uppercase tracking-wider block mb-2">03. 예산 및 희망 오픈 일정</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12.5px] text-ink font-medium mb-1.5">희망 예산 범위</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["100~250만", "250~400만", "400만 이상"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`py-2 rounded-xl text-[12px] font-medium text-center border transition-all duration-200 cursor-pointer shadow-2xs ${
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
                      <label className="block text-[12.5px] text-ink font-medium mb-1.5">희망 오픈 일정</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["1~2주", "2~3주", "직접 입력"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`py-2 rounded-xl text-[12px] font-medium text-center border transition-all duration-200 cursor-pointer shadow-2xs ${
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
                            placeholder="예: 11월 초 오픈 예정, 협의 후 결정 등"
                            className="w-full rounded-xl px-4 py-2 text-ink text-[12.5px] outline-none font-normal shadow-2xs transition-all duration-200 bg-[#FAF8F5] border border-accent/20 focus:bg-white focus:ring-1 focus:ring-accent"
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
                    <label className="block text-[12.5px] text-ink font-medium mb-1.5">SNS 링크 (선택)</label>
                    <input 
                      type="text" 
                      value={referenceInfo}
                      onChange={(e) => setReferenceInfo(e.target.value)}
                      placeholder="예: 웹사이트 주소 또는 인스타그램 @계정아이디" 
                      className="w-full bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent rounded-xl px-4 py-2.5 text-ink text-[13px] outline-none font-normal shadow-2xs transition-all duration-200" 
                    />
                  </div>

                  <div>
                    <label className="block text-[12.5px] text-ink font-medium mb-1.5">제작 요청사항</label>
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
                        placeholder="숙소의 주요 공간이나 전하고 싶은 분위기, 제작 시 특별히 희망하시는 내용이 있다면 편하게 적어주세요." 
                        className="w-full rounded-xl px-4 py-2.5 text-ink text-[13px] outline-none font-normal resize-none shadow-2xs leading-relaxed transition-all duration-200 bg-[#FAF8F5] border border-accent/20 hover:border-accent hover:bg-[#F3EFE9] focus:bg-white focus:ring-1 focus:ring-accent" 
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

                  <label className="flex items-center gap-2.5 cursor-pointer select-none group text-left">
                    <input
                      ref={privacyCheckboxRef}
                      type="checkbox"
                      checked={agreedPrivacy}
                      onChange={(e) => {
                        setAgreedPrivacy(e.target.checked);
                        if (activeAlertField === "privacy") setActiveAlertField(null);
                      }}
                      className="w-4 h-4 rounded text-accent accent-accent focus:ring-accent cursor-pointer flex-shrink-0"
                    />
                    <span className="text-[12.5px] text-gray-700 font-normal">
                      <strong className="text-accent font-semibold">[필수]</strong> 개인정보 수집 및 정보이용에 동의합니다.
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPrivacyModalOpen(true)}
                      className="text-[11.5px] text-gray-500 underline hover:text-accent ml-auto cursor-pointer"
                    >
                      상세보기
                    </button>
                  </label>
                </div>

                {/* Submit Button & Reassurance */}
                <div className="pt-2 space-y-3">
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-accent/30 text-ink text-left space-y-2.5 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-accent font-semibold text-[14px]">
                          <Check size={17} className="stroke-[2.5]" />
                          <span>신청서가 성공적으로 전송되었습니다!</span>
                        </div>
                        <p className="text-[12.5px] text-gray-700 leading-relaxed">
                          보내주신 내용 확인 후 카카오톡 채널(@스테이무드) 또는 남겨주신 이메일로 빠르게 회신드리겠습니다.
                        </p>
                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={handleCopyAgain}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-accent/25 text-gray-700 hover:text-accent text-[12px] font-medium transition-colors shadow-2xs cursor-pointer"
                          >
                            {copiedFormSummary ? <Check size={13} className="text-accent stroke-[2.5]" /> : <Copy size={13} />}
                            <span>{copiedFormSummary ? "복사 완료!" : "신청서 내용 복사"}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button 
                    whileHover={{ scale: submitted ? 1 : 1.01 }}
                    whileTap={{ scale: submitted ? 1 : 0.99 }}
                    type="submit"
                    className={`w-full py-3.5 rounded-full text-[14px] font-medium transition-all flex items-center justify-center gap-2 font-sans shadow-md cursor-pointer ${
                      submitted
                        ? "bg-accent text-white border border-accent"
                        : "bg-accent text-white border border-accent hover:bg-accent-dark"
                    }`}
                  >
                    {submitted ? (
                      <>
                        <Check size={16} className="stroke-[2.5]" />
                        <span>전송 완료!</span>
                      </>
                    ) : (
                      <>
                        <span>신청서 보내기</span>
                        <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
          </motion.div>
        </div>

        {/* SECTION BLOCK 2: 스테이무드 상담 및 문의 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F2ECE4] p-6 md:p-8 rounded-2xl border border-accent/25 shadow-xs text-left"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-accent/20 pb-4 mb-5 gap-2">
            <div>
              <h3 className="text-base font-sans font-medium text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                스테이무드 빠른 상담
              </h3>
            </div>
            <span className="text-[12px] text-accent font-sans font-semibold bg-white/90 px-3 py-1 rounded-full border border-accent/20 shadow-2xs">
              평일 9:00 ~ 18:00
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-left">
            {/* KakaoTalk */}
            <a 
              href="https://pf.kakao.com/_fhxirX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FAF8F5] hover:bg-white p-5 rounded-xl border border-accent/20 flex items-center justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                  <MessageCircle size={19} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-500 font-normal block">1:1 카톡 상담</span>
                  <span className="text-[14px] font-medium text-ink group-hover:text-accent transition-colors truncate block">@스테이무드 (staymood_web)</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0 ml-2">
                <ArrowRight size={13} />
              </div>
            </a>

            {/* Email - Copy on click with a small window/toast popping up nearby */}
            <div className="relative">
              <button 
                type="button"
                onClick={handleCopyEmail}
                className="w-full bg-[#FAF8F5] hover:bg-white p-5 rounded-xl border border-accent/20 flex items-center justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer text-left"
                title="클릭하여 이메일 주소 복사"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    copiedEmail ? "bg-accent text-white" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  }`}>
                    {copiedEmail ? <Check size={19} /> : <Mail size={19} />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-gray-500 font-normal block">이메일 상담</span>
                    <span className="text-[14px] font-medium text-ink group-hover:text-accent transition-colors truncate block">staymood.web@gmail.com</span>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ml-2 ${
                  copiedEmail 
                    ? "bg-accent text-white border-accent" 
                    : "bg-white border-accent/15 text-accent group-hover:bg-accent group-hover:text-white"
                }`}>
                  {copiedEmail ? <Check size={13} /> : <ArrowRight size={13} />}
                </div>
              </button>

              {/* Small popup window appearing nearby */}
              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute -top-11 right-3 z-30 bg-[#2C2824] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/10"
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
              className="bg-[#FAF8F5] hover:bg-white p-5 rounded-xl border border-accent/20 flex items-center justify-between shadow-2xs hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Instagram size={19} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-500 font-normal block">인스타그램</span>
                  <span className="text-[14px] font-medium text-ink group-hover:text-accent transition-colors truncate block">@staymood_web</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white border border-accent/15 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0 ml-2">
                <ArrowRight size={13} />
              </div>
            </a>
          </div>
        </motion.div>

        {/* SECTION BLOCK 3: CONSULTING BANNER (차별화된 아늑한 톤의 컨테이너 배경) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-7 sm:p-9 rounded-2xl bg-white/95 backdrop-blur-sm border border-accent/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[11.5px] font-semibold text-accent font-sans shadow-2xs mb-2.5">
              <Sparkles size={12} className="text-accent" />
              <span>1:1 맞춤 제작 솔루션</span>
            </div>
            
            <h4 className="text-[17px] sm:text-[19px] font-sans font-semibold leading-snug tracking-tight">
              <span className="text-[#2C2824]">우리 숙소에 딱 맞는 웹사이트, </span>
              <span className="text-accent">스테이무드와 편하게 상담하세요</span>
            </h4>
            
            <p className="text-[13.5px] text-gray-700 font-sans font-normal leading-relaxed">
              <span>어떤 분위기로 만들고 싶은지, 필요한 기능은 무엇인지 작은 궁금증이라도 편하게 말씀해 주세요.</span>
            </p>
          </div>

          {/* CTA Button preserving '카카오톡 상담하기' with arrow hover motion */}
          <motion.a
            href="https://pf.kakao.com/_fhxirX"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 px-7 py-3.5 rounded-full bg-accent text-white border border-accent text-[13.5px] font-semibold shadow-md hover:bg-accent-dark transition-all cursor-pointer font-sans flex items-center gap-2 group"
          >
            <MessageCircle size={16} />
            <span>카카오톡 상담하기</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

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

              <div className="py-4 space-y-3.5 text-[12.5px] text-gray-600 leading-relaxed overflow-y-auto pr-1">
                <div>
                  <h4 className="font-semibold text-ink mb-1">1. 수집하는 개인정보 항목</h4>
                  <p>브랜드명(또는 성함), 연락처(휴대전화번호), 이메일 주소, 숙소 위치 및 참고 링크, 상세 제작 요청사항</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">2. 개인정보 수집 및 이용 목적</h4>
                  <p>스테이무드 1:1 숙소 맞춤 웹사이트 제작 상담, 견적서 및 기획안 발송, 프로젝트 일정 및 커뮤니케이션</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">3. 개인정보 보유 및 이용 기간</h4>
                  <p>상담 접수 및 제작 상담 완료 시까지 보관하며, 이용자의 삭제 요청 시 지체 없이 파기합니다 (최대 1년 보관).</p>
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
    </section>
  );
}
