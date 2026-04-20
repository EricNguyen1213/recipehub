import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import LilChef from "@/assets/components/lilChef";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import shelf from "../assets/images/shelf.png";


export default function Home() {

    const originalRecipe = {
        version: 0,
        color: "black",
        title: "Classic Italian Lasagna",
        ingredients: [
            {
                measurement: "0.5 lb",
                ingredient: "Lasagna Noodles"
            },
            {
                measurement: "1 lb",
                ingredient: "Italian Sausage"
            },
            {
                measurement: "0.5 lb",
                ingredient: "Ground Beef"
            },
            {
                measurement: "1 cup",
                ingredient: "Chopped Onions"
            },
            {
                measurement: "2 clove",
                ingredient: "Minced Garlic"
            },
            {
                measurement: "28 oz",
                ingredient: "Canned Tomatoes Cut Up (Undrained)"
            },
            {
                measurement: "12 oz",
                ingredient: "Tomato Paste"
            },
            {
                measurement: "2 tsp",
                ingredient: "Granulated Sugar"
            },
            {
                measurement: "2 tsp",
                ingredient: "Salt"
            },
            {
                measurement: "1.5 tsp",
                ingredient: "Dried Basil Leaves"
            },
            {
                measurement: "0.5 tsp",
                ingredient: "Fennel Seed"
            },
            {
                measurement: "0.25 tsp",
                ingredient: "Pepper"
            },
            {
                measurement: "15 oz",
                ingredient: "Ricotta Cheese"
            },
            {
                measurement: "1",
                ingredient: "Egg Beaten"
            },
            {
                measurement: "1 tbsp",
                ingredient: "Parsley Flakes"
            },
            {
                measurement: "0.5 tsp",
                ingredient: "Salt"
            },
            {
                measurement: "4 cup",
                ingredient: "Shredded Mozzarella Cheese"
            },
            {
                measurement: "0.75 cup",
                ingredient: "Parmesan Cheese Grated"
            },
        ],
        steps: [
            "Preheat oven to 375 F.",
            "In large skillet, combine Italian sausage, ground beef, onion, and garlic. Cook until sausage is no longer pink and onion is tender; drain.",
            "Stir in next 7 ingredients: 1 pound Italian sausage, 1/2 pound ground beef, 1 cup onion, 2 cloves garlic, 28 ounces canned tomatoes, 12 ounces tomato paste, 2 teaspoons granulated sugar, 2 teaspoons salt, 1 1/2 teaspoons dried basil leaves, 1/2 teaspoons fennel seed, 1/4 teaspoons pepper",
            "Bring to boil. Reduce heat; simmer 20 minutes.",
            "Fill a baking pan with hot tap water and place the uncooked noodles into the water. Set aside.",
            "In medium bowl, blend ricotta, egg, parsley, and salt.",
            "Spoon 1 1/2 cups of meat sauce into 13 x 9 inch baking dish.",
            "Layer one-third each lasagna, meat sauce, ricotta mixture, Mozzarella cheese, and Parmesan cheese.",
            "Repeat layers two more times.",
            "Cover with aluminum foil. Bake in preheated oven for 25 minutes.",
            "Uncover, bake until hot and bubbly, about 20 minutes longer.",
            "If top is not browned enough, you can turn the temperature of the oven up to 500 F and baked for a few more minutes. Be sure to WATCH and check every couple of minutes as it will brown quickly!",
            "Let stand 10 minutes before cutting."
        ]
    }

    const updatedRecipe = {
        version: 1,
        color: "#eebf25",
        title: "Dairy-Free Skillet Lasagna",
        ingredients: [
            {
                measurement: "15 oz",
                ingredient: "Almond-based Ricotta"
            },
            {
                measurement: "1",
                ingredient: "Egg Beaten"
            },
            {
                measurement: "1 tbsp",
                ingredient: "Parsley Flakes"
            },
            {
                measurement: "0.5 tsp",
                ingredient: "Salt"
            },
            {
                measurement: "2-3 cup",
                ingredient: "Dairy-Free Mozzerella Shreds"
            },
            {
                measurement: "0.5 cup",
                ingredient: "Nutritional Yeast or Vegan Parmesan"
            },
            {
                measurement: "0.5 lb",
                ingredient: "Lasagna Noodles"
            },
            {
                measurement: "1 lb",
                ingredient: "Italian Sausage"
            },
            {
                measurement: "0.5 lb",
                ingredient: "Ground Beef"
            },
            {
                measurement: "1 cup",
                ingredient: "Chopped Onions"
            },
            {
                measurement: "2 clove",
                ingredient: "Minced Garlic"
            },
            {
                measurement: "28 oz",
                ingredient: "Canned Tomatoes Cut Up (Undrained)"
            },
            {
                measurement: "12 oz",
                ingredient: "Tomato Paste"
            },
            {
                measurement: "1 cup",
                ingredient: "Water"
            },
            {
                measurement: "2 tsp",
                ingredient: "Granulated Sugar"
            },
            {
                measurement: "2 tsp",
                ingredient: "Salt"
            },
            {
                measurement: "1.5 tsp",
                ingredient: "Dried Basil Leaves"
            },
            {
                measurement: "0.5 tsp",
                ingredient: "Fennel Seed"
            },
            {
                measurement: "0.25 tsp",
                ingredient: "Pepper"
            },
        ],
        steps: [
            "Brown the Meat: In a large, deep skillet (12-inch is best), combine the Italian sausage, ground beef, onion, and garlic. Cook over medium-high heat until the meat is browned and onions are tender. Drain the excess fat.",
            "Build the Sauce: Stir in the canned tomatoes, tomato paste, sugar, 2 tsp salt, basil, fennel, and pepper. Add 1 cup of water to ensure there is enough liquid for the noodles to absorb.",
            "Incorporate Noodles: Stir the broken lasagna noodle pieces directly into the meat sauce. Ensure they are mostly submerged. Bring the mixture to a gentle boil.",
            "Simmer: Reduce heat to low, cover the skillet with a tight-fitting lid, and simmer for 15–20 minutes. Stir occasionally to prevent the noodles from sticking to the bottom, until the noodles are tender.",
            "Prep the 'Ricotta': While the noodles simmer, mix the dairy-free ricotta, beaten egg, parsley, and 0.5 tsp salt in a small bowl.",
            "Layer & Melt: Once noodles are tender, dollop the ricotta mixture over the top of the skillet. Sprinkle the dairy-free mozzarella and nutritional yeast (or vegan parmesan) over everything.",
            "Final Melt: Cover the skillet again for 3–5 minutes until the dairy-free cheese has softened or melted.",
            "Rest: Remove from heat and let sit, uncovered, for 5–10 minutes to allow the sauce to set before serving."
        ]
    }

    const seeMoreFoods = [
        {
            img: "https://alpineella.com/wp-content/uploads/2023/08/featured-image-spicy-vodka-pasta.jpg",
            title: "Spicy Vodka Pasta"
        },
        {
            img: "https://www.allrecipes.com/thmb/bzHzGHhwOzbf40hVyScNwQJJ0Hk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8727930_Lemon-Garlic-Butter-Chicken-Spiedini_Dotdash-Meredith-Food-Studios_4x3-f8f792a2cbd346399b183da4729fbe19.jpg",
            title: "Lemon Butter Chicken Skewers"
        },
        {
            img: "https://thecozyapron.com/wp-content/uploads/2015/10/harvest-stew_thecozyapron_10-04-15_3.jpg",
            title: "One-Pot Harvest Stew"
        },
        {
            img: "https://thescranline.com/wp-content/uploads/2025/12/TIRAMISU-25-S-01.jpg",
            title: "Tiramisu"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3K9gsZ1iw3g45VI_IJJNbg7nydXx64HmzIg&s",
            title: "Zesty Garlic Shrimp Scampi"
        },
        {
            img: "https://kalejunkie.com/wp-content/uploads/2025/02/KJ-Honey-Glazed-Salmon-Bowls-7.jpg",
            title: "Honey-Glazed Salmon Bowl"
        },
        {
            img: "https://lenaskitchenblog.com/wp-content/uploads/2021/06/grilled-chicken-kabobs-with-veggies-6.jpg",
            title: "Street Corn & Chicken Kabobs"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRB03inXdF6DLtfzkCavSQgxsCUNz2yoQ3Eg&s",
            title: "Mushroom Risotto"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXBdbSa1Uk-5jGhPNZDrgfcG94c7P0eZfzXw&s",
            title: "Quinoa Salad"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfL0BH8k3BB1xY6GVwNPTCKtt2nG5BGOssHg&s",
            title: "Classic Beef Shepherd's Pie"
        },
    ]

    const [frontRecipe, changeRecipe] = useState(originalRecipe);

    const [api, setApi] = useState<CarouselApi>()
    const [isIngExpanded, setIsIngExpanded] = useState(false)
    const [isRecExpanded, setIsRecExpanded] = useState(false)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const chefTrigger1 = useRef(null);
    const chefTrigger2 = useRef(null);
    const chefTriggerView1 = useInView(chefTrigger1, {once: true, amount: "all"});
    const chefTriggerView2 = useInView(chefTrigger2, {once: true, amount: "all"});
    const startChef = chefTriggerView1 || chefTriggerView2;

    useEffect(() => {
        if (!api) return;

        // 1. Define a sync function
        const onSelect = () => {
            setCurrent(api.selectedScrollSnap() + 1);
            setCount(api.scrollSnapList().length); // Update count whenever Embla refreshes
            setIsIngExpanded(false);
            setIsRecExpanded(false);
        };

        // 2. Run it immediately to set initial state
        onSelect();

        // 3. Listen for both selection changes AND re-initialization (resizes, etc.)
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        // 4. Clean up listeners to prevent memory leaks
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    return (
        <main>
            <section className="relative w-full">
                <div className="absolute inset-0 bg-[url('/src/assets/images/home1.jpg')] bg-cover grayscale"></div>
                <div className="relative z-10">
                    <div className="bg-white text-mydarkgreen flex py-18 justify-center">
                        <div className="flex flex-col gap-2.5 mx-7 my-auto">
                            <h2 className="font-header leading-tight text-3xl">Your Kitchen, Optimized</h2>
                            <ul className="list-disc pl-5.5 font-desc flex flex-col gap-1 text-[1.2rem]">
                                <li>Share recipes</li>
                                <li>Sync with local store prices</li>
                                <li>Tailor meals to your pantry & tools with AI</li>
                            </ul>
                            <div className="flex justify-center mt-2">
                                <Button className="bg-mydarkgreen rounded-lg text-white" variant="default" size="lg">
                                    <span className="text-white">Start Your Smart List</span>
                                    <FiEdit3 />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-mydarkgreentransparent py-10">
                        <motion.div 
                            className="m-auto bg-white w-14/15 rounded-lg max-w-xl shadow-xl/50"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ 
                                once: true,
                                amount: 0.25
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <div>
                                <img className="rounded-t-lg" src="https://amandascookin.com/wp-content/uploads/2025/08/Italian-Lasagna-RCSQ.jpg" />
                            </div>
                            <div className="w-full relative">
                                <LilChef className="absolute top-5 right-[-110px]" isTriggered={startChef} wholeScale={0.25} />
                                <div className="text-center flex flex-col justify-evenly">
                                    <AnimatePresence mode="wait">
                                        <motion.h3
                                            className="font-header text-2xl border-b-2 py-2"
                                            key={frontRecipe.version}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            style={{ color: frontRecipe.color }}
                                        >
                                            {frontRecipe.title}
                                        </motion.h3>
                                    </AnimatePresence>
                                    <div className="text-sm text-muted-foreground flex mx-auto gap-1.5 pt-2">
                                        {Array.from({ length: count }).map((_, index) => (
                                            <div key={index} className={`w-3 h-3 rounded-full border-gray-300 border-2 ${current-1 === index && "bg-gray-300"}`}></div>
                                        ))}
                                    </div>
                                </div>
                                <Carousel setApi={setApi} className="w-full">
                                    <CarouselContent className="">
                                        <CarouselItem key="1" className="flex flex-col items-center shadow-xl">
                                            <div className={`w-10/12 gap-2 pl-5 overflow-hidden transition-[height] duration-300 [interpolate-size:allow-keywords]
${isIngExpanded ? "h-auto" : "h-40 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]"}`}>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={frontRecipe.version}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        style={{ color: frontRecipe.color }}
                                                    >
                                                        <h3 className="font-desc font-semibold text-[1.25rem]">Ingredients</h3>
                                                        <ul>
                                                            {frontRecipe.ingredients.map((item, index) => (
                                                            <li key={index} className="list-disc my-1">({item.measurement}) {item.ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                            <AnimatePresence mode="wait">
                                                <motion.button 
                                                    onViewportEnter={() => changeRecipe(updatedRecipe)}
                                                    viewport={{once: true, amount: "all"}}
                                                    ref={chefTrigger1}
                                                    onClick={() => setIsIngExpanded(!isIngExpanded)}
                                                    className="my-3 flex items-center gap-1 text-sm font-medium text-primary"
                                                    key={frontRecipe.version}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    style={{ color: frontRecipe.color }}
                                                >
                                                    {isIngExpanded ? "Show Less" : "Show More"}
                                                    <ChevronDown className={`h-4 w-4 transition-transform ${isIngExpanded ? "rotate-180" : ""}`} />
                                                </motion.button>
                                            </AnimatePresence>
                                        </CarouselItem>
                                        <CarouselItem key="2" className="flex flex-col items-center">
                                            <div className={`w-11/13 gap-2 pl-7 overflow-hidden transition-[height] duration-300 [interpolate-size:allow-keywords]
${isRecExpanded ? "h-auto" : "h-40 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]"}`}>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={frontRecipe.version}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        style={{ color: frontRecipe.color }}
                                                    >
                                                        <h3 className="font-desc font-semibold text-[1.25rem]">Recipe</h3>
                                                        <ol>
                                                            {frontRecipe.steps.map((item, index) => (
                                                                <li key={index} className="list-decimal my-2 leading-snug">{item}</li>
                                                            ))}
                                                        </ol>
                                                    </motion.div>
                                                    
                                                </AnimatePresence>
                                            </div>
                                            <AnimatePresence mode="wait">
                                                <motion.button 
                                                    onViewportEnter={() => changeRecipe(updatedRecipe)}
                                                    viewport={{once: true, amount: "all"}}
                                                    ref={chefTrigger2}
                                                    onClick={() => setIsRecExpanded(!isRecExpanded)}
                                                    className="my-3 flex items-center gap-1 text-sm font-medium text-primary"
                                                    key={frontRecipe.version}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 10 }}
                                                    style={{ color: frontRecipe.color }}
                                                >
                                                    {isRecExpanded ? "Show Less" : "Show More"}
                                                    <ChevronDown className={`h-4 w-4 transition-transform ${isRecExpanded ? "rotate-180" : ""}`} />
                                                </motion.button>
                                            </AnimatePresence>
                                        </CarouselItem>
                                    </CarouselContent>
                                </Carousel>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-[url('/src/assets/images/foodCollage.jpg')] bg-cover">
                <div className="bg-[rgba(255,255,255,0.85)]">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ 
                            once: true,
                            amount: 0.25
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full p-10">
                            <div className="max-w-xl m-auto">
                                <h2 className="font-header text-lime-500 text-xl">Explore</h2>
                                <h3 className="font-header text-mydarkgreen font-extrabold text-3xl mb-2">Fresh From the Community</h3>
                                <p className="font-desc text-mydarkgreen text-[1.2rem] leading-snug">Browse thousands of recipes tailored by real cooks and our AI Sous Chef. From 15-minute pantry meals to gourmet weekend feasts.</p>
                                <Button className="py-5 px-10 font-desc text-lime-500 border-lime-500 rounded-xl mt-3 active:bg-lime-500 active:text-white text-xl" variant="outline">
                                    See More Recipes                                      
                                </Button>
                            </div>
                        </div>
                        <Carousel 
                            className="m-auto w-11/12"
                            plugins={[ Autoplay({ delay: 2000 }) ]}
                        >
                            <CarouselContent className="w-full m-auto pb-12">
                                {seeMoreFoods.map((item, index) => (
                                    <CarouselItem key={index} className="w-full p-0">
                                        <div className="bg-white w-2xs flex m-auto rounded-xl border-2 border-lime-500 shadow-xl">
                                            <img className="w-3/5 h-50 object-cover rounded-l-xl" src={item.img} alt={item.title}></img>
                                            <div className="w-2/5">
                                                <div className="px-1 w-full h-5/7 flex justify-center items-center">
                                                    <p className="text-center font-header text-xl text-mydarkgreen">{item.title}</p>
                                                </div>
                                                <div className="w-full h-2/7 flex justify-center items-start">
                                                    <Button className="bg-lime-500 rounded-xl" variant="default">See More</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                </div>
            </section>
            <section className="w-full bg-[url('https://t3.ftcdn.net/jpg/03/36/04/70/360_F_336047008_Qcs4jF2IiXIc6PMeJsM1sVrNONexVdxm.jpg')]">
                <img className="w-11/12 m-auto mask-b-to-transparent" src={shelf} />
                <div className="w-full p-10">
                    <div className="max-w-xl m-auto">
                        <h2 className="font-header text-lime-500 text-xl">About</h2>
                        <h3 className="font-header text-mydarkgreen font-extrabold text-3xl mb-2">Know the cost before you go</h3>
                        <p className="font-desc text-mydarkgreen text-[1.2rem] leading-snug">We scan local aisles via API to find your ingredients. If they’re out of stock, we don’t just tell you—we suggest a swap and update the recipe instructions instantly.</p>
                        <Button className="py-5 px-10 font-desc text-lime-500 border-lime-500 rounded-xl mt-3 active:bg-lime-500 active:text-white text-xl" variant="outline">
                            See More Recipes                                      
                        </Button>
                    </div>
                </div>
            </section>
        </main>
       
    );
}