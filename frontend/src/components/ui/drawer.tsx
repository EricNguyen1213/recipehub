import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot"


const DrawerContext = React.createContext<{
  open: boolean
  setOpen: (o: boolean) => void
  direction: "left" | "right" | "top" | "bottom"
}>({ open: false, setOpen: () => {}, direction: "left" })

function Drawer({ 
  open: controlledOpen, 
  onOpenChange, 
  direction = "left", 
  children,
  ...props 
}: React.ComponentProps<"div"> & { 
  open?: boolean; 
  onOpenChange?: (o: boolean) => void;
  direction?: "left" | "right" | "top" | "bottom" 
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  return (
    <DrawerContext.Provider value={{ open, setOpen, direction }}>
      <div data-slot="drawer" {...props}>{children}</div>
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ onClick, ...props }: React.ComponentProps<"button">) {
  const { setOpen } = React.useContext(DrawerContext)
  return (
    <button
      data-slot="drawer-trigger"
      onClick={(e) => {
        setOpen(true)
        onClick?.(e)
      }}
      {...props}
    />
  )
}



function DrawerClose({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpen } = React.useContext(DrawerContext)
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="drawer-close"
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false)
        props.onClick?.(e)
      }}
    />
  )
}

function DrawerPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted ? createPortal(children, document.body) : null
}


// ... existing code

function DrawerContent({ 
  modal,
  className, 
  children, 
  ...props 
}: {modal: boolean} & HTMLMotionProps<"div">) {
  const { open, setOpen, direction } = React.useContext(DrawerContext)

  return (
    <DrawerPortal>
      <AnimatePresence>
        {open && (
          <>
            {modal && <motion.div
              key="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />}

            <motion.div
              key="drawer-content"
              data-slot="drawer-content"
              data-vaul-drawer-direction={direction}
              
              // 1. Drag Logic
              drag={direction === "left" ? "x" : false} // Only drag on X axis if from left
              dragConstraints={{ right: 0, left: -500 }} // Limit drag distance
              dragSnapToOrigin={true}
              dragElastic={0.1} // Resistance when dragging past constraints
              onDragEnd={(_, info) => {
                // 2. Threshold: If dragged left more than 100px or fast enough
                if (info.offset.x < -150 || info.velocity.x < -500) {
                  setOpen(false)
                }
              }}

              // 3. Slide Animation
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "tween",        // "tween" removes the spring/bounce physics
                ease: "easeInOut",    // Smooth start and smooth end
                duration: 0.2         // Controls the speed (in seconds)
              }}              
              className={cn(
                "group/drawer-content fixed inset-y-0 left-0 z-49 flex w-3/4 flex-col bg-transparent text-sm touch-none", // touch-none prevents scrolling while dragging
                "before:absolute before:inset-0 before:-z-10 before:border-r before:border-border before:bg-popover before:shadow-xl",
                className
              )}
              {...props}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DrawerPortal>
  )
}



// Simple wrappers for text components to match original exports
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
}

function DrawerTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="drawer-title" className={cn("text-base font-medium text-foreground", className)} {...props} />
}

function DrawerDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="drawer-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export {
  Drawer,
  DrawerPortal,
  
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

