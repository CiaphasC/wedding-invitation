"use client"

import { useEffect, useRef, useState } from "react"
import Envelope from "@/components/envelope"
import Content from "@/components/content"
import DecorativeElements from "@/components/decorative-elements"
import MusicPlayer from "@/components/music-player"
import ParallaxContainer from "@/components/parallax-container"
import ElegantDecorations from "@/components/ui/elegant-decorations"
import FloatingPetals from "@/components/ui/floating-petals"
import HeroSlider from "@/components/hero-slider"
import { useWindowSize } from "@/hooks/use-window-size"
import EnvelopeDecorations from "@/components/envelope-decorations"
import ContentBackgroundDecorations from "@/components/content-background-decorations"
// Importar el nuevo componente de decoraciones laterales para móvil
import MobileSideDecorations from "@/components/mobile-side-decorations"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showHeroSlider, setShowHeroSlider] = useState(false)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  // Handle scroll events to show/hide hero slider
  useEffect(() => {
    if (!showContent) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Show hero slider only when at the top of the page (with a small threshold)
      if (scrollPosition < 50) {
        setShowHeroSlider(true)
      } else {
        setShowHeroSlider(false)
      }

      // Track if user has scrolled down
      if (scrollPosition > 100) {
        setHasScrolledDown(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showContent])

  const toggleEnvelope = () => {
    setIsOpen(!isOpen)

    // Show content after a delay when opening
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(true)
        setShowHeroSlider(true)
        setHasScrolledDown(false)
      }, 1500) // Longer delay to match the enhanced envelope opening animation
    } else {
      setShowContent(false)
      setShowHeroSlider(false)
      setHasScrolledDown(false)

      // Scroll back to top when closing
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const handleScrollDown = () => {
    if (contentRef.current) {
      // Hide hero slider first
      setShowHeroSlider(false)

      // Then scroll to content with a smooth transition
      setTimeout(() => {
        window.scrollTo({
          top: contentRef.current?.offsetTop ? contentRef.current.offsetTop - 80 : 0,
          behavior: "smooth",
        })
        setHasScrolledDown(true)
      }, 300)
    }
  }

  // Adjust petal count based on screen size
  const getPetalCount = () => {
    return width < 640 ? 8 : width < 768 ? 12 : 15
  }

  return (
    <main
      ref={mainRef}
      className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Hero Slider - conditionally rendered */}
      {showContent && <HeroSlider isVisible={showHeroSlider} onScrollDown={handleScrollDown} />}

      {/* Add the envelope decorations component */}
      <EnvelopeDecorations isOpen={isOpen} showContent={showContent} />

      {/* Add the content background decorations component - only show when content is visible */}
      {showContent && <ContentBackgroundDecorations />}

      {/* Añadir el nuevo componente de decoraciones laterales para móvil */}
      <MobileSideDecorations />

      <ParallaxContainer>
        <DecorativeElements isOpen={isOpen} />

        {/* Add the decorative components */}
        <ElegantDecorations />
        <FloatingPetals count={getPetalCount()} />

        <div className="container mx-auto px-4 sm:px-6 z-10 relative flex items-center justify-center min-h-screen">
          <Envelope isOpen={isOpen} toggleEnvelope={toggleEnvelope} />
        </div>

        {showContent && (
          <div ref={contentRef} className="w-full">
            <Content />
          </div>
        )}

        <div className={`fixed ${width < 640 ? "bottom-4 right-4" : "bottom-8 right-8"} z-20`}>
          <MusicPlayer />
        </div>
      </ParallaxContainer>
    </main>
  )
}
