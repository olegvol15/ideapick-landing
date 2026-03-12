import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#023E8A]/15 bg-white/90 px-3 py-2 text-sm text-[#12395f] outline-none transition-colors placeholder:text-[#7a95b4] focus-visible:ring-2 focus-visible:ring-[#90E0EF]/70 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
