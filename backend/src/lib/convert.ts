import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
// import { parsePythonStyleString } from './utils.ts';

interface Ingredients {
    quantity: string;
    metric: string;
    item: string;
}

interface Recipe {
    link: string;
    name: string;
    recipeId: string;
    cookTime: string;
    datePublished: string;
    description: string;
    image: string;
    ingredients: Ingredients[];
    directions: string[];
    aggregateRating: string;

}
const fileContent = fs.readFileSync('../../foodcom.csv', 'utf-8');

const rawRecords = parse(fileContent, {
    columns: false,
    skip_empty_lines: true
});

const parsePythonStyleString = (rawStr: unknown, type: 'ingredients' | 'directions') => {
  if (!rawStr || typeof rawStr !== 'string') return [];
  
  const cleaned = rawStr.trim();
  if (!cleaned.startsWith('[') && !cleaned.startsWith('{')) {
    return [];
  }

  try {
    return Function(`return ${cleaned}`)();
  } catch (e) {
    if (type === 'ingredients') {
      // Fix missing quote pattern before parsing blocks
      const sanitizedBlocks = cleaned.replace(/metric:\s*',\s*item:/g, "metric: '', item:");
      const blockMatches = [...sanitizedBlocks.matchAll(/\{([^}]+)\}/g)];
      const ingredients: Ingredient[] = [];

      for (const block of blockMatches) {
        const content = block[1];
        
        const qMatch = content.match(/quantity:\s*'([^']*)'/);
        const mMatch = content.match(/metric:\s*'([^']*)'/);
        const iMatch = content.match(/item:\s*'([^']*)'/);

        let quantity = qMatch ? qMatch[1] : "";
        let metric = mMatch ? mMatch[1] : "";
        let item = iMatch ? iMatch[1] : "";

        // Safeguard: if metric accidentally captured item text due to a comma/quote glitch, clear it
        if (metric.includes(', item:')) {
          metric = "";
        }

        if (quantity.includes('metric') || !quantity.trim()) {
          quantity = "";
        }

        if (item) {
          ingredients.push({ quantity, metric, item });
        }
      }
      return ingredients;
    } else {
      const inner = cleaned.slice(1, -1);
      const rawSteps = inner.split(/','|",'/);
      
      return rawSteps.map(step => 
        step.replace(/^['"]|['"]$/g, '')
            .replace(/\\'/g, "'")
      ).filter(Boolean);
    }
  }
};

const recipes = rawRecords.map((row: unknown) => {
    const r = row as any[];
    const rawIngredients = parsePythonStyleString(r[9], "ingredients");
    const ingredients = Array.isArray(rawIngredients) ? rawIngredients.flat().filter(Boolean) : [];

    const directions = parsePythonStyleString(r[10], "directions");

    //const rawRating = parsePythonStyleString(r[10]);

    const rawRatingStr = typeof r[11] === 'string' ? r[11].trim() : "";
    const aggregateRating = rawRatingStr.includes(":") ? rawRatingStr.split(":")[1].trim() : rawRatingStr;
    return {
        link: r[0],
        name: r[1],
        recipeId: r[2],
        extraField: r[3],
        cookTime: r[4],
        datePublished: r[5],
        description: r[6],
        image: r[8],
        ingredients: ingredients,
        directions: directions,
        aggregateRating: aggregateRating
    };

});

fs.writeFileSync('output-recipe.json', JSON.stringify(recipes, null, 2), 'utf-8')
console.log(`Successfully converted ${recipes.length} recipes into clean JSON!`);
