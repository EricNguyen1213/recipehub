import { motion } from "framer-motion";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { RecipeCardImage } from "./ui/card";
import { RecipeDialog } from "./ui/dialog";
import { useEffect, useState } from "react";




const testUsers = {
    12345: {
        name: "Food.com",
        image: "https://getlogovector.com/wp-content/uploads/2019/09/food-com-logo-vector.png"
    }
}

const testRecipes = [
    {
        link: "https://www.food.com/recipe/barbs-gumbo-82288",
        name: "barbs gumbo",
        recipeId: 82288,
        userId: 12345,
        cookTime: "PT1H5M",
        datePublished: "2004-01-28T19:59Z",
        title: "Barb's Gumbo",
        description: "This is my recipe for gumbo. I have made it with shrimp or chicken. We like it either way. You can make it as spicy as you like . We do not care for it to spicy or hot.",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/82/28/8/cB14froTlmpDfRF49wmQ_gumbo%20SITE-3.jpg",
        ingredients: [
            [{ quantity: "1/3", metric: "cup", item: "flour" }],
            [{ quantity: "1/4", metric: "cup", item: "canola oil" }],
            [{ quantity: "1/3", metric: "cup", item: "celery, chopped" }],
            [{ quantity: "1/3", metric: "cup", item: "bell pepper, chopped" }],
            [{ quantity: "1/2", metric: "cup", item: "yellow onion, chopped" }],
            [{ quantity: "3", metric: "clove", item: "garlic, chopped fine" }],
            [{ quantity: "1", metric: "", item: "(16 ounce) can chopped tomatoes" }],
            [{ quantity: "3", metric: "cup", item: "chicken broth" }],
            [{ quantity: "1/2", metric: "tsp", item: "thyme" }],
            [{ quantity: "1/2", metric: "tsp", item: "basil" }],
            [{ quantity: "2", metric: "", item: "bay leaves" }],
            [{ quantity: "2", metric: "tbsp", item: "Worcestershire sauce" }],
            [{ quantity: "1/2-1", metric: "tsp", item: "hot pepper sauce (Tabasco or cayenne pepper or to your taste.)" }],
            [{ quantity: "1/2", metric: "tsp", item: "salt" }],
            [{ quantity: "1/2", metric: "cup", item: "canned corn" }, { quantity: "1/2", metric: "cup", item: "frozen corn" }],
            [{ quantity: "1/4-1/2", metric: "tsp", item: "cumin" }],
            [{ quantity: "1/2", metric: "tsp", item: "black pepper" }],
            [{ quantity: "2", metric: "cup", item: "okra, sliced  (fresh or frozen)" }],
            [{ quantity: "1/2-1", metric: "lb", item: "shrimp, cleaned & shells off" }],
            [{ quantity: "", metric: "", item: "rice" }],
        ],
        directions: [
            "Add oil to skillet, heat over medium heat add the flour, to make a roux.",
            "(It is ready when it's color matches that of a penney).",
            "This may take about 15 minutes.",
            "Stir in onion, celery, bell pepper, garlic, and black pepper.",
            "Cook over medium heat about 3 minutes or till vegetables are crisp tender.",
            "Gradually stir in chicken broth, tomatoes, salt, Worcestershire sauce, pepper sauce, corn, okra, Basil, thyme, cumin and bay leaf.",
            "Bring to boiling point; reduce heat.",
            "Cover and simmer for 20 to 30 minutes.",
            "Add SHRIMP during the last 5 minutes.",
            "Serve over Rice.",
            "This can also be made with chicken, if using chicken.",
            "Use chicken breast cut in chunks Add during the last 20 to 30 minute cooking time.",
            "Smoked sausage is also good added with the chicken.",
            "I have added a can of crabmeat to the shrimp version."
        ],
        aggregateRating: 4.84,
    },
    {
        link: "https://www.food.com/recipe/bourbon-chicken-45809",
        name: "bourbon chicken",
        recipeId: 45809,
        userId: 12345,
        cookTime: "PT35M",
        datePublished: "2002-11-12T20:13Z",
        title: "Bourbon Chicken",
        description: "I searched and finally found this recipe on the internet. It is a copycat of the Bourbon Chicken sold in Chinese carry-outs in my hometown.  This recipe is so good that my sons gobble it up leaving me just a spoonful. Their excuse was they thought I had eaten.  Editor's Note:  Named Bourbon Chicken because it was supposedly created by a Chinese cook who worked in a restaurant on Bourbon Street.",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/45/80/9/MwuCd6HpQ5mDvn4OLRkA_0S9A9886.jpg",
        ingredients: [
            [{ quantity: "2", metric: "lb", item: "boneless chicken breasts, cut into bite-size pieces" }],
            [{ quantity: "1-2", metric: "tbsp", item: "olive oil" }],
            [{ quantity: "1", metric: "clove", item: "garlic, crushed" }],
            [{ quantity: "1/4", metric: "tsp", item: "ginger" }],
            [{ quantity: "3/4", metric: "tsp", item: "crushed red pepper flakes" }],
            [{ quantity: "1/4", metric: "cup", item: "apple juice" }],
            [{ quantity: "1/3", metric: "cup", item: "light brown sugar" }],
            [{ quantity: "2", metric: "tbsp", item: "ketchup" }],
            [{ quantity: "1", metric: "tbsp", item: "cider vinegar" }],
            [{ quantity: "1/2", metric: "cup", item: "water" }],
            [{ quantity: "1/3", metric: "cup", item: "soy sauce" }],
        ],
        directions: [
            "Editor's Note: Named Bourbon Chicken because it was supposedly created by a Chinese cook who worked in a restaurant on Bourbon Street.",
            "Heat oil in a large skillet.",
            "Add chicken pieces and cook until lightly browned.",
            "Remove chicken.",
            "Add remaining ingredients, heating over medium Heat until well mixed and dissolved.",
            "Add chicken and bring to a hard boil.",
            "Reduce heat and simmer for 20 minutes.",
            "Serve over hot rice and ENJOY."
        ],
        aggregateRating: 4.58,
    },
    {
        link: "https://www.food.com/recipe/best-banana-bread-2886",
        name: "best banana bread",
        recipeId: 2886,
        userId: 12345,
        cookTime: "PT1H10M",
        datePublished: "1999-09-26T20:49Z",
        title: "Best Banana Bread",
        description: "Make and share this Best Banana Bread recipe from Food.com.",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/28/86/wBZxNua1T8yfDwbfo9Fz_0S9A9315.jpg",
        ingredients: [
            [{ quantity: "1/2", metric: "cup", item: "butter, softened" }],
            [{ quantity: "1", metric: "cup", item: "granulated sugar" }],
            [{ quantity: "2", metric: "", item: "eggs, beaten" }],
            [{ quantity: "3", metric: "", item: "bananas, finely crushed  (for serious and extreme moist and delicious, try 4 bananas)" }],
            [{ quantity: "1 1/2", metric: "cup", item: "all-purpose flour" }],
            [{ quantity: "1", metric: "tsp", item: "baking soda" }],
            [{ quantity: "1/2", metric: "tsp", item: "salt" }],
            [{ quantity: "1/2", metric: "tsp", item: "vanilla (optional)" }]
        ],
        directions: [
            "Remove odd pots and pans from oven.",
            "Preheat oven to 350&ordm; / 180&ordm;.",
            "Cream together butter and sugar.",
            "Add eggs and crushed bananas.",
            "Combine well.",
            "Sift together flour, soda and salt. Add to creamed mixture. Add vanilla.",
            "Mix just until combined. Do not overmix.",
            "Pour into greased and floured loaf pan.",
            "Bake at 350&ordm; / 180&ordm; for 55 minutes.",
            "Keeps well, refrigerated."
        ],
        aggregateRating: 4.81,
    },
    {
        link: "https://www.food.com/recipe/to-die-for-crock-pot-roast-27208",
        name: "to die for crock pot roast",
        recipeId: 27208,
        userId: 12345,
        cookTime: "PT9H5M",
        datePublished: "2002-05-03T15:11Z",
        title: "To Die for Crock Pot Roast",
        description: "Amazing flavor, and so simple! No salt needed here. In fact, you may wish to use half the ranch dressing mix to cut back on the saltiness. Found this Crock-Pot pot roast recipe on of a website called www.recipegoldmine.com. It's all the rage there, so I thought I'd try it.",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/27/20/8/LoLdAamfR02FY46yIy0B_crockpot-roast-4637.jpg",
        ingredients: [
            [{ quantity: "4-5", metric: "lb", item: "beef roast, any kind" }],
            [{ quantity: "1", metric: "", item: "(1 1/4 ounce) package brown gravy mix, dry" }],
            [{ quantity: "1", metric: "", item: "(1 1/4 ounce) package dried Italian salad dressing mix" }],
            [{ quantity: "1", metric: "", item: "(1 1/4 ounce) package ranch dressing mix, dry" }],
            [{ quantity: "1/2", metric: "cup", item: "water" }]
        ],
        directions: [
            "Place beef roast in crock pot.",
            "Mix the dried mixes together in a bowl and sprinkle over the roast.",
            "Pour the water around the roast.",
            "Cook on low for 7-9 hours.",
            "Optional tweaks:.",
            "1. Use onion soup mix instead of ranch.",
            "2. Add one cup of red wine along with the water.",
            "3. Add potatoes, carrots, mushrooms, celery and onion 2-3 hours before end."
        ],
        aggregateRating: 4.59,
    },
    {
        link: "https://www.food.com/recipe/crock-pot-chicken-with-black-beans-cream-cheese-89204",
        name: "crock pot chicken with black beans cream cheese",
        recipeId: 89204,
        userId: 12345,
        cookTime: "PT4H3M",
        datePublished: "2004-04-16T20:00Z",
        title: "Crock-Pot Chicken With Black Beans &amp; Cream Cheese",
        description: "I love this Crock-Pot chicken recipe for two reasons: one, my family loves it and two, it is so easy to make! I got this recipe from my sister. She has two children of her own, and they love it too! It's also the best leftovers in the world -- if there are any!",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/89/20/4/uxMwt1VGQ5m2ePyzwHWy_salsa-chicken-black-beans-2312.jpg",
        ingredients: [
            [{ quantity: "4-5", metric: "", item: "boneless chicken breasts, frozen" }],
            [{ quantity: "1", metric: "", item: "(15 1/2 ounce) can black beans" }],
            [{ quantity: "1", metric: "", item: "(15 ounce) can corn" }],
            [{ quantity: "1", metric: "", item: "(15 ounce) jar salsa, any kind" }],
            [{ quantity: "1", metric: "", item: "(8 ounce) package cream cheese" }]
        ],
        directions: [
            "Take 4-5 frozen, yes, frozen, boneless chicken breasts put into crock pot.",
            "Add 1 can of black beans, drained, 1 jar of salsa, 1 can of corn drained.",
            "Keep in crock pot on high for about 4-5 hours or until chicken is cooked.",
            "Add 1 package of cream cheese (just throw it on top!) and let sit for about 1/2 hour.",
            "All done and enjoy!"
        ],
        aggregateRating: 4.46,
    },
    {
        link: "https://www.food.com/recipe/creamy-cajun-chicken-pasta-39087",
        name: "creamy cajun chicken pasta",
        recipeId: 39087,
        userId: 12345,
        cookTime: "PT25M",
        datePublished: "2002-09-02T19:26Z",
        title: "Creamy Cajun Chicken Pasta",
        description: "Make and share this Creamy Cajun Chicken Pasta recipe from Food.com.",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/39/08/7/VPeSMiYHRce4BWsyj7Nl_0S9A5582.jpg",
        ingredients: [
            [{ quantity: "2", metric: "", item: "boneless skinless chicken breast halves, cut into thin strips" }],
            [{ quantity: "4", metric: "oz", item: "linguine, cooked al dente" }],
            [{ quantity: "2", metric: "tsp", item: "cajun seasoning (your recipe, Cajun Seasoning Mix or store-bought)" }],
            [{ quantity: "2", metric: "tbsp", item: "butter" }],
            [{ quantity: "1", metric: "", item: "thinly sliced green onion" }],
            [{ quantity: "1/2", metric: "cup", item: "heavy whipping cream" }],
            [{ quantity: "2", metric: "tbsp", item: "chopped sun-dried tomatoes" }],
            [{ quantity: "1/4", metric: "tsp", item: "salt" }],
            [{ quantity: "1/4", metric: "tsp", item: "dried basil" }],
            [{ quantity: "1/8", metric: "tsp", item: "ground black pepper" }],
            [{ quantity: "1/8", metric: "tsp", item: "garlic powder" }],
            [{ quantity: "1/4", metric: "cup", item: "grated parmesan cheese" }]
        ],
        directions: [
            "Place chicken and Cajun seasoning in a bowl and toss to coat.",
            "In a large skillet over medium heat, saut&eacute; chicken in butter or margarine until chicken is tender, about 5 to 7 minutes.",
            "Reduce heat add green onion, heavy cream, tomatoes, basil, salt, garlic powder, black pepper and heat through.",
            "Pour over hot linguine and toss with Parmesan cheese."
        ],
        aggregateRating: 4.84,
    },
    {
        link: "https://www.food.com/recipe/oatmeal-raisin-cookies-35813",
        name: "oatmeal raisin cookies",
        recipeId: 35813,
        userId: 12345,
        cookTime: "PT26M",
        datePublished: "2002-07-30T19:48Z",
        title: "Oatmeal Raisin Cookies",
        description: "You've made oatmeal-raisin cookies before, so why try these? Because they're moist, chewy and loi aded with raisins - and they're better than any you've tried before! From Cuisine Magazine\r\ni don't remrmber  been to long",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/35/81/3/KU3JVxMDRriISEG3KdPy_0S9A9740.jpg",
        ingredients: [
            [{ quantity: "2", metric: "cup", item: "all-purpose flour" }],
            [{ quantity: "1", metric: "tsp", item: "baking soda" }],
            [{ quantity: "1", metric: "tsp", item: "baking powder" }],
            [{ quantity: "1", metric: "tsp", item: "kosher salt" }],
            [{ quantity: "1", metric: "cup", item: "unsalted butter, softened" }],
            [{ quantity: "1", metric: "cup", item: "sugar" }],
            [{ quantity: "1", metric: "cup", item: "dark brown sugar, firmly packed" }],
            [{ quantity: "2", metric: "", item: "large eggs" }],
            [{ quantity: "2", metric: "tsp", item: "vanilla" }],
            [{ quantity: "3", metric: "cup", item: "oats (not instant)" }],
            [{ quantity: "1 1/2", metric: "cup", item: "raisins" }]
        ],
        directions: [
            "Preheat oven to 350&deg;.",
            "Whisk dry ingredients; set aside.",
            "Combine wet ingredients with a hand mixer on low.",
            "To cream, increase speed to high and beat until fluffy and the color lightens.",
            "Stir the flour mixture into the creamed mixture until no flour is visible.",
            "(Over mixing develops the gluten, making a tough cookie.) Now add the oats and raisins; stir to incorporate.",
            "Fill a #40 cookie scoop and press against side of bowl, pulling up to level dough (to measure 2 tablespoons of dough).",
            "Drop 2-inches apart onto baking sheet sprayed with nonstick spray.",
            "Bake 11-13 minutes (on center rack), until golden, but still moist beneath cracks on top.",
            "Remove from oven; let cookies sit on baking sheet for 2 minutes before transferring to a wire rack to cool."
        ],
        aggregateRating: 4.81,
    },
    {
        link: "https://www.food.com/recipe/best-ever-banana-cake-with-cream-cheese-frosting-67256",
        name: "best ever banana cake with cream cheese frosting",
        recipeId: 67256,
        userId: 12345,
        cookTime: "PT1H15M",
        datePublished: "2003-07-24T20:01Z",
        title: "Best Ever Banana Cake With Cream Cheese Frosting",
        description: "This is one of (if not) the BEST banana cake I have ever tasted! I thought the oven temp of 275&deg; sounded a little low, but this cake baked up (and rose) beautifully in my oven at this temp after pretty much exactly one hour. I do not know if the little &quot;freezer trick&quot; to this recipe is what ensured its moistness or not, but I did it, and it was exceptionally moist &amp; delicious. Would be interesting to see if it still came out as great if this step was skipped. All I know is that I followed this recipe EXACTLY as stated (except that I had no buttermilk, so I subbed with a mix of lemon juice &amp; milk) and I got exceptional results. So moist and yummy...a dense cake, similar in texture to a carrot cake... I personally would not call this frosted banana bread :o)  Depending on the amount of frosting you like you can decide whether to half the recipe or not. I used the full recipe and had some leftover. I sprinkled on the chopped walnuts and threw this baby in the fridge and cut it the next day...TO DIE FOR! I really liked it slightly chilled, but great at room temp too! It got better each day it sat, I always make this cake at least the day before I need or want it.  I was extremely pleased with this cake and will be making it over &amp; over again!! So glad I came across this one!! (on another website).\r\n\r\n\r\n(* * Just to update the recipe, (based on some of the reviews), the baking time may vary based on individual ovens. It was RIGHT ON for my oven, but some others have stated it has taken 1 hour 10 minutes, 1 hour 20 minutes, and my sister just informed me that it took 1 hour 30 minutes in her oven!!!!!)",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/67/25/6/ErcPhaBVS2OMnh07iiZf_banana-cake-with-cream-cheese-frosting-08.jpg",
        ingredients: [
            [{ quantity: "1 1/2", metric: "cup", item: "bananas, mashed, ripe" }],
            [{ quantity: "2", metric: "tsp", item: "lemon juice" }],
            [{ quantity: "3", metric: "cup", item: "flour" }],
            [{ quantity: "1 1/2", metric: "tsp", item: "baking soda" }],
            [{ quantity: "1/4", metric: "tsp", item: "salt" }],
            [{ quantity: "3/4", metric: "cup", item: "butter, softened" }],
            [{ quantity: "2 1/8", metric: "cup", item: "sugar" }],
            [{ quantity: "3", metric: "", item: "large eggs" }],
            [{ quantity: "2", metric: "tsp", item: "vanilla" }],
            [{ quantity: "1 1/2", metric: "cup", item: "buttermilk" }],
            [{ quantity: "1/2", metric: "cup", item: "butter, softened" }],
            [{ quantity: "1", metric: "", item: "(8 ounce) package cream cheese, softened" }],
            [{ quantity: "1", metric: "tsp", item: "vanilla" }],
            [{ quantity: "3 1/2", metric: " cup", item: "icing sugar" }],
            [{ quantity: "", metric: "", item: "chopped walnuts" }]
        ],
        directions: [
            "Preheat oven to 275&deg;F (135C).",
            "Grease and flour a 9 x 13 pan.",
            "In a small bowl, mix mashed banana with the lemon juice; set aside.",
            "In a medium bowl, mix flour, baking soda and salt; set aside.",
            "In a large bowl, cream 3/4 cup butter and  2 1/8 cups sugar until light and fluffy.",
            "Beat in eggs, one at a time, then stir in 2 tsp vanilla.",
            "Beat in the flour mixture alternately with the buttermilk.",
            "Stir in banana mixture.",
            "Pour batter into prepared pan and bake in preheated oven for one hour or until toothpick inserted in center comes out clean.",
            "Remove from oven and place directly into the freezer for 45 minutes.  This will make the cake very moist.",
            "For the frosting, cream the butter and cream cheese until smooth.",
            "Beat in 1 teaspoon vanilla.",
            "Add icing sugar and beat on low speed until combined, then on high speed until frosting is smooth.",
            "Spread on cooled cake.",
            "Sprinkle chopped walnuts over top of the frosting, if desired."
        ],
        aggregateRating: 4.80,
    },
    {
        link: "https://www.food.com/recipe/yes-virginia-there-is-a-great-meatloaf-54257",
        name: "yes virginia there is a great meatloaf",
        recipeId: 54257,
        userId: 12345,
        cookTime: "PT1H20M",
        datePublished: "2003-02-17T20:03Z",
        title: "Yes, Virginia There is a Great Meatloaf",
        description: "Absolutely delicious meatloaf and sauce! Those who claim they don't believe there can be such a thing as a great meatloaf will love this. Based on a meatloaf given to me by a dear friend, Virginia Strehl, Memphis, and Leesburg, Fla. Nita Holleman, 2000",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/54/25/7/1O1KC1wTKTskFlseYbws_0S9A6432.jpg",
        ingredients: [
            [{ quantity: "1 1/2", metric: "lb", item: "ground beef (ground shoulder roast is good)" }],
            [{ quantity: "1", metric: "slice", item: "bread (broken or chopped finely)" }],
            [{ quantity: "1", metric: "", item: "egg" }],
            [{ quantity: "1", metric: "", item: "small vidalia onions" }, { quantity: "1", metric: "", item: "small type sweet onion, finely chopped" }],
            [{ quantity: "1", metric: "tsp", item: "table salt" }],
            [{ quantity: "1/4", metric: "tsp", item: "black pepper" }],
            [{ quantity: "4", metric: "tbsp", item: "ketchup" }],
            [{ quantity: "1/2-2/3", metric: "cup", item: "whole milk" }, { quantity: "1/2-2/3", metric: "cup", item: "half-and-half" }],
            [{ quantity: "4", metric: "tbsp", item: "apple cider vinegar" }],
            [{ quantity: "2-4", metric: "tbsp", item: "dark brown sugar, packed firm (to taste)" }],
            [{ quantity: "1/2", metric: "cup", item: "ketchup" }]
        ],
        directions: [
            "Meatloaf: Combine meat loaf ingredients and place into a loaf baking dish.",
            "Smooth out top.",
            "Sauce: Combine sauce ingredients and pour on top and sides of meatloaf.",
            "Bake at 350&deg;F about 1 hour to 1 hour 15 minutes or until done.",
            "ENJOY!",
            "*The addition of 1 or 2 teaspoons of Kitchen Bouquet&reg; makes this recipe very good.",
            "**Recipe should be&quot;plump&quot; from the addition of the milk or Half &amp; Half.",
            "It should NOT be runny.",
            "***A second batch of sauce served hot is good to serve with the meatloaf.",
            "Nita's Note: I note that some of you are using game meat such as deer -- Deer is a very DRY meat. It is wise to HAVE some fat added to the deer -- especially to ground deer. Maybe 25 % fat, ( I recommend 1 lb of ground venison, and 1/2 lb of deer sausage for fat content), otherwise your results will be poor. I don't know about some of the other game meat some are using. Please consult an expert. The recipe is delicious as it stands! Enjoy! Nita Holleman."
        ],
        aggregateRating: 4.65,
    },
    {
        link: "https://www.food.com/recipe/jo-mamas-world-famous-spaghetti-22782",
        name: "jo mamas world famous spaghetti",
        recipeId: 22782,
        userId: 12345,
        cookTime: "PT1H20M",
        datePublished: "2002-03-17T10:26Z",
        title: "Jo Mama's World Famous Spaghetti",
        description: "My kids will give up a steak dinner for this spaghetti. It is a recipe I have been perfecting for years and it is so good (if I may humbly say) that my kids are disappointed when they eat spaghetti anywhere else but home! In fact they tell me I should open a restaurant and serve only this spaghetti and garlic bread. In response to requests, I have posted the recipe for Recipe #28559 that uses approximately 1/2 of the sauce from this \r\nrecipe. Have spaghetti one night and lasagna later!  Thanks to all of you who have tried my recipe and have written a review.  I read and appreciate every one of them!  Chef Note:  After I posted this recipe I remembered a funny incident--my dear husband usually has a nice bottle of wine handy so when I make a batch of spaghetti I just help myself to a splash of it. On one occasion, there wasn't a bottle opened, but there was a bottle sitting on the counter so I got out the corkscrew and helped myself. For some reason, the spaghetti that night was the best ever. My husband asked what wine I put in it and I showed him the bottle. He nearly fell off the chair. I had opened a rather expensive bottle he had bought to give his boss. Goes to show you--don't use a wine for cooking you wouldn't drink. You get the best results from a good wine!",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/22/78/2/xy39o2sOTtudkgyDgZtv_spaghettisauce.jpg",
        ingredients: [
            [{ quantity: "2", metric: "lb", item: "Italian sausage, casings removed (mild or hot)" }],
            [{ quantity: "1", metric: "", item: "small onion, chopped (optional)" }],
            [{ quantity: "3-4", metric: "clove", item: "garlic, minced" }],
            [{ quantity: "1", metric: "", item: "(28 ounce) can diced tomatoes" }],
            [{ quantity: "2", metric: "", item: "(6 ounce) cans tomato paste" }],
            [{ quantity: "2", metric: "", item: "(15 ounce) cans tomato sauce" }],
            [{ quantity: "2", metric: "cup", item: "water (for a long period of simmering for flavors to meld. If you don't want to simmer it as long, add less)" }],
            [{ quantity: "3", metric: "tsp", item: "basil" }],
            [{ quantity: "2", metric: "tsp", item: "dried parsley flakes" }],
            [{ quantity: "1 1/2", metric: "tsp", item: "brown sugar" }],
            [{ quantity: "1", metric: "tsp", item: "salt" }],
            [{ quantity: "1/4-1/2", metric: "tsp", item: "crushed red pepper flakes" }],
            [{ quantity: "1/4", metric: "tsp", item: "fresh coarse ground black pepper" }],
            [{ quantity: "1/4", metric: "cup", item: "red wine (a good Cabernet!)" }],
            [{ quantity: "1", metric: "lb", item: "thin spaghetti" }],
            [{ quantity: "", metric: "", item: "parmesan cheese" }]
        ],
        directions: [
            "In large, heavy stockpot, brown Italian sausage, breaking up as you stir.",
            "Add onions and continue to cook, stirring occasionally until onions are softened.",
            "Add garlic, tomatoes, tomato paste, tomato sauce and water.",
            "Add basil, parsley, brown sugar, salt, crushed red pepper, and black pepper.",
            "Stir well and barely bring to a boil.",
            "Stir in red wine.",
            "Simmer on low, stirring frequently for at least an hour.  A longer simmer makes for a better sauce, just be careful not to let it burn!",
            "Cook spaghetti according to package directions.",
            "Spoon sauce over drained spaghetti noodles and sprinkle with parmesan cheese."
        ],
        aggregateRating: 4.73,
    },
    {
        link: "https://www.food.com/recipe/quot-whatever-floats-your-boat-quot-brownies-32204",
        name: "quot whatever floats your boat quot brownies",
        recipeId: 32204,
        userId: 12345,
        cookTime: "PT35M",
        datePublished: "2002-06-25T22:28Z",
        title: "&quot;Whatever Floats Your Boat&quot; Brownies!",
        description: "These are absolutely the chewiest, moistest, fudgiest brownies ever! I have tried adding so many different things to the batter, and they ALWAYS comes out great.  They are also great without ANY add-ins! BUT by varying the add-ins, you can make different brownies every week (or day!!) SUPER EASY PREP! So, add &quot;whatever floats your boat&quot; and you will not believe how yummy they come out :) Oh, and the recipe doubles just fine--use a 9 x 13 inch pan instead and add a few more minutes of baking!",
        image: "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/32/20/4/yX79JawzR3CHcGEGWh4I_0S9A5678.jpg",
        ingredients: [
            [{ quantity: "1/2", metric: "cup", item: "butter, melted" }],
            [{ quantity: "1/2", metric: "cup", item: "unsweetened cocoa" }],
            [{ quantity: "1 ", metric: "cup", item: "sugar" }],
            [{ quantity: "2", metric: "", item: "eggs" }],
            [{ quantity: "2", metric: "teaspoons", item: "vanilla" }],
            [{ quantity: "1/2", metric: "cup", item: "flour" }],
            [{ quantity: "1/4", metric: "teaspoon", item: "salt" }],
            [{ quantity: "1-2", metric: "cup", item: "chocolate chips (semisweet, white, butterscotch, peanut butter)" }],
            [{ quantity: "1-2", metric: "cup", item: "raisins" }],
            [{ quantity: "1-2", metric: "cup", item: "chopped maraschino cherry" }],
            [{ quantity: "1-2", metric: "cup", item: "chopped nuts" }],
            [{ quantity: "1-2", metric: "cup", item: "M&M'" }],
            [{ quantity: "1-2", metric: "cup", item: "Reese's pieces" }],
            [{ quantity: "1-2", metric: "cup", item: "miniature marshmallow" }]
        ],
        directions: [
            "Preheat oven to 350&deg;F.",
            "Grease an 8 inch square pan or line with foil.",
            "In a medium bowl combine melted butter and cocoa and stir until cocoa is dissolved.",
            "Add sugar and mix well.",
            "Add eggs one at a time and stir until well combined.",
            "Stir in vanilla, flour and salt until you no longer see any flour (do not overmix).",
            "Fold in &quot;WHATEVER FLOATS YOUR BOAT&quot;!",
            "Spread in pan and bake for approximately 25 minutes.",
            "DO NOT OVER-BAKE -- your brownies will come out dry.  Adjust time/temp accordingly for your oven.  If you do the knife/toothpick test, it should come out with moist crumbs, not clean.",
            "Cool completely before cutting into squares.",
            "For vegetarian omit the marshmallows.",
            "For double recipe, bake in 9x12 pan and add 5 minutes to baking time."
        ],
        aggregateRating: 4.77,
    },
]

interface ExploreProps {
  overSmSize: boolean;
  overMdSize: boolean;
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (newState: boolean) => void;
}

export default function Explore({ overSmSize, overMdSize, isSideMenuOpen, setIsSideMenuOpen } : ExploreProps) { 

    const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);

    useEffect(() => {
        if (isRecipeDialogOpen && isSideMenuOpen && !overSmSize) {
            setIsSideMenuOpen(false);
        }
    }, [overSmSize, isRecipeDialogOpen, isSideMenuOpen, setIsSideMenuOpen]);
    
    return (
        <>
            <RecipeDialog 
                overMdSize={overMdSize}
                isOpen={isRecipeDialogOpen}
                setIsOpen={setIsRecipeDialogOpen}
                recipe={testRecipes[0]}
            />
            <Drawer 
                key={overSmSize ? "desktop" : "mobile"}
                direction="left" 
                open={isSideMenuOpen} 
                onOpenChange={setIsSideMenuOpen}
            >
                <DrawerContent
                    modal={!overSmSize} 
                    className="w-full sm:w-43/100 max-w-md top-12 h-[calc(100vh-43px)]"
                    autoFocus={true}
                    aria-hidden={false}
                >
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="no-scrollbar overflow-y-auto px-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <p
                            key={index}
                            className="mb-4 leading-normal style-lyra:mb-2 style-lyra:leading-relaxed"
                            >
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
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <main className={cn("bg-white w-screen flex", overSmSize && isSideMenuOpen && "pointer-events-auto")}>
                <div className={overSmSize && isSideMenuOpen ? "w-43/100 max-w-md shrink-0" : ""}></div>
                <div className={overSmSize && isSideMenuOpen ? "flex-1" : "w-full"}>
                    <section className={cn("relative w-full h-[40vh] bg-[url('/src/assets/images/exploreHeader.png')] bg-cover", overSmSize && isSideMenuOpen ? "bg-position-[10%_center]" : "bg-position-[center_50%]")}>
                        <div className="absolute inset-0 bg-white/50"></div>
                        <motion.div 
                            className={cn("relative flex flex-col justify-center items-center h-full", overSmSize && isSideMenuOpen ? "w-full max-w-xl" : "w-3/5")}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-3xl font-header sm:text-5xl lg:text-6xl w-8/10 sm:w-7/10">Your Next Meal</h1>
                            <h1 className="text-3xl font-header sm:text-5xl lg:text-6xl text-mylightgreen w-8/10 sm:w-7/10">Starts Here</h1>
                            <p className="mt-3 font-desc w-8/10 text-mydarkgreen text-base sm:text-xl lg:text-2xl sm:w-7/10">Explore a growing collection of recipes from home cooks like you.</p>
                        </motion.div>
                    </section>
                    <section className="@container w-full bg-white py-8">
                        <div className="m-auto h-full">
                            <h2 className="mb-3 text-mydarkgreen font-robo text-xl mx-auto w-6/7 max-w-108 @min-[768px]:max-w-390">Explore the Collection</h2>
                            <div className="h-full w-8/9 max-w-396 mx-auto grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 @min-[1536px]:grid-cols-4 gap-5 gap-y-8">
                                {testRecipes.map((recipe, i) => (
                                    <RecipeCardImage
                                        key={i}
                                        recipe={recipe}
                                        onClick={() => (setIsRecipeDialogOpen(true))}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}