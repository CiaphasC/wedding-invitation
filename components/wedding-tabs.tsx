"use client"

import type React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CalendarDays, Info, ImageIcon, Mail, Sparkles, Heart, Star, GemIcon, FlowerIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useWindowSize } from "@/hooks/use-window-size"



interface WeddingTabsProps {
  defaultValue?: string
  infoContent: React.ReactNode
  timelineContent: React.ReactNode
  galleryContent: React.ReactNode
  rsvpContent: React.ReactNode
  className?: string
}

export function WeddingTabs({
  defaultValue = "info",
  infoContent,
  timelineContent,
  galleryContent,
  rsvpContent,
  className,
}: WeddingTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const [isHovering, setIsHovering] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const tabsListRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isMobile = width ? width < 640 : false
  const isSmallMobile = width ? width < 380 : false

  // Track mouse position for advanced hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tabsListRef.current) return

      const rect = tabsListRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const tabsList = tabsListRef.current
    if (tabsList) {
      tabsList.addEventListener("mousemove", handleMouseMove)
      return () => tabsList.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation variants
  const iconAnimation = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3, type: "spring", stiffness: 300 } },
  }

  const decorAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const sparkleVariants: Variants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0.5, 1, 0],
      scale: [0, 1, 0.8, 1.2, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        times: [0, 0.2, 0.5, 0.8, 1],
      },
    },
  }

  // Generate random positions for decorative elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 3,
    }))
  }

  const sparklePositions = generateRandomPositions(6)
  const flowerPositions = generateRandomPositions(4)

  // Get label based on screen size
  const getTabLabel = (tab: string) => {
    if (isSmallMobile) {
      // For very small screens, use abbreviated labels
      switch (tab) {
        case "info": return "Info";
        case "timeline": return "Agenda";
        case "gallery": return "Fotos";
        case "rsvp": return "RSVP";
        default: return tab;
      }
    }
    
    // For normal screens, use full labels
    switch (tab) {
      case "info": return "Información";
      case "timeline": return "Cronograma";
      case "gallery": return "Galería";
      case "rsvp": return "RSVP";
      default: return tab;
    }
  }

  return (
    <Tabs defaultValue={defaultValue} className={cn("w-full", className)} onValueChange={setActiveTab}>
      <div className={cn("w-full flex flex-col items-center", className)}>
        <div className="flex flex-col items-center justify-center mb-4 glass-effect p-1.5 sm:p-2 rounded-lg w-full max-w-4xl mx-auto">
        {/* Decorative top element */}
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[#edc3bf]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GemIcon className="w-8 h-8 text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        </motion.div>

        {/* Random sparkling elements */}
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-[#d4af37]/60 pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
            }}
            initial="initial"
            animate="animate"
            variants={sparkleVariants}
            transition={{ delay: pos.delay, duration: pos.duration }}
          >
            <Star className="w-full h-full" />
          </motion.div>
        ))}

        {/* Decorative flower elements */}
        {flowerPositions.map((pos, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-[#edc3bf]/40 pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size * 1.5}px`,
              height: `${pos.size * 1.5}px`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: 0.4,
              scale: 1,
              rotate: 360,
              transition: {
                delay: pos.delay,
                duration: pos.duration * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              },
            }}
          >
            <FlowerIcon className="w-full h-full" />
          </motion.div>
        ))}
        </div>
        {/* Main tabs container with glass effect */}
        <div
          ref={tabsListRef}
          className="relative p-1 sm:p-1.5 rounded-full bg-gradient-to-r from-[#edc3bf]/20 via-[#d4af37]/20 to-[#edc3bf]/20 backdrop-blur-md shadow-[0_8px_32px_rgba(212,175,55,0.2)] border border-white/20 overflow-hidden w-full"
        >
          {/* Animated background gradient that follows mouse */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-[#d4af37]/30 to-transparent rounded-full pointer-events-none"
            animate={{
              left: mousePosition.x - 100,
              top: mousePosition.y - 100,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
              mass: 0.5,
            }}
            style={{
              width: 200,
              height: 200,
            }}
          />

          {/* Decorative elements */}
          <motion.div
            className="absolute -left-4 -top-4 text-[#d4b08c]/40"
            initial="initial"
            animate="animate"
            variants={decorAnimation}
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(212,176,140,0.4)]" />
          </motion.div>
          <motion.div
            className="absolute -right-4 -bottom-4 text-[#edc3bf]/40"
            initial="initial"
            animate="animate"
            variants={decorAnimation}
            transition={{ delay: 0.2 }}
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(237,195,191,0.4)]" />
          </motion.div>

          <TabsList className="bg-transparent grid grid-cols-4 w-full relative z-10">
            {/* Info Tab */}
            <TabsTrigger
              value="info"
              onMouseEnter={() => setIsHovering("info")}
              onMouseLeave={() => setIsHovering(null)}
              className={cn(
                "relative overflow-hidden rounded-full transition-all duration-300",
                "px-1 py-2 xs:px-2 sm:px-4 md:px-6 sm:py-3 md:py-3.5",
                "data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4b08c]/90 data-[state=active]:to-[#d4af37]/90",
                "data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(212,176,140,0.5)]",
                "hover:bg-white/30 group",
              )}
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              {/* Icon with animation */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial="initial"
                animate={isHovering === "info" ? "hover" : "initial"}
                variants={iconAnimation}
              >
                <Info
                  className={cn(
                    "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-0.5 xs:mr-1 sm:mr-2 transition-colors duration-300",
                    activeTab === "info"
                      ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                      : "text-[#d4b08c] group-hover:text-[#d4af37]",
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-all duration-300 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap",
                    activeTab === "info" ? "text-white" : "text-[#7d6a5b] group-hover:text-[#d4af37]",
                  )}
                >
                  {getTabLabel("info")}
                </span>
              </motion.div>

              {/* Active indicator */}
              {activeTab === "info" && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 bg-white rounded-full"
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>

            {/* Timeline Tab */}
            <TabsTrigger
              value="timeline"
              onMouseEnter={() => setIsHovering("timeline")}
              onMouseLeave={() => setIsHovering(null)}
              className={cn(
                "relative overflow-hidden rounded-full transition-all duration-300",
                "px-1 py-2 xs:px-2 sm:px-4 md:px-6 sm:py-3 md:py-3.5",
                "data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4b08c]/90 data-[state=active]:to-[#d4af37]/90",
                "data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(212,176,140,0.5)]",
                "hover:bg-white/30 group",
              )}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial="initial"
                animate={isHovering === "timeline" ? "hover" : "initial"}
                variants={iconAnimation}
              >
                <CalendarDays
                  className={cn(
                    "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-0.5 xs:mr-1 sm:mr-2 transition-colors duration-300",
                    activeTab === "timeline"
                      ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                      : "text-[#d4b08c] group-hover:text-[#d4af37]",
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-all duration-300 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap",
                    activeTab === "timeline" ? "text-white" : "text-[#7d6a5b] group-hover:text-[#d4af37]",
                  )}
                >
                  {getTabLabel("timeline")}
                </span>
              </motion.div>

              {activeTab === "timeline" && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 bg-white rounded-full"
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>

            {/* Gallery Tab */}
            <TabsTrigger
              value="gallery"
              onMouseEnter={() => setIsHovering("gallery")}
              onMouseLeave={() => setIsHovering(null)}
              className={cn(
                "relative overflow-hidden rounded-full transition-all duration-300",
                "px-1 py-2 xs:px-2 sm:px-4 md:px-6 sm:py-3 md:py-3.5",
                "data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4b08c]/90 data-[state=active]:to-[#d4af37]/90",
                "data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(212,176,140,0.5)]",
                "hover:bg-white/30 group",
              )}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial="initial"
                animate={isHovering === "gallery" ? "hover" : "initial"}
                variants={iconAnimation}
              >
                <ImageIcon
                  className={cn(
                    "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-0.5 xs:mr-1 sm:mr-2 transition-colors duration-300",
                    activeTab === "gallery"
                      ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                      : "text-[#d4b08c] group-hover:text-[#d4af37]",
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-all duration-300 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap",
                    activeTab === "gallery" ? "text-white" : "text-[#7d6a5b] group-hover:text-[#d4af37]",
                  )}
                >
                  {getTabLabel("gallery")}
                </span>
              </motion.div>

              {activeTab === "gallery" && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 bg-white rounded-full"
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>

            {/* RSVP Tab */}
            <TabsTrigger
              value="rsvp"
              onMouseEnter={() => setIsHovering("rsvp")}
              onMouseLeave={() => setIsHovering(null)}
              className={cn(
                "relative overflow-hidden rounded-full transition-all duration-300",
                "px-1 py-2 xs:px-2 sm:px-4 md:px-6 sm:py-3 md:py-3.5",
                "data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#d4b08c]/90 data-[state=active]:to-[#d4af37]/90",
                "data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(212,176,140,0.5)]",
                "hover:bg-white/30 group",
              )}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial="initial"
                animate={isHovering === "rsvp" ? "hover" : "initial"}
                variants={iconAnimation}
              >
                <Mail
                  className={cn(
                    "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-0.5 xs:mr-1 sm:mr-2 transition-colors duration-300",
                    activeTab === "rsvp"
                      ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
                      : "text-[#d4b08c] group-hover:text-[#d4af37]",
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-all duration-300 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap",
                    activeTab === "rsvp" ? "text-white" : "text-[#7d6a5b] group-hover:text-[#d4af37]",
                  )}
                >
                  {getTabLabel("rsvp")}
                </span>
              </motion.div>

              {activeTab === "rsvp" && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 bg-white rounded-full"
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Decorative bottom element */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10H110" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="60" cy="10" r="3" fill="#edc3bf" />
            <circle cx="10" cy="10" r="2" fill="#d4af37" />
            <circle cx="110" cy="10" r="2" fill="#d4af37" />
          </svg>
        </motion.div>
      </div>
      
      {/* Tab content with enhanced animations */}
      <div className="mt-4 glass-effect rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="relative"
        >
          {/* Decorative corner elements for content */}
          <motion.div
            className="absolute -top-4 -left-4 text-[#d4af37]/30 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 15, 0] }}
            transition={{ delay: 0.6, duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-4 text-[#edc3bf]/30 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, -15, 0] }}
            transition={{ delay: 0.8, duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <TabsContent value="info" className="mt-6 relative">
            <div className="relative">{infoContent}</div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6 relative">
            <div className="relative">{timelineContent}</div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6 relative">
            <div className="relative">{galleryContent}</div>
          </TabsContent>

          <TabsContent value="rsvp" className="mt-6 relative">
            <div className="relative">{rsvpContent}</div>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
      </div>
    </Tabs>
  )
}
