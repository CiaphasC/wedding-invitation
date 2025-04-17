"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useState } from "react"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex items-center justify-center gap-2 rounded-2xl p-2",
      "bg-white/10 backdrop-blur-md shadow-lg",
      "border border-white/20",
      "transition-all duration-500 hover:bg-white/15",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center justify-center gap-2 rounded-xl px-3 sm:px-5 py-3 text-sm font-medium transition-all duration-300 w-full",
        "overflow-hidden backdrop-blur-sm",
        "data-[state=inactive]:bg-white/20 data-[state=inactive]:text-foreground/70",
        "data-[state=active]:bg-gradient-to-br data-[state=active]:from-white/90 data-[state=active]:to-white/70",
        "data-[state=active]:text-secondary data-[state=active]:shadow-lg",
        "hover:scale-105 hover:shadow-md",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{props.children}</span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-[#edc3bf]/20 via-[#d4b08c]/20 to-[#edc3bf]/20 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-30 transition-opacity duration-300"></span>
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-[#edc3bf] via-[#d4b08c] to-[#edc3bf] transition-all duration-300 group-data-[state=active]:w-4/5"></span>
      <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:translate-y-0 group-hover:opacity-20 transition-all duration-300"></span>
      {isHovered && <span className="absolute inset-0 bg-white/5 animate-pulse"></span>}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-500 data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-4 data-[state=active]:opacity-100 data-[state=active]:translate-y-0",
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
