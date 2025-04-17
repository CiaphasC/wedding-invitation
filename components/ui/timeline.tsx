"use client"

import { memo, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  time: string
  title: string
  description: string
  icon:
    | "ceremony"
    | "cocktail"
    | "reception"
    | "presentation"
    | "toast"
    | "dinner"
    | "party"
    | "cake"
    | "dance"
    | "photo"
    | "gift"
    | "car"
    | "rings"
    | "flowers"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

// Pre-render SVG icons with enhanced styling and animations
const renderIconMemo = (() => {
  const iconCache: Record<string, JSX.Element> = {}

  return (icon: string): JSX.Element | null => {
    if (iconCache[icon]) return iconCache[icon]

    let result: JSX.Element | null = null

    switch (icon) {
      case "ceremony":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="ceremonyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="ceremonyGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M15 30C15 30 13 25 13 20C13 15 15 10 20 10C25 10 27 15 27 20C27 25 25 30 25 30"
              stroke="url(#ceremonyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#ceremonyGlow)"
              className="animate-draw-path"
            />
            <path
              d="M15 18H25"
              stroke="url(#ceremonyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <circle
              cx="20"
              cy="7"
              r="2"
              stroke="url(#ceremonyGradient)"
              strokeWidth="1.5"
              className="animate-pulse-subtle"
            />
            <path
              d="M18 30L22 30"
              stroke="url(#ceremonyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.6s" }}
            />
            <circle cx="20" cy="7" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "cocktail":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="cocktailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="cocktailGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M13 12H27L20 22V30"
              stroke="url(#cocktailGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cocktailGlow)"
              className="animate-draw-path"
            />
            <path
              d="M16 30H24"
              stroke="url(#cocktailGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M13 16H27"
              stroke="url(#cocktailGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.2s" }}
            />
            <circle
              cx="17"
              cy="14"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle cx="23" cy="14" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "reception":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="receptionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="receptionGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M10 30V17L20 10L30 17V30"
              stroke="url(#receptionGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#receptionGlow)"
              className="animate-draw-path"
            />
            <path
              d="M17 30V23H23V30"
              stroke="url(#receptionGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M17 19H23"
              stroke="url(#receptionGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M20 19V23"
              stroke="url(#receptionGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.7s" }}
            />
            <path d="M20 16C20 16 18 14 20 13C22 14 20 16 20 16Z" fill="#d4af37" className="animate-pulse-subtle" />
            <circle cx="20" cy="10" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "presentation":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="presentationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="presentationGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M15 25C15 25 13 20 15 15C17 10 23 10 25 15C27 20 25 25 25 25"
              stroke="url(#presentationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#presentationGlow)"
              className="animate-draw-path"
            />
            <path
              d="M15 18H25"
              stroke="url(#presentationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M20 25V30"
              stroke="url(#presentationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M17 28L23 32"
              stroke="url(#presentationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M23 28L17 32"
              stroke="url(#presentationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.9s" }}
            />
            <circle
              cx="20"
              cy="15"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
          </svg>
        )
        break
      case "toast":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="toastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="toastGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M13 30C13 30 10 25 10 20C10 15 13 13 15 13C17 13 18 15 20 15C22 15 23 13 25 13C27 13 30 15 30 20C30 25 27 30 27 30"
              stroke="url(#toastGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#toastGlow)"
              className="animate-draw-path"
            />
            <path
              d="M13 20H27"
              stroke="url(#toastGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M15 13V10"
              stroke="url(#toastGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.6s" }}
            />
            <path
              d="M25 13V10"
              stroke="url(#toastGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.8s" }}
            />
            <circle cx="20" cy="17" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
            <circle
              cx="15"
              cy="10"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle cx="25" cy="10" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
          </svg>
        )
        break
      case "dinner":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="dinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="dinnerGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle
              cx="20"
              cy="20"
              r="10"
              stroke="url(#dinnerGradient)"
              strokeWidth="1.5"
              filter="url(#dinnerGlow)"
              className="animate-draw-circle"
            />
            <circle
              cx="20"
              cy="20"
              r="6"
              stroke="url(#dinnerGradient)"
              strokeWidth="1.5"
              strokeDasharray="1 2"
              className="animate-spin-slow"
            />
            <path
              d="M14 15L26 25"
              stroke="url(#dinnerGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M26 15L14 25"
              stroke="url(#dinnerGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.6s" }}
            />
            <path d="M20 20C20 20 18 18 20 17C22 18 20 20 20 20Z" fill="#d4af37" className="animate-pulse-subtle" />
            <circle cx="20" cy="20" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "party":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="partyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="partyGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="partySparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="15" fill="url(#partySparkle)" className="animate-pulse-subtle" />
            <path
              d="M10 30L10 20C10 15 15 10 20 10C25 10 30 15 30 20L30 30"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#partyGlow)"
              className="animate-draw-path"
            />
            <path
              d="M10 25L30 25"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M15 15L17 17"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M25 15L23 17"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M20 13V15"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              d="M13 20H15"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.1s" }}
            />
            <path
              d="M27 20H25"
              stroke="url(#partyGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.3s" }}
            />
            <path d="M20 20C20 20 18 18 20 17C22 18 20 20 20 20Z" fill="#d4af37" className="animate-pulse-subtle" />
            <circle cx="16" cy="16" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
            <circle
              cx="24"
              cy="16"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle cx="20" cy="14" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "cake":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="cakeGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M12 30V20H28V30"
              stroke="url(#cakeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cakeGlow)"
              className="animate-draw-path"
            />
            <path
              d="M10 30H30"
              stroke="url(#cakeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M15 20V15H25V20"
              stroke="url(#cakeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M18 15V12H22V15"
              stroke="url(#cakeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M20 12V10"
              stroke="url(#cakeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              d="M12 25H28"
              stroke="url(#cakeGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="1 2"
              className="animate-draw-path"
              style={{ animationDelay: "1.1s" }}
            />
            <circle
              cx="16"
              cy="22.5"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <circle
              cx="24"
              cy="22.5"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle
              cx="20"
              cy="27.5"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <circle cx="20" cy="10" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
          </svg>
        )
        break
      case "dance":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="danceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="danceGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="danceSparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="15" fill="url(#danceSparkle)" className="animate-pulse-subtle" />
            <circle
              cx="15"
              cy="12"
              r="2"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              filter="url(#danceGlow)"
              className="animate-draw-circle"
            />
            <circle
              cx="25"
              cy="12"
              r="2"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              filter="url(#danceGlow)"
              className="animate-draw-circle"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M15 14L13 22L15 30"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M25 14L27 22L25 30"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.7s" }}
            />
            <path
              d="M13 22H27"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              d="M15 30H25"
              stroke="url(#danceGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.1s" }}
            />
            <circle cx="15" cy="12" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
            <circle
              cx="25"
              cy="12"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle cx="20" cy="22" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "photo":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="photoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="photoGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect
              x="10"
              y="13"
              width="20"
              height="17"
              rx="2"
              stroke="url(#photoGradient)"
              strokeWidth="1.5"
              filter="url(#photoGlow)"
              className="animate-draw-rect"
            />
            <path
              d="M14 13V10H26V13"
              stroke="url(#photoGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.4s" }}
            />
            <circle
              cx="20"
              cy="21"
              r="4"
              stroke="url(#photoGradient)"
              strokeWidth="1.5"
              className="animate-draw-circle"
              style={{ animationDelay: "0.7s" }}
            />
            <circle cx="24" cy="17" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
            <circle cx="20" cy="21" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
          </svg>
        )
        break
      case "gift":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="giftGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="giftSparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="12" fill="url(#giftSparkle)" className="animate-pulse-subtle" />
            <rect
              x="10"
              y="15"
              width="20"
              height="15"
              rx="1"
              stroke="url(#giftGradient)"
              strokeWidth="1.5"
              filter="url(#giftGlow)"
              className="animate-draw-rect"
            />
            <path
              d="M15 15V10H25V15"
              stroke="url(#giftGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.4s" }}
            />
            <path
              d="M20 10V30"
              stroke="url(#giftGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.6s" }}
            />
            <path
              d="M10 20H30"
              stroke="url(#giftGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.8s" }}
            />
            <path d="M20 10C20 10 17 7 20 5C23 7 20 10 20 10Z" fill="#d4af37" className="animate-pulse-subtle" />
            <circle cx="20" cy="5" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
          </svg>
        )
        break
      case "car":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="carGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d="M8 25L10 15C10 15 12 13 20 13C28 13 30 15 30 15L32 25"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#carGlow)"
              className="animate-draw-path"
            />
            <rect
              x="7"
              y="25"
              width="26"
              height="5"
              rx="1"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              className="animate-draw-rect"
              style={{ animationDelay: "0.4s" }}
            />
            <circle
              cx="12"
              cy="30"
              r="2"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              className="animate-draw-circle"
              style={{ animationDelay: "0.7s" }}
            />
            <circle
              cx="28"
              cy="30"
              r="2"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              className="animate-draw-circle"
              style={{ animationDelay: "0.9s" }}
            />
            <path
              d="M15 20H25"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.1s" }}
            />
            <path
              d="M10 20H12"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.3s" }}
            />
            <path
              d="M28 20H30"
              stroke="url(#carGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.5s" }}
            />
            <circle cx="12" cy="30" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
            <circle
              cx="28"
              cy="30"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
          </svg>
        )
        break
      case "rings":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="ringsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="ringsGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="ringsSparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="15" fill="url(#ringsSparkle)" className="animate-pulse-subtle" />
            <circle
              cx="15"
              cy="20"
              r="7"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              filter="url(#ringsGlow)"
              className="animate-draw-circle"
            />
            <circle
              cx="25"
              cy="20"
              r="7"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              filter="url(#ringsGlow)"
              className="animate-draw-circle"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M15 13V15"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1s" }}
            />
            <path
              d="M15 25V27"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.2s" }}
            />
            <path
              d="M25 13V15"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.4s" }}
            />
            <path
              d="M25 25V27"
              stroke="url(#ringsGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "1.6s" }}
            />
            <circle cx="15" cy="20" r="3" fill="url(#ringsGradient)" className="animate-pulse-subtle" />
            <circle cx="25" cy="20" r="3" fill="url(#ringsGradient)" className="animate-pulse-subtle" />
          </svg>
        )
        break
      case "flowers":
        result = (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="flowersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
              <filter id="flowersGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="flowersSparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="15" fill="url(#flowersSparkle)" className="animate-pulse-subtle" />
            <path
              d="M20 30C20 30 18 25 15 23C12 21 10 20 10 15C10 10 15 10 15 10C15 10 15 15 20 15C25 15 25 10 25 10C25 10 30 10 30 15C30 20 28 21 25 23C22 25 20 30 20 30Z"
              stroke="url(#flowersGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#flowersGlow)"
              className="animate-draw-path"
            />
            <path
              d="M20 15V30"
              stroke="url(#flowersGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-draw-path"
              style={{ animationDelay: "0.8s" }}
            />
            <circle cx="15" cy="13" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "2s" }} />
            <circle
              cx="25"
              cy="13"
              r="1"
              fill="#d4af37"
              className="animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
            <circle cx="20" cy="20" r="1" fill="#d4af37" className="animate-ping" style={{ animationDuration: "3s" }} />
            <path d="M15 13C15 13 13 11 15 10C17 11 15 13 15 13Z" fill="#d4af37" className="animate-pulse-subtle" />
            <path
              d="M25 13C25 13 23 11 25 10C27 11 25 13 25 13Z"
              fill="#d4af37"
              className="animate-pulse-subtle"
              style={{ animationDelay: "0.5s" }}
            />
          </svg>
        )
        break
      default:
        return null
    }

    iconCache[icon] = result
    return result
  }
})()

// Ornamental SVG components with enhanced animations
const OrnamentalFlower = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="flowerGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path
      d="M30 10C30 10 35 20 45 20C45 20 35 25 35 35C35 35 25 30 15 35C15 35 20 25 15 15C15 15 25 20 30 10Z"
      stroke="url(#flowerGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#flowerGlow)"
      className="animate-[draw_3s_ease-in-out_forwards]"
      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
    />
    <circle cx="30" cy="25" r="3" fill="#d4af37" fillOpacity="0.6" className="animate-pulse" />
  </svg>
)

const OrnamentalRings = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="ringsOrnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="ringsOrnGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle
      cx="25"
      cy="30"
      r="10"
      stroke="url(#ringsOrnGradient)"
      strokeWidth="1"
      filter="url(#ringsOrnGlow)"
      className="animate-[draw_2s_ease-in-out_forwards]"
      style={{ strokeDasharray: 70, strokeDashoffset: 70 }}
    />
    <circle
      cx="35"
      cy="30"
      r="10"
      stroke="url(#ringsOrnGradient)"
      strokeWidth="1"
      filter="url(#ringsOrnGlow)"
      className="animate-[draw_2s_ease-in-out_0.5s_forwards]"
      style={{ strokeDasharray: 70, strokeDashoffset: 70 }}
    />
    <circle
      cx="25"
      cy="30"
      r="2"
      fill="#d4af37"
      fillOpacity="0.6"
      className="animate-ping"
      style={{ animationDuration: "3s" }}
    />
    <circle
      cx="35"
      cy="30"
      r="2"
      fill="#d4af37"
      fillOpacity="0.6"
      className="animate-ping"
      style={{ animationDuration: "4s" }}
    />
  </svg>
)

const OrnamentalSparkles = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="sparklesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="sparklesGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id="sparkleCenter" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="27" r="10" fill="url(#sparkleCenter)" className="animate-pulse-subtle" />
    <path
      d="M30 15L32 25L42 27L32 29L30 39L28 29L18 27L28 25L30 15Z"
      stroke="url(#sparklesGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#sparklesGlow)"
      className="animate-[draw_2.5s_ease-in-out_forwards]"
      style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
    />
    <circle cx="30" cy="27" r="2" fill="#d4af37" fillOpacity="0.6" className="animate-ping" />
  </svg>
)

const OrnamentalHeart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="heartGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id="heartCenter" cx="50%" cy="60%" r="50%" fx="50%" fy="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="25" r="15" fill="url(#heartCenter)" className="animate-pulse-subtle" />
    <path
      d="M30 40C30 40 15 30 15 20C15 15 20 10 25 10C28 10 30 12 30 15C30 12 32 10 35 10C40 10 45 15 45 20C45 30 30 40 30 40Z"
      stroke="url(#heartGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#heartGlow)"
      className="animate-[draw_3s_ease-in-out_forwards]"
      style={{ strokeDasharray: 150, strokeDashoffset: 150 }}
    />
    <path
      d="M30 40C30 40 15 30 15 20C15 15 20 10 25 10C28 10 30 12 30 15C30 12 32 10 35 10C40 10 45 15 45 20C45 30 30 40 30 40Z"
      fill="url(#heartGradient)"
      fillOpacity="0.2"
      className="animate-pulse-subtle"
    />
  </svg>
)

const OrnamentalDots = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="dotsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="dotsGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle
      cx="20"
      cy="20"
      r="2"
      fill="url(#dotsGradient)"
      filter="url(#dotsGlow)"
      className="animate-ping"
      style={{ animationDelay: "0s" }}
    />
    <circle
      cx="30"
      cy="30"
      r="2"
      fill="url(#dotsGradient)"
      filter="url(#dotsGlow)"
      className="animate-ping"
      style={{ animationDelay: "0.5s" }}
    />
    <circle
      cx="40"
      cy="40"
      r="2"
      fill="url(#dotsGradient)"
      filter="url(#dotsGlow)"
      className="animate-ping"
      style={{ animationDelay: "1s" }}
    />
    <circle
      cx="20"
      cy="40"
      r="2"
      fill="url(#dotsGradient)"
      filter="url(#dotsGlow)"
      className="animate-ping"
      style={{ animationDelay: "1.5s" }}
    />
    <circle
      cx="40"
      cy="20"
      r="2"
      fill="url(#dotsGradient)"
      filter="url(#dotsGlow)"
      className="animate-ping"
      style={{ animationDelay: "2s" }}
    />
    <path
      d="M20 20L30 30L40 40M20 40L40 20"
      stroke="url(#dotsGradient)"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeDasharray="1 3"
      className="animate-[draw_3s_ease-in-out_forwards]"
      style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
    />
  </svg>
)

const OrnamentalLines = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="linesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="linesGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path
      d="M10 30H50"
      stroke="url(#linesGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="1 3"
      filter="url(#linesGlow)"
      className="animate-[draw_2s_ease-in-out_forwards]"
      style={{ strokeDasharray: 40, strokeDashoffset: 40 }}
    />
    <path
      d="M30 10V50"
      stroke="url(#linesGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="1 3"
      filter="url(#linesGlow)"
      className="animate-[draw_2s_ease-in-out_0.5s_forwards]"
      style={{ strokeDasharray: 40, strokeDashoffset: 40 }}
    />
    <circle cx="30" cy="30" r="2" fill="url(#linesGradient)" className="animate-pulse" />
    <circle
      cx="30"
      cy="30"
      r="5"
      stroke="url(#linesGradient)"
      strokeWidth="0.5"
      className="animate-ping"
      style={{ animationDuration: "4s" }}
    />
  </svg>
)

const OrnamentalButterfly = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
    <defs>
      <linearGradient id="butterflyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b76e79" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
      <filter id="butterflyGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id="butterflyWings" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="30" r="15" fill="url(#butterflyWings)" className="animate-pulse-subtle" />
    <path
      d="M30 20C30 20 20 10 15 20C10 30 25 35 30 45C35 35 50 30 45 20C40 10 30 20 30 20Z"
      stroke="url(#butterflyGradient)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#butterflyGlow)"
      className="animate-[draw_3s_ease-in-out_forwards]"
      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
    />
    <path
      d="M30 20V45"
      stroke="url(#butterflyGradient)"
      strokeWidth="0.5"
      strokeLinecap="round"
      className="animate-[draw_1.5s_ease-in-out_1s_forwards]"
      style={{ strokeDasharray: 25, strokeDashoffset: 25 }}
    />
    <path
      d="M30 20C30 20 20 10 15 20C10 30 25 35 30 45C35 35 50 30 45 20C40 10 30 20 30 20Z"
      fill="url(#butterflyGradient)"
      fillOpacity="0.1"
      className="animate-pulse-subtle"
    />
  </svg>
)

// Array of ornamental components for random selection
const ornamentalElements = [
  OrnamentalFlower,
  OrnamentalRings,
  OrnamentalSparkles,
  OrnamentalHeart,
  OrnamentalDots,
  OrnamentalLines,
  OrnamentalButterfly,
]

export const Timeline = memo(function Timeline({ items, className = "" }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(items.length).fill(false))
  const [scrollY, setScrollY] = useState(0)

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Set up intersection observer to detect when timeline items are visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (!isNaN(index)) {
            setIsVisible((prev) => {
              const newState = [...prev]
              newState[index] = entry.isIntersecting
              return newState
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    // Observe all timeline items
    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => observer.observe(item))

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      timelineItems.forEach((item) => observer.unobserve(item))
    }
  }, [items.length])

  // Get a random ornamental element
  const getRandomOrnament = (index: number) => {
    const OrnamentComponent = ornamentalElements[index % ornamentalElements.length]
    return <OrnamentComponent />
  }

  return (
    <div ref={timelineRef} className={cn("relative py-16 md:py-24 overflow-hidden", className)}>
      {/* Background decorative elements with parallax - Hacerlos más grandes en desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={`bg-element-${i}`}
            className="absolute opacity-20"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + (i % 3) * 30}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
              transform: `translate(${mousePosition.x * (i + 1) * 20}px, ${mousePosition.y * (i + 1) * 20}px) rotate(${i * 45}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {getRandomOrnament(i)}
          </div>
        ))}
      </div>

      {/* Main vertical line with animated drawing effect - Hacerla más ancha en desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1">
        <div
          className="h-full bg-gradient-to-b from-transparent via-[#b76e79] to-transparent"
          style={{
            opacity: 0.7,
            transform: `scaleY(${Math.min(1, scrollY / 200)})`,
            transformOrigin: "top",
            transition: "transform 0.5s ease-out",
          }}
        />
      </div>

      {/* Floating ornamental elements - Hacerlos más grandes en desktop */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`float-element-${i}`}
            className="absolute w-16 h-16 md:w-24 md:h-24 opacity-20"
            style={{
              top: `${10 + i * 8}%`,
              left: `${i % 2 === 0 ? 15 : 75}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 15}px, ${mousePosition.y * (i + 1) * 15 + Math.sin(Date.now() / 2000 + i) * 10}px) rotate(${i * 45}deg)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            {getRandomOrnament(i + 2)}
          </div>
        ))}
      </div>

      {/* Glowing particles - Hacerlos más grandes en desktop */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(183,110,121,0) 70%)`,
              boxShadow: "0 0 5px rgba(212,175,55,0.8)",
              opacity: 0.6,
              animation: `float ${3 + Math.random() * 7}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Timeline items - Hacerlos más grandes y con más espacio en desktop */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={cn(
              "timeline-item relative mb-16 md:mb-24 last:mb-0 flex",
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              "flex-col",
            )}
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(null)}
          >
            {/* Connecting line to node - Hacerla más ancha en desktop */}
            <div className="absolute left-1/2 top-0 h-full w-px md:w-1/2 md:h-1">
              <div
                className={cn(
                  "h-full md:h-full w-full bg-gradient-to-r from-[#b76e79] to-[#d4af37]",
                  isVisible[index] ? "animate-draw-line" : "opacity-0",
                )}
                style={{
                  opacity: 0.7,
                  transformOrigin: index % 2 === 0 ? "left" : "right",
                  boxShadow: "0 0 5px rgba(183,110,121,0.5)",
                }}
              />
            </div>

            {/* Heart node on the timeline - Hacerlo más grande en desktop */}
            <div
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 z-10",
                isVisible[index] ? "animate-scale-in" : "opacity-0 scale-0",
              )}
            >
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id={`heartNode${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b76e79" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                  <filter id={`heartGlow${index}`}>
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M20 30C20 30 10 22 10 15C10 12 12 10 15 10C17 10 19 12 20 14C21 12 23 10 25 10C28 10 30 12 30 15C30 22 20 30 20 30Z"
                  fill={isHovering === index ? "url(#heartNode" + index + ")" : "#b76e79"}
                  stroke={isHovering === index ? "#d4af37" : "#b76e79"}
                  strokeWidth="1"
                  filter={isHovering === index ? "url(#heartGlow" + index + ")" : ""}
                  className="transition-all duration-500"
                />
              </svg>
            </div>

            {/* Content - Hacerlo más grande y con más padding en desktop */}
            <div
              className={cn(
                "timeline-content relative mx-auto px-6 md:px-16 w-full md:w-1/2 transition-all duration-300",
                isVisible[index] ? "animate-fade-in" : "opacity-0 translate-y-4",
                isHovering === index ? "-translate-y-2" : "",
              )}
              style={{
                transitionDelay: `${index * 0.1}s`,
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              }}
            >
              {/* Time - Hacerlo más grande en desktop */}
              <div className="mb-2 md:mb-4">
                <span
                  className={cn(
                    "inline-block bg-gradient-to-r from-[#b76e79] to-[#d4af37] text-white px-4 py-1 md:px-6 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300",
                    isHovering === index ? "shadow-lg shadow-[#d4af37]/20" : "",
                  )}
                >
                  {item.time}
                </span>
              </div>

              {/* Icon - Hacerlo más grande en desktop */}
              <div
                className={cn(
                  "absolute top-0 w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-md transition-all duration-300",
                  index % 2 === 0 ? "right-0 md:left-auto" : "left-0 md:right-auto",
                  isHovering === index ? "bg-white shadow-lg shadow-[#d4af37]/20 scale-110" : "",
                  isVisible[index] ? "animate-bounce-in" : "opacity-0 scale-0",
                )}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {renderIconMemo(item.icon)}
              </div>

              {/* Content box - Hacerlo más grande y con más padding en desktop */}
              <div
                className={cn(
                  "bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-md border border-[#b76e79]/30",
                  "transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/95",
                  isHovering === index ? "border-[#d4af37]/50 shadow-lg shadow-[#d4af37]/10" : "",
                  "group",
                )}
              >
                <h4 className="font-['Cormorant_Garamond'] text-xl md:text-2xl bg-gradient-to-r from-[#b76e79] to-[#d4af37] bg-clip-text text-transparent font-semibold mb-1 md:mb-2 group-hover:from-[#d4af37] group-hover:to-[#b76e79] transition-all">
                  {item.title}
                </h4>
                <p className="text-[#5e6e64] text-sm md:text-base">{item.description}</p>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 border-2 border-[#b76e79] rounded-lg animate-border-flow"></div>
                </div>

                {/* Sparkle effect on hover */}
                {isHovering === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#d4af37]"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          boxShadow: "0 0 5px #d4af37",
                          animation: `sparkle ${1 + Math.random() * 2}s infinite ease-in-out ${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative element - Hacerlo más grande en desktop */}
              <div
                className={cn(
                  "absolute w-14 h-14 md:w-20 md:h-20 opacity-60 pointer-events-none transition-all duration-500",
                  index % 2 === 0 ? "left-12 md:right-16 md:left-auto" : "right-12 md:left-16 md:right-auto",
                  "bottom-0",
                  isHovering === index ? "opacity-100 scale-125" : "",
                  isVisible[index] ? "animate-float" : "opacity-0",
                )}
                style={{
                  transform: `translate(${mousePosition.x * (15 + (index % 3) * 5)}px, ${mousePosition.y * (15 + (index % 3) * 5)}px) rotate(${index * 45}deg)`,
                  animationDelay: `${0.5 + index * 0.2}s`,
                }}
              >
                {getRandomOrnament(index)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final decorative element - Hacerlo más grande en desktop */}
      <div
        className={cn(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 md:w-32 md:h-32 opacity-80",
          "animate-float",
        )}
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      >
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="finalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b76e79" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
            <filter id="finalGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="finalCenter" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="20" fill="url(#finalCenter)" className="animate-pulse-subtle" />
          <path
            d="M40 20C40 20 30 30 30 40C30 50 40 60 50 50C60 40 50 30 40 20Z"
            stroke="url(#finalGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#finalGlow)"
            className="animate-[draw_3s_ease-in-out_infinite_alternate]"
            style={{ strokeDasharray: 150, strokeDashoffset: 0 }}
          />
          <path
            d="M40 20C40 20 50 30 50 40C50 50 40 60 30 50C20 40 30 30 40 20Z"
            stroke="url(#finalGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#finalGlow)"
            className="animate-[draw_3s_ease-in-out_infinite_alternate-reverse]"
            style={{ strokeDasharray: 150, strokeDashoffset: 0 }}
          />
          <circle cx="40" cy="40" r="3" fill="url(#finalGradient)" className="animate-pulse" />
        </svg>
      </div>

      {/* Confetti elements that appear on hover */}
      {isHovering !== null && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0 ? "#b76e79" : "#d4af37",
                boxShadow: i % 2 === 0 ? "0 0 3px #b76e79" : "0 0 3px #d4af37",
                animation: `confetti ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes draw-line {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes draw-path {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes draw-circle {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes draw-rect {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes border-flow {
          0% {
            clip-path: inset(0 0 98% 0);
          }
          25% {
            clip-path: inset(0 0 0 98%);
          }
          50% {
            clip-path: inset(98% 0 0 0);
          }
          75% {
            clip-path: inset(0 98% 0 0);
          }
          100% {
            clip-path: inset(0 0 98% 0);
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes confetti {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          35% {
            transform: translateY(-20px) rotate(90deg);
          }
          65% {
            transform: translateY(-40px) rotate(180deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) rotate(360deg);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes scale-in {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @media (max-width: 768px) {
          .animate-draw-line {
            animation: draw-line-vertical 1s ease-out forwards;
          }
          
          @keyframes draw-line-vertical {
            from {
              transform: scaleY(0);
            }
            to {
              transform: scaleY(1);
            }
          }
        }
      `}</style>
    </div>
  )
})
