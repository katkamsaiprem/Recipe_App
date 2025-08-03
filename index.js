import { getRecipesCard } from "./getRecipesCard.js"



const recipeURL = "https://dummyjson.com/recipes"
const cuisineURL= "https://3de2awhcnqrpiue2.public.blob.vercel-storage.com/cusineJSON.json"


const cardParentElement = document.querySelector(".main");

const createElement = (element) => document.createElement(element)

const getRecipes = async (URL) => {
    try {
        const {data} = await axios.get(URL);
        return data;

    }
    catch (err) {
        console.error("Error fetching recipes:", err);
    }
}


const recipesObj = await getRecipes(recipeURL);
const cuisineObj = await getRecipes(cuisineURL);

const recipesArray = recipesObj.recipes;
const cusineArray = cuisineObj.cuisines;   


console.log(recipesArray);
console.log(cusineArray);


getRecipesCard(recipesArray, cardParentElement, createElement);




