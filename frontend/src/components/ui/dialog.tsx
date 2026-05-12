import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { FaRegClock } from "react-icons/fa6"
import { HiMiniBookmark, HiOutlineBookmark } from "react-icons/hi2"
import { FiShoppingCart } from "react-icons/fi"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./carousel"
import AutoHeight from "embla-carousel-auto-height"


function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 grid overflow-y-auto isolate z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        "overscroll-none place-items-start py-10",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay> {/* The overlay now wraps the content */}
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "mx-auto my-auto relative z-50 w-full rounded-4xl bg-popover text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close data-slot="dialog-close" asChild>
              <Button
                variant="ghost"
                className="absolute top-4 right-4 bg-secondary"
                size="icon-sm"
              >
                <XIcon
                />
                <span className="sr-only">Close</span>
              </Button>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  )
}


function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}


interface IngredientOption {
  quantity: string;
  metric: string;
  item: string;
}

type IngredientGroup = IngredientOption[];

interface Recipe {
  link: string;
  name: string;
  recipeId: number;
  userId: number;
  cookTime: string;
  datePublished: string;
  title: string;
  description: string;
  image: string;
  ingredients: IngredientGroup[];
  directions: string[];
  aggregateRating: number;
}

interface RecipeDialogProps {
  overMdSize: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  recipe: Recipe;
}


const RECIPE_DIALOG_ALL_MODES = ['ABOUT', 'INGREDIENTS', 'STEPS', 'REVIEWS'];
const RECIPE_DIALOG_PART_MODES = ['ABOUT', 'STEPS', 'REVIEWS'];
type RecipeDialogMode = (typeof RECIPE_DIALOG_ALL_MODES)[number]; 

export function RecipeDialog({ overMdSize, isOpen, setIsOpen, recipe } : RecipeDialogProps) {

  const formatDuration = (iso : string) => {
    const matches = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) return "0 min";
    const [, h, m] = matches;
    return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ");
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(recipe.datePublished));

  const [mode, setMode] = React.useState<RecipeDialogMode>('ABOUT');
  const [api, setApi] = React.useState<CarouselApi>()

  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const bookmarkAction = () => {
    setIsBookmarked(isBookmarked => !isBookmarked);
  };
  
  React.useEffect(() => {
    if (!api) return
    let index;
    if (overMdSize && mode === RECIPE_DIALOG_ALL_MODES[1]) {
      index = 0;
    } else {
      index = overMdSize ? RECIPE_DIALOG_PART_MODES.indexOf(mode) : RECIPE_DIALOG_ALL_MODES.indexOf(mode)
    }
    api.scrollTo(index)
  }, [overMdSize, mode, api])

  React.useEffect(() => {
    if (!api) return
    api.on("select", () => {
      const index = api.selectedScrollSnap()
      setMode(overMdSize ? RECIPE_DIALOG_PART_MODES[index] : RECIPE_DIALOG_ALL_MODES[index])
    })
  }, [overMdSize, api])

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(nextState: boolean) => {
        setIsOpen(nextState);
        setMode('ABOUT');
      }}>
      <DialogContent 
        showCloseButton={false} 
        autoFocus={true} 
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="overflow-clip w-9/10 gap-0 text-mydarkgreen grid md:grid-cols-5 max-w-275"
      >
        <div className="md:col-span-3">
          <img
            src={recipe.image}
            alt="Event cover"
            className="aspect-video w-full object-cover max-h-80 md:max-h-none"
          />
          <div className="">
            <DialogHeader className="mx-auto py-3 gap-2 h-auto w-8/9">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1.5 w-full">
                  <DialogDescription className="font-robo text-sm">{formattedDate}</DialogDescription>
                  <DialogTitle className="text-wrap wrap-break-word font-robo text-mydarkgreen text-xl leading-snug ">{recipe.title}</DialogTitle>
                </div>
                <div className="flex gap-2 items-center">
                  <Button 
                    className="" 
                    variant="ghostIcon" 
                    size="icon-lg"
                    onClick={bookmarkAction}
                  > 
                    {isBookmarked ? <HiMiniBookmark className="text-mydarkgreen size-[2em]" /> : <HiOutlineBookmark className="text-mydarkgreen size-[2em]" />}
                  </Button>
                  <Button 
                    className="" 
                    variant="ghostIcon" 
                    size="icon-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  > 
                    <FiShoppingCart className="text-mydarkgreen size-[2em]" />
                  </Button>
                </div>
              </div>
              <div className="w-full flex justify-between items-center pr-2">
                <div className="flex items-center gap-3">
                  <img 
                    src={"https://upload.wikimedia.org/wikipedia/en/3/34/Food-com-logo.png"}
                    alt="Profile Icon"
                    className="size-10 rounded-full object-cover" 
                  />
                  <DialogDescription className="font-robo text-base">{"Food.com"}</DialogDescription>
                </div>
                <div className="flex gap-1.5 items-center">
                  <FaRegClock size="1.5rem" className="text-muted-foreground" />
                  <DialogDescription className="font-robo text-base">
                    {formatDuration(recipe.cookTime)}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-end gap-1.5 pl-1">
                <h3 className="text-amber-400 text-lg translate-y-0.5">{recipe.aggregateRating}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const starVal = Math.round(Math.max(0, Math.min(recipe.aggregateRating - i, 1)) * 100) / 100;
                    const starId = `${recipe.recipeId}-star-${i}`;
                    if (starVal === 1) {
                      return (
                        <svg key={i} viewBox="0 0 24 24" fill="gold" className="size-7">
                          <path stroke="gold" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      );
                    } else if (starVal === 0) {
                      return (
                        <svg key={i} viewBox="0 0 24 24" fill="white" className="size-7">
                          <path stroke="gold" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      );
                    } else {
                      return (
                        <svg key={i} viewBox="0 0 24 24" className="size-7">
                          <defs>
                            <linearGradient id={starId}>
                              <stop offset={starVal} stopColor="gold" /> 
                              <stop offset={starVal} stopColor="white" />
                            </linearGradient>
                          </defs>
                          <path stroke="gold" strokeWidth="1" fill={`url(#${starId})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      );
                    }
                  })}
                </div>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr] md:grid-cols-3">
              {(overMdSize ? RECIPE_DIALOG_PART_MODES: RECIPE_DIALOG_ALL_MODES).map((value, i) => (
                <Button 
                  key={i} 
                  variant="recipeDialogOutline" 
                  className={mode === value ? "" : "bg-border text-muted-foreground"}
                  onClick={() => setMode(value)}
                >
                  {value.toLowerCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className={`bg-white md:col-span-2 border-border border-l border-b ${mode === RECIPE_DIALOG_PART_MODES[2] ? "md:row-span-1" : "md:row-span-2"}`}>

        </div>
        <Carousel 
          className={`bg-white z-1 ${mode === RECIPE_DIALOG_PART_MODES[2] ? "md:col-span-5" : "md:col-span-3"}`}
          plugins={[AutoHeight(),]}
          setApi={setApi}
        >
          <CarouselContent className="items-start transition-[height] duration-300 ease-in-out">
            <CarouselItem className="h-auto max-w-[calc(100%-var(--spacing)*4)] pl-0 translate-x-4">
              <div className="mx-auto w-8/9 py-5 min-h-[20vh]">
                <p className="leading-normal">{recipe.description}</p>
              </div>
            </CarouselItem>
            {!overMdSize && <CarouselItem className="h-auto max-w-[calc(100%-var(--spacing)*4)] pl-0 translate-x-2">
              <div className="mx-auto w-8/9 py-5">
                {Array.from({ length: 2 }).map((_, index) => (
                  <p key={index} className="leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
            </CarouselItem>}
            <CarouselItem className="h-auto max-w-[calc(100%-var(--spacing)*4)] pl-0 translate-x-2">
              <div className="mx-auto w-8/9 py-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <p key={index} className="leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
            </CarouselItem>
            <CarouselItem className="h-auto max-w-[calc(100%-var(--spacing)*4)] pl-0 translate-x-0">
              <div className="mx-auto w-8/9 py-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <p key={index} className="leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>         
        <DialogFooter>
          <DialogClose className="absolute right-0 top-0" asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
