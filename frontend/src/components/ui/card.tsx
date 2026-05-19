import * as React from "react"
import { FaRegClock } from "react-icons/fa";
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiMiniBookmark } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";


function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-6 overflow-hidden rounded-4xl bg-card py-6 text-sm text-card-foreground shadow-md ring-1 ring-foreground/5 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 dark:ring-foreground/10 *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-4xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-4xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}



// interface IngredientOption {
//   quantity: string;
//   metric: string;
//   item: string;
// }

// type IngredientGroup = IngredientOption[];

// interface Recipe {
//   link: string;
//   name: string;
//   recipeId: number;
//   userId: number;
//   cookTime: string;
//   datePublished: string;
//   title: string;
//   description: string;
//   image: string;
//   ingredients: IngredientGroup[];
//   directions: string[];
//   aggregateRating: number;
// }

interface Recipe {
  recipeId: number;
  userId: number;
  cookTime: string;
  datePublished: string;
  title: string;
  description: string;
  image: string;
  aggregateRating: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}


function RecipeCardImage({ recipe, ...props } : React.ComponentProps<"div"> & RecipeCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const formatDuration = (iso : string) => {
    const matches = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) return "0 min";
    const [, h, m] = matches;
    return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ");
  };

  const bookmarkAction = () => {
    setIsBookmarked(isBookmarked => !isBookmarked);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(recipe.datePublished));

  return (
    <Card 
      className={cn("relative w-full max-w-md p-0 gap-0 m-auto transition-all active:translate-y-px active:shadow-inner")}
      {...props}
    >
      <CardAction className="absolute right-4 top-4 z-21">
        <Badge variant="secondary" className="text-sm p-3">Original</Badge>
      </CardAction>
      <img
          src={recipe.image}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover"
      />
      <div className="h-57 flex flex-col justify-between">
        <CardHeader className="pt-3 px-5 flex flex-col gap-1 h-42">
          <CardDescription className="font-robo text-sm">{formattedDate}</CardDescription>
          <CardTitle className="text-wrap wrap-break-word font-robo text-mydarkgreen text-xl leading-snug">{recipe.title}</CardTitle>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src={"https://upload.wikimedia.org/wikipedia/en/3/34/Food-com-logo.png"}
                alt="Profile Icon"
                className="size-10 rounded-full object-cover" 
              />
              <CardDescription className="font-robo text-base">{"Food.com"}</CardDescription>
            </div>
            <div className="flex gap-1.5 items-center">
              <FaRegClock size="1.5rem" className="text-muted-foreground" />
              <CardDescription className="font-robo text-base">
                {formatDuration(recipe.cookTime)}
              </CardDescription>
            </div>
          </div>
          <CardDescription className="pt-1 h-full overflow-hidden mask-[linear-gradient(180deg,white_50%,transparent_100%)]">{recipe.description}</CardDescription>
        </CardHeader>
        <CardFooter className="h-15 justify-between px-5">
          {/* <div className="flex">
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
          </div> */}
          <div className="flex items-end gap-1.5 pl-1">
            <h3 className="text-amber-400 text-base translate-y-px">{recipe.aggregateRating}</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                const starVal = Math.round(Math.max(0, Math.min(recipe.aggregateRating - i, 1)) * 100) / 100;
                const starId = `${recipe.recipeId}-star-${i}`;
                if (starVal === 1) {
                  return (
                    <svg key={i} viewBox="0 0 24 24" fill="gold" className="size-6">
                      <path stroke="gold" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  );
                } else if (starVal === 0) {
                  return (
                    <svg key={i} viewBox="0 0 24 24" fill="white" className="size-6">
                      <path stroke="gold" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  );
                } else {
                  return (
                    <svg key={i} viewBox="0 0 24 24" className="size-6">
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
          <div className="flex gap-2">
            <Button 
              className="" 
              variant="ghostIcon" 
              size="icon-lg"
              onClick={(e) => {
                e.stopPropagation();
                bookmarkAction();
              }}
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
        </CardFooter>
      </div>
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  RecipeCardImage,
}
